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
            <a href="/error-page/">Go to error page</a>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {};
    }
});
</script>

