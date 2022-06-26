import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { AccordionService } from './accordion.service';

import { AccordionItem } from './directives/accordion-item.directive';
import { AccordionDirective } from './directives/accordion.directive';
import { PanelItem } from './panel/panel';
import { Panel } from './panel/panel.interface';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contentExpansion', [
      state(
        'expanded',
        style({ height: '*', opacity: 1, visibility: 'visible' })
      ),
      state(
        'collapsed',
        style({ height: '0px', opacity: 0, visibility: 'hidden' })
      ),
      transition(
        'expanded <=> collapsed',
        animate('200ms cubic-bezier(.37,1.04,.68,.98)')
      ),
    ]),
  ],
})
export class AccordionComponent implements OnInit {
  @Input() panels: PanelItem[] = [];
  @ViewChild(AccordionDirective, { static: true })
  panelHost!: AccordionDirective;
  panelIdx = 0;
  panelIndex = -1;

  // @ViewChild('accordion_item') accordion_item: ElementRef;
  expanded = new Set<number>();
  /**
   * Decides if the single item will be open at once or not.
   * In collapsing mode, toggling one would collapse others
   */
  @Input() collapsing = true;

  @ContentChildren(AccordionItem) items: QueryList<AccordionItem>;

  constructor(private accordionService: AccordionService) {}

  ngOnInit(): void {
    this.loadComponent();
  }
  /**
   * Make the toggle function available to be called from
   * outside.
   * Memoize to prevent extra calls
   * @param index - index of the accordion item
   */
  getToggleState = (index: number) => {
    return this.toggleState.bind(this, index);
  };

  toggleState = (index: number) => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  };

  loadComponent() {
    // this.panelIndex = (this.panelIndex + 1) % this.panels.length;
    // this.panelIndex = this.index;
    this.panelIndex = this.accordionService.getIndex();
    this.accordionService.increaseIndex();

    const panelItem = this.panels[this.panelIndex];
    const viewContainerRef = this.panelHost.viewContainerRef;

    viewContainerRef.clear();
    if (panelItem) {
      const componentRef = viewContainerRef.createComponent<Panel>(
        panelItem.component
      );

      componentRef.instance.data = panelItem.data;
    }
  }
}
