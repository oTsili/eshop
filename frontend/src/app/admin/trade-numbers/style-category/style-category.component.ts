import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TableRowContentDirective } from '../directives/table-row-content.directive';
import { TableRowDirective } from '../directives/table-row.directive';
import { TableRow } from '../table-row/table-row.interfaces';
import { TradeNumbersService } from '../trade-numbers.service';

@Component({
  selector: 'app-style-category',
  templateUrl: './style-category.component.html',
  styleUrls: ['./style-category.component.scss'],
})
export class StyleCategoryComponent implements OnInit {
  @ViewChild(TableRowDirective, { static: true })
  tableRowHost: TableRowDirective;

  //   @ViewChild('tableRowHost', { read: ViewContainerRef })
  //   tableRowHost: ViewContainerRef;

  @ContentChildren(TableRowContentDirective)
  items!: QueryList<TableRowContentDirective>;

  @Input() category;
  styleForm: FormGroup;

  constructor(private tradeNumbersService: TradeNumbersService) {}

  ngOnInit(): void {
    console.log({ category: this.category });
    this.styleForm = new FormGroup({
      style_description: new FormControl(null, {}),
      style_code: new FormControl(null, {}),
    });
  }

  onAdd() {
    this.loadComponent();
  }

  loadComponent() {
    console.log({ category: this.category });
    // go to the next index
    // this.currentNewsIndex = (this.currentNewsIndex + 1) % this.news.length;
    // get the next component
    const tableRowItem = this.tradeNumbersService.getTableRow(this.category);
    console.log({ tableRowItem });
    //get the container where to insert the new component (it is the viewContainerRef of the NewsDirective with the newsHost as its selector)
    const viewContainerRef = this.tableRowHost.viewContainerRef;

    // const viewContainerRef = this.tableRowHost;

    // remove the previous components, contained in the viewContainerRef
    // viewContainerRef.clear();

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
