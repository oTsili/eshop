import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
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

@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.scss'],
})
export class UserAppComponent implements OnInit {
  modalOpen = false;
  mainActive = true;

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
    this.userAppService.getModalListener().subscribe((response) => {
      this.toggleModal();
    });
  }

  onSubmitSignup() {
    this.signupService.onSubmit();
  }
  onSubmitLogin() {
    this.loginService.onSubmit();
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;

    // if the modal is open set some styling to the footer button
    if (this.modalOpen) {
      setTimeout(
        () => {
          const modalActions = document.body.querySelector<HTMLElement>(
            '.ui.modal .actions:not(.actions-default)'
          );

          this.renderer.setStyle(modalActions, 'text-align', 'left');
          this.renderer.setStyle(modalActions, 'margin-left', '3%');
        },

        10
      );
    }
    this.cd.detectChanges();
  }

  toggleActive() {
    this.mainActive = !this.mainActive;

    // select modal and change height, so that it contains signup form too
    const modalContent =
      document.body.querySelector<HTMLElement>('.ui.modal .content');
    const modalFooterButton = document.body.querySelector<HTMLElement>(
      '.ui.modal .actions:not(.actions-default)'
    );
    if (this.mainActive) {
      this.renderer.setStyle(modalContent, 'height', 'auto');
      this.renderer.setStyle(modalFooterButton, 'text-align', 'left');
      this.renderer.setStyle(modalFooterButton, 'margin-left', '3%');
    } else {
      this.renderer.setStyle(modalContent, 'height', '36rem');
      this.renderer.setStyle(modalFooterButton, 'text-align', 'right');
      this.renderer.setStyle(modalFooterButton, 'margin-left', '0');
      this.renderer.setStyle(modalFooterButton, 'margin-right', '3%');
    }
  }
}
