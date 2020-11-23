/**
 *
 * @param {HTMLElement} element - элемент который надо заскролить
 * @param {Object} [offsets] - сдвиги
 * @param {Number} [offsets.x] - сдвиг по горизонтали
 * @param {Number} [offsets.y] - сдвиг по вертикали
 */
export default function scrollIntoView(element, offsets = {}) {
    const { y = 0 } = offsets;
    if (typeof element.scrollTo === 'function') {
        window.scrollTo({
            top: element.getBoundingClientRect().top + window.pageYOffset + y,
            behavior: 'smooth'
        });
    } else {
        (document.scrollingElement || document.documentElement).scrollTop = element.getBoundingClientRect().top + window.pageYOffset + y;
    }

    return element;
}
