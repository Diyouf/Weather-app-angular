import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(inputDate: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short', // Short day name (e.g., "Fri")
      month: 'short',   // Short month name (e.g., "Sep")
      day: 'numeric'    // Numeric day of the month (e.g., "1")
    };

    const date = new Date(inputDate);
    return date.toLocaleDateString(undefined, options);
  }
}
