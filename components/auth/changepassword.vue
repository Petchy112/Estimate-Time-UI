<template>
    <div class="wrap-page">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="from-input"
        >
            <div class="header">
                CHANGE PASSWORD
            </div>
            <div class="wrap-form">
                <v-text-field
                    dense
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="Current password"
                    hint="At least 8 characters"
                    v-model="body.oldPassword"
                    class="input-group--focused mx-10"
                    @click:append="show1 = !show1"
                    outlined
                />
                <v-text-field
                    dense
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show2 ? 'text' : 'password'"
                    label="New password"
                    hint="At least 8 characters"
                    v-model="body.newPassword"
                    class="input-group--focused mx-10"
                    @click:append="show2 = !show2"
                    outlined
                />
                <v-text-field
                    dense
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="confirmPasswordRules"
                    :type="show3 ? 'text' : 'password'"
                    label="Re-enter new password"
                    hint="At least 8 characters"
                    v-model="body.confirmPassword"
                    class="input-group--focused mx-10"
                    @click:append="show3 = !show3"
                    outlined
                />

                <div class="button-section">
                    <v-btn
                        :disabled="!valid || isCalling"
                        :loading="isCalling"
                        class="btn-confirm"
                        @click="handleChangeClicked(body)"
                    >
                        confirm
                    </v-btn>
                </div>
            </div>
        </v-form>
    </div>
</template>

<script>
import userAPI from "~/utils/userAPI"
import toastr from 'toastr'
export default {
    layout: 'plain',
    data() {
        return {
            isCalling: false,
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
            this.isCalling = true
            await userAPI.changepassword(this.body)
                .then(async (response) => {
                    toastr.success(response.message)
                    this.isCalling = false
                    await liff.closeWindow()
                }) .catch((error) => {
                    toastr.error(error.response.data.error.message)
                    this.isCalling = false
                })


        }
    }
}
</script>

<style lang='scss' scoped>
.wrap-page {
    margin: 20px;
    display: flex;
    justify-content: center;
    & .from-input {
        width: 500px;
        & .header {
            text-align: center;
            font-size: 32px;
            font-weight: 600;
            padding: 18px 0 18px ;
        }
        & .wrap-form {

            margin: 18px 18px 18px;
        }
        & .button-section {
            margin-top: 20px;
            & .btn-confirm {
                background: #37d0ff;
                width:100%;
                border-radius: 10px;
                color: #fafafa;
            }
        }
    }

}
</style>
