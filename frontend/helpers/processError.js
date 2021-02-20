import Vue from 'vue';

export default function processError(error, fieldErrors) {
    if (error.isAxiosError) {
        error = error.response.data.error;

        if (fieldErrors) {
            for (const i in fieldErrors) {
                if (Object.prototype.hasOwnProperty.call(fieldErrors, i)) {
                    Vue.delete(fieldErrors, i);
                }
            }

            if (error.request) {
                for (const i in error.request) {
                    if (Object.prototype.hasOwnProperty.call(error.request, i)) {
                        Vue.set(fieldErrors, i, error.request[i]);
                    }
                }
            }
        }
    }

    if (error.message) {
        Vue.prototype.$layer.alert({
            title: 'Ошибка',
            message: error.message
        });
    }
}
