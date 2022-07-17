import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { DynamicDatabase } from '../dynamic-database';
import { navBarElement } from '../header.interfaces';
import { HeaderService } from '../header.service';

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

  ngOnInit(): void {
    console.log(this.data);
  }

  isExpandable(node: navBarElement): boolean {
    if (node.subNavBarElements?.length! > 0) {
      return true;
    }
    return false;
  }

  getData(nodeText: string) {
    for (let element of this.database.navBarElements) {
      if (element.text === nodeText) {
        this.data = element.subNavBarElements;
      }
    }
  }
}
