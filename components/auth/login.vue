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
                                dense
                                v-model="body.email"
                                :rules="emailRules"
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
                                class="width-100"
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
export default {
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
    methods: {
        async login(body) {
            console.log(body)
            this.$refs.form.validate()
            this.$emit('login-clicked', body)
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
