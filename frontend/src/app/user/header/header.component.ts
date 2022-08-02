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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          visibility: 'visible',
          display: 'block',
        })
      ),
      state(
        'closed',
        style({
          visibility: 'hidden',
          display: 'none',
        })
      ),
      transition('* => closed', [animate('1s')]),
      transition('* => open', [animate('0.5s')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOpenSearchBox = false;
  initialData: navBarElement[];
  navBarElementsSubsciption: Subscription;
  changeLanguageSubscription: Subscription;
  activeLanguage: string;
  isOverList = false;
  numOfLinks: string;
  hamIsOpen = false;

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
    this.headerService.selectedLanguage = this.activeLanguage;

    // get translate language and subscribe
    this.changeLanguageSubscription = this.headerService
      .getLanguageChangeListener()
      .subscribe((response) => {
        this.translate.use(response);
        this.headerService.selectedLanguage = response;
      });

    this.preloadNavBarElements();
  }

  ngOnDestroy(): void {
    this.navBarElementsSubsciption.unsubscribe();
    this.changeLanguageSubscription.unsubscribe();
  }

  openLoginModal() {
    this.userAppService.onToggleModal();
  }

  preloadNavBarElements() {
    this.navBarElementsSubsciption = this.headerService
      .getNavBarElements()
      .subscribe((response) => {
        this.initialData = response.navBarElement;
        // save the class for the header links to be added as class
        this.numOfLinks = this.numToWord(this.initialData.length);
        // save to the local dynamic "db"
        this.dynamicDatabase.navBarElements = this.initialData;
      });
  }

  toggleSearchBox() {
    this.isOpenSearchBox = !this.isOpenSearchBox;
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

  onTest() {
    this.headerService.onTest();
  }

  isExpandable(node: navBarElement): boolean {
    if (node.subNavBarElements?.length! > 0) {
      return true;
    }
    return false;
  }

  numToWord(num: number): string {
    const library = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten',
    };

    return library[num];
  }
}
