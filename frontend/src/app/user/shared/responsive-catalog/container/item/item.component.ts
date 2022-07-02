import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements AfterViewInit {
  @Input() item;
  @Input() source: string;
  @Output() itemInitialize: EventEmitter<number> = new EventEmitter<number>();

  @HostListener('window:resize', ['$event'])
  emitWidth() {
    this.itemInitialize.emit(this.elementRef.nativeElement.offsetWidth);
  }

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    console.log(
      this.elementRef.nativeElement.querySelector('.element').offsetWidth
    );
    this.itemInitialize.emit(
      this.elementRef.nativeElement.querySelector('.element').offsetWidth
    );
  }
}
