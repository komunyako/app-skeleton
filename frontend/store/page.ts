import { Module } from 'vuex';

type PageState = {
    data: Record<string, any>
    raw: Record<string, any>
}

const module: Module<any, any> = {
    state: {
        data: {},
        raw: {}
    } as PageState,

    actions: {
        reset({ commit }):void {
            commit('reset');
        },
        update({ commit }, payload: PageState['raw']):void {
            commit('update', payload);
        }
    },

    getters: {
        title: (state: PageState) => state.data.id ? state.data.title : '',
        metaTitle: (state: PageState) => state.data.id ? (state.data.meta.title || state.data.title) : '',
        metaInfo: (state: PageState) => {
            if (!state.data.id) {
                return [];
            }

            return [
                { hid: 'description', name: 'description', content: state.data.meta.description || '' },
                { hid: 'keywords', name: 'keywords', content: state.data.meta.keywords || '' },
                { hid: 'og:title', name: 'og:title', content: state.data.meta.title || '' },
                { hid: 'og:description', name: 'og:description', content: (state.data.meta.description || '').replace(/<\/?[^>]+(>|$)/g, '') }
            ];
        }
    },

    mutations: {
        update(state: PageState, payload: PageState['raw']): void {
            state.raw = payload;
        },
        reset(state: PageState): void {
            state.raw = {};
        },
        fix(state: PageState): void {
            state.data = state.raw;
        }
    }
};

export default module;
