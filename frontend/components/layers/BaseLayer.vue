<template>
    <div class="layer absolute top-0 left-0 right-0 flex items-center justify-center overflow-hidden pointer-events-none min-h-full">
        <div class="layer-container flex-auto bg-white flex flex-col max-w-xl py-14 px-12 h-auto rounded md:py-7 md:px-4">
            <template v-if="'header' in $slots">
                <div class="layer__header relative pr-8 lg:pr-16">
                    <slot name="header"></slot>
                </div>
            </template>
            <template v-if="'close' in $slots">
                <div class="layer__close absolute top-4 right-4">
                    <slot name="close"></slot>
                </div>
            </template>
            <div class="layer__content relative flex flex-col flex-auto">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class BaseLayer extends Vue {
}
</script>

<!-- @todo убрать, если анимация не нужна -->
<style lang="postcss" scoped>
.layer-enter > .layer-container, .layer-leave-to > .layer-container {
    @apply opacity-0 transform translate-y-8;
}
.layer-enter-active, .layer-leave-active {
    @apply pointer-events-none;
    transition: none .3s;
}
.layer-enter-active > .layer-container, .layer-leave-active > .layer-container {
    transition: .3s ease;
    transition-property: opacity, transform;
}
.layer-enter-to > .layer-container, .layer-leave > .layer-container {
    @apply transform-none;
}
</style>
