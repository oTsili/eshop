import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('.2s', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('.2s', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('slideOutIn', [
      transition(':enter', [
        style({ transform: 'translateX(0%)' }),
        animate('.2s', style({ transform: 'translateX(-100%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(-100%)' }),
        animate('.2s', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class AdminComponent implements OnInit {
  isOpenSideBar = true;
  constructor() {}

  ngOnInit(): void {}
  openSideBar() {}
}
