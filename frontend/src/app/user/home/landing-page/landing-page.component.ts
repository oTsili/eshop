import { Component, OnInit } from '@angular/core';
import { UserAppService } from '../../user-app.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private userAppService: UserAppService) {}

  ngOnInit(): void {
    this.userAppService.onDisableHeaderAndFooter(false);
  }
}
