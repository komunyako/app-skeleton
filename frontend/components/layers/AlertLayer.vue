<template>
    <div class="layer">
        <div class="layer-container">
            <div v-if="title" v-html="title"></div>
            <div v-if="description" v-html="description"></div>
            <div v-if="message" v-html="message"></div>
            <div>
                <button ref="button" type="button" class="btn" @click.prevent="$emit('close')">
                    <span>{{ buttonCaption }}</span>
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
            type: String
        },
        description: {
            type: String
        },
        message: {
            type: String
        },
        buttonCaption: {
            type: String,
            default: 'Понимаю'
        }
    },
    mounted() {
        this.$refs.button.focus();
    }
});
</script>
