import { Component, OnInit } from '@angular/core';
import { DynamicDatabase } from './dynamic-database';
import { navBarElement } from './header.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  initialData: navBarElement[];
  constructor(private database: DynamicDatabase) {
    this.initialData = this.database.navBarElements;
  }

  ngOnInit(): void {}
}
