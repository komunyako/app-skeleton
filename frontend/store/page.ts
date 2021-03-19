import { Module, VuexMutation, VuexModule, VuexAction } from 'nuxt-property-decorator';
import { MetaPropertyCharset, MetaPropertyEquiv, MetaPropertyName, MetaPropertyMicrodata, MetaPropertyProperty } from 'vue-meta';

export interface PageState {
    // Поля стейта указываем с нижним подчёркиванием, чтобы названия не пересекались с экшенами и геттерами
    // Так же это сигнализирует что эти поля не являются публичными
    _data: Record<string, any>
    _raw: Record<string, any>
}

@Module({
    name: 'page',
    stateFactory: true,
    namespaced: true
})
export default class PageStore extends VuexModule implements PageState {
    _data: PageState['_data'] = {};
    _raw: PageState['_raw'] = {};

    @VuexMutation
    // Мутиации тоже указываем с `_`, чтобы не пересекалось с экшенами и геттерами
    // Не забываем указывать что это приватное поле `private`, чтобы извне не было возможности поменять данные
    private _update(payload: PageState['_raw']): void {
        this._raw = payload;
    }

    @VuexMutation
    private _reset(): void {
        this._raw = {};
    }

    @VuexMutation
    private _fix(): void {
        this._data = this._raw;
    }

    @VuexAction
    update(payload: PageState['_raw']): void {
        this.context.commit('_update', payload);
    }

    @VuexAction
    reset(): void {
        this.context.commit('_reset');
    }

    @VuexAction
    fix(): void {
        this.context.commit('_fix');
    }


    get title(): string {
        return this._data.id ? this._data.title : '';
    }

    get metaTitle(): string {
        return this._data.id ? (this._data.meta.title || this._data.title) : '';
    }

    get metaInfo(): (MetaPropertyCharset | MetaPropertyEquiv | MetaPropertyName | MetaPropertyMicrodata | MetaPropertyProperty)[] {
        if (!this._data.id) {
            return [];
        }

        return [
            { hid: 'description', name: 'description', content: this._data.meta.description || '' },
            { hid: 'keywords', name: 'keywords', content: this._data.meta.keywords || '' },
            { hid: 'og:title', name: 'og:title', content: this._data.meta.title || '' },
            { hid: 'og:description', name: 'og:description', content: (this._data.meta.description || '').replace(/<\/?[^>]+(>|$)/g, '') }
        ];
    }
}
