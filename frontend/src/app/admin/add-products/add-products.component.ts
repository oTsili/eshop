import {
  AfterContentChecked,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  clearDragAndDropImages() {
    const images =
      this.elementRef.nativeElement.querySelectorAll('app-single-file');
    for (let image of images) {
      image.remove();
    }
  }
}
