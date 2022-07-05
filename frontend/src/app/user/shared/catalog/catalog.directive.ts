import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({ selector: '[invoke]' })
export class InvokeDirective {
  @Input() index: number;
  @Output() invoke: EventEmitter<number> = new EventEmitter<number>();

  ngAfterContentInit() {
    console.log(this.index);
    this.invoke.emit(this.index);
  }
}
