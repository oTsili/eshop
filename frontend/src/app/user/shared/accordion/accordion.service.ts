import { Injectable } from '@angular/core';
import { ColorSelectorComponent } from '../side-bar/color-selector/color-selector.component';
import { ContentListComponent } from '../side-bar/content-list/content-list.component';
import { DoubleSliderComponent } from '../side-bar/double-slider/double-slider.component';
import { GridBoxesComponent } from '../side-bar/grid-boxes/grid-boxes.component';
import { PanelItem } from './panel/panel';
import { PanelComponent } from './panel/panel.component';

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
      new PanelItem(ColorSelectorComponent, {
        // header: 'Bombasto',
        // comp: 'Brave as they come',
      }),
      new PanelItem(ContentListComponent, {
        // header: 'Dr IQ',
        // comp: 'Smart as they come',
        elementList: [
          { text: 'ΧΑΜΗΛΟ (3-5CM)' },
          { text: 'ΜΕΣΑΙ0 (6-9CM)' },
          { text: 'ΨΗΛΟ (10-12CM)' },
        ],
      }),
      new PanelItem(GridBoxesComponent, {
        // header: 'Hiring for several positions',
        // comp: 'Submit your resume today!',
      }),
      new PanelItem(DoubleSliderComponent, {
        // header: 'Openings in all departments',
        // comp: 'Apply today',
      }),
      new PanelItem(ContentListComponent, {
        header: 'Openings in all departments',

        elementList: [
          { text: 'Εώς 10' },
          { text: '10 - 20' },
          { text: '20 - 30' },
          { text: '30 - 40' },
          { text: '50 - 60' },
          { text: '70 - 80' },
          { text: '80 και άνω' },
        ],
      }),

      new PanelItem(ContentListComponent, {
        header: 'Openings in all departments',

        elementList: [
          { text: 'ΣΥΝΘΕΤΙΚΟ ΔΕΡΜΑ' },
          { text: 'ΣΥΝΘΕΤΙΚΟ ΣΟΥΕΤ' },
          { text: 'ΥΦΑΣΜΑ' },
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
