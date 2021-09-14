<template>
    <div>
        <v-col cols="12">
            <v-card
                max-width="1500px"
                class="card-round pa-6 py-7"
            >
                <v-card-title>
                    <div class="my-header">
                        ESTIMATE TIME APP
                    </div>
                </v-card-title>
                <p class="ml-4">
                    Please login to website
                </p>
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
                                class="width-100 btn-signin"

                                color="rgb(55, 208, 255)"
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
        async login(body) {
            this.$refs.form.validate()
            console.log(body)
            await userAPI.login(this.body)
                .then(async response => {
                    console.log('RESPONSE', response)
                    if (response.data.role.includes('ADMIN')) {
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
.v-application--wrap {
    justify-content: center;
    align-content: center !important;
}
p {
    padding-bottom: 10px 0;
}
.v-card__title {
    margin-top: 0 !important;
    padding-bottom: 0 !important;
}
.card-round {
    margin: 0 auto;
}
.width-100 {
    width: 100%;
    margin-bottom:9px ;
}

.v-form {
    padding: 0 20px;
}
.my-header{
    padding-bottom: 10px;
    font-weight: bold;
    font-size:28px;
}
.btn-signin {
    font-size: 14px !important;
}
</style>
