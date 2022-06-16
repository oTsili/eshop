import { Component, Input, OnInit } from '@angular/core';
import { DynamicDatabase } from 'src/app/header/dynamic-database';
import { navBarElement } from 'src/app/header/header.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() data: navBarElement[] | undefined = [];
  @Input() trigger = 'Trigger';
  @Input() isRootNode = false;

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
