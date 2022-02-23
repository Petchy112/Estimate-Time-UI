<template>
    <div class="wrap-page">
        <div class="wrap-card-login">
            <div class="top">
                <div class="header">
                    ESTIMATE TIME APP
                </div>
                <p> Please login to website</p>
            </div>

            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                    dense
                    v-model="body.email"
                    :rules="emailRules"
                    type="email"
                    label="Email"
                    outlined
                    required
                />
                <v-text-field
                    dense
                    v-model="body.password"
                    :rules="passwordRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    label="Password"
                    outlined
                    required
                />
                <v-btn
                    class="btn-signin"
                    @click="onSubmit"
                >
                    Sign in
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import toastr from "toastr"
import { mapMutations } from 'vuex'

import userAPI from "~/utils/userAPI"
export default {
    layout: 'plain',
    data() {
        return {
            token: '',
            valid: false,
            message: '',
            body: {
                email: '',
                password: '',

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

    methods: {
        ...mapMutations({
            setProfile: "profile/setProfile",
            setAuth: "auth/setAuth",
        }),
        async onSubmit() {
            if (this.$refs.form.validate()) {
                await userAPI.login(this.body)
                    .then(async response => {
                        if (response.role.includes('ADMIN')) {
                            this.setAuth(response)
                            const profile = await userAPI.getProfile()
                            await this.setProfile(profile)
                            this.$router.push('/admin/function')
                            toastr.success('Welcome')
                        }
                        else {
                            this.$store.dispatch('setDialog', {
                                isShow: true,
                                title: 'Please try again',
                                message: 'User not in permission'
                            })
                        }
                    })
                    .catch(async error => {
                        // console.log(error)
                        toastr.error(error.response.message)
                    })
            }

        }
    }
}
</script>

<style scoped lang='scss'>
.wrap-page {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    & .wrap-card-login{
        position: absolute;
        top: 25%;
        width: 700px;
        & .top {
            margin: 24px 0 24px 0;
            & .header {
                font-size: 28px;
                font-weight: 600;
            }
        }
        & .btn-signin {
            color: #FFF;
            margin-top: 10px;
            width: 100%;
            background-color: #37d0ff;
            border-radius: 8px;
        }

    }
}


@media only screen and (max-width: 767px) {
    .wrap-page .wrap-card-login {
        width: auto;
    }
}
</style>
