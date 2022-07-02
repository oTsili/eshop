import { Component, Input } from '@angular/core';

import { Panel } from './panel-item.interface';

@Component({
  templateUrl: './panel-item.component.html',
})
export class PanelComponent implements Panel {
  @Input() data: any;
}
