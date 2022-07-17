import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SideBarService } from '../shared/side-bar/side-bar.service';
import { DynamicDatabase } from './dynamic-database';
import { navBarElement } from './header.interfaces';
import { HeaderService } from './header.service';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isActiveClassEnabled = false;
  initialData: navBarElement[];
  navBarElementsSubsciption: Subscription;
  changeLanguageSubscription: Subscription;

  constructor(
    private dynamicDatabase: DynamicDatabase,
    private headerService: HeaderService,
    private sideBarService: SideBarService,
    private translate: TranslateService,
    private searchService: SearchService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    // get translate language and subscribe
    this.changeLanguageSubscription = this.headerService
      .getLanguageChangeListener()
      .subscribe((response) => {
        console.log(response);
        this.translate.use(response);
      });

    this.preloadNavBarElements();
  }

  ngOnDestroy(): void {
    this.navBarElementsSubsciption.unsubscribe();
    this.changeLanguageSubscription.unsubscribe();
  }

  preloadNavBarElements() {
    this.navBarElementsSubsciption = this.headerService
      .getNavBarElements()
      .subscribe((response) => {
        console.log(response);
        this.initialData = response.navBarElement;
        this.dynamicDatabase.navBarElements = this.initialData;
      });
  }

  toggleActiveClass() {
    this.isActiveClassEnabled = !this.isActiveClassEnabled;
  }

  useLanguage(language: string): void {
    this.headerService.onLanguageChange(language);
    this.searchService.onLanguageChange(language);
  }
}
