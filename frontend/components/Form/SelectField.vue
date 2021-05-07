<template>
    <BaseFormField
        v-bind="$props"
    >
        <BaseSelect
            ref="selectElement"
            v-model="inputValue"
            class="multiselect_field"
            :multiple="multiple"
            :options="options"
            v-bind="inputPropsCombined"
            v-on="inputListeners"
        >
            <template #noResult>
                <span>{{ noResult }}</span>
            </template>
            <template #noOptions>
                <span>{{ noOptions }}</span>
            </template>
        </BaseSelect>
    </BaseFormField>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import BaseFormField from '~/components/Form/BaseFormField.vue';
import BaseSelect from '~/components/Form/BaseSelect.vue';

@Component({
    extends: BaseFormField,
    components: { BaseSelect, BaseFormField }
})
export default class SelectField extends Vue {
    @Prop({ type: String, default: 'text' })
    readonly type!: string;

    @Prop({ type: Boolean, default: false })
    readonly multiple!: boolean;

    @Prop({ type: Array, default: () => [] })
    readonly options!: Array<any>;

    @Prop({ type: String, default: 'Нет данных' })
    readonly noOptions!: string;

    @Prop({ type: String, default: 'Ничего не найдено' })
    readonly noResult!: string;

    @Prop({ type: String, default: 'Выберите вариант' })
    readonly placeholder!: string;

    get inputPropsCombined(): {[x: string]: any} {
        return {
            ...this.inputProps,
            ...this.$attrs
        };
    }

    @Ref()
    readonly selectElement!: HTMLDivElement;
}
</script>
