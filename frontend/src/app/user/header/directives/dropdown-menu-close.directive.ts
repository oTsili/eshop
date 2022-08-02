import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[dropdownMenuClose]',
})
export class DropDownMenuCloseDirective implements OnInit {
  element: HTMLElement;
  menuElements: HTMLElement[];

  elementLeftEdge: number;
  elementRightEdge: number;
  elementBottomEdge: number;
  elementTopEdge: number;

  constructor(private elementeRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.element = this.elementeRef.nativeElement;
    this.menuElements =
      this.elementeRef.nativeElement.querySelectorAll('.menu');
    const { left, right, top, bottom } = this.element.getBoundingClientRect();
    this.elementBottomEdge = bottom;
    this.elementLeftEdge = left;
    this.elementRightEdge = right;
    this.elementTopEdge = top;
  }

  @HostListener('mouseleave', ['$event'])
  @HostListener('click', ['$event'])
  //   @HostListener('mousemove', ['$event'])
  disableDisplay(event: MouseEvent) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;

    var topEdgeDist = Math.abs(this.elementTopEdge - mouseY);
    var bottomEdgeDist = Math.abs(this.elementBottomEdge - mouseY);
    var leftEdgeDist = Math.abs(this.elementLeftEdge - mouseX);
    var rightEdgeDist = Math.abs(this.elementRightEdge - mouseX);

    var min = Math.min(
      topEdgeDist,
      bottomEdgeDist,
      leftEdgeDist,
      rightEdgeDist
    );

    switch (min) {
      case leftEdgeDist:
      //   return 'left';
      case rightEdgeDist:
      //   return 'right';
      case topEdgeDist:
        //   return 'top';
        this.renderer.removeClass(this.element, 'active');
        this.menuElements.forEach((el) => {
          this.renderer.removeClass(el, 'transition');
          this.renderer.removeClass(el, 'visible');
        });
        break;
      case bottomEdgeDist:
      //   return 'bottom';
    }
  }
}
