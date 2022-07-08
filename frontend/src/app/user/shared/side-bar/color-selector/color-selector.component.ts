import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { ColorSelectorService } from './color-selector.service';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css'],
})
export class ColorSelectorComponent implements OnInit {
  numberOfCols: number;
  arrOfCols: number[];
  arrOfRows: number[];
  colorsArr: { color: string }[] = [];
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
      Math.ceil(this.colorsArr.length / this.numberOfCols)
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
    this.colorsArr = this.colorSelectorService.getColorsArray();

    this.updateRowsCols();
    // this.activeStatus = this.colorSelectorService.getActiveStatusArray();
    this.activeStatusSubscription = this.colorSelectorService
      .getActiveStatusListener()
      .subscribe((response) => {
        console.log(response);
        this.activeStatusArray = response;
        this.cdr.detectChanges();
      });
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
  onSubmit(color: string) {
    // deserialize
    let urlTree = this.router.parseUrl(this.router.url);
    // update the color query param
    urlTree.queryParams['color'] = color;
    // navigate to the updated url
    this.router.navigateByUrl(urlTree);
    // serialize the url
    let url = this.urlSerializer.serialize(urlTree);
    // keep only the queries parameters
    let query = url.split('?')[1];

    let chip = { key: 'color', value: color };
    // call the method to update the products
    this.productsService.onProductsUpdate(query, chip);
  }

  /**
   * Gets the current url and returns an array of the query parameters values
   * @returns an array of the query parameters values
   */
  getQueryValues() {
    let urlTree = this.router.parseUrl(this.router.url);
    let queryArr: string[] = [];
    Object.entries(urlTree.queryParams).forEach(([key, value], index) => {
      queryArr.push(`${value}`);
    });
    console.log(queryArr);
    return queryArr;
  }
}
