import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TableRowService } from './table-row.service';
import dictionary from 'src/assets/i18n/toEn.json';

@Component({
  selector: 'tr[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
})
export class TableRowComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() category;
  @Input() category_style;

  constructor(
    private elementRef: ElementRef,
    private tableRowService: TableRowService
  ) {}

  ngOnInit(): void {
    // if the component has been created dynamically
    if (this.data) {
      this.category = { description: '', code: '' };
      this.category_style = this.data.category_style;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category_style'])
      this.category_style = changes['category_style'].currentValue;
    if (changes['category']) this.category = changes['category'].currentValue;
  }

  updateRow(description: string, code: string) {
    // console.log(this.category_style);
    // console.log({ description, code });
    if (!description || !code) {
      console.log('please provide valid values');
      return;
    }

    // translate to english the provided description and code
    description = dictionary[description] || description;
    code = dictionary[code] || code;

    // console.log(description, code);

    //if row pre-existed put request to update from the db
    if (this.category._id) {
      console.log('update row');
      this.tableRowService
        .updateRow(this.category._id, this.category_style, description, code)
        .subscribe({
          next: (response) => {
            console.log(response);
            // update its id in case of deletion or update
            this.category._id = response.directoryUpdated._id;
          },
        });
      // else post request to create new row
    } else {
      console.log('create row');
      this.tableRowService
        .createRow(this.category_style, description, code)
        .subscribe({
          next: (response) => {
            console.log(response);
            // update its id in case of deletion or update
            this.category._id = response.directoriesSaved._id;
          },
        });
    }
  }

  deleteRow(description: string, code: string) {
    // if no values to send, just remove the element from the DOM
    if (!description || !code) {
      this.elementRef.nativeElement.remove();
      return;
    }

    // http request to delete from the db
    this.tableRowService
      .deleteRow(this.category._id, this.category_style)
      .subscribe({
        next: (response) => {
          console.log(response);
          // delete the element from the dom
          this.elementRef.nativeElement.remove();
        },
      });
  }
}
