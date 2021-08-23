<template>
    <div>
        <changepassword />
    </div>
</template>

<script>
import changepassword from "~/components/auth/changepassword.vue"
import * as userAPI from "@/utils/userAPI"
export default {
    components: { changepassword },
    data() {
        return {
            body: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            valid: true,
            show1: false,
            show2: false,
            passwordRules: [
                v => !!v || 'Password is Required.',
                v => (v && v.length >= 8) || 'Min 8 characters',
            ],
            confirmPasswordRules: [
                v => !!v || 'Password is Required.',
                v => (v && v.length >= 8) || 'Min 8 characters',
            ],
        }
    },
    methods: {
        async handleChangeClicked() {
            await userAPI.changepassword(this.body)
                .then(response => {
                    console.log('RESONSE', response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>

</style>
