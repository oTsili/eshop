import { Component, OnInit } from '@angular/core';
import { DynamicDatabase } from './dynamic-database';
import { SideBar } from './side-bar.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  sidebar: SideBar;

  constructor(private dynamicDatabase: DynamicDatabase) {}

  ngOnInit(): void {
    this.sidebar = this.dynamicDatabase.sidebar;
  }
}
