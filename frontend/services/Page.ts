import api, { RequestConfig } from '~/helpers/api';
import { PageData, ContentData } from '~/models/Page';


export default class PageService {
    /**
     * Получить данные страницы
     * @param name Путь или имя страницы
     * @param config Настройки запроса
     */
    static async fetchData(name: string, config?: RequestConfig): Promise<PageData> {
        // Если это ссылка
        if (name.startsWith('/')) {
            return await api.get('/api/pages', { ...config, params: { ...config?.params, path: name } });
        }

        return await api.get('/api/pages/' + name, config);
    }

    /**
     * Получить контент страницы/блока
     * @param id Идентификатор контента
     * @param config Настройки запроса
     */
    static async fetchContent(id: number, config?: RequestConfig): Promise<ContentData> {
        return await api.get('/api/contents/' + id, config);
    }
}
