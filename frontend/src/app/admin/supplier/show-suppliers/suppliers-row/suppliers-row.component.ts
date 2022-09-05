import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../../supplier.interfaces';

@Component({
  selector: '[app-suppliers-row]',
  templateUrl: './suppliers-row.component.html',
  styleUrls: ['./suppliers-row.component.scss'],
})
export class SuppliersRowComponent {
  base_url = environment.BASE_URL;

  @Input() supplier: Supplier;

  updateRow(id?: string) {}

  deleteRow(id?: string) {}
}
