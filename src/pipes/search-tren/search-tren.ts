import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchTrenPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchTren',
  pure:false //burada filtrelemenin sadece bir ionInput olayı başına gerçekleşmesini istiyoruz.
})
export class SearchTrenPipe implements PipeTransform {
  transform(list: any[], searchTerm: string): any[] {
    if (searchTerm) {
       searchTerm = searchTerm.toUpperCase();
       return list.filter(item => {
         return item.TrenAd.toUpperCase().indexOf(searchTerm) !== -1 
       });
     } else {
       return list;
     }
    }
  }

