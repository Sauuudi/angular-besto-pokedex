import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceNumber'
})
export class SliceNumberPipe implements PipeTransform {
  transform(value: string, digits: number): unknown {
    return ('00' + value).slice(-digits);
  }
}
