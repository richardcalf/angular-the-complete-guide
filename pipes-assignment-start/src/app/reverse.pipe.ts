import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    const myArray = value.split("");
    myArray.reverse();
    const reversedString = myArray.join("");
    return reversedString;
  }

}
