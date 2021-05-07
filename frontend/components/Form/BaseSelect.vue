<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import Multiselect from 'vue-multiselect';
// @todo удалить при разработке, добавить собственные стили
import 'vue-multiselect/dist/vue-multiselect.min.css';

@Component({
    extends: Multiselect,
    components: { Multiselect }
})
export default class BaseSelect extends Vue {
    @Prop({ type: Boolean, default: false })
    readonly searchable!: boolean;

    @Prop({ type: Boolean, default: false })
    readonly showLabels!: boolean;

    @Prop({ type: String, default: '[Enter] чтобы удалить' })
    readonly deselectLabel!: string;

    @Prop({ type: Boolean, default: false })
    readonly allowEmpty!: boolean;
}
</script>

