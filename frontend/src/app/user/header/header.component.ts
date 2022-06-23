import { Component, OnInit } from '@angular/core';
import { DynamicDatabase } from './dynamic-database';
import { navBarElement } from './header.interfaces';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isActiveClassEnabled = false;
  initialData: navBarElement[];
  constructor(
    // private database: DynamicDatabase,
    private headerService: HeaderService
  ) {
    // this.initialData = this.database.navBarElements;
    // this.preloadNavBarElements();
  }

  ngOnInit(): void {
    this.preloadNavBarElements();
  }

  preloadNavBarElements() {
    this.headerService.getNavBarElements().subscribe((response) => {
      let tempData = response.navBarElement;
      tempData = this.sortArr(tempData);

      this.initialData = tempData;
    });
  }

  sortArr(array: navBarElement[]) {
    array.sort((a, b) => {
      return a.position! - b.position!;
    });

    return array;
  }

  toggleActiveClass() {
    this.isActiveClassEnabled = !this.isActiveClassEnabled;
    console.log(this.isActiveClassEnabled);
  }
}
