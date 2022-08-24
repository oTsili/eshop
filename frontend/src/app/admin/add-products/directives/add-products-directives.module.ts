import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MultipleSelectOptionDirective } from './multiple-select-option.directive';
import { ToggleOptionsDirective } from './toggle-options.directive';
import { SelectOptionDirective } from './select-option.directive';
import { ErrorSelectDirective } from './error-select.directive';
import { testDirective } from './test-directive';
import { ErrorInputDirective } from './error-input.directive';

@NgModule({
  declarations: [
    MultipleSelectOptionDirective,
    ToggleOptionsDirective,
    SelectOptionDirective,
    ErrorSelectDirective,
    ErrorInputDirective,
    testDirective,
  ],
  imports: [CommonModule],
  exports: [
    MultipleSelectOptionDirective,
    ToggleOptionsDirective,
    SelectOptionDirective,
    ErrorSelectDirective,
    ErrorInputDirective,
    testDirective,
  ],
})
export class AddProductsDirectivesModule {}
