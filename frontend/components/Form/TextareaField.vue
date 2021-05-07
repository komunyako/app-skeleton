<template>
    <BaseFormField
        v-bind="$props"
        :focus="isFocus"
    >
        <ClientOnly>
            <TextareaAutosize
                ref="textareaElement"
                v-model="inputValue"
                class="field__input"
                v-bind="inputPropsCombined"
                :max-height="250"
                v-on="inputListeners"
                @focus.native="onFocus"
                @blur.native="onBlur"
            />
        </ClientOnly>
    </BaseFormField>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'nuxt-property-decorator';
import BaseFormField from '~/components/Form/BaseFormField.vue';

@Component({
    components: { BaseFormField },
    extends: BaseFormField
})
export default class TextareaField extends Vue {
    @Prop({ type: String, default: 'text' })
    readonly type!: string;

    @Prop({ type: String, default: null })
    readonly autocomplete!: string|null;

    /** Тип виртуальной клавиатуры */
    @Prop({ type: String, default: null })
    readonly inputmode!: string|null;

    /** Максимально допустимое число символов */
    @Prop({ type: Number, default: null })
    readonly maxlength!: number|null;

    /** Высота текстового поля */
    @Prop({ type: Number, default: 3 })
    readonly rows!: number;

    get inputPropsCombined(): {[x: string]: string|number|boolean|null} {
        return {
            ...this.inputProps,
            autocomplete: this.autocomplete,
            maxlength: this.maxlength,
            inputmode: this.inputmode,
            rows: this.rows
        };
    }

    @Ref()
    readonly textareaElement!: HTMLTextAreaElement;
}
</script>
