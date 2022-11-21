import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/user/product/products.service';
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
  private onProductsUpdatedSubscription: Subscription;
  isSubmitted = false;

  activeStatusArray: boolean[] = [];

  constructor(
    private contentListService: ContentListService,
    private router: Router,
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.elementList = this.data.elementList;
    let elHeader = this.data.header;
    if (elHeader === 'heel height') {
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
    if (this.salesActiveStatusSubscription) {
      this.salesActiveStatusSubscription.unsubscribe();
    }
    if (this.materialActiveStatusSubscription) {
      this.materialActiveStatusSubscription.unsubscribe();
    }

    if (this.heelHeightActiveStatusSubscription) {
      this.heelHeightActiveStatusSubscription.unsubscribe();
    }

    if (this.onProductsUpdatedSubscription) {
      this.onProductsUpdatedSubscription.unsubscribe();
    }
  }

  /**
   * function to toggle the activeStatus array of each content list element,
   * by getting the index of the specific element inside its containing array
   * @param index
   */
  toggleActiveClass(index: number) {
    let elHeader = this.data.header;

    // console.log({ elHeader });
    if (elHeader === 'heel height') {
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
    // save temporarily the index
    this.contentListService.index = index;

    // toggle the isSubmitted value
    this.isSubmitted = true;

    // get the chip key from the element provided from the products Service
    const chipKey = this.data.header;

    // get the chip value from the element list provided (initially) from the products Service
    const chipValue = this.elementList[index].text;

    // deserialize the url
    const urlTree = this.router.parseUrl(this.router.url);

    // update the query param that holds the chip.key parameter
    urlTree.queryParams[chipKey] = chipValue;

    // call the method to update the products
    this.productsService.toUpdateProducts(urlTree.queryParams).subscribe({
      next: (response) => {
        if (this.isSubmitted) {
          // navigate to the updated url
          this.router.navigateByUrl(urlTree);
          // compose the chip view
          const chip = { key: chipKey, value: chipValue };

          // add a chip in the sidebar
          this.productsService.addChip(chip);

          // update the style of the selected element (focused)
          this.toggleActiveClass(this.contentListService.index);

          // reset the isSubmitted value
          this.isSubmitted = false;
        }
      },
      error: (response) => {
        // console.log(response);
        console.log('something went wrong');
      },
    });
  }
}
