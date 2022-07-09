import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  //  heelHeightActiveStatusArray: boolean[];
  //  salesActiveStatusArray: boolean[];
  //  materialActiveStatusArray: boolean[];
  activeStatusArray: boolean[] = [];

  constructor(
    private contentListService: ContentListService,
    private router: Router,
    private urlSerializer: UrlSerializer,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.elementList = this.data.elementList;
    console.log(this.elementList);
    let elHeader = this.data.header_en;
    if (elHeader === 'heelHeight') {
      this.contentListService.heelHeighArray = this.elementList;
      this.heelHeightActiveStatusSubscription = this.contentListService
        .getHeelHeighActiveStatusListener()
        .subscribe((response) => {
          this.activeStatusArray = response;
        });
    } else if (elHeader === 'sales') {
      this.contentListService.salesArray = this.elementList;
      this.contentListService
        .getSalesActiveStatusListener()
        .subscribe((response) => {
          this.activeStatusArray = response;
        });
    } else if (elHeader === 'material') {
      this.contentListService.materialArray = this.elementList;
      this.contentListService
        .getMaterialActiveStatusListener()
        .subscribe((response) => {
          this.activeStatusArray = response;
        });
    }
  }
  ngOnDestroy(): void {
    this.salesActiveStatusSubscription.unsubscribe();
    this.materialActiveStatusSubscription.unsubscribe();
    this.heelHeightActiveStatusSubscription.unsubscribe();
  }

  onSubmit(index: number) {
    let elHeader = this.data.header_en;
    // deserialize
    let urlTree = this.router.parseUrl(this.router.url);
    let chipKey = '';
    let chipValue = '';
    if (elHeader === 'heelHeight') {
      chipValue = this.getHeelHeighChipValue(index);
      chipKey = 'heelHeight';
    } else if (elHeader === 'sales') {
      chipValue = this.elementList[index].text_el;
      chipKey = 'sales';
    } else if (elHeader === 'material') {
      chipValue = this.elementList[index].text_el;
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

    let chip = { key: chipKey, value: chipValue };
    // call the method to update the products
    this.productsService.onProductsUpdate(query, chip);
  }

  getHeelHeighChipValue(index: number) {
    let listElementValue = this.elementList[index].text_el;
    let chipValue = listElementValue
      .split(' ')[1]
      .replace('(', '')
      .replace(')', '');
    console.log(chipValue);

    return chipValue;
  }
}
