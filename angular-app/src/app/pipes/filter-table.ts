import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], args: string) {
    if (args) {
      const filterEmployee = list.filter(item =>
        (item.name.toLocaleLowerCase().includes(args.toLowerCase())) || (item.address.city.toLocaleLowerCase().includes(args.toLowerCase())));
      return filterEmployee;
    } else {
      return list;
    }
  }
}