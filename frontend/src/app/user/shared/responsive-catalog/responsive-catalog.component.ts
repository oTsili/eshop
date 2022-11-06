import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { ParentElementDirective } from './directives/parent-element.directive';

@Component({
  selector: 'app-responsive-catalog',
  templateUrl: './responsive-catalog.component.html',
  styleUrls: ['./responsive-catalog.component.scss'],
})
export class ResponsiveCatalogComponent implements OnInit, OnChanges {
  @Input() elements: any[];
  @Input() justify_content: string;
  @Input() margin: string;
  @ContentChildren(ParentElementDirective)
  items!: QueryList<ParentElementDirective>;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['elements']) {
      this.elements = changes['elements'].currentValue;
    }
  }
}
