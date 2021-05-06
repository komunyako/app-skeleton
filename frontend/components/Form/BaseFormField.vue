<template>
    <div
        class="field"
        :class="{
            filled: !!value,
            focused: focus,
            error: !!error,
            'is-required': required,
            'is-disabled': disabled,
        }"
    >
        <slot v-bind="inputProps"></slot>
        <slot name="title">
            <label :for="id" class="field__title">{{ title }}</label>
        </slot>
        <label v-if="error" class="field__error" :for="id">{{ error }}</label>
        <template v-if="'side' in $slots">
            <div class="field__side">
                <slot name="side"></slot>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import FormFieldMixin from '~/mixins/FormFieldMixin.vue';

@Component({
    mixins: [FormFieldMixin]
})
export default class BaseFormField extends Vue {
}
</script>


