<template>
    <div>
        <v-card
            class=" d-flex align-center justify-center"
            color="white"
            height="900px"
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
                                solo-inverted
                            />
                            <v-text-field
                                v-model="body.password"
                                :rules="passwordRules"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"
                                label="Password"
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
                .then(response => {
                    console.log('RESPONSE', response)
                    localStorage.setItem('token', response.data.accessToken)
                    this.$router.push({ name: 'function' })
                })
                .catch(response => {
                    console.log('ERROR', response)

                })
        }

    }
}
</script>

<style>

</style>
