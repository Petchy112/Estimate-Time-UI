<template>
    <div>
        <v-col cols="12">
            <changepassword @change-password="handleChangeClicked" />
        </v-col>
    </div>
</template>

<script>
import changepassword from "~/components/auth/changepassword.vue"
import * as userAPI from "@/utils/userAPI"
export default {
    layout: 'liff',
    components: { changepassword },
    methods: {
        async handleChangeClicked(body) {
            console.log(body)
            await userAPI.changepassword(body)
                .then(async response => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                    liff.closeWindow()
                })
                .catch(error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })
                })
        }
    }
}
</script>

<style>

</style>
