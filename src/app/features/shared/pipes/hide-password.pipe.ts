import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidePassword',
  standalone:false
})
export class HidePasswordPipe implements PipeTransform {

  transform(value: string, code: string, showCharsNo: number = 0): unknown {
    const valueArray = value.split('');
    // if (showCharsNo) {
    //   return valueArray.slice(0, showCharsNo).join('') + valueArray.slice(showCharsNo).fill(code).join('')
    // }else{
    //   return valueArray.fill(code).join('')
    // }
    return showCharsNo ? valueArray.slice(0, showCharsNo).join('') + valueArray.slice(showCharsNo).fill(code).join('')
    : valueArray.fill(code).join(''); 
    
  }

}
