# TypeScript
В сборку теперь подключён TypeScript.
Все скрипты должны писаться только на нём, без исключений. Существующие скрипты тоже будут адаптированы под него в следующих итерациях.


## Как писать код
Мы использовать будем классовый подход. У него есть свои нюансы, но это самый красивый и удобный формат.

Читайте:
- https://vuejs.org/v2/guide/typescript.html#Class-Style-Vue-Components
- https://class-component.vuejs.org/

### Объявление компонента через декоратор `Component`
Так как каждый компонент это класс, нам надо сообщить от чего он наследуется.
Для этого мы пишем `extends Vue`. Но этого недостаточно для корретной работы, поэтому указываем для класса декоратор `@Component`. Всё, теперь наш компонент готов к работе!
Обратите внимание что коструктор Vue нужно импортировать напрямую из пакета с декораторами, чтобы сократить количество импортов.
```ts
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class TestComponent extends Vue {
}
```

Читайте:
- https://www.typescriptlang.org/docs/handbook/decorators.html
- https://github.com/kaorun343/vue-property-decorator
- https://github.com/nuxt-community/nuxt-property-decorator

### Все хуки и настройки необходимо описывать в параметре декоратора `Component`
Так как мы наследуемся напрямую от коструктора, в нём не содержится информация об опциях компонента. Но декоратор знает о них:
```ts
@Component({
    components: [],
    mounted(this: TestComponent) {}
    created(this: TestComponent) {}
    ...
})
export default class TestComponent extends Vue {}
```

Чтобы работали тайпинги, необходимо указать корректный контекст для хуков `mounted(this: TestComponent)` используя созданный нами класс. Без этого у вас будут ошибки что необходимых полей не будет в `this`.

### Нужно писать типы и интерфейсы для результата `asyncData`
```ts
interface PageInfo {
    title: string
}

interface ComponentData {
    pageData: PageInfo|undefined
}

@Component({
    async asyncData(): Promise<ComponentData> {
        const pageData: PageInfo = await Promise.resolve({
            title: 'Page Title'
        });

        return {
            pageData
        };
    },
    mounted(this: TestComponent) {
        console.log(this.title);
    }
})
export default class TestComponent extends Vue {
    @Prop()
    readonly title: string|undefined;

    pageData: ComponentData['pageData'];
}
```

### Что может пойти не так
#### `TS2564: Property 'title' has no initializer and is not definitely assigned in the constructor.`
```ts
@Prop() title: string
```

Так происходит потому что свойство изначально не имеет значения. Для фикса есть два варианта:
```ts
class Test {
    @Prop({ required: true })
    readonly requiredTitle!: string

    @Prop()
    readonly optionalString?: string
}
```
`requiredTitle!:` восклицательный знак говорит что объявленный тип не существует при компиляции, и не обращай внимания на него. *Обязательно* такие пропы должны быть `required: true` или `default: 'Дефолтное значение'`.
Если проп необязательный, то просто ставьте вопрос после имени свойства

### Соблюдать все правила типизации
Важно чтобы наш код был самодокументируемым. Это значит что надо писать типы для любых функций и переменных.

Читайте:
- https://www.typescriptlang.org/docs/handbook/intro.html
- https://vuejs.org/v2/guide/typescript.html
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#definite-assignment-assertions

### Кастомные плагины тоже необходмио типизировать
Не у всех есть встроенные типы и поэтому установленный плагин может вызывать ошибки при использовании.
Например, у нас есть `Layer` для модалок который добавляет свойство `$layer` к Vue. Чтобы это работало, необходимо описать эту аугментацию.
```ts
import Vue from 'vue';

interface LayerInterface {
    open(props?: Record<string, unknown>): Promise<T>
    close(props?: Record<string, unknown>): Promise<T>
    alert(props?: Record<string, unknown>): Promise<T>
    confirm(props?: Record<string, unknown>): Promise<T>
    closeAll(): Promise<T>
}

declare module 'vue/types/vue' {
    interface Vue {
        $layer: LayerInterface
    }
}
```

Читайте:
- https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins

## Складываем типы в папку `./fontend/types`
Допустим, вы описываете типы данных что приходят с бэка. Чтобы все знали и понимали что происходит, а так же могли воспользоваться наработками, эти описания не должны находится в рандомом файле.

## Типы для контекста Nuxt
Ни один из вариантов ниже не подключает подсказки по методам. Хоть даже во втором случае и интерфейс вроде верный. Надо разбираться от чего так.
```
1. async asyncData({ $axios, store, error }) {}
2. async asyncData({ $axios, store, error }: Context) {}
```

