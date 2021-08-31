<template>
    <div>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <div class="my-header">
                        ESTIMATE TIME APP
                    </div>
                </v-card-title>
                <v-card-subtitle>
                    Please login to website
                </v-card-subtitle>

                <v-row>
                    <v-col cols="12">
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-text-field
                                v-model="body.email"
                                :rules="emailRules"
                                type="email"
                                hint="Email"
                                label="Email"
                                solo-inverted
                                required
                            />
                            <v-text-field
                                v-model="body.password"
                                hint="Password"
                                :rules="passwordRules"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"
                                label="Password"
                                solo-inverted
                                required
                            />
                            <v-btn
                                class="width-100"
                                color="orange"
                                rounded
                                @click="login(body)"
                                dark
                            >
                                Sign in
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </div>
</template>

<script>
import * as userAPI from "@/utils/userAPI"
export default {
    layout: 'blank',
    data() {
        return {
            token: '',
            valid: true,
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
        logs(body) {
            return this.body = body
        },
        async login(body) {
            this.$refs.form.validate()
            await userAPI.login(body)
                .then(async response => {
                    console.log('RESPONSE', response)
                    if (response.data.role == 'ADMIN') {
                        localStorage.setItem('token', response.data.accessToken)
                        this.$router.push({ name: 'function' })
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
                    console.log('ERROR page', error.response.data.error.message)
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
.v-card-subtitle {
    padding-bottom: 10px 0;
}
.width-100 {
    width: 100%;
    margin-bottom:9px ;
}
.v-form {
    padding: 0 20px;
}
.my-header{
    font-weight: bold;
    font-size: x-large;
}
</style>
