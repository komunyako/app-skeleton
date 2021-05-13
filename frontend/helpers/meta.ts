import { MetaInfo, MetaPropertyCharset, MetaPropertyEquiv, MetaPropertyName, MetaPropertyMicrodata, MetaPropertyProperty, LinkPropertyBase, LinkPropertyHref, LinkPropertyHrefCallback } from 'vue-meta';
import mergeWith from 'lodash/mergeWith';

enum MetaTypesPrefixes {
    'META_BASIC' = '',
    'META_OG' = 'og:',
    'META_TWITTER' = 'twitter:'
}

export interface IMetaData {
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
}

interface IMetaSchemaItem {
    include: string[],
    keyName: keyof IMetaData
}

interface IMetaSchema {
    title: IMetaSchemaItem,
    description: IMetaSchemaItem,
    keywords: IMetaSchemaItem,
    url: IMetaSchemaItem,
    image: IMetaSchemaItem,
    type: IMetaSchemaItem,
    card: IMetaSchemaItem,
    canonical: IMetaSchemaItem
}

/**
 * ROOT_LEVEL - верхний уровень (примтивы)
 * META_BASIC - базовые значения мета-тегов
 * META_OG - open-graph мета-теги
 * META_TWITTER - твиттер мета-теги
 * META_LINKS - ссылки
 */
const META_SCHEMA: IMetaSchema = {
    title: { include: ['ROOT_LEVEL', 'META_BASIC', 'META_OG', 'META_TWITTER'], keyName: 'title' },
    description: { include: ['META_BASIC', 'META_OG', 'META_TWITTER'], keyName: 'description' },
    keywords: { include: ['META_BASIC'], keyName: 'keywords' },
    url: { include: ['META_OG', 'META_TWITTER'], keyName: 'url' },
    image: { include: ['META_OG', 'META_TWITTER'], keyName: 'image' },
    type: { include: ['META_OG'], keyName: 'type' },
    card: { include: ['META_TWITTER'], keyName: 'card' },
    canonical: { include: ['META_LINKS'], keyName: 'canonical' }
};

/**
 * Получить метаданные для страницы
 * Переданные св-ва в аргументе мержаться с дефолтными значениями, которые будут получены из хранилища
 * Предусмотрены следующие мета-данные по умолчанию: <title></title>, <meta name="title|description|keywords|og:title|og:description|og:url|og:image|og:type|twitter:title|twitter:description|twitter:image|twitter:card" content="...">
 * @param metaData
 * @return {MetaInfo} - сформированные метаданные
 */
export default function seoMeta(metaData: IMetaData): MetaInfo {
    let result: MetaInfo = {
        meta: [],
        link: []
    };

    const { title, description, keywords, url, image, type, card, canonical, extra } = metaData;
    const metaDataBase: IMetaData = { title, description, keywords, url, image, type, card, canonical };

    for (const key in metaDataBase) {
        if (!Object.prototype.hasOwnProperty.call(metaDataBase, key)) { break; }

        if (META_SCHEMA[key as keyof typeof META_SCHEMA]) {
            const metaItemSchema: IMetaSchemaItem = META_SCHEMA[key as keyof typeof META_SCHEMA];
            metaItemSchema.include.forEach((metaType) => {
                const metaItemKey = metaItemSchema.keyName;
                const metaItemValue = metaDataBase[metaItemKey];
                if (!metaItemValue) { return; }

                // Верхний уровень
                if (metaType === 'ROOT_LEVEL' && metaItemKey === 'title' && typeof metaItemValue === 'string') {
                    result[metaItemKey] = metaItemValue;
                }

                // Мета-теги
                if (['META_BASIC', 'META_OG', 'META_TWITTER'].includes(metaType)) {
                    if (typeof metaItemValue === 'string') {
                        const metaItem = generateMeta(metaItemKey, metaItemValue, MetaTypesPrefixes[metaType as keyof typeof MetaTypesPrefixes]);
                        result.meta?.push(metaItem);
                    }
                }

                // Ссылки
                if (metaType === 'META_LINKS') {
                    if (typeof metaItemValue === 'string') {
                        const linkItem = generateLinkMeta(metaItemKey, metaItemValue);
                        result.link?.push(linkItem);
                    }
                }
            });
        }
    }

    // Дополнительные данные
    if (extra) {
        result = mergeWith(result, extra, (objValue, srcValue, key) => {
            if (['meta', 'link'].includes(key) && Array.isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        });
    }

    if (result.link && !result.link.length) { delete result.link; }
    if (result.meta && !result.meta.length) { delete result.meta; }

    return result;
}

function generateMeta(key: string, value: string, prefix: string = ''): MetaPropertyCharset | MetaPropertyEquiv | MetaPropertyName | MetaPropertyMicrodata | MetaPropertyProperty {
    return { hid: `${ prefix }${ key }`, name: `${ prefix }${ key }`, content: value };
}
function generateLinkMeta(key: string, value: string): LinkPropertyBase | LinkPropertyHref | LinkPropertyHrefCallback {
    return { rel: key, href: value };
}
