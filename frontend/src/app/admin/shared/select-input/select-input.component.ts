import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent implements OnInit {
  @Input() form;
  @Input() options;
  @Input() controlName: string;
  @Output() optionUpdated = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // console.log(this.options);
  }

  onOptionClick(value: string) {
    this.form.get(this.controlName)?.patchValue(value);
    // console.log(this.elementRef.nativeElement);
    this.optionUpdated.emit(this.form);
  }
}
