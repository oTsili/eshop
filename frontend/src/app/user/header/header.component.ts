import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DynamicDatabase } from './dynamic-database';
import { navBarElement } from './header.interfaces';
import { HeaderService } from './header.service';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { SearchService } from '../search/search.service';
import { FooterService } from '../footer/footer.service';
import { UserAppService } from '../user-app.service';

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
  activeLanguage: string;

  constructor(
    private userAppService: UserAppService,
    private dynamicDatabase: DynamicDatabase,
    private headerService: HeaderService,
    private translate: TranslateService,
    private searchService: SearchService,
    private footerService: FooterService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    this.activeLanguage = this.translate.currentLang;
    console.log(this.activeLanguage);

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

  openLoginModal(){
    this.userAppService.onToggleModal();
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
  /**
   * calls service functions of each component that needs translation, and wich have
   * listeners which we trigger with click on each language link in the template en | el
   * @param language
   */
  useLanguage(language: string): void {
    // update activeLanguage variable
    this.activeLanguage = language;

    // inform the listeners for language change
    this.headerService.onLanguageChange(language);
    this.searchService.onLanguageChange(language);
    this.footerService.onLanguageChange(language);
  }
}
