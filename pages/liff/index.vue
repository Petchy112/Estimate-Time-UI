<template>
    <div>
        <login @login-clicked="login" />
    </div>
</template>

<script>
import * as userAPI from "@/utils/userAPI"
import login from "~/components/auth/login.vue"
export default {
    components: {
        login
    },
    layout: 'blank',
    data() {
        return {
            lineUserId: ''
        }
    },
    mounted() {
        liff.init({
            liffId: '1656364274-8p9ZXm3e'
        }).then(() => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    this.lineUserId = profile.userId
                })
            }
            else {
                liff.login()
            }
        })
    },
    methods: {
        async login(body) {
            await userAPI.login(body, lineUserId)
                .then(async response => {
                    console.log('RESPONSE', response)
                    // await localStorage.setItem('token', response.data.accessToken)
                    console.log('closeWindow')
                })
                .catch(async error => {
                    console.log('ERROR', error.response)
                    this.message = error.response.data.error.message
                })
        }
    }
}
</script>

<style>

</style>
