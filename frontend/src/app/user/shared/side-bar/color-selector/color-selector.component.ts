import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { Color } from './color-selector.interfaces';
import { ColorSelectorService } from './color-selector.service';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css'],
})
export class ColorSelectorComponent implements OnInit, OnDestroy {
  @Input() data;
  numberOfCols: number;
  arrOfCols: number[];
  arrOfRows: number[];
  elementList: Color[] = [];
  // arrOfColsArray: Array<boolean> = [];
  activeStatusSubscription: Subscription;
  activeStatusArray: boolean[] = [];
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
    private urlSerializer: UrlSerializer,
    private colorSelectorService: ColorSelectorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.elementList = this.data.elementList;

    this.updateRowsCols();

    this.activeStatusSubscription = this.colorSelectorService
      .getActiveStatusListener()
      .subscribe((response) => {
        this.activeStatusArray = response;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.activeStatusSubscription.unsubscribe();
  }

  toggleActiveClass(index: number) {
    this.colorSelectorService.initializeActiveStatusArray();
    this.colorSelectorService.onUpdateActiveStatus(index);
  }

  /**
   * Updates or inserts a query parameter of color with
   * the color provided by the template with the click
   * event. First deserializes the current url, then updates
   * the color parameter, before navigating in the frontend
   * and calling the onProductUpdate service method to
   * update (http req) the products
   * @param color
   */
  onSubmit(index: number) {
    // deserialize
    let urlTree = this.router.parseUrl(this.router.url);
    // update the color query param

    let color = this.elementList[index].text_en;

    urlTree.queryParams['color'] = color;
    // navigate to the updated url
    this.router.navigateByUrl(urlTree);
    // serialize the url
    let url = this.urlSerializer.serialize(urlTree);
    // keep only the queries parameters
    let query = url.split('?')[1];

    const chipValue = `${this.data.header_el}: ${this.elementList[index].text_el}`;

    let chip = { key: 'color', value: chipValue };
    // call the method to update the products
    this.productsService.onProductsUpdate(query, chip);
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
