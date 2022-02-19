<template>
    <div class="wrap-page">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="from-input"
        >
            <div class="header">
                Change password
            </div>

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
                    :disabled="!valid"
                    class="btn-confirm"


                    @click="handleChangeClicked(body)"
                >
                    confirm
                </v-btn>
            </div>
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

<style lang='scss' scoped>
.wrap-page {
    margin: 0 auto;
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
        & .button-section {
            margin: 20px;
            & .btn-confirm {
                background: #37d0ff;
                width:100%
            }
        }
    }

}
</style>
