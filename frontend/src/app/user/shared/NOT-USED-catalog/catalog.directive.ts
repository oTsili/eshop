import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({ selector: '[invoke]' })
export class InvokeDirective {
  @Input() index: number;
  @Input() imageSrc: string;
  @Output() invoke: EventEmitter<number> = new EventEmitter<number>();
  @Output() invokeSrc: EventEmitter<string> = new EventEmitter<string>();

  ngAfterContentInit() {
    console.log(this.index);
    console.log(this.imageSrc);
    this.invoke.emit(this.index);
    this.invokeSrc.emit(this.imageSrc);
  }
}
