<template>
    <BaseFormField
        v-bind="$props"
        :focus="isFocus"
    >
        <input
            ref="inputElement"
            v-model="inputValue"
            class="field__input"
            v-bind="inputPropsCombined"
            v-on="$listeners"
            @focus="onFocus"
            @blur="onBlur"
        >
        <template v-if="'side' in $slots" #side>
            <slot name="side"></slot>
        </template>
    </BaseFormField>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import BaseFormField from '~/components/Form/BaseFormField.vue';

@Component({
    components: { BaseFormField },
    extends: BaseFormField,
    inheritAttrs: false
})
export default class InputField extends Vue {
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

    get inputPropsCombined(): {[x: string]: string|number|boolean} {
        return {
            ...this.inputProps,
            autocomplete: this.autocomplete,
            maxlength: this.maxlength,
            inputmode: this.inputmode
        };
    }

    @Ref()
    readonly inputElement!: HTMLInputElement;
}
</script>
