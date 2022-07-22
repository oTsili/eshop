import { Component, OnInit } from '@angular/core';
import { UserAppService } from './user-app.service';

@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css'],
})
export class UserAppComponent implements OnInit {
  modalOpen = false;

  constructor(private userAppService: UserAppService) {}

  ngOnInit(): void {
    this.userAppService.getModalListener().subscribe((response) => {
      console.log(response);
      this.toggleModal();
    });
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
}
