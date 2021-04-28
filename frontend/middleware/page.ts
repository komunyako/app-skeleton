import { Context } from '@nuxt/types';
import { pageStore } from '~/store';


export default function({ $axios, route }: Context): Promise<any> {
    const request = route.name === 'all'
        ? $axios.$get('/api/pages', {
            params: {
                path: route.path
            }
        })
        : $axios.$get('/api/pages/' + route.name);

    return request
        .then(page => pageStore.update(page))
        .catch(() => pageStore.reset())
        .finally(() => {
            if (process.server) {
                pageStore.fix();
            }
        });
}
