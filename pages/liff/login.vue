<template>
    <div class="wrap-page">
        <div class="wrap-card-login">
            <div class="top">
                <div class="header">
                    ESTIMATE TIME APP
                </div>
                <p> Please login to application</p>
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
                    :loading="isCalling"
                    :disabled="isCalling"
                >
                    Sign in
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import toastr from "toastr"
import { mapState, mapMutations } from 'vuex'

import userAPI from "~/utils/userAPI"
export default {
    layout: 'plain',
    data() {
        return {
            isCalling: false,
            token: '',
            valid: false,
            message: '',
            body: {
                email: '',
                password: '',
                profilePic: null,
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
    computed: {
        ...mapState({
            line: state => state.line
        })
    },
    methods: {
        ...mapMutations({
            setProfile: "profile/setProfile",
            setAuth: "auth/setAuth",
        }),
        async onSubmit() {
            if (this.$refs.form.validate()) {
                this.isCalling = true
                await userAPI.login(this.body)
                    .then(async response => {
                        if (response.role.includes('VOTER') || response.role.includes('COORDINATOR')) {
                            this.setAuth(response)
                            const profile = await userAPI.getProfile()
                            await this.setProfile(profile.profile)
                            if (response.role.includes('VOTER')) {
                                await userAPI.selectRole({
                                    'role': "VOTER",
                                    'lineUserId': this.line.lineUserId
                                })
                            }
                            else if (response.role.includes('COORDINATOR')) {
                                await userAPI.selectRole({
                                    'role': "COORDINATOR",
                                    'lineUserId': this.line.lineUserId
                                })
                            }
                            else {
                                await userAPI.selectRole({
                                    'role': response.role[0],
                                    'lineUserId': this.line.lineUserId
                                })
                            }
                            liff.closeWindow()
                        }
                        else {
                            this.isCalling = false
                            toastr.error('User not in permission')
                        }
                    })
                    .catch(async error => {
                        this.isCalling = false
                        toastr.error(error.response.data.error.message)
                    })
            }

        }
    },
    mounted() {
        this.body.lineUserId = this.line.lineUserId
        this.body.profilePic = this.line.picture
        console.log(this.body, 'body')
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
