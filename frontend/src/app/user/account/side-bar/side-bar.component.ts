import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarElement } from './side-bar.interfaces';
import { SidebarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  @Output() navigate = new EventEmitter();

  sidebarElements: SidebarElement[];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarElements = this.sidebarService.elements;
  }

  onNavigate(element: string) {
    this.navigate.emit(element);
  }
}
