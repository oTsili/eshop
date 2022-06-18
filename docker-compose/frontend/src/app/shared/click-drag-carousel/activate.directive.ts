// import {
//   Directive,
//   ElementRef,
//   HostListener,
//   Input,
//   Renderer2,
// } from '@angular/core';

// @Directive({
//   selector: '[appActivate]',
// })
// export class ActivateDirective {
//   constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

//   @Input() source: string;

//   @HostListener('mouseenter', ['$event'])
//   activateDisplay(): void {
//     // console.log(this.source);

//     this.renderer.setAttribute(
//       this.elementRef.nativeElement,
//       'src',
//       this.source.replace('.jpeg', '-1.jpeg')
//     );
//   }
//   @HostListener('mouseout', ['$event'])
//   nonActiveDisplay(): void {
//     this.renderer.setAttribute(
//       this.elementRef.nativeElement,
//       'src',
//       this.source.replace('-1.jpeg', '.jpeg')
//     );
//   }
// }
