import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() breadcrumbs: string[];

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.breadcrumbs = changes['breadcrumbs'].currentValue;
    this.breadcrumbs.shift();
    this.breadcrumbs = this.breadcrumbs.map(
      (breadcrumb) => breadcrumb.split('?')[0]
    );
    console.log(this.breadcrumbs);
  }
}
