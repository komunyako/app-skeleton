export type PluralizeOptions = {
    showNumber?: boolean;
    delimiter?: string;
}

/**
 * @param titles текст для склонений
 * @param n число
 */
const pluralize = function(titles: string | string[], n: number, { showNumber = false, delimiter = '|' }: PluralizeOptions = {}): string {
    let _titles = titles;
    if (typeof _titles === 'string') {
        _titles = _titles.split(delimiter);
    }

    return `${ !showNumber ? '' : n + ' ' }${ _titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] }`;
};

export default pluralize;
