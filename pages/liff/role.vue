<template>
    <div>
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
                            <v-btn v-if="userData.role =='VOTER' " @click="close" rounded class="role-btn" color="rgb(55, 208, 255)">
                                VOTER
                            </v-btn>
                            <v-btn v-else-if="userData.role =='COORDINATOR'" @click="close" rounded class="role-btn" color="rgb(55, 208, 255)">
                                COORDINATOR
                            </v-btn>
                        </div>
                    </v-col>
                </v-list>
            </v-card>
        </v-col>
    </div>
</template>

<script>
import * as userAPI from "~/utils/userAPI"
export default {

    layout: 'liff',

    data() {
        return {
            userData: []
        }
    },
    mounted() {
        userAPI.getProfile()
            .then(response => {
                console.log('RESPONSE', response.data)
                this.userData = response.data
            })
            .catch(async error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
                await this.$router.push({ name: 'liff' })
            })
    },
    methods: {
        close() {
            liff.closeWindow()
        }

    },

}
</script>

<style scoped>
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
