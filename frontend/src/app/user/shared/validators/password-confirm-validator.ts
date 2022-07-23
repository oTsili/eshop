import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';

export function RetypeConfirm(newpassword: string): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(newpassword)!.value === control.value
      ? null
      : { mismatch: true };
  };
}
