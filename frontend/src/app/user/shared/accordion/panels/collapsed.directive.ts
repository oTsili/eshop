import { AfterContentInit, Directive, Input, OnInit } from '@angular/core';
import { PanelsService } from './panels.service';

@Directive({
  selector: '[isCollapsed]',
})
export class PanelCollapseDirective implements OnInit, AfterContentInit {
  @Input() isCollapsedString!: string;
  isCollapsed = false;

  constructor(private panelsService: PanelsService) {}

  ngOnInit(): void {}
  ngAfterContentInit(): void {
    this.isCollapsed = !!this.isCollapsedString;
    this.panelsService.onUpdateCollapse(this.isCollapsed);
  }
}