Только один вариант работает:
```ts
import {Context} from '@nuxt/types';
// Без указания типа не сработает, да и будет ругаться на этом
asyncData(context: Context) {
    const { $axios, store, error } = context;
}
```
![Пример](https://cleanshot-cloud-fra.s3.eu-central-1.amazonaws.com/media/1270/6nmk9r38L6Nxct1Qi25YaS5rP2tpOETnQ8xaoqbO.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQD%2FJVZQ4NhmBkCWKsBDWXiyLrGobC11X6MAiZq1YrhPogIgPqAzaTjcfPoKvoUf94asEjembIesbdUou05L71wPbqIq4gEIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5MTk1MTQ0OTE2NzQiDK3eyl3DuR1K3kIXZyq2ATHjfjjnrPkRHFjhTSymZStU1V3ShoZ1dMvUKVA5g%2F%2Bm7yocvWw96r8Ai%2FIhY7VKnDQ4q9qwPIT9Ro2qrouw8WdAAGhqxUudHfnBQ2zfmjnR1WARyC6bNBkJiWbSdqHMlli4Pjy%2FdhIs3XYdJytQqKE%2Fw%2FJ7fstqXE9POAWr%2BjUuY2o1wpKKisPzf5xexSng61OX9sLjCatl4QNuo6f8mEaCtKtJeD4uqoEi%2FMJc0SHNx2nEHZ%2F3MOmrk4EGOuABsA9UepPIiUYc9Ws%2FupHDy2I%2BKgzp%2FLg9sTvhqFxWVCAI2MkgUqkyGrODQED0kQrp2HZQ3kwlXuvSfkr4uIUWWE7r8LCtL6BTfFYfBeQIrR8YUMCa%2B28xRc%2BfPsEAyIwtZVDzX7v4uPCvaQxJGzR0iuvb0zIB6gEmZPvgQ26x%2FXAZ8hpBLdRievYzrjIvkQ8vxTWLW1xs379dDeTKrR4zx1G4lJDiPl0I8It074pMyjaoPskQPKzQoBHati7Es%2B1U%2BrJs7yeqD%2BZCBSsEAljRlErA04YyzzEE%2Fonp7RPw87s%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5MF2VVMNGDGECS4H%2F20210211%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210211T090628Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=c248caaf1dae4ef53ffd958dccdaa13379511c26db2cf005cc7eb0ddf4eaf5be)

Если вдруг кто знает или сможет это поправить, пишите сразу Макси!

## Что нужно знать
### Не все редакторы корректно могут загружать типы
В VSCode, например, не работают подсказки по контексту Vue.
Зато точно всё работает в WebStorm или PhpStorm, они протестированы. Так же должны работать и другие IDE, сообщите если работаете на такой чтобы он попал в документацию.


### Подсказки для пропов
В Nuxt настроены динамические импорты компонентов, которое делается в момент сборки. Чтобы работали подсказки по ним, необходимо импортировать файл напрямую.
Пример:
![Подсказки в ](https://cleanshot-cloud-fra.s3.eu-central-1.amazonaws.com/media/1270/x1XPkFV5skvx4hbjOUJd7uMXtadHe4jD1mlx2DXU.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJGMEQCIH0h%2FduBA9n%2BxXlTkRzlT8f0jXx0cRAPcvAd4VIMTZkqAiBw9KrWy4NbqMKu2Wt%2FyDjFuMsc9awteUR%2FmjGdIaayByriAQi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDkxOTUxNDQ5MTY3NCIMeQPYYO7rgktoxq2nKrYBC06SXDn6h2B%2FDXbENP0m0sww4LK09Nxl3xRzWHR4IGWcVOzz33sp%2Fcr7vqHhQXaEK45HleyBXhfL5unrxxqLKJrWUsvaFy3kYlYZJICqZkB7Raab1UiWLpSWsiqA%2BEniRED81sFwO%2FyofxMgPYPrYuedtU%2BuAKBEDhM2ze%2FLSnj7x8bTxz6OWj1Bmg%2B16hNoMoeICE0ZqPdLwtuzoWHkSbD5SlqXD9MG4p0GVma%2Be4ZX3W6BEikw0vCSgQY64QHsbI0XIBXQyn0mpaiIOlquSJNLlZSEzUI15Hy66ATXuyvbWr6i5%2BTbiNVA07BkjZrF0p%2Fe3vsr4ag22J6cEBfOd7Vh%2FCKgzNqdjLW7R9P23Zkh4CWMiQYisqN5b20DrlTE%2Brtx3A3F9pQl%2F0xnjZxK1PDksUP4iehzayvjGDF1YCrFWUOXl%2BWWTeRL8fvx54p555kfB9hh19vvJKQ4XBeVA8JPVemPXacsdXHsZYtg2svKbk%2FHKJO36YjO1HFm48FjKvNaDRsDAhXsgjQKxpD03pcutcI7s5UQoTsTbNjZLT4%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5MF2VVMNBFP64PZS%2F20210211%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210211T054326Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=0eb12a68c5838a04dfc4a7d26d0f0de6d6ed458a3fc6545624b687768f8f32c3)


## Проблемы и решения
