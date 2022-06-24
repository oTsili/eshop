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
      this.initialData = response.navBarElement;
    });
  }

  toggleActiveClass() {
    this.isActiveClassEnabled = !this.isActiveClassEnabled;
    console.log(this.isActiveClassEnabled);
  }
}
