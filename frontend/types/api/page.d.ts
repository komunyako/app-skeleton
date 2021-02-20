/**
 * @todo Описать все параметры что приходят с бэка
 */
export type PageData = {
    title: string
    content?: {
        id: number
        [key: string]: unknown
    }
    [key: string]: unknown
}
