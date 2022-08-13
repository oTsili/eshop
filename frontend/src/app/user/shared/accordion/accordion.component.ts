import {
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Panel } from './accordion.interfaces';
import { AccordionService } from './accordion.service';
import { PanelHostDirective } from './directives/panel-host.directive';
import { PanelItemDirective } from './directives/panel-item-directives/panel-template-item.directive';
import { PanelItem } from './host-panel/host-panel-item.class';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit, OnChanges {
  @Input() index: number;
  accordionPanels: PanelItem[] = [];
  // Keep track of the view from the elements queried with panelHost directive
  @ViewChild(PanelHostDirective, { static: true })
  panelHost!: PanelHostDirective;
  // because we use *ngFor, and keep track of the vewChanges of ContentChildren
  @ContentChildren(PanelItemDirective)
  items!: QueryList<PanelItemDirective>;

  constructor(private accordionService: AccordionService) {}

  ngOnInit(): void {
    this.accordionService.panels = this.accordionService.getAccordionPanels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const index = changes['index'].currentValue;
    this.loadComponent(index);
  }

  loadComponent(index: number) {
    /**
     * Create a view container where we will insert our
     * newlly created compnent
     */
    const panelItem = this.accordionService.panels[index];
    const viewContainerRef = this.panelHost.viewContainerRef;

    /**
     * Here we do not want to clear the viewContainerRef because we do not want to take
     * the place of the previous component, but stack one on another
     */

    viewContainerRef.clear();

    // create the new component
    const componentRef = viewContainerRef.createComponent<Panel>(
      panelItem.component
    );
    // pass the data from provided from the accordion service
    componentRef.instance.data = panelItem.data;
  }
}
