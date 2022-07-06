import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ItemClass } from './item';
import { ItemDirective } from './item.directive';
import { Item } from './item.interface';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() items: ItemClass[] = [];
  // currentAdIndex = -1;
  components;
  @ViewChild(ItemDirective, { static: true }) adHost!: ItemDirective;
  interval: number | undefined;

  constructor(private itemService: ItemService) {}
  ngOnInit(): void {
    this.loadComponent();
    this.itemService.itemHost = this.adHost;
    // this.getAds();
  }

  ngOnDestroy() {
    // clearInterval(this.interval);
  }

  loadComponent() {
    // this.currentAdIndex = (this.currentAdIndex + 1) % this.items.length;
    // const adItem = this.items[this.currentAdIndex];
    const adItem = this.items[0];
    console.log(adItem);

    const viewContainerRef = this.adHost.viewContainerRef;
    console.log(viewContainerRef);
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Item>(
      adItem.component
    );
    this.itemService.setComponents(componentRef);
    componentRef.instance.data = adItem.data;
  }

  // clearComponents() {
  //   let comps = this.itemService.components;
  //   const viewContainerRef = this.adHost.viewContainerRef;
  //   for (let comp of comps) {
  //     viewContainerRef.remove(comp);
  //   }
  // }

  //   getAds() {
  //     this.interval = setInterval(() => {
  //       this.loadComponent();
  //     }, 3000);
  //   }
}
