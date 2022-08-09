import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
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

  /**
   * updates the number of colors, the array of Cols and
   * array of Rows, to be used in the grid of elements,
   * when window is resized.
   */
  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)
    this.numberOfCols = Math.floor(
      (this.elementRef.nativeElement.offsetWidth * 0.1) / 4.2
    );
    this.arrOfCols = Array(this.numberOfCols).fill(1);
    // .map((x, i) => i + 1);

    this.arrOfRows = Array(
      Math.ceil(this.elementList.length / this.numberOfCols)
    ).fill(1);
    // .map((x, i) => i + 1);
  }

  constructor(
    private elementRef: ElementRef,
    private productsService: ProductsService,
    private router: Router,
    private responsiveBoxesService: ResponsiveBoxesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.elementList = this.data.elementList;
    this.queryParam = this.data.header;
    this.show_text = this.data.show_text;
    this.updateRowsCols();

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
    // deserialize
    let urlTree = this.router.parseUrl(this.router.url);

    // update the color/size query param
    let text = this.elementList[index].text;
    urlTree.queryParams[this.queryParam] = text;

    // navigate to the updated url
    this.router.navigateByUrl(urlTree);

    // compose the chip view
    const chipValue = this.elementList[index].text;
    let chip = { key: this.queryParam, value: chipValue };

    // call the method to update the products
    this.productsService.onProductsUpdate(urlTree.queryParams, chip);
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
