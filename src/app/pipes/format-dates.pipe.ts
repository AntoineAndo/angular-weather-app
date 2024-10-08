import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);
dayjs.extend(isoWeek);

const DAY_NAMES = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day] = formattedDate.split(' ');
    return `${DAY_NAMES[date.getDay()]}. ${day.replace(',', '/')}`;
  }
}
