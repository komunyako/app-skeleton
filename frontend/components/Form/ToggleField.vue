<template>
    <BaseFormField
        v-bind="$props"
        class="toggle-field relative"
    >
        <input
            v-model="inputValue"
            class="toggle-field__input pointer-events-none opacity-0 absolute top-0 left-0 right-0 bottom-0"
            v-bind="inputProps"
            :value="fieldValue"
            v-on="$listeners"
        >
        <template #title>
            <slot name="title" v-bind="{id, title}">
                <label :for="id" class="toggle-field__main flex items-center cursor-pointer">
                    <span class="toggle-field__fake">
                        <slot name="fake"></slot>
                    </span>
                    <span class="toggle-field__text">{{ title }}</span>
                </label>
            </slot>
        </template>
    </BaseFormField>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import BaseFormField from '~/components/Form/BaseFormField.vue';

@Component({
    components: { BaseFormField },
    extends: BaseFormField
})
export default class ToggleField extends Vue {
    @Prop({ type: String, default: 'checkbox' })
    readonly type!: 'checkbox'|'radio';

    /** Значение инпута с типом === 'radio' */
    @Prop({ type: String, default: null })
    readonly fieldValue!: string;
}
</script>
