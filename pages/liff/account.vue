<template>
    <v-app class="wrap-page">
        <div>
            <div class="wrap-account-setting">
                <div class="text-header">
                    ACCOUNT SETTING
                </div>

                <div class="button-group">
                    <v-btn class="role-btn" color="primary" @click="role" rounded>
                        Select role
                    </v-btn>
                    <v-btn class="role-btn" color="primary" @click="changepassword" rounded>
                        Change password
                    </v-btn>
                    <v-btn class="role-btn" color="error" @click="logout" rounded>
                        Sign out
                    </v-btn>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
import toastr from 'toastr'
import { mapMutations } from 'vuex'
import userAPI from "~/utils/userAPI"
export default {
    layout: 'plain',
    mounted() {
    },

    methods: {
        ...mapMutations ({
            resetAuth: "auth/resetAuth",
        }),
        role() {
            this.$router.push({ name: 'liff-role' })
        },
        async logout() {
            await userAPI.logout()
                .then(async response => {
                    await this.resetAuth()
                    liff.closeWindow()
                })
                .catch(error => {
                    toastr.error(error.response.error.message)
                })
        },
        changepassword() {
            this.$router.push({ name: 'liff-changepassword' })
        }

    }

}

</script>

<style lang='scss' scoped>
.wrap-page {
    background-color: #37d0ffcc !important;
    padding: 12px;
    & .wrap-account-setting {
        background-color: #fafafa;
        margin: 16px;
        border-radius: 5px;
        padding: 10px;
        & .text-header {
            margin: 16px 0 0 20px;
            font-size: x-large;
            font-weight: bold;
            align-items: center;
        }
        & .button-group {
            padding: 8px;
            display: flex;
            flex-direction: column;
            margin: 10px;
        }
        & .role-btn {
            margin-top: 20px !important;
            height: 40px !important;
            font-size: 14px;
        }
    }

}

</style>
