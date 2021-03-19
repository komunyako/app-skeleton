import { Context } from '@nuxt/types';

export default function({ app, store }: Context): void {
    app.router?.afterEach(function() {
        if (process.client) {
            store.dispatch('page/fix');
        }
    });
}
