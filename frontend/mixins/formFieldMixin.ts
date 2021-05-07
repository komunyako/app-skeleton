import { Vue, Component, Prop, PropSync } from 'nuxt-property-decorator';
import { generateUuid } from '~/plugins/uuid';

interface FormFieldMixinData {
    isFocus: boolean
}

@Component
export default class FormFieldMixin extends Vue implements FormFieldMixinData {
    @Prop({ type: Object, default: () => ({}) })
    readonly inputListeners!: { [x: string]: ()=> void }|{};

    /** Название инпута (для label) */
    @Prop({ type: String, default: null })
    readonly title!: string|null;

    @Prop({ type: String, default: null })
    readonly error!: string|null;

    /** Инпут в фокусе */
    @Prop({ type: Boolean, default: false })
    readonly focus!: boolean;

    @Prop({ type: String, default: null })
    readonly placeholder!: string|null;

    @Prop({ type: String, default: () => generateUuid('form-field-') })
    readonly id!: string;

    /** Тип инпута */
    @Prop({ type: String, default: null })
    readonly type!: string|null;

    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean;

    /** Инпут должен быть обязательно заполнен */
    @Prop({ type: Boolean, default: false })
    readonly required!: boolean;

    /** Обновить значение инпута */
    @PropSync('value', { type: [String, Number, Boolean, Object, Array], default: null })
    readonly inputValue!: string|number|boolean|{[x: string]: any}|Array<any>|null;

    get inputProps(): {[x: string]: string|boolean|null} {
        return {
            id: this.id,
            type: this.type,
            placeholder: this.placeholder,
            disabled: this.disabled,
            required: this.required
        };
    }

    isFocus = false;

    onFocus(): void {
        this.isFocus = true;
    }

    onBlur(): void {
        this.isFocus = false;
    }
}
