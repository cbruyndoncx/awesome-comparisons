import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'asAny',
    standalone: false
})
export class AsAnyPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}
