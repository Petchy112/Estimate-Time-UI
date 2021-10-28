<template>
    <div>
        <v-col cols="12">
            <div class="login-card">
                <v-card-title>
                    <div class="my-header">
                        ESTIMATE TIME APP
                    </div>
                </v-card-title>
                <v-col cols="12" class="mb-5 text-center profile-img">
                    <img width="80px" :src="profile? profile : require('~/assets/default-profile.png')">
                </v-col>

                <v-row>
                    <v-col cols="12">
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
                                class="width-100 mb-5"
                                color="rgb(55, 208, 255)"
                                rounded
                                @click="login"
                                dark
                            >
                                Sign in
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </div>
        </v-col>
    </div>
</template>

<script>
import * as userAPI from "~/utils/userAPI"
export default {
    layout: 'blank',
    data() {
        return {
            valid: true,
            message: '',
            body: {
                email: '',
                password: '',
                lineUserId: '',
                profilePic: '',
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
    async mounted() {
        // await liff.init({
        //     liffId: '1656364274-ADg78Boe'
        // })
        // if (await liff.isLoggedIn()) {
        //     liff.getProfile().then(profile => {
        //         console.log(profile)
        //         this.body.lineUserId = profile.userId
        //         this.body.profilePic = profile.pictureUrl
        //         localStorage.setItem('lineUserId', profile.userId)
        //     })
        // }
        // else {
        //     await liff.login()
        // }


    },
    computed: {
        profile() {
            return this.body.profilePic
        }
    },
    methods: {
        async login() {
            this.$refs.form.validate()
            await userAPI.login(this.body)
                .then(async response => {
                    console.log('RESPONSE', response)
                    await localStorage.setItem('token', response.accessToken)
                    this.$router.push({ name: 'liff-role' })

                })
                .catch(error => {
                    console.log('ERROR page', error.response)
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.error.message
                    })
                })
        }
    }
}
</script>

<style>
.v-card-subtitle {
    padding-bottom: 10px 0;
}
.width-100 {
    width: 100%;
    margin-bottom:9px ;
}
.login-card {
    border: 1px solid rgba(0,0,0, 0.3);
    border-radius: 8px;
    margin: 16px ;
    background-color: #fafafa;
    padding: 16px 20px;


}
.v-form {
    padding: 0 20px;
}
.my-header{
    font-weight: bold;
    font-size: x-large;
}
img {
    border-radius:50% ;
}
</style>
