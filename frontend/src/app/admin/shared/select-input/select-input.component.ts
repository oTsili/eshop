import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  ngOnInit(): void {
    // console.log(this.options);
  }

  onOptionClick(value: string) {
    this.form.get(this.controlName)?.patchValue(value);
    this.optionUpdated.emit(this.form);
  }
}
