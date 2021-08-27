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
            valid: true,
            message: '',
            body: {
                email: '',
                password: '',
                lineUserId: ''
            },
            show: false,
            passwordRules: [
                v => !!v || 'Password is Required.',
                v => (v && v.length >= 8) || 'Min 8 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    mounted() {
        liff.init({
            liffId: '1656364274-8p9ZXm3e'
        }).then(() => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    this.body.lineUserId = profile.userId
                })
            }
            else {
                liff.login()
            }
        })
    },
    methods: {
        async login(body) {
            await userAPI.login(body)
                .then(async response => {
                    console.log('RESPONSE', response)
                    await localStorage.setItem('token', response.data.accessToken)
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
