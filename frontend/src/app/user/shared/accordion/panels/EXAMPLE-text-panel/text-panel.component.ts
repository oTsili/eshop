import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleAccordionDirective } from '../../directives/toggle-accordion.directive';
import { PanelsService } from '../panels.service';

@Component({
  selector: 'app-text-panel',
  templateUrl: './text-panel.component.html',
  styleUrls: ['./text-panel.component.scss'],
})
export class TextPanelComponent implements OnInit {
  @Input() data: any;

  title!: string;
  content!: string;

  constructor(private panelsService: PanelsService) {}

  ngOnInit(): void {
    // provide the input date to the template
    const { title, content } = this.data;
    // this.title = title;
    this.content = content;
  }
}
