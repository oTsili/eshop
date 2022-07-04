import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ItemClass } from './item';
import { ItemDirective } from './item.directive';
import { Item } from './item.interface';

@Component({
  selector: 'app-item',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() items: ItemClass[] = [];

  currentAdIndex = -1;

  @ViewChild(ItemDirective, { static: true }) adHost!: ItemDirective;
  interval: number | undefined;

  ngOnInit(): void {
    this.loadComponent();
    // this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.items.length;
    const adItem = this.items[this.currentAdIndex];

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Item>(
      adItem.component
    );
    componentRef.instance.data = adItem.data;
  }

  //   getAds() {
  //     this.interval = setInterval(() => {
  //       this.loadComponent();
  //     }, 3000);
  //   }
}
