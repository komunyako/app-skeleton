# [WIP] seoMeta
###### *Для чего?*
Позволяет настраивать мета-данные на странице, не задумываясь о префиксах, затирании данных и т.п.

------------
###### *Какие возможности?*
Хэлпер представляет из себя функцию, принимающую объект в качестве аргумента (подробнее о св-вах объекта описано ниже). На выходе будет получен объект [MetaInfo](https://vue-meta.nuxtjs.org/api/#metainfo-properties "MetaInfo")

Аргумент функции реализует объект интерфейса **IMetaData**:

    /** Заголовок */
    title?: string
    /** Описание */
    description?: string,
    /** Ключевые слова через запятую */
    keywords?: string,
    /** Абсолютный урл-адрес страницы */
    url?: string,
    /** Абсолютный путь до шэр-изображения */
    image?: string,
    /** Тип содержимого (для OG) */
    type?: string,
    /** Тип содержимого карточки (для twitter`a) */
    card?: string,
    /** Каноническая ссылка */
    canonical?: string,
    /** Дополнительная информация, соответсвующая схеме MetaInfo */
    extra?: MetaInfo

В зависимости от переданных параметров будут изменяться следуюшие св-ва

    title: <title>...</title>, <meta name="title" content="...">, <meta name="og:title" content="...">, <meta name="twitter:title" content="...">
    description: <meta name="description" content="...">, <meta name="og:description" content="...">, <meta name="twitter:description" content="...">
    keywords: <meta name="keywords" content="...">
    url: <meta name="og:url" content="...">
    image: <meta name="og:image" content="...">, <meta name="twitter:image" content="...">
    type: <meta name="og:type" content="...">
    card: <meta name="twiiter:card" content="...">
    canonical: <link rel="canonical" href="..." />
 
Параметр extra поможет передать непредусмотренные мета-данные.

------------
###### *Пример использования*

    import seoMeta, { IMetaData } from '~/helpers/meta';
    ...
    export default class IndexPage extends Vue {
        head(): MetaInfo {
            const test: IMetaData = {
                title: 'Заголовок ⏤ переопределен на главной странице',
                description: 'Описание ⏤ переопределено на главной странице',
                extra: {
                    meta: [
                        { hid: 'twitter:creator', name: 'twitter:creator', content: '@SamSmith' }
                    ]
                }
            };
            return seoMeta(test);
        }
    }
