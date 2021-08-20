<template>
    <div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="pa-5 ma-4"
        >
            <h1 class="mb-8">
                REGISTER FORM
            </h1>
            <v-col
                cols="12"
                sm="12"
            >
                <v-text-field
                    v-model="body.firstname"
                    :counter="10"
                    :rules="firstnameRules"
                    label="Firstname"
                    required
                    solo-inverted
                />
                <v-text-field
                    v-model="body.lastname"
                    :counter="10"
                    :rules="lastnameRules"
                    label="Lastname"
                    required
                    solo-inverted
                />

                <v-text-field
                    v-model="body.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    solo-inverted
                />
                <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    v-model="body.password"
                    class="input-group--focused"
                    @click:append="show1 = !show1"
                    solo-inverted
                />
                <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="confirmPasswordRules"
                    :type="show2 ? 'text' : 'password'"
                    label="Confirm Password"
                    hint="At least 8 characters"
                    v-model="body.confirmPassword"
                    class="input-group--focused"
                    @click:append="show2 = !show2"
                    solo-inverted
                />

                <v-select
                    :items="items"
                    :rules="[v => !!v || 'Role is required']"
                    label="Select Role"
                    required
                    solo-inverted
                />

                <v-btn
                    color="error"
                    class="mr-4"
                    @click="cancel"
                >
                    cancel
                </v-btn>

                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="register"
                >
                    register
                </v-btn>
            </v-col>
        </v-form>
    </div>
</template>

<script>
import * as userAPI from "@/utils/userAPI"
export default {
    data: () => ({
        valid: true,
        show1: false,
        show2: false,
        passwordRules: [
            v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน.',
            v => (v && v.length >= 8) || 'ขั้นต่ำ 8 อักษร',
        ],
        confirmPasswordRules: [
            v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน',
            v => (v && v.length >= 8) || 'ขั้นต่ำ 8 อักษร',
        ],
        firstnameRules: [
            v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน',
            v => (v && v.length <= 10) || 'ชื่อต้องมีขั้นต่ำ 10 อักษร',
        ],
        lastnameRules: [
            v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน',
            v => (v && v.length <= 10) || 'นามสกุลต้องมีขั้นต่ำ 10 อักษร',
        ],
        emailRules: [
            v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน',
            v => /.+@.+\..+/.test(v) || 'กรุณากรอกให้เป็นรูปแบบอีเมล',
        ],
        select: null,
        items: [
            'ADMIN',
            'VOTER',
            'COORDINATOR',
        ],
        body: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }),

    methods: {
        async register () {
            this.$refs.form.validate()
            await userAPI.register(this.body)
                .then(response => {
                    console.log('RESPONSE', response)
                    this.$router.push({ name: 'user' })
                })
                .catch(async error => {
                    console.log('ERROR', error.response)
                    this.message = error.response.data.error.message
                })
        },
        async cancel () {
            this.$router.push({ name: 'user' })
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
    },
}
</script>

<style>
h1 {
    text-align: center;
}

</style>
