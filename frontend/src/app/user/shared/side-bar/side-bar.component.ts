import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AccordionService } from '../accordion/accordion.service';
import { PanelItem } from '../accordion/panel/panel-item';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductsService } from '../products/products.service';
import { Router, UrlSerializer } from '@angular/router';
import { Chip } from './side-bar.interfaces';
import { ColorSelectorService } from './color-selector/color-selector.service';
import { Subscription } from 'rxjs';
import { ContentListService } from './content-list/content-list.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {
  collapsing = false;
  panels: PanelItem[] = [];
  mainHeader = 'Φίλτρα';
  chipsList: Chip[] = [];
  chipListSubscription: Subscription;
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private router: Router,
    private accordionService: AccordionService,
    private productsService: ProductsService,
    private urlSerializer: UrlSerializer,
    private cd: ChangeDetectorRef,
    private colorSelectorService: ColorSelectorService,
    private contentListService: ContentListService
  ) {}

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
  }

  ngOnDestroy(): void {
    this.chipListSubscription.unsubscribe();
  }

  remove(chip: Chip): void {
    const index = this.chipsList.indexOf(chip);

    console.log(index);
    if (index >= 0) {
      // this.chipsList.splice(index, 1);
      this.productsService.removeChip(index);

      if (chip.key === 'color') {
        this.colorSelectorService.initializeActiveStatusArray();
      } else if (chip.key === 'heelHeight') {
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
    // get the domain: "baseUrl" and the current route: "query"
    const url = this.router.url;
    let [baseUrl, query] = url.split('?');

    // compose the new url
    let newUrl = '';
    let newQuery = '';
    let queryParam = '';
    // if no chips/queryParams left remove and the 'query?' strin
    // from the url
    if (this.chipsList.length <= 0) {
      baseUrl = baseUrl.replace('/query', '');
      newUrl = `${baseUrl}`;
    } else {
      // the greek are encoded in the URI/URL, so in order to compoare
      // must be converted to URI code format
      chip.value = encodeURI(chip.value);
      // compose the string of key=value of chip
      queryParam = `${chip.key}=${chip.value}`;
      // remove the query param of the removed chip
      newQuery = query.replace(queryParam, '');
      // conpose the new url
      newUrl = `${baseUrl}?${newQuery}`;
    }

    // navigate to the new url
    this.router.navigateByUrl(newUrl);

    newQuery = decodeURI(newQuery);

    console.log(newQuery);
    // call the method to update the products
    this.productsService.onProductsUpdate(newQuery);
  }
}
