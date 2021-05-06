<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'nuxt-property-decorator';
import { generateUuid } from '~/plugins/uuid';

@Component
export default class FormFieldMixin extends Vue {
    /** Название инпута (для label) */
    @Prop({ type: String, default: null })
    readonly title!: string;

    @Prop({ type: String, default: null })
    readonly error!: string;

    /** Инпут в фокусе */
    @Prop({ type: Boolean, default: false })
    readonly focus!: boolean;

    @Prop({ type: String, default: null })
    readonly placeholder!: string;

    @Prop({ type: String, default: () => generateUuid('form-field-') })
    readonly id!: string;

    /** Тип инпута */
    @Prop({ type: String, default: null })
    readonly type!: string;

    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean;

    /** Инпут должен быть обязательно заполнен */
    @Prop({ type: Boolean, default: false })
    readonly required!: boolean;

    /** Обновить значение инпута */
    @PropSync('value', { type: [String, Number], default: null })
    readonly inputValue!: string|number|null;

    get inputProps(): {[x: string]: string|boolean} {
        return {
            id: this.id,
            type: this.type,
            placeholder: this.placeholder,
            disabled: this.disabled,
            required: this.required
        };
    }
}
</script>

