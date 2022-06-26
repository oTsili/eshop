import { Injectable } from '@angular/core';
import { PanelItem } from './panel/panel';
import { PanelComponent } from './panel/panel.component';

@Injectable({
  providedIn: 'root',
})
export class AccordionService {
  getPanels() {
    return [
      new PanelItem(PanelComponent, {
        header: 'Bombasto',
        comp: 'Brave as they come',
      }),
      new PanelItem(PanelComponent, {
        header: 'Dr IQ',
        comp: 'Smart as they come',
      }),
      new PanelItem(PanelComponent, {
        header: 'Hiring for several positions',
        comp: 'Submit your resume today!',
      }),
      new PanelItem(PanelComponent, {
        header: 'Openings in all departments',
        comp: 'Apply today',
      }),
    ];
  }
}
