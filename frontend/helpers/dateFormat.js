import dayjs from 'dayjs';
import dayjsRU from 'dayjs/locale/ru';

// https://day.js.org/docs/en/display/format
// https://day.js.org/docs/en/display/difference
// https://day.js.org/docs/en/display/from-now

export default function(date) {
    return dayjs(date).locale(dayjsRU);
}
