<template>
    <div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="pa-5 ma-4"
        >
            <h1 class="mb-8">
                Change Password
            </h1>
            <v-col
                cols="12"
                sm="12"
            >
                <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="Old password"
                    hint="At least 8 characters"
                    v-model="body.oldPassword"
                    class="input-group--focused"
                    @click:append="show1 = !show1"
                    solo-inverted
                />
                <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="New password"
                    hint="At least 8 characters"
                    v-model="body.newPassword"
                    class="input-group--focused"
                    @click:append="show1 = !show1"
                    solo-inverted
                />
                <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="confirmPasswordRules"
                    :type="show2 ? 'text' : 'password'"
                    label="Re-enter new password"
                    hint="At least 8 characters"
                    v-model="body.confirmPassword"
                    class="input-group--focused"
                    @click:append="show2 = !show2"
                    solo-inverted
                />

                <v-row justify-md="end">
                    <v-btn
                        color="error"
                        class="ma-4"
                        @click="cancel"
                    >
                        cancel
                    </v-btn>

                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="ma-4"
                        @click="handleChangeClicked"
                    >
                        Confirm
                    </v-btn>
                </v-row>
            </v-col>
        </v-form>
    </div>
</template>

<script>
import * as userAPI from "@/utils/userAPI"
export default {
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
