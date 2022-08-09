import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AccordionService } from '../accordion/accordion.service';
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
import { SearchService } from '../../search/search.service';
import { PanelItem } from '../accordion/host-panel/host-panel-item.class';
import { PanelHostDirective } from '../accordion/directives/panel-host.directive';
import { Panel } from '../accordion/accordion.interfaces';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy, AfterViewInit {
  collapsing = false;
  mainHeader = 'filters';
  chipsList: Chip[] = [];
  chipListSubscription: Subscription;
  changeLanguageSubscription: Subscription;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  accordionPanels: PanelItem[] = [];
  // Keep track of the view from the elements queried with panelHost directive
  @ViewChild(PanelHostDirective, { static: true })
  panelHost!: PanelHostDirective;

  constructor(
    private router: Router,
    private accordionService: AccordionService,
    private productsService: ProductsService,
    private cd: ChangeDetectorRef,
    private responsiveBoxesService: ResponsiveBoxesService,
    private contentListService: ContentListService,
    private searchService: SearchService,
    private translate: TranslateService,
    private appService: AppService,
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
    this.accordionPanels = this.accordionService.getAccordionPanels();

    // get the chiplist and subscribe
    this.chipListSubscription = this.productsService
      .getChipsListUpdateListener()
      .subscribe((response) => {
        this.chipsList = response.chipsList;

        this.cd.detectChanges();
      });

    // get translate language and subscribe
    this.changeLanguageSubscription = this.appService
      .getLanguageChangeListener()
      .subscribe((response) => {
        this.translate.use(response);
      });
  }

  ngOnDestroy(): void {
    if (this.chipListSubscription) {
      this.chipListSubscription.unsubscribe();
    }
    if (this.changeLanguageSubscription) {
      this.changeLanguageSubscription.unsubscribe();
    }

    // if any chip is open remove it before leaving the page
    for (let chip of this.chipsList) {
      this.remove(chip);
    }
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

      // close the error message if it is open
      this.searchService.onUpdateIsOpenErrorMessage(false);

      // update the search page header "Serarch for.."
      this.searchService.onUpdateSearchQueryHeader('');
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
