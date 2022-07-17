import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from './category/category.interface';
import { ResponsiveComponentsService } from './responsive-components.service';

@Component({
  selector: 'app-responsive-components',
  templateUrl: './responsive-components.component.html',
  styleUrls: ['./responsive-components.component.scss'],
})
export class ResponsiveComponentsComponent implements OnInit, OnDestroy {
  isLoading = false;
  responsiveComponentsSubscription: Subscription;
  responsiveComponents: Category[];
  numOfCols: number = 3;
  arrOfCols: number[];
  arrOfRows: number[];
  categoryWidth: number;

  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)

    if (this.categoryWidth) {
      let element = this.elementRef.nativeElement.querySelector('.wrapper');
      let marginRight = window
        .getComputedStyle(element)
        .getPropertyValue('margin-right');
      let marginLeft = window
        .getComputedStyle(element)
        .getPropertyValue('margin-left');
      let totalMargin = parseInt(marginLeft) + parseInt(marginRight);
      let totalWidth = parseInt(this.elementRef.nativeElement.offsetWidth);
      this.numOfCols = Math.floor(
        totalWidth / (this.categoryWidth + parseInt(marginRight))
      );
      // console.log({ totalWidth });
      // console.log({ marginRight });
      // console.log({ categoryWidth: this.categoryWidth });

      // console.log(this.numOfCols);
      // console.log(this.arrOfCols.length, this.arrOfRows.length);
    }
    this.arrOfCols = Array(this.numOfCols).fill(1);

    this.arrOfRows = Array(
      Math.ceil(this.responsiveComponents.length / this.numOfCols)
    ).fill(1);
  }

  constructor(
    private responsiveComponentsService: ResponsiveComponentsService,
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getResponsiveComponents();
  }

  ngOnDestroy(): void {
    this.responsiveComponentsSubscription.unsubscribe();
  }

  getResponsiveComponents() {
    this.isLoading = true;
    this.responsiveComponentsSubscription = this.responsiveComponentsService
      .getResponsiveComponents()
      .subscribe((response) => {
        this.responsiveComponents = response.gridCategories;
        this.isLoading = false;
        this.updateRowsCols();
      });
  }

  updateResponsiveComponentWidth(categoryWidth: number) {
    // console.log(categoryWidth);
    this.categoryWidth = categoryWidth;
    this.updateRowsCols();
    this.cd.detectChanges();
  }
}
