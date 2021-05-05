<template>
    <div class="pt-16">
        <div class="mb-8">
            <div class="text-xl font-medium mb-4">
                Кнопки
            </div>
            <div class="my-4">
                Обычные
            </div>
            <BaseButton :href="{name: 'index'}">
                button
            </BaseButton>
            <BaseButton :href="{name: 'index'}" disabled>
                button
            </BaseButton>
            <BaseButton :href="{name: 'index'}" width="full" class="mt-2">
                button
            </BaseButton>
            <div class="my-4">
                Outline
            </div>
            <BaseButton :href="{name: 'index'}" theme="outline">
                button
            </BaseButton>
            <BaseButton :href="{name: 'index'}" theme="outline" disabled>
                button
            </BaseButton>
            <BaseButton :href="{name: 'index'}" theme="outline" width="full" class="mt-2">
                button
            </BaseButton>
            <div class="my-4">
                Прозрачные
            </div>
            <BaseButton :href="{name: 'index'}" theme="transparent" size="fit">
                button
            </BaseButton>
            <BaseButton :href="{name: 'index'}" theme="transparent" size="fit" disabled>
                button
            </BaseButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import BaseButton from '~/components/BaseButton.vue';

@Component({
    components: {
        BaseButton
    }
})
export default class UiPage extends Vue {
}
</script>
