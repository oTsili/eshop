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
import { AuthService } from '../auth/auth.service';
import {
  FormControl,
  FormControlName,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../shared/products/products.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('.2s', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('.2s', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('slideOutIn', [
      transition(':enter', [
        style({ transform: 'translateX(0%)' }),
        animate('.2s', style({ transform: 'translateX(-100%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(-100%)' }),
        animate('.2s', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('slideUpDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('.3s', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate('.3s', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
  // animations: [
  //   trigger('openClose', [
  //     // ...
  //     state(
  //       'open',
  //       style({
  //         opacity: 1,
  //         // visibility: 'visible',
  //         // display: 'block',
  //       })
  //     ),
  //     state(
  //       'closed',
  //       style({
  //         opacity: 0,
  //         // visibility: 'hidden',
  //         // display: 'none',
  //       })
  //     ),
  //     transition('* => closed', [animate('1s')]),
  //     transition('* => open', [animate('0.5s')]),
  //   ]),
  // ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOpenSearchBox = false;
  initialData: navBarElement[];
  navBarElementsSubsciption: Subscription;
  changeLanguageSubscription: Subscription;
  authStatusListenerSubscription: Subscription;
  isLoggedInListenerSubscription: Subscription;
  activeLanguage: string;
  isOverList = false;
  numOfLinks: string;
  hamIsOpen = false;
  isOpenHamburgerMenu = false;
  isAuthenticated = false;
  search: string;

  constructor(
    private userAppService: UserAppService,
    private dynamicDatabase: DynamicDatabase,
    private headerService: HeaderService,
    private translate: TranslateService,
    private searchService: SearchService,
    private footerService: FooterService,
    private authService: AuthService,
    private productService: ProductsService,
    private appService: AppService,
    private router: Router
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    // this.theSearchForm = new FormGroup({
    //   search: new FormControl(null),
    // });

    // subscribe to authStatus listener
    this.authStatusListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe({
        next: (response) => {
          console.log('logout listener');
          // http request to get auth status
          this.isLoggedInListenerSubscription = this.authService
            .isAuthenticated()
            .subscribe({
              next: (response) => {
                this.isAuthenticated = response;
                console.log({ isAuth: this.isAuthenticated });
              },
              error: (response) => {
                console.log(response);
                if (response.error.statusCode === 401) {
                  this.isAuthenticated = false;
                }
                console.log({ isAuth: this.isAuthenticated });
              },
            });
        },
        error: (error) => {
          console.error(error);
          this.isAuthenticated = false;
          console.log({ isAuth: this.isAuthenticated });
        },
      });

    // save current language
    this.activeLanguage = this.translate.currentLang;
    this.appService.selectedLanguage = this.activeLanguage;

    // get translate language and subscribe
    this.changeLanguageSubscription = this.appService
      .getLanguageChangeListener()
      .subscribe((response) => {
        this.translate.use(response);
        this.appService.selectedLanguage = response;
      });

    this.preloadNavBarElements();
  }

  ngOnDestroy(): void {
    this.authStatusListenerSubscription.unsubscribe();
    this.isLoggedInListenerSubscription.unsubscribe();
    this.changeLanguageSubscription.unsubscribe();
    this.navBarElementsSubsciption.unsubscribe();
  }

  onSubmitSearch() {
    console.log({ input: this.search });
    this.router.navigate(['/search'], {
      queryParams: { description: this.search },
      queryParamsHandling: 'merge',
    });
    // const search = this.search
    //   .normalize('NFD')
    //   .replace(/[\u0300-\u036f]/g, '');
    // console.log({ search });

    // initialize the state of the no products message
    this.productService.onUpdateNoProductsMessage(false);
    // update the page header "Search For ..."
    this.searchService.onUpdateSearchQueryHeader(this.search);

    // update the products in the catalog if already in the page and
    // not navigated by the code in the beggining.
    const url = this.router.url.split('/')[1];
    console.log({ url });
    if (url === 'search') {
      this.productService.onProductsUpdate(
        { description: this.search },
        { key: 'description', value: this.search }
      );
    }
  }

  updateHamburgerStatus(event: MouseEvent) {
    console.log(event);
    this.isOpenHamburgerMenu = !this.isOpenHamburgerMenu;
    console.log(this.isOpenHamburgerMenu);

    this.headerService.onHamburgerStatusChange(this.isOpenHamburgerMenu, event);
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
    this.appService.onLanguageChange(language);
  }

  onTest() {
    this.headerService.onTest();
  }

  onTestAuth() {
    console.log('testAuth');
    this.authService.isAuthenticated().subscribe((response) => {
      console.log(response);
    });
  }

  onLogout() {
    console.log('logout');
    this.authService.logout().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
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
