import { Component, Input } from '@angular/core';

import { Panel } from './panel.interface';

@Component({
  templateUrl: './panel.component.html',
})
export class PanelComponent implements Panel {
  @Input() data: any;
}
