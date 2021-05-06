<template>
    <div class="asd">
        <h1 class="my-8 font-bold text-5xl">
            App skeleton
        </h1>
        <div class="mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="mb-8">
            <TypescriptLearningTemplate title="Какой-то заголовок установленный пропсом" />
        </div>
        <ul class="mb-8">
            <li>
                <button @click.prevent="$layer.alert()">
                    Alert
                </button>
            </li>
            <li>
                <button @click.prevent="$layer.confirm()">
                    Confirm
                </button>
            </li>
        </ul>
        <div>
            <NuxtLink to="/error-page/">
                Go to error page
            </NuxtLink>
        </div>
        <!--@todo добавлено для минимальной иллюстрации компонентов - удалить потом-->
        <div class="bg-blue-100 py-4 mb-20">
            <InputField
                :value.sync="input"
                title="Введите инпут"
                placeholder="плейсхолдер"
                required
            />
            <div class="my-4">
                input - {{ input }}
            </div>
            <TextareaField
                :value.sync="textarea"
                title="Введите textarea"
                placeholder="плейсхолдер textarea"
            />
            <div class="my-4">
                textarea - {{ textarea }}
            </div>
            <div>
                <ToggleField :value.sync="checkbox1.value" :title="checkbox1.title" />
                checkbox1 - {{ checkbox1.value }}
            </div>
            <div>
                <ToggleField :value.sync="checkbox2.value" :title="checkbox2.title" />
                checkbox2 - {{ checkbox2.value }}
            </div>
            <div v-for="radio in radioButtons" :key="radio.title">
                <ToggleField type="radio" :value.sync="pickedRadioButton" :title="radio.title" :field-value="radio.value" />
            </div>
            pickedRadioButton - {{ pickedRadioButton }}
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import TypescriptLearningTemplate from '~/components/TypescriptLearningTemplate.vue';
import InputField from '~/components/Form/InputField.vue';
import TextareaField from '~/components/Form/TextareaField.vue';
import ToggleField from '~/components/Form/ToggleField.vue';

interface IndexPageData {
    input: string|null,
    textarea: string|null,
    checkbox1: {value: boolean, title: string},
    checkbox2: {value: boolean, title: string},
    radioButtons: Array<{value: string, title: string}>,
    pickedRadioButton: string|null
}

@Component({
    // Чтобы работали подсказки пропов в шаблоне, необходимо указывать импорт компонента
    // https://cln.sh/hfJ3RJoStaQN2bGS4Qd8
    components: {
        ToggleField,
        TextareaField,
        InputField,
        TypescriptLearningTemplate
    }
})
export default class IndexPage extends Vue implements IndexPageData {
    input = null;
    textarea = null;
    checkbox1 = {
        value: false,
        title: 'hi'
    };

    checkbox2 = {
        value: false,
        title: 'hi 2'
    };

    radioButtons = [
        {
            value: 'radio 1',
            title: 'radio 1'
        },
        {
            value: 'radio 2',
            title: 'radio 2'
        }
    ];

    pickedRadioButton = null;
}
</script>
