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
      this.salesActiveStatusSubscription = this.contentListService
        .getSalesActiveStatusListener()
        .subscribe((response) => {
          this.activeStatusArray = response;
          this.cdr.detectChanges();
        });
    } else if (elHeader === 'material') {
      this.contentListService.materialArray = this.elementList;
      this.materialActiveStatusSubscription = this.contentListService
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

  /**
   * function to toggle the activeStatus array of each content list element,
   * by getting the index of the specific element inside its containing array
   * @param index
   */
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

  /**
   * function to be triggered when an option of the content-list is clicked
   * @param index
   */
  onSubmit(index: number) {
    // get the chip key from the element provided from the products Service
    const chipKey = this.data.header_en;
    // get the chip value from the element list provided (initially) from the products Service
    const chipValue = `${this.data.header_en}: ${this.elementList[index].text_en}`;

    // deserialize the url
    const urlTree = this.router.parseUrl(this.router.url);
    // update the color query param
    urlTree.queryParams[chipKey] = chipValue;
    // navigate to the updated url
    this.router.navigateByUrl(urlTree);
    // serialize the url
    const url = this.urlSerializer.serialize(urlTree);
    // keep only the queries parameters
    const query = url.split('?')[1];

    console.log({ query });
    const chip = { key: chipKey, value: chipValue };
    // call the method to update the products
    this.productsService.onProductsUpdate(query, chip);
  }
}
