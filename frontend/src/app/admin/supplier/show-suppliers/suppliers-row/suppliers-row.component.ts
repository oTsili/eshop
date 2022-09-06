import { Component, ElementRef, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../../supplier.interfaces';
import { SuppliersRowService } from './suppliers-row.service';

@Component({
  selector: '[app-suppliers-row]',
  templateUrl: './suppliers-row.component.html',
  styleUrls: ['./suppliers-row.component.scss'],
})
export class SuppliersRowComponent {
  base_url = environment.BASE_URL;
  @Input() supplier: Supplier;

  constructor(
    private suppliersService: SuppliersRowService,
    private elementRef: ElementRef
  ) {}

  updateRow(
    company_name: string,
    firstname: string,
    lastname: string,
    tax_id_number: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    id: string,
    _id?: string
  ) {
    const supplier = {
      company_name,
      firstname,
      lastname,
      tax_id_number,
      phone,
      address,
      city,
      country,
      id,
    };
    if (_id)
      this.suppliersService.updateRow(_id, supplier).subscribe({
        next: (respnse) => {
          console.log(respnse);
        },
      });
  }

  deleteRow(id?: string) {
    if (id)
      this.suppliersService.deleteRow(id).subscribe({
        next: (response) => {
          console.log(response);
          this.elementRef.nativeElement.remove();
        },
      });
  }
}
