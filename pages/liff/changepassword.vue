<template>
    <div>
        <changepassword @change-password="handleChangeClicked" />
        <v-row>
            <v-btn
                elevation="0"
                class="ml-15 btn-confirm primary"
                width="150px"
                @click="goBack"
            >
                Back
            </v-btn>
        </v-row>
    </div>
</template>

<script>
import changepassword from "~/components/auth/changepassword.vue"
import * as userAPI from "@/utils/userAPI"
export default {
    layout: 'liff',
    components: { changepassword },
    methods: {
        goBack() {
            this.$router.push({ name: 'liff-account' })
        },
        async handleChangeClicked(body) {
            console.log(body)
            await userAPI.changepassword(body)
                .then(async response => {
                    await this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                    await liff.closeWindow()
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
.btn-confirm {
    position: absolute;
}
</style>
