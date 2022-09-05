import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier.interfaces';
import { ShowSuppliersService } from './show-suppliers.service';

@Component({
  selector: 'app-show-suppliers',
  templateUrl: './show-suppliers.component.html',
  styleUrls: ['./show-suppliers.component.scss'],
})
export class ShowSuppliersComponent implements OnInit {
  suppliers: Supplier[];
  constructor(private showSuppliersService: ShowSuppliersService) {}

  ngOnInit(): void {
    this.showSuppliersService.getSuppliers().subscribe({
      next: (response) => {
        console.log({ response });
        this.suppliers = response.suppliers;
      },
    });
  }
}
