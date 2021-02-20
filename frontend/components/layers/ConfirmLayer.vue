<template>
    <div class="layer">
        <div class="layer-container">
            <div v-if="title" v-html="title"></div>
            <div v-if="description" v-html="description"></div>
            <div v-if="message" v-html="message"></div>
            <div>
                <button ref="button" type="button" @click.prevent="$emit('close', true)">
                    <span>{{ acceptButtonCaption }}</span>
                </button>
                <button type="button" @click.prevent="$emit('close')">
                    <span>{{ declineButtonCaption }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        title: {
            type: String,
            default: 'Подтверждение'
        },
        description: {
            type: String
        },
        message: {
            type: String,
            default: 'Вы уверены, что хотите это сделать?'
        },
        acceptButtonCaption: {
            type: String,
            default: 'Да'
        },
        declineButtonCaption: {
            type: String,
            default: 'Нет'
        }
    },
    mounted() {
        this.$refs.button.focus();
    }
});
</script>
