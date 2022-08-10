import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/user/product/products.service';
import { ResponsiveBox } from './responsive-boxes.interfaces';
import { ResponsiveBoxesService } from './responsive-boxes.service';

@Component({
  selector: 'app-responsive-boxes',
  templateUrl: './responsive-boxes.component.html',
  styleUrls: ['./responsive-boxes.component.css'],
})
export class ResponsiveBoxesComponent implements OnInit, OnDestroy {
  @Input() data;
  numberOfCols: number;
  arrOfCols: number[];
  arrOfRows: number[];
  elementList: ResponsiveBox[] = [];
  // arrOfColsArray: Array<boolean> = [];
  colorActiveStatusSubscription: Subscription;
  sizeActiveStatusSubscription: Subscription;
  activeStatusArray: boolean[] = [];
  queryParam: string;
  show_text = false;
  isSubmitted = false;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private responsiveBoxesService: ResponsiveBoxesService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.elementList = this.data.elementList;
    this.queryParam = this.data.header;
    this.show_text = this.data.show_text;

    let elHeader = this.data.header;
    if (elHeader === 'color') {
      this.responsiveBoxesService.colorArray = this.elementList;
      this.colorActiveStatusSubscription = this.responsiveBoxesService
        .getColorActiveStatusListener()
        .subscribe((response) => {
          this.activeStatusArray = response;
          this.cdr.detectChanges();
        });
    } else if (elHeader === 'size') {
      this.responsiveBoxesService.sizeArray = this.elementList;
      this.sizeActiveStatusSubscription = this.responsiveBoxesService
        .getSizeActiveStatusListener()
        .subscribe((response) => {
          this.activeStatusArray = response;
          this.cdr.detectChanges();
        });
    }
  }

  ngOnDestroy(): void {
    if (this.colorActiveStatusSubscription) {
      this.colorActiveStatusSubscription.unsubscribe();
    }
    if (this.sizeActiveStatusSubscription) {
      this.sizeActiveStatusSubscription.unsubscribe();
    }
  }

  toggleActiveClass(index: number) {
    let elHeader = this.data.header;
    if (elHeader === 'color') {
      this.responsiveBoxesService.initializeColorActiveStatusArray();
      this.responsiveBoxesService.onUpdateColorActiveStatus(index);
    } else if (elHeader === 'size') {
      this.responsiveBoxesService.initializeSizeActiveStatusArray;
      this.responsiveBoxesService.onUpdateSizeActiveStatus(index);
    }
  }

  /**
   * Updates or inserts a query parameter of color/size with
   * the color/size provided by the template with the click
   * event. First deserializes the current url, then updates
   * the color/size parameter, before navigating in the frontend
   * and calling the onProductUpdate service method to
   * update (http req) the products
   * @param index:number
   */
  onSubmit(index: number) {
    this.responsiveBoxesService.index = index;

    // toggle the isSubmitted value
    this.isSubmitted = true;

    // deserialize
    let urlTree = this.router.parseUrl(this.router.url);

    // update the color/size query param
    let text = this.elementList[index].text;
    urlTree.queryParams[this.queryParam] = text;

    // call the method to update the products
    this.productsService.toUpdateProducts(urlTree.queryParams).subscribe({
      next: (response) => {
        if (this.isSubmitted) {
          // navigate to the updated url
          this.router.navigateByUrl(urlTree);

          // compose the chip view
          const chipValue =
            this.elementList[this.responsiveBoxesService.index].text;
          let chip = { key: this.queryParam, value: chipValue };

          // add a chip in the sidebar
          this.productsService.addChip(chip);

          // update the style of the selected element (focused)
          this.toggleActiveClass(this.responsiveBoxesService.index);

          // reset the isSubmitted value
          this.isSubmitted = false;
        }
      },
    });
  }

  // /**
  //  * Gets the current url and returns an array of the query parameters values
  //  * @returns an array of the query parameters values
  //  */
  // getQueryValues() {
  //   let urlTree = this.router.parseUrl(this.router.url);
  //   let queryArr: string[] = [];
  //   Object.entries(urlTree.queryParams).forEach(([key, value], index) => {
  //     queryArr.push(`${value}`);
  //   });
  //   console.log(queryArr);
  //   return queryArr;
  // }
}
