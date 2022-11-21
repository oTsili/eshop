import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { TableRowContentDirective } from '../directives/table-row-content.directive';
import { TableRowDirective } from '../directives/table-row.directive';
import { TableRow } from './table-row/table-row.interfaces';
import { TradeNumbersService } from '../trade-numbers.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @ViewChild(TableRowDirective, { static: true })
  tableRowHost: TableRowDirective;

  //   @ViewChild('tableRowHost', { read: ViewContainerRef })
  //   tableRowHost: ViewContainerRef;

  @ContentChildren(TableRowContentDirective)
  items!: QueryList<TableRowContentDirective>;

  @Input() category;
  @Input() category_style;

  constructor(private tradeNumbersService: TradeNumbersService) {}

  ngOnInit(): void {}

  onAdd() {
    this.loadComponent();
  }

  loadComponent() {
    // console.log(this.category);
    // get the next component
    const tableRowItem = this.tradeNumbersService.getTableRow(
      this.category_style
    );
    // console.log({ tableRowItem });
    //get the container where to insert the new component (it is the viewContainerRef of the NewsDirective with the newsHost as its selector)
    const viewContainerRef = this.tableRowHost.viewContainerRef;

    // add the next component
    if (tableRowItem) {
      const componentRef = viewContainerRef.createComponent<TableRow>(
        tableRowItem.component
      );
      // pass any data provided in the service
      componentRef.instance.data = tableRowItem.data;
    }
  }
}
