<template>
    <div class="wrap-page">
        <div class="form">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <div class="header mb-8">
                    REGISTER FORM
                </div>

                <v-text-field
                    dense
                    v-model="body.firstname"
                    :rules="firstnameRules"
                    label="Firstname"
                    required
                    outlined
                />
                <v-text-field
                    dense
                    v-model="body.lastname"
                    :rules="lastnameRules"
                    label="Lastname"
                    required
                    outlined
                />

                <v-text-field
                    dense
                    v-model="body.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    outlined
                />
                <v-text-field
                    dense
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    v-model="body.password"
                    class="input-group--focused"
                    @click:append="show1 = !show1"
                    outlined
                />
                <v-text-field
                    dense
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="confirmPasswordRules"
                    :type="show2 ? 'text' : 'password'"
                    label="Confirm Password"
                    hint="At least 8 characters"
                    v-model="body.confirmPassword"
                    class="input-group--focused"
                    @click:append="show2 = !show2"
                    outlined
                />
                <v-text>Select role of user (Required)</v-text>
                <div class="checkbox my-2 ml-4">
                    <v-checkbox
                        dense
                        v-model="body.role"
                        label="ADMIN"
                        value="ADMIN"
                    />
                    <v-checkbox
                        dense
                        v-model="body.role"
                        label="VOTER"
                        value="VOTER"
                    />
                    <v-checkbox
                        dense
                        v-model="body.role"
                        label="COORDINATOR"
                        value="COORDINATOR"
                    />
                </div>
            </v-form>
        </div>

        <div class="buttom-section">
            <v-btn
                :disabled="!valid"
                color="success"
                class="save"
                @click="register"
            >
                SAVE
            </v-btn>
        </div>
    </div>
</template>

<script>
import toastr from 'toastr'
import userAPI from "~/utils/userAPI"
export default {
    data: () => ({
        valid: true,
        show1: false,
        show2: false,
        passwordRules: [
            v => !!v || 'Required.',
            v => (v && v.length >= 8) || 'Min 8 characters',
        ],
        confirmPasswordRules: [
            v => !!v || 'Required',
            v => (v && v.length >= 8) || 'Min 8 characters',
        ],
        firstnameRules: [
            v => !!v || 'Required',

        ],
        lastnameRules: [
            v => !!v || 'Required',

        ],
        emailRules: [
            v => !!v || 'Required',
            v => /.+@.+\..+/.test(v) || 'Email is invalid format',
        ],

        body: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: []

        }
    }),

    methods: {
        async register () {
            if (this.$refs.form.validate()) {
                await userAPI.register(this.body)
                try {
                    toastr.success(response.message)
                    await this.$router.push({ name: 'admin-user' })
                }
                catch (error) {
                    toastr.error(error.response.message)

                }
            }
        },
        async cancel () {
            this.$router.push({ name: 'admin-user' })
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
    },
}
</script>

<style lang='scss' scoped>
.wrap-page{
    margin: 0 auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & .header {
        font-size: 32px;
        font-weight: 600;
        text-align: center;
    }
    & .save {
        width: 100%;
    }
}

</style>
