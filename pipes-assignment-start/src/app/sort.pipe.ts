import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any): any {
    // value.sort((a,b) => a.name.localeCompare(b.name));

    return value.sort((a, b) => {
      if(a['name'] > b['name']) {
        return 1;
      } else {
        return -1;
      }
    });
  }

}
