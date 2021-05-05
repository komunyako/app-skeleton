<template>
    <div
        :is="componentName"
        :class="[
            'base-button group',
            fontWeight,
            fontSize,
            {
                [normalizedVariant.block]: normalizedVariant.block,
                'base-button_disabled': disabled,
                ['base-button_theme_' + theme]: theme
            }
        ]"
        v-bind="buttonAttrs"
        v-on="$listeners"
    >
        <div
            class="base-button__content"
            :class="{
                [normalizedVariant.content]: normalizedVariant.content
            }"
        >
            <div
                class="base-button__content-hover"
                :class="{
                    [normalizedVariant.contentHover]: normalizedVariant.contentHover
                }"
            ></div>
            <div
                class="base-button__content-wrapper"
                :class="{
                    [normalizedVariant.contentWrapper]: normalizedVariant.contentWrapper
                }"
            >
                <template v-if="'side' in $slots">
                    <div
                        class="base-button__side"
                        :class="{
                            [normalizedVariant.side]: normalizedVariant.side
                        }"
                    >
                        <slot name="side"></slot>
                    </div>
                </template>
                <div
                    class="base-button__title"
                    :class="{
                        [normalizedVariant.title]: normalizedVariant.title
                    }"
                >
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { utilNormalizedVariant, createUtil } from '~/mixins/utilMixins';

@Component({
    mixins: [utilNormalizedVariant,
        createUtil('base', null, {
            default: 'primary',
            variants: {
                primary: {
                    block: {
                        default: 'inline-block relative select-none',
                        disabled() {
                            return this.disabled ? 'pointer-events-none' : 'cursor-pointer';
                        }
                    },
                    content: 'flex justify-center items-center relative z-10 overflow-hidden transition-fast',
                    contentHover: 'absolute inset-0 opacity-0 group-hover:opacity-100 transition-fast',
                    contentWrapper: 'flex items-center relative z-10',
                    side: 'flex-shrink-0 transition-fast',
                    title: 'flex items-center justify-center'
                }
            }
        }),
        createUtil('sidePosition', null, {
            default: '',
            variants: {
                right: {
                    side: 'order-2'
                }
            }
        }),
        createUtil('sideGap', null, {
            default: 'primary',
            variants: {
                primary: {
                    contentWrapper: '-mx-1.5',
                    side: 'mx-1.5',
                    title: 'mx-1.5'
                }
            }
        }),
        createUtil('textAlign', null, {
            default: 'center',
            variants: {
                center: {
                    content: 'text-center'
                }
            }
        }),
        createUtil('width', 'widths', {
            variants: {
                full: {
                    block: 'w-full'
                }
            }
        }),
        createUtil('rounded', null, {
            default: 'lg',
            variants: {
                lg: {
                    content: 'rounded-lg'
                },
                full: {
                    content: 'rounded-full'
                },
                none: {
                    content: 'rounded-none'
                }
            }
        }),
        createUtil('size', 'sizes', {
            default: 'primary',
            variants: {
                fit: {
                    content: ''
                },
                primary: {
                    content: 'px-6 py-4 md:px-4 md:py-3'
                }
            }
        }),
        createUtil('theme', 'themes', {
            default: 'primary',
            variants: {
                primary: {
                    content: 'text-white bg-gradient-to-r from-blue-700 to-blue-500 transition-main active:shadow-lg',
                    contentHover: 'bg-blue-700',
                    side: 'fill-current text-white'
                },
                outline: {
                    content: 'bg-transparent border border-blue-700 border-opacity-30 text-blue-700 group-hover:text-white group-hover:border-opacity-0 active:shadow-lg',
                    contentHover: 'bg-gradient-to-r from-blue-700 to-blue-500'
                },
                transparent: {
                    content: 'bg-transparent group-hover:text-blue-700'
                }
            }
        })
    ]
})
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

    /** Жирность шрифта */
    @Prop({ type: String, default: 'font-medium' })
    readonly fontWeight!: string;

    /** Размер шрифта */
    @Prop({ type: String, default: 'text-lg' })
    readonly fontSize!: string;

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
    get buttonAttrs(): {[x: string]: string|boolean|{name: string}} {
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

<style lang="postcss">
    .base-button_disabled {
        .base-button__content {
            background: rgba(7,28,43,0.2) !important;
            color: #fff !important;
            border-color: transparent !important;
        }
    }
    .base-button_disabled.base-button_theme_outline {
        .base-button__content {
            background: rgba(0,0,0,0) !important;
            color: rgba(7,28,43,0.2) !important;
            border-color: rgba(7,28,43,0.2) !important;
        }
    }
    .base-button_disabled.base-button_theme_transparent {
        .base-button__content {
            background: rgba(0,0,0,0) !important;
            color: rgba(7,28,43,0.2) !important;
        }
    }
</style>
