import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
})
export class SlideComponent implements OnInit, AfterViewInit {
  @Input() product;
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // console.log(this.product);
  }
}
