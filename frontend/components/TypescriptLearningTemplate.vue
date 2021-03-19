<template>
    <div>
        <div>
            prop / title: {{ title }}
        </div><br>

        <div>
            data / someDataContent: {{ someDataContent }}
            <br>
            присваивается значение из `title`
        </div><br>

        <div>
            testingData: {{ testingData }}
            <button v-if="!testingData" @click="setTestingData">
                установить данные
            </button>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * @todo Вынести создание компонента в CLI
 *
 * Это болванка компонента.
 * Следует удалить этот файл, когда уже будут созданы какие-нибудь компоненты где можно будет посмотреть другим спецам как работать с `nuxt-property-decorator`.
 */
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { PageData } from '~/models/Page';
import PageService from '~/services/Page';
import { PageStore } from '~/store';

// Интерфейс описывает все данные компонента, которы обычно определяем в `data()`
interface ComponentData {
    someDataContent: string
    testingData: string|null
    page: PageData|null
}

// Все хуки и настройки компонента должны быть переданы параметром декоратора
// Иначе не буду работать подсказки и прочее
@Component({
    // Вы можете выбрать какие поля будете получать в `asyncData`, чтобы TS не ругался на неполноту информации
    async fetch(this: TestComponent): Promise<void> {
        const page = await PageService.getData('index');
        this.page = page;

        // const pageData = await Promise.resolve('some data');
        // this.testingData = pageData;
    },
    // fetch(this: TestComponent): Promise<any> {
    //     return Promise.all([
    //         this.fetchCustomData()
    //     ]);
    // },
    // Чтобы в хуках можно было обращаться к свойствам класса, необходимо установить тип контекста сам класс компонента `this: TestComponent`
    created(this: TestComponent) {
        console.log('created hook :: ', this.testingProp);
    },
    mounted(this: TestComponent) {
        console.log('mounted hook :: ', this.title);
        this.printLogs();
    }
})
// Не забываем `implements ComponentData` чтобы TS ругнулся если вы забыли определить какое-то поле в классе
export default class TestComponent extends Vue implements ComponentData {
    /** Человеческое описание свойства */
    @Prop({ type: String, default: null })
    readonly title!: string;

    // Всегда в декораторе нужно указывать тип данных, иначе Vue не будет знать о том что там внутри ожидается
    @Prop({ type: String, default: null })
    readonly customProp!: string;

    // Для обязательных полей или с дефолтным значением, необъодимо ставить восклицательный знак
    // А так же если хотим присвоить значение пропа data-свойству при инициализации
    @Prop({ type: String, default: 'testingProp: Дефолтное значение' })
    readonly testingProp!: string;

    // Чтобы обратиться к пропу и присвоить его значение в `data()`, это свойство нужно определить с восклицательным знаком `readonly title!: string;`
    // Для таких пропов необходимо обязательно поставить `default: null` иначе свойство не будет создано и ошибка рендера появится
    someDataContent: ComponentData['someDataContent'] = this.title;
    // Иначе будет ошибка
    // someDataContent: ComponentData['someDataContent'] = this.customProp;

    // Допустим вам надо создать поле в дате, чтобы заполнить его при фетче
    // Используйте `null` значение, чтобы переменная была инициализирована реактивно
    // https://class-component.vuejs.org/guide/class-component.html#data
    testingData: ComponentData['testingData'] = null;

    // Все методы должны указывать возвращаемый тип данных
    setTestingData(): void {
        this.testingData = 'Динамические данные';
    }


    page: ComponentData['page'] = null;

    printLogs(): void {
        console.log('page / from data :: ', this.page || 'Запрос ещё не выполнился', '\n\n');
        console.log('page / from store :: ', PageStore);
    }
}
</script>
