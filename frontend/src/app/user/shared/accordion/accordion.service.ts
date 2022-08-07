import { Injectable } from '@angular/core';
import { ContentListComponent } from '../side-bar/content-list/content-list.component';
import { DoubleSliderComponent } from '../side-bar/double-slider/double-slider.component';
import { ResponsiveBoxesComponent } from '../side-bar/responsive-boxes/responsive-boxes.component';
import { PanelItem } from './host-panel/host-panel-item.class';
import { TextPanelComponent } from './panels/EXAMPLE-text-panel/text-panel.component';

@Injectable({
  providedIn: 'root',
})
export class AccordionService {
  accordionPanels;

  constructor() {}

  set panels(panels) {
    this.accordionPanels = panels;
  }

  get panels() {
    return this.accordionPanels;
  }

  // /**
  //  * A function to create an array of componnents
  //  * @returns the array of components, that will be  used and rendered by accordion componnet
  //  */

  getAccordionPanels() {
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
