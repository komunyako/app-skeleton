/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex';
import { getModule } from 'nuxt-property-decorator';
import PageStore, { PageState } from '~/store/page';

// Эти ключи не нужны в инстансе стора
type PrivateProps = 'namespaced' | 'actions' | 'mutations' | 'modules' | 'getters' | 'state' | 'context';

// Каждый стор должен объявляться с таким типом
// Важно чтобы `keyof PageState` ссылся на корректный стейт
// Стейт специально исключается, чтобы нельзя было к нему обратить и поменять из компонентов
// Чтобы был доступ к нему, нужно написать геттер
let page: Omit<PageStore, PrivateProps | keyof PageState>;

function initialiseStores(store: Store<any>): void {
    page = getModule(PageStore, store);
}

export { initialiseStores, page as PageStore };
