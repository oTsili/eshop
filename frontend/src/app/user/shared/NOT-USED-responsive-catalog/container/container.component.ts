import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ContainerDirective } from './container.directive';
import { ContainerService } from './container.service';
import { ItemClass } from './item/item';
import { ItemContent } from './item/item.directive';
import { Item } from './item/item.interface';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  itemIndex = 0;
  @ContentChildren(ItemContent)
  items: QueryList<ItemContent>;
  @ViewChild(ContainerDirective, { static: true })
  itemHost!: ContainerDirective;
  @Input() itemComponents: ItemClass[];

  constructor(private containerService: ContainerService) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    this.itemIndex = this.containerService.getIndex();
    this.containerService.increaseIndex();
    const childItem = this.itemComponents[this.itemIndex];

    if (!childItem) {
      return;
    }

    const viewContainerRef = this.itemHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Item>(
      childItem.component
    );
    componentRef.instance.data = childItem.data;
  }
}
