import { Context } from '@nuxt/types';
import { Store } from 'vuex';
import { initialiseStores } from '~/utils/store-accessor';

const initializer = (store: Store<any>): void => initialiseStores(store);

export default function({ $axios, route, store }: Context): Promise<any> {
    initializer(store);

    const request = route.name === 'all'
        ? $axios.$get('/api/pages', {
            params: {
                path: route.path
            }
        })
        : $axios.$get('/api/pages/' + route.name);

    return request
        .then(page => store.dispatch('page/update', page))
        .catch(() => store.dispatch('page/reset'))
        .then(() => {
            if (process.server) {
                store.dispatch('page/fix');
            }
        });
}
