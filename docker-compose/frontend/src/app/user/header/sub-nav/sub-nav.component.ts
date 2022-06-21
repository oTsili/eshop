import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { DynamicDatabase } from '../dynamic-database';
import { navBarElement } from '../header.interfaces';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.css'],
})
export class SubNavComponent implements OnInit {
  @Input() data: navBarElement[] | undefined = [];
  @Input() trigger = 'Trigger';
  @Input() isRootNode = false;
  @Input() text: string;
  @ContentChild(TemplateRef) public inputElement: TemplateRef<any>;

  constructor(private database: DynamicDatabase) {}

  ngOnInit(): void {}

  isExpandable(node: navBarElement): boolean {
    // console.log(!!node.subNavBarElements);
    return !!node.subNavBarElements;
  }

  getData(nodeText: string) {
    for (let element of this.database.navBarElements) {
      if (element.text === nodeText) {
        this.data = element.subNavBarElements;
      }
    }
  }
}