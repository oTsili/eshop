import { Injectable } from '@angular/core';
import { ColorSelectorComponent } from '../side-bar/color-selector/color-selector.component';
import { ContentListComponent } from '../side-bar/content-list/content-list.component';
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
        header: 'Bombasto',
        comp: 'Brave as they come',
      }),
      new PanelItem(ContentListComponent, {
        header: 'Dr IQ',
        comp: 'Smart as they come',
      }),
      new PanelItem(GridBoxesComponent, {
        header: 'Hiring for several positions',
        comp: 'Submit your resume today!',
      }),
      new PanelItem(PanelComponent, {
        header: 'Openings in all departments',
        comp: 'Apply today',
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
