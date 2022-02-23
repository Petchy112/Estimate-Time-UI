<template>
    <v-app class="back">
        <div>
            <v-col cols="12">
                <v-card rounded>
                    <v-list>
                        <h2 class="text-center mt-3">
                            What do you want to ?
                        </h2>
                        <v-col cols="12">
                            <div class="d-flex flex-column pa-2">
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
                        </v-col>
                    </v-list>
                </v-card>
            </v-col>
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

<style scoped>
.back {
    background-color: rgba(55, 208, 255, 0.8) !important;
}
.v-list__title {
    font-weight: bold;
}

.role-btn {
    margin-top: 20px !important;
    height: 50px !important;
    font-size: 16px;
}

</style>
