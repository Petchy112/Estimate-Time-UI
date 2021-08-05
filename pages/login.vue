<template lang="html">
    <div>
        <v-text-field v-model="email" label="Email" solo />
        <v-text-field
            v-model="password"
            label="Password"
            type="password"
            solo
        />
        <v-btn @click="handleLoginClicked">
            Login
        </v-btn>
    </div>
</template>

<script>
// import axios from '@nuxtjs/axios'
export default {
    methods: {
        async handleLoginClicked() {
            // try {

            // }
            // catch {

            // }
        }
    }
}
</script>
