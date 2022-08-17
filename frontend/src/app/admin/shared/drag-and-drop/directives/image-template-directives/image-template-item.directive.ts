import { ContentChild, Directive } from '@angular/core';
import { ImageTemplateContentDirective } from './image-template-content.directive';

@Directive({
  selector: 'panel-item',
})
export class ImageTemplateItemDirective {
  @ContentChild(ImageTemplateContentDirective)
  panelContent: ImageTemplateContentDirective;
}
