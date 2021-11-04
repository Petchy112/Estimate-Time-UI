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
import userAPI from "~/utils/userAPI"
export default {
    layout: 'liff',
    components: { changepassword },
    methods: {
        goBack() {
            this.$router.push({ name: 'liff-account' })
        },
        async handleChangeClicked(body) {
            console.log(body)
            const response = await userAPI.changepassword(body)
            try {
                await this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Success',
                    message: response.message
                })
                await liff.closeWindow()
            }
            catch (error) {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.error.message
                })
            }
        }
    }
}
</script>

<style>
.btn-confirm {
    position: absolute;
}
</style>
