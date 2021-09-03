<template>
    <div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class=""
        >
            <h1 class="mb-8 mt-5">
                Change password
            </h1>
            <v-col
                cols="12"
                sm="12"
            >
                <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="Current password"
                    hint="At least 8 characters"
                    v-model="body.oldPassword"
                    class="input-group--focused"
                    @click:append="show1 = !show1"
                    outlined
                />
                <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show2 ? 'text' : 'password'"
                    label="New password"
                    hint="At least 8 characters"
                    v-model="body.newPassword"
                    class="input-group--focused"
                    @click:append="show2 = !show2"
                    outlined
                />
                <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="confirmPasswordRules"
                    :type="show3 ? 'text' : 'password'"
                    label="Re-enter new password"
                    hint="At least 8 characters"
                    v-model="body.confirmPassword"
                    class="input-group--focused"
                    @click:append="show3 = !show3"
                    outlined
                />
                <v-col cols="12">
                    <v-btn
                        elevation="0"
                        :disabled="!valid"
                        color="orange"
                        class="sm w-100"
                        @click="handleChangeClicked(body)"
                    >
                        confirm
                    </v-btn>
                </v-col>
            </v-col>
        </v-form>
    </div>
</template>

<script>
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
            show3: false,
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
            console.log(this.body)
            this.$emit('change-password', this.body)
        }
    }
}
</script>

<style>
.d-flex {
    justify-content: space-around;
    margin-top: 20px;

}

</style>
