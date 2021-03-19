<template>
    <div>
        {{ page.content }}
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { PageData } from '~/models/Page';
import PageService from '~/services/Page';


interface ComponentData {
    page: PageData | null
}

@Component({
    async asyncData({ error, store }): Promise<ComponentData | void> {
        const data = {
            page: store.state.page.data
        };

        if (data.page?.content?.id) {
            data.page.content = await PageService.getContent(data.page.content.id);
        }

        if (!data.page?.content) {
            return error({ statusCode: 404 });
        }

        return data;
    }
})
export default class BasicPage extends Vue implements ComponentData {
    page: ComponentData['page'] = null;
}
</script>
