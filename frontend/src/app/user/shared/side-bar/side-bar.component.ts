import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AccordionService } from '../accordion/accordion.service';
import { PanelItem } from '../accordion/panel/panel-item';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductsService } from '../products/products.service';
import { Router, UrlSerializer } from '@angular/router';
import { Chip } from './side-bar.interfaces';
import { ColorSelectorService } from './color-selector/color-selector.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  collapsing = false;
  panels: PanelItem[] = [];
  mainHeader = 'Φίλτρα';
  chipsList: Chip[] = [];
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private router: Router,
    private accordionService: AccordionService,
    private productsService: ProductsService,
    private urlSerializer: UrlSerializer,
    private cd: ChangeDetectorRef,
    private colorSelectorService: ColorSelectorService
  ) {}

  ngOnInit(): void {
    // get the accordion panels
    this.panels = this.accordionService.getPanels();

    // get the chiplist and subscribe
    this.productsService.getChipsListUpdateListener().subscribe((response) => {
      console.log(response);
      this.chipsList = response.chipsList;
      this.cd.detectChanges();
    });
  }

  remove(chip: Chip): void {
    const index = this.chipsList.indexOf(chip);

    if (index >= 0) {
      // this.chipsList.splice(index, 1);
      this.productsService.removeChip(chip.key);
      this.updateProducts(chip);
      console.log(chip);
      if (chip.key === 'color') {
        this.colorSelectorService.initializeActiveStatusArray();
      }
    }
  }
  /**
   *
   */
  updateProducts(chip: Chip) {
    // get the domain: "baseUrl" and the current route: "query"
    const url = this.router.url;
    let [baseUrl, query] = url.split('?');

    // compose the new url
    let newUrl = '';
    let newQuery = '';

    // if no chips/queryParams left remove and the 'query?' strin
    // from the url
    if (this.chipsList.length > 0) {
      // compose the string of key=value of chip
      const queryParam = `${chip.key}=${chip.value}`;
      // remove the query param of the removed chip
      newQuery = query.replace(queryParam, '');
      newUrl = `${baseUrl}?${newQuery}`;
    } else {
      baseUrl = baseUrl.replace('/query', '');
      newUrl = `${baseUrl}`;
    }
    console.log(newUrl);
    // navigate to the new url
    this.router.navigateByUrl(newUrl);

    // call the method to update the products
    this.productsService.onProductsUpdate(newQuery);
  }
}
