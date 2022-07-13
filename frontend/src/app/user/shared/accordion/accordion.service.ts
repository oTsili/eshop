import { Injectable } from '@angular/core';
import { ResponsiveBoxesComponent } from '../side-bar/responsive-boxes/responsive-boxes.component';
import { ContentListComponent } from '../side-bar/content-list/content-list.component';
import { DoubleSliderComponent } from '../side-bar/double-slider/double-slider.component';
import { PanelItem } from './panel/panel-item';
import { PanelComponent } from './panel/panel-item.component';

@Injectable({
  providedIn: 'root',
})
export class AccordionService {
  index = -1;
  /**
   * A function to create an array of componnents
   * @returns the array of components, that will be  used and rendered by accordion componnet
   */
  getPanels() {
    return [
      new PanelItem(ResponsiveBoxesComponent, {
        header: 'color',
        show_text: false,
        elementList: [
          { text: 'red' },
          { text: 'blue' },
          { text: 'green' },
          { text: 'white' },
          { text: 'beige' },
          { text: 'brown' },
          { text: 'yellow' },
          { text: 'pink' },
          { text: 'mocha' },
          { text: 'purple' },
          { text: 'orange' },
        ],
        // comp: 'Brave as they come',
      }),
      new PanelItem(ContentListComponent, {
        header: 'heel height',
        // comp: 'Smart as they come',
        elementList: [
          { text: 'low (3-5CM)' },
          { text: 'medium (6-9CM)' },
          { text: 'high (10-12CM)' },
        ],
      }),
      new PanelItem(ResponsiveBoxesComponent, {
        header: 'size',
        show_text: true,
        elementList: [
          { text: '36' },
          { text: '37' },
          { text: '38' },
          { text: '39' },
          { text: '40' },
        ],
      }),
      new PanelItem(DoubleSliderComponent, {
        header: 'price',
        // comp: 'Apply today',
      }),
      new PanelItem(ContentListComponent, {
        header: 'sales',
        elementList: [
          { text: 'up to 10' },
          { text: '10 - 20' },
          { text: '20 - 30' },
          { text: '30 - 40' },
          { text: '50 - 60' },
          { text: '70 - 80' },
          { text: '80 and above' },
        ],
      }),

      new PanelItem(ContentListComponent, {
        header: 'material',
        elementList: [
          { text: 'synthetic leather' },
          { text: 'synthetic suede' },
          { text: 'textile' },
          { text: 'pony skin' },
        ],
      }),
    ];
  }

  increaseIndex() {
    this.index = this.index + 1;
  }

  getIndex() {
    return this.index;
  }
}
