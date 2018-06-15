import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class DateValidator {
  // static datevalidator(c: FormControl) {
  //   if (typeof c.value === 'object' && c.value !== null) {
  //     const dateString = c.value.day + '.' + c.value.month + '.' + c.value.year;
  //     const dateRegEx = new RegExp(/^\d{1,2}\.\d{1,2}\.\d{4}$/);
  //     return dateRegEx.test(dateString) ? null : { datevalidator: true };
  //   } else {
  //     return { datevalidator: true };
  //   }
  // }
  static datevalidator(min: number, max: number) {
    return (c: FormControl): { [key: string]: boolean } | null => {
      if (typeof c.value === 'object' && c.value !== null) {
        const dateString =
          c.value.day + '.' + c.value.month + '.' + c.value.year;
        const dateRegEx = new RegExp(/^\d{1,2}\.\d{1,2}\.\d{4}$/);
        if (dateRegEx.test(dateString)) {
          console.log(dateRegEx.test(dateString));
          return null;
        } else {
          return { datevalidator: true };
        }
      }
      return { datevalidator: true };
    };
  }
  constructor() {}
}
