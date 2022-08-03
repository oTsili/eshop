import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges {
  @Output() close = new EventEmitter();
  @Input() mainActive: boolean;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mainActive = changes['mainActive'].currentValue;
  }

  onCloseClick() {
    this.close.emit();
  }
}
