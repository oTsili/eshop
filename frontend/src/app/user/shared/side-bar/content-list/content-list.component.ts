import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { ContentListService } from './content-list.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
})
export class ContentListComponent implements OnInit, OnDestroy {
  @Input() data: any;
  elementList;
  private heelHeightActiveStatusSubscription: Subscription;
  private salesActiveStatusSubscription: Subscription;
  private materialActiveStatusSubscription: Subscription;

  activeStatusArray: boolean[] = [];

  constructor(
    private contentListService: ContentListService,
    private router: Router,
    private urlSerializer: UrlSerializer,
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.elementList = this.data.elementList;
    let elHeader = this.data.header_en;
    if (elHeader === 'heelHeight') {
      this.contentListService.heelHeighArray = this.elementList;
      this.heelHeightActiveStatusSubscription = this.contentListService
        .getHeelHeighActiveStatusListener()
        .subscribe((response) => {
          this.activeStatusArray = response;
          this.cdr.detectChanges();
        });
    } else if (elHeader === 'sales') {
      this.contentListService.salesArray = this.elementList;
      this.contentListService
        .getSalesActiveStatusListener()
        .subscribe((response) => {
          this.activeStatusArray = response;
          this.cdr.detectChanges();
        });
    } else if (elHeader === 'material') {
      this.contentListService.materialArray = this.elementList;
      this.contentListService
        .getMaterialActiveStatusListener()
        .subscribe((response) => {
          this.activeStatusArray = response;
          this.cdr.detectChanges();
        });
    }
  }
  ngOnDestroy(): void {
    this.salesActiveStatusSubscription.unsubscribe();
    this.materialActiveStatusSubscription.unsubscribe();
    this.heelHeightActiveStatusSubscription.unsubscribe();
  }

  toggleActiveClass(index: number) {
    let elHeader = this.data.header_en;
    if (elHeader === 'heelHeight') {
      this.contentListService.initializeHeelHeightActiveStatusArray();
      this.contentListService.onUpdateHeelHeighActiveStatusArray(index);
    } else if (elHeader === 'sales') {
      this.contentListService.initializeSalesActiveStatusArray();
      this.contentListService.onUpdateSalesActiveStatusArray(index);
    } else if (elHeader === ' material') {
      this.contentListService.initializeMaterialActiveStatusArray();
      this.contentListService.onUpdateMaterialActiveStatusArray(index);
    }
  }

  onSubmit(index: number) {
    let elHeader = this.data.header_en;
    // deserialize
    let urlTree = this.router.parseUrl(this.router.url);
    let chipKey = '';
    const chipValue = this.elementList[index].text_el;
    if (elHeader === 'heelHeight') {
      chipKey = 'heelHeight';
    } else if (elHeader === 'sales') {
      chipKey = 'sales';
    } else if (elHeader === 'material') {
      chipKey = 'material';
    }

    // update the color query param
    urlTree.queryParams[chipKey] = chipValue;
    // navigate to the updated url
    this.router.navigateByUrl(urlTree);
    // serialize the url
    let url = this.urlSerializer.serialize(urlTree);
    // keep only the queries parameters
    let query = url.split('?')[1];
    if (elHeader === 'heelHeight') {
      query = this.contentListService
        .getSubstring(query, '(', ')')
        .replace('(', '');

      query = `heelHeight=${query}`;
    }

    console.log({ query });
    let chip = { key: chipKey, value: chipValue };
    // call the method to update the products
    this.productsService.onProductsUpdate(query, chip);
  }

  /**
   * Specific function to get the values from the
   * initial text of the list
   * @param index index of the item element
   * @returns the string to be place on chip component
   */
  getHeelHeightChipValue(index: number) {
    let listElementValue = this.elementList[index].text_el;
    let chipValue = listElementValue
      .split(' ')[1]
      .replace('(', '')
      .replace(')', '');

    return chipValue;
  }
}
