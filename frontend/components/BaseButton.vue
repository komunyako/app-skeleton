<template>
    <div
        :is="componentName"
        class="group inline-block relative select-none"
        v-bind="buttonAttrs"
        v-on="$listeners"
    >
        <div class="flex justify-center items-center relative z-10 overflow-hidden px-6 py-4 rounded-md text-white bg-gradient-to-r from-blue-700 to-blue-500 active:shadow-lg">
            <div class="absolute inset-0 opacity-0 bg-blue-700 group-hover:opacity-100"></div>
            <div class="flex items-center relative z-10 -mx-1.5">
                <template v-if="'side' in $slots">
                    <div class="flex-shrink-0 mx-1.5 fill-current text-white">
                        <slot name="side"></slot>
                    </div>
                </template>
                <div class="flex items-center justify-center mx-1.5">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class BaseButton extends Vue {
    /** Путь, куда нужно перейти по клику */
    @Prop({ type: [String, Object] })
    readonly href!: string | { name: string } | undefined;

    /** Отключена ли кнопка/ссылка */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean;

    /** Тип кнопки */
    @Prop({ type: String, default: 'button' })
    readonly type!: 'button'|'submit';

    /** Определить тип компонента */
    get componentName(): string {
        if (typeof this.href === 'object' || (typeof this.href === 'string' && /^\//.test(this.href))) {
            return 'NuxtLink';
        } else if (typeof this.href === 'string' && !/^\//.test(this.href)) {
            return 'a';
        }

        return 'button';
    }

    /** Собрать аттрибуты компонента */
    get buttonAttrs(): {[x: string]: string|boolean|Location} {
        const attrs = {
            disabled: this.disabled
        };

        if (this.componentName === 'button') {
            Object.assign(attrs, {
                type: this.type
            });

        } else if (this.componentName === 'NuxtLink') {
            Object.assign(attrs, {
                to: this.href
            });

        } else if (this.componentName === 'a') {
            Object.assign(attrs, {
                href: this.href,
                target: '_blank'
            });
        }

        return attrs;
    }
}
</script>
