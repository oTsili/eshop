import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ResponsiveCatalogDirective } from '../responsive-catalog.directive';
import { Item } from './item/item';
import { ItemContent } from './item/item.directive';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  currentAdIndex = -1;
  @ContentChildren(ItemContent)
  items: QueryList<ItemContent>;
  @ViewChild(ResponsiveCatalogDirective, { static: true })
  itemHost!: ResponsiveCatalogDirective;
  @Input() elements;
  @Input() itemComponents;
  constructor() {}

  ngOnInit(): void {}

  loadComponent() {
    console.log(this.itemHost);
    console.log(this.items);
    // console.log(this.productComponents);
    this.currentAdIndex = (this.currentAdIndex + 1) % this.elements.length;
    const adItem = this.elements[this.currentAdIndex];

    const viewContainerRef = this.itemHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Item>(
      adItem.component
    );
    componentRef.instance.data = adItem.data;
  }
}
