import {FormControl} from '@angular/forms';

export const forbiddenNamesList = ['test', 'test1'];

export function forbiddenNames(control: FormControl): {[s: string]: boolean} {
  if(!!control && forbiddenNamesList.indexOf(control.value) !== -1) {
    return {'nameIsForbidden': true};
  }
  return null;
}
