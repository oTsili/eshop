import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit {

  colors=['red', 'blue', 'green']
  constructor() { }

  ngOnInit(): void {
  }

}
