<template>
    <div>
        <v-app class="back">
            <v-col cols="12">
                <v-card elevation="5">
                    <v-list>
                        <v-list-title>
                            <div class="my-text ml-5 mt-4">
                                SELECT ROLE :
                            </div>
                        </v-list-title>

                        <v-col cols="12">
                            <div class="d-flex flex-column pa-2">
                                <v-btn v-if="role.includes('VOTER')" @click="close('VOTER')" rounded class="role-btn" color="rgb(55, 208, 255)">
                                    VOTER
                                </v-btn>
                                <v-btn v-if="role.includes('COORDINATOR')" @click="close('COORDINATOR')" rounded class="role-btn" color="rgb(55, 208, 255)">
                                    COORDINATOR
                                </v-btn>
                            </div>
                        </v-col>
                    </v-list>
                </v-card>
            </v-col>
        </v-app>
    </div>
</template>

<script>
import * as userAPI from "~/utils/userAPI"
export default {

    layout: 'liff',

    data() {
        return {
            userData: [],
            role: [],
        }
    },
    mounted() {
        userAPI.getProfile()
            .then(async response => {
                console.log('RESPONSE', response.data)
                this.userData = response.data
                if (this.userData.role.length == 1) {
                    await userAPI.selectRole(this.userData.role[0])
                        .then(async response => {
                            console.log(this.userData.role[0])
                            await liff.closeWindow()
                        })
                        .catch(async error => {
                            this.$store.dispatch('setDialog', {
                                isShow: true,
                                title: 'Please try again',
                                message: error.response.data.error.message
                            })
                            await liff.closeWindow()
                        })
                }
                if (this.userData.role.length != 1) {
                    this.role = this.userData.role
                }
            })
            .catch(async error => {
                await this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
                await this.$router.push({ name: 'liff' })
            })
    },
    methods: {
        async close(role) {
            await userAPI.selectRole(role)
                .then(async response => {
                    await liff.closeWindow()
                })
                .catch(error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })
                })

        }

    },

}
</script>

<style scoped>
.back {
    background-color: rgba(55, 208, 255, 0.8) !important;
}
.my-text {
    font-weight: bold;
    font-size: x-large;
}
.v-list__title {
    font-weight: bold;
}
.role-btn {
    margin-top: 20px;
    height: 50px !important;
    font-size: 16px;
}
</style>
