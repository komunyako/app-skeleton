<template>
    <div>
    </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { PageData } from '~/types/api/page';

export default {
    validate(context: Context): boolean {
        const { store } = context;

        return !!store.state.page.data.id;
    },
    async asyncData(context: Context): void {
        const { $axios, store, error } = context;
        const data: {page: PageData} = {
            page: null
        };
        data.page = store.state.page.data;

        if (data.page.content && data.page.content.id) {
            data.page.content = await $axios.$get('/api/contents/' + data.page.content.id);
        }

        if (!data.page.content) {
            return error(null);
        }

        return data;
    },
    data() {
        return {
            page: {}
        };
    }
};
</script>
