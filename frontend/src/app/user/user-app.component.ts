import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { UserAppService } from './user-app.service';

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
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.userAppService.getModalListener().subscribe((response) => {
      console.log(response);
      this.toggleModal();
    });
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
          console.log(modalActions);
        },

        500
      );
    }
  }

  toggleActive() {
    this.mainActive = !this.mainActive;

    // select modal and change height, so that it contains signup form too
    const modalContent =
      document.body.querySelector<HTMLElement>('.ui.modal .content');
    const modalActions = document.body.querySelector<HTMLElement>(
      '.ui.modal .actions:not(.actions-default)'
    );
    if (this.mainActive) {
      this.renderer.setStyle(modalContent, 'height', 'auto');
      this.renderer.setStyle(modalActions, 'text-align', 'left');
      this.renderer.setStyle(modalActions, 'margin-left', '3%');
    } else {
      this.renderer.setStyle(modalContent, 'height', '36rem');
      this.renderer.setStyle(modalActions, 'text-align', 'right');
      this.renderer.setStyle(modalActions, 'margin-left', '0');
    }
    console.log(modalActions);
  }
}
