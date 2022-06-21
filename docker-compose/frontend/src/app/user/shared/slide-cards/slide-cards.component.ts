import { Component, OnInit,  HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-slide-cards',
  templateUrl: './slide-cards.component.html',
  styleUrls: ['./slide-cards.component.css']
})
export class SlideCardsComponent implements OnInit {

  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  totalCards: number = this.arr.length;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;
  @ViewChild("container", { static: true, read: ElementRef })
  container: ElementRef;
  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit() {
    this.cardsPerPage = this.getCardsPerPage();
    console.log({cardsPerPage:this.cardsPerPage});
    this.initializeSlider();
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    console.log({totalPages:this.totalPages});

    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages * 10}px)`;
    console.log({overflowWidth: `${this.totalPages * 50}% + ${this.totalPages * 10}px`});

    this.cardWidth = `calc((${90 / this.totalPages}% - ${this.cardsPerPage * 10}px) / ${this.cardsPerPage})`;
    console.log({cardsPerPage:this.cardsPerPage});
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 250);
  }

  changePage(incrementor) {
    this.currentPage += incrementor;
    console.log({currentPage: this.currentPage})
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 * (this.currentPage - 1)}px)`;
    console.log({pagePosition: this.pagePosition})
  }

}