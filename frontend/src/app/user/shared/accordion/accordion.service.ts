import { Injectable } from '@angular/core';
import { ColorSelectorComponent } from '../side-bar/color-selector/color-selector.component';
import { ContentListComponent } from '../side-bar/content-list/content-list.component';
import { DoubleSliderComponent } from '../side-bar/double-slider/double-slider.component';
import { GridBoxesComponent } from '../side-bar/grid-boxes/grid-boxes.component';
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
      new PanelItem(ColorSelectorComponent, {
        header_el: 'ΧΡΩΜΑ',
        header_en: 'color',

        elementList: [
          { text_en: 'red', text_el: 'ΚΟΚΚΙΝΟ' },
          { text_en: 'blue', text_el: 'ΜΠΛΕ' },
          { text_en: 'green', text_el: 'ΠΡΑΣΙΝΟ' },
          { text_en: 'white', text_el: 'ΑΣΠΡΟ' },
          { text_en: 'beige', text_el: 'ΜΠΕΖ' },
          { text_en: 'brown', text_el: 'ΚΑΦΕ' },
          { text_en: 'yellow', text_el: 'ΚΙΤΡΙΝΟ' },
          { text_en: 'pink', text_el: 'ΡΟΖ' },
          { text_en: 'mocha', text_el: 'ΜΟΚΑ' },
          { text_en: 'purple', text_el: 'ΜΩΒ' },
          { text_en: 'orange', text_el: 'ΠΟΡΤΟΚΑΛΙ' },
        ],
        // comp: 'Brave as they come',
      }),
      new PanelItem(ContentListComponent, {
        header_el: 'ΥΨΟΣ ΤΑΚΟΥΝΙΟΥ',
        header_en: 'heelHeight',
        // comp: 'Smart as they come',
        elementList: [
          { text_el: 'ΧΑΜΗΛΟ (3-5CM)', text_en: 'low (3-5CM)' },
          { text_el: 'ΜΕΣΑΙ0 (6-9CM)', text_en: 'medium (6-9CM)' },
          { text_el: 'ΨΗΛΟ (10-12CM)', text_en: 'high (10-12CM)' },
        ],
      }),
      new PanelItem(GridBoxesComponent, {
        header_el: 'ΜΕΓΕΘΟΣ',
        header_en: 'size',
        // comp: 'Submit your resume today!',
      }),
      new PanelItem(DoubleSliderComponent, {
        header_el: 'ΤΙΜΗ',
        header_en: 'price',
        // comp: 'Apply today',
      }),
      new PanelItem(ContentListComponent, {
        header_el: 'ΕΚΠΤΩΣΗ',
        header_en: 'sales',

        elementList: [
          { text_el: 'Εώς 10', text_en: 'up to 10' },
          { text_el: '10 - 20', text_en: '10 - 20' },
          { text_el: '20 - 30', text_en: '20 - 30' },
          { text_el: '30 - 40', text_en: '30 - 40' },
          { text_el: '50 - 60', text_en: '50 - 60' },
          { text_el: '70 - 80', text_en: '70 - 80' },
          { text_el: '80 και άνω', text_en: '80 and above' },
        ],
      }),

      new PanelItem(ContentListComponent, {
        header_el: 'ΥΛΙΚΟ',
        header_en: 'material',

        elementList: [
          { text_el: 'ΣΥΝΘΕΤΙΚΟ ΔΕΡΜΑ', text_en: 'synthetic leather' },
          { text_el: 'ΣΥΝΘΕΤΙΚΟ ΣΟΥΕΤ', text_en: 'SYNTHETIC SUEDE' },
          { text_el: 'ΥΦΑΣΜΑ', text_en: 'Textile' },
          { text_el: 'PONY SKIN', text_en: 'PONY SKIN' },
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
