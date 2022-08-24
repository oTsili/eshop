import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() progress: number;
  bar: HTMLElement;
  element: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
    this.bar = this.elementRef.nativeElement.querySelector('.ui.progress .bar');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['progress']) this.progress = changes['progress'].currentValue;
    if (this.bar) {
      this.renderer.setStyle(
        this.bar,
        'width',
        `${changes['progress'].currentValue}%`
      );
    }
  }
}
