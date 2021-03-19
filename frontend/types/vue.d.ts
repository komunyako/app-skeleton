// // noinspection JSUnusedGlobalSymbols
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue, { ComponentOptions } from 'vue';

// // declare module '*.vue' {
// //     // noinspection JSUnusedGlobalSymbols
// //     export default Vue;
// // }

type ClassProps = 'beforeCreate' | 'created' | 'beforeDestroy' | 'destroyed' | 'beforeMount' | 'mounted' | 'beforeUpdate' | 'updated' | 'activated' | 'deactivated' | 'errorCaptured' | 'asyncData' | 'fetch' | 'fetchKey' | 'fetchDelay' | 'fetchOnServer' | 'head' | 'key' | 'layout' | 'loading' | 'middleware' | 'scrollToTop' | 'transition' | 'validate' | 'watchQuery' | 'meta';

export type VueClassOptions = Pick<ComponentOptions<Vue>, ClassProps>;

// // declare module 'vue/types/vue' {
// //     interface Vue {
// //         beforeCreate(this: Vue): void;
// //         created?(): void;
// //         beforeDestroy?(): void;
// //         destroyed?(): void;
// //         beforeMount?(): void;
// //         mounted?(): void;
// //         beforeUpdate?(): void;
// //         updated?(): void;
// //         activated?(): void;
// //         deactivated?(): void;
// //         errorCaptured?(err: Error, vm: Vue, info: string): boolean | void;
// //     }
// // }
