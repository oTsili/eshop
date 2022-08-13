import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserAppService } from './user-app.service';

import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { HeaderService } from './header/header.service';
import { SignupService } from './header/signup/signup.service';
import { LoginService } from './header/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.scss'],
})
export class UserAppComponent implements OnInit, OnDestroy {
  modalOpen = false;
  mainActive = true;
  modalSubsciption: Subscription;
  withWarning=false;

  constructor(
    private userAppService: UserAppService,
    private renderer: Renderer2,
    private translate: TranslateService,
    private cd: ChangeDetectorRef,
    private signupService: SignupService,
    private loginService: LoginService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    this.modalSubsciption = this.userAppService
      .getModalListener()
      .subscribe((response) => {
        this.withWarning = response;
        this.toggleModal();
      });
  }

  ngOnDestroy(): void {
    this.modalSubsciption.unsubscribe();
  }

  /**
   * toggle between modal states (i.e. open, closed) and set some styles
   */
  toggleModal() {
    this.modalOpen = !this.modalOpen;

    this.cd.detectChanges();
  }
  /**
   * toggle between signup and login form in the modal and change
   * their corrsponding style (e.g. style)
   */
  toggleActive() {
    this.mainActive = !this.mainActive;

    // select modal and change height, so that it contains signup form too
    const modalContent = document.body.querySelector<HTMLElement>(
      '.ui.modal .content-default'
    );
    const modalFooterButton = document.body.querySelector<HTMLElement>(
      '.ui.modal .actions:not(.actions-default)'
    );
    if (this.mainActive) {
      // this.renderer.setStyle(modalContent, 'height', 'auto');
      this.renderer.setStyle(modalFooterButton, 'text-align', 'left');
      this.renderer.setStyle(modalFooterButton, 'margin-left', '3%');
    } else {
      // this.renderer.setStyle(modalContent, 'height', '36rem');
      this.renderer.setStyle(modalFooterButton, 'text-align', 'right');
      this.renderer.setStyle(modalFooterButton, 'margin-left', '0');
      this.renderer.setStyle(modalFooterButton, 'margin-right', '3%');
    }
  }
  /**
   * onClick methods to submit the forms, because these buttons, are
   * outside the form and more specifically outside the component where
   * the form has put.
   */
  onSubmitSignup() {
    this.signupService.onSubmit();
  }
  onSubmitLogin() {
    this.loginService.onSubmit();
  }
}
