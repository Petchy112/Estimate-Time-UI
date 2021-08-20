<template>
    <div>
        <div v-if="message">
            <v-row justify-md="end">
                <v-col
                    md="5"
                    class="justify--end"
                >
                    <v-alert
                        dense
                        elevation="5"
                        type="error"
                    >
                        {{ message }}
                    </v-alert>
                </v-col>
            </v-row>
        </div>
        <v-card
            class=" d-flex align-center justify-center"
            color="white"
            height="600px"
            flat
        >
            <v-card
                class="pa-10"
                color="grey lighten-4"
                width="700px"
            >
                <v-card-title
                    elevation="0"
                    class="text-sm-h1 text-md-h4"
                >
                    Estimated Time App
                </v-card-title>
                <v-card-subtitle class="pt-1 pl-7">
                    PLEASE LOGIN TO WEBSITE
                </v-card-subtitle>

                <v-card-content>
                    <v-row justify="center">
                        <v-col
                            class="ma-xs-4 mx-md-auto"
                            sm="4"
                            md="11"
                        >
                            <v-text-field
                                v-model="body.email"
                                :rules="emailRules"
                                label="Email"
                                class="input-group--focused"
                                solo-inverted
                            />
                            <v-text-field
                                v-model="body.password"
                                :rules="passwordRules"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"
                                label="Password"
                                class="input-group--focused"
                                solo-inverted
                            />
                            <v-row>
                                <v-col
                                    cols="12"
                                    align="end"
                                >
                                    <v-btn
                                        color="success"
                                        @click="login"
                                    >
                                        Sign in
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-content>
            </v-card>
        </v-card>
    </div>
</template>

<script>
import * as userAPI from "@/utils/userAPI"
export default {
    layout: 'blank',
    data () {
        return {
            message: '',
            body: {
                email: '',
                password: ''
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
        async login() {
            await userAPI.login(this.body)
                .then(async response => {
                    console.log('RESPONSE', response)
                    await localStorage.setItem('token', response.data.accessToken)
                    this.$router.push({ name: 'function' })
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
