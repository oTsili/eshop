import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AccordionService } from '../accordion/accordion.service';
import { PanelItem } from '../accordion/panel/panel-item';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductsService } from '../products/products.service';
import { ActivatedRoute, Params, Router, UrlSerializer } from '@angular/router';
import { Chip } from './side-bar.interfaces';
import { ResponsiveBoxesService } from './responsive-boxes/responsive-boxes.service';
import { Subscription } from 'rxjs';
import { ContentListService } from './content-list/content-list.service';
import { TranslateService } from '@ngx-translate/core';
import { SideBarService } from './side-bar.service';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy, AfterViewInit {
  collapsing = false;
  panels: PanelItem[] = [];
  mainHeader = 'filters';
  chipsList: Chip[] = [];
  chipListSubscription: Subscription;
  changeLanguageSubscription: Subscription;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accordionService: AccordionService,
    private productsService: ProductsService,
    private cd: ChangeDetectorRef,
    private responsiveBoxesService: ResponsiveBoxesService,
    private contentListService: ContentListService,
    private translate: TranslateService,
    private sideBarService: SideBarService,
    private elementRef: ElementRef
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngAfterViewInit(): void {
    let el = this.elementRef.nativeElement.querySelector('.container');
    let width = window.getComputedStyle(el).getPropertyValue('width');
    this.productsService.updateSideBarWidth(parseInt(width));
  }

  ngOnInit(): void {
    // get the accordion panels
    this.panels = this.accordionService.getPanels();

    // get the chiplist and subscribe
    this.chipListSubscription = this.productsService
      .getChipsListUpdateListener()
      .subscribe((response) => {
        this.chipsList = response.chipsList;

        this.cd.detectChanges();
      });

    // get translate language and subscribe
    this.changeLanguageSubscription = this.sideBarService
      .getLanguageChangeListener()
      .subscribe((response) => {
        this.translate.use(response);
      });
  }

  ngOnDestroy(): void {
    this.chipListSubscription.unsubscribe();
    this.changeLanguageSubscription.unsubscribe();
  }

  remove(chip: Chip): void {
    const index = this.chipsList.indexOf(chip);

    if (index >= 0) {
      // this.chipsList.splice(index, 1);
      this.productsService.removeChip(index);

      if (chip.key === 'color') {
        this.responsiveBoxesService.initializeColorActiveStatusArray();
      } else if (chip.key === 'size') {
        this.responsiveBoxesService.initializeSizeActiveStatusArray();
      } else if (chip.key === 'heel height') {
        this.contentListService.initializeHeelHeightActiveStatusArray();
      } else if (chip.key === 'sales') {
        this.contentListService.initializeSalesActiveStatusArray();
      } else if (chip.key === 'material') {
        this.contentListService.initializeMaterialActiveStatusArray();
      }

      this.updateProducts(chip);
    }
  }

  updateProducts(chip: Chip) {
    // get the url from the browser
    let urlTree = this.router.parseUrl(this.router.url);

    // delete the query parameter came from the chip
    delete urlTree.queryParams[chip.key];

    // navigate to the new url
    this.router.navigateByUrl(urlTree);

    // call the method to update the products
    this.productsService.onProductsUpdate(urlTree.queryParams);
  }
}
