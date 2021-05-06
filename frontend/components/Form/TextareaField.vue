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
                v-on="$listeners"
                @focus="onFocus"
                @blur="onBlur"
            />
        </ClientOnly>
    </BaseFormField>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'nuxt-property-decorator';
import BaseFormField from '~/components/Form/BaseFormField.vue';

interface TextareaFieldData {
    isFocus: boolean
}

@Component({
    components: { BaseFormField },
    extends: BaseFormField,
    inheritAttrs: false
})
export default class TextareaField extends Vue implements TextareaFieldData {
    @Prop({ type: String, default: 'text' })
    readonly type!: string;

    @Prop({ type: String, default: null })
    readonly autocomplete!: string;

    /** Тип виртуальной клавиатуры */
    @Prop({ type: String, default: null })
    readonly inputmode!: string;

    /** Максимально допустимое число символов */
    @Prop({ type: Number, default: null })
    readonly maxlength!: number;

    /** Высота текстового поля */
    @Prop({ type: Number, default: 3 })
    readonly rows!: number;

    get inputPropsCombined(): {[x: string]: string|number|boolean} {
        return {
            ...this.inputProps,
            autocomplete: this.autocomplete,
            maxlength: this.maxlength,
            inputmode: this.inputmode,
            rows: this.rows
        };
    }

    isFocus = false;

    onBlur(): void {
        this.isFocus = false;
    }

    onFocus(): void {
        this.isFocus = true;
    }

    @Ref()
    readonly textareaElement!: HTMLTextAreaElement;
}
</script>
