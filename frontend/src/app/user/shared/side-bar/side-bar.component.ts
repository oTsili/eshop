import { Component, OnInit } from '@angular/core';
import { AccordionService } from '../accordion/accordion.service';
import { PanelItem } from '../accordion/panel/panel-item';
import { DynamicDatabase } from './dynamic-database';
import { SideBar } from './side-bar.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  sidebar: SideBar;
  collapsing = false;
  panels: PanelItem[] = [];

  constructor(
    private dynamicDatabase: DynamicDatabase,
    private accordionService: AccordionService
  ) {}

  ngOnInit(): void {
    this.sidebar = this.dynamicDatabase.sidebar;
    /**
     * get the accordion panels
     */
    this.panels = this.accordionService.getPanels();
  }
}
