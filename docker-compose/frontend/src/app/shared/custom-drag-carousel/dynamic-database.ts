import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Product } from './custom-drag-carousel.interfaces';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  products: Product[] = [
    {
      src: './assets/images/clickAndDrag/1.jpeg',
      altSrc: '/assets/images/clickAndDrag/1-1.jpeg',
      name: 'Πέδιλο μπλε',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/2.jpeg',
      altSrc: '/assets/images/clickAndDrag/2-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/3.jpeg',
      altSrc: '/assets/images/clickAndDrag/3-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/4.jpeg',
      altSrc: '/assets/images/clickAndDrag/4-1.jpeg',
      name: 'Πέδιλο μπλε',
      price: '65,00',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/5.jpeg',
      altSrc: '/assets/images/clickAndDrag/5-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/6.jpeg',
      altSrc: '/assets/images/clickAndDrag/6-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/1.jpeg',
      altSrc: '/assets/images/clickAndDrag/1-1.jpeg',
      name: 'Πέδιλο μπλε',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/2.jpeg',
      altSrc: '/assets/images/clickAndDrag/2-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/3.jpeg',
      altSrc: '/assets/images/clickAndDrag/3-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/4.jpeg',
      altSrc: '/assets/images/clickAndDrag/4-1.jpeg',
      name: 'Πέδιλο μπλε',
      price: '65,00',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/5.jpeg',
      altSrc: '/assets/images/clickAndDrag/5-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/clickAndDrag/6.jpeg',
      altSrc: '/assets/images/clickAndDrag/6-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
  ];
}
