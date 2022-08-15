import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Breadcrumb } from './breadcrumb.interfaces';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() breadcrumbs: Breadcrumb[];
  changeLanguageSubscription: Subscription;
  @Output() breadcrumbUpdate: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translate: TranslateService,
    private appService: AppService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    // get translate language and subscribe
    this.changeLanguageSubscription = this.appService
      .getLanguageChangeListener()
      .subscribe((response) => {
        this.translate.use(response);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.breadcrumbs = changes['breadcrumbs'].currentValue;
  }

  onBreadcrumbNavigate(url: string) {
    this.breadcrumbUpdate.emit(url);
  }
}
