import { Component, Input } from '@angular/core';
import { Item } from '../item/item.interface';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{ data.headline }}</h4>
      {{ data.body }}
    </div>
  `,
})
export class HeroJobAdComponent implements Item {
  @Input() data: any;
}
