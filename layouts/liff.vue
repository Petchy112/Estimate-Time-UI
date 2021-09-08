<template>
    <v-app>
        <v-container>
            <Nuxt />
        </v-container>
        <alertDialog />
    </v-app>
</template>

<script>
import * as userAPI from "~/utils/userAPI"
import alertDialog from "~/components/dialog/alertDialog.vue"
export default {
    components: {
        alertDialog
    },
    data() {
        return {
            userData: [],
        }
    },
    mounted() {
        userAPI.getProfile()
            .then(response => {
                console.log('RESPONSE', response.data)
                this.userData = response.data
            })
            .catch(async error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
                await this.$router.push({ name: 'liff' })
            })
    },
}
</script>

<style>
.v-application{
    font-family: 'Mitr', sans-serif !important;
}
.v-application--wrap {
    background-color: rgb(55, 208, 255);

}
.w-100{
 width: 100%;
}
.container {
    padding: 0 !important;
}
</style>
