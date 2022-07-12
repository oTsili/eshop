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
        header: 'COLOR',
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
        header: 'HEEL HEIGHT',
        // comp: 'Smart as they come',
        elementList: [
          { text: 'LOW (3-5CM)' },
          { text: 'MEDIUM (6-9CM)' },
          { text: 'HIGH (10-12CM)' },
        ],
      }),
      new PanelItem(ResponsiveBoxesComponent, {
        header: 'SIZE',
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
        header: 'PRICE',
        // comp: 'Apply today',
      }),
      new PanelItem(ContentListComponent, {
        header: 'SALES',
        elementList: [
          { text: 'UP TO 10' },
          { text: '10 - 20' },
          { text: '20 - 30' },
          { text: '30 - 40' },
          { text: '50 - 60' },
          { text: '70 - 80' },
          { text: '80 AND ABOVE' },
        ],
      }),

      new PanelItem(ContentListComponent, {
        header: 'MATERIAL',
        elementList: [
          { text: 'SYNTHETIC LEATHER' },
          { text: 'SYNTHETIC SUEDE' },
          { text: 'TEXTILE' },
          { text: 'PONY SKIN' },
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
