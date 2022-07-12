import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SideBarService } from '../shared/side-bar/side-bar.service';
import { DynamicDatabase } from './dynamic-database';
import { navBarElement } from './header.interfaces';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isActiveClassEnabled = false;
  initialData: navBarElement[];
  navBarElementsSubsciption: Subscription;

  constructor(
    private dynamicDatabase: DynamicDatabase,
    private headerService: HeaderService,
    private sideBarService: SideBarService
  ) {}

  ngOnInit(): void {
    this.preloadNavBarElements();
  }

  ngOnDestroy(): void {
    this.navBarElementsSubsciption.unsubscribe();
  }

  preloadNavBarElements() {
    this.navBarElementsSubsciption = this.headerService
      .getNavBarElements()
      .subscribe((response) => {
        this.initialData = response.navBarElement;
        this.dynamicDatabase.navBarElements = this.initialData;
      });
  }

  toggleActiveClass() {
    this.isActiveClassEnabled = !this.isActiveClassEnabled;
  }

  useLanguage(language: string): void {
    console.log(language);
    this.sideBarService.onLaguageChange(language);
  }
}
