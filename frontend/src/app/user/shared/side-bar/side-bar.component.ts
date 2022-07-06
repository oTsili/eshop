import { Component, OnInit } from '@angular/core';
import { AccordionService } from '../accordion/accordion.service';
import { PanelItem } from '../accordion/panel/panel-item';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  collapsing = false;
  panels: PanelItem[] = [];
  mainHeader = 'Φίλτρα';

  constructor(private accordionService: AccordionService) {}

  ngOnInit(): void {
    /**
     * get the accordion panels
     */
    this.panels = this.accordionService.getPanels();
  }
}
