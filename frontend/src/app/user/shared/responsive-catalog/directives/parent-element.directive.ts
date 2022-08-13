import { ContentChild, Directive } from '@angular/core';
import { FirstElementDirective } from './first-element.directive';
import { SecondElementDirective } from './second-element.directive';
import { ThirdElementDirective } from './third-element.directive';

@Directive({
  selector: 'parent-element',
})
export class ParentElementDirective {
  @ContentChild(FirstElementDirective) firstElement: FirstElementDirective;
  @ContentChild(SecondElementDirective) secondElement: SecondElementDirective;
  @ContentChild(ThirdElementDirective) thirdElement: ThirdElementDirective;
}
