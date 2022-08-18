import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContentListComponent } from '../side-bar/content-list/content-list.component';
import { DoubleSliderComponent } from '../side-bar/double-slider/double-slider.component';
import { ResponsiveBoxesComponent } from '../side-bar/responsive-boxes/responsive-boxes.component';
import { PanelItem } from './host-panel/host-panel-item.class';
import { TextPanelComponent } from './panels/EXAMPLE-text-panel/text-panel.component';

@Injectable({
  providedIn: 'root',
})
export class AccordionService {
  private accordionPanels;

  constructor() {}

  set panels(panels) {
    this.accordionPanels = panels;
  }

  get panels() {
    return this.accordionPanels;
  }

  /**
   * A function to create an array of componnents
   * @returns the array of components, that will be  used and rendered by accordion componnet
   */

  getAccordionPanels() {
    return [
      new PanelItem(ResponsiveBoxesComponent, {
        header: 'color',
        show_text: false,
        elementList: environment.COLOR_LIST,
        // comp: 'Brave as they come',
      }),
      new PanelItem(ContentListComponent, {
        header: 'heel height',
        // comp: 'Smart as they come',
        elementList: environment.HEEL_LIST,
      }),
      new PanelItem(ResponsiveBoxesComponent, {
        header: 'size',
        show_text: true,
        elementList: environment.SIZE_LIST,
      }),
      new PanelItem(DoubleSliderComponent, {
        header: 'price',
        // comp: 'Apply today',
      }),
      new PanelItem(ContentListComponent, {
        header: 'sales',
        elementList: environment.SALES_LIST,
      }),

      new PanelItem(ContentListComponent, {
        header: 'material',
        elementList: environment.MATERIAL_LIST,
      }),
    ];
  }
}
// getAccordionPanels() {
//   return [
//     new PanelItem(TextPanelComponent, {
//       title: 'What is a dog?',
//       content:
//         'A dog is a type of domesticated animal. Known for its loyalty andfaithfulness, it can be found as a welcome guest in many households across the world.',
//     }),
//     new PanelItem(TextPanelComponent, {
//       title: 'What is my name?',
//       content:
//         'Sunt elit et et cupidatat elit id cupidatat tempor incididunt. Nostrud tempor mollit id sunt elit fugiat nostrud consequat veniam elit ea. Aliquip et incididunt reprehenderit mollit id culpa duis elit nulla Lorem ad. Excepteur elit aute tempor anim eu amet anim id labore sint deserunt. Qui voluptate dolore cupidatat cupidatat id laboris qui ea labore.',
//     }),
//     new PanelItem(TextPanelComponent, {
//       title: 'Something nice',
//       content:
//         'Culpa esse sit ea occaecat in irure aliqua adipisicing consectetur. In fugiat amet culpa commodo non velit minim ad quis. Tempor labore proident aliqua dolore laborum irure. Exercitation voluptate cillum veniam ea in commodo consectetur ex ex. Aliqua irure ex eiusmod sit ad. Ullamco cillum aliquip eiusmod est nisi laborum officia. Officia enim ea cupidatat ullamco proident qui nulla sunt.',
//     }),
//   ];
// }
