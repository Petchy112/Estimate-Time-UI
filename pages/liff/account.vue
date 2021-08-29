<template>
    <div>
        <v-col cols="12">
            <v-card elevation="0">
                <v-list>
                    <v-col cols="12">
                        <div class="d-flex flex-column pa-2">
                            <v-btn class="role-btn" color="yellow" @click="changepassword">
                                Change password
                            </v-btn>
                            <v-btn class="role-btn" color="red" @click="logout">
                                Sign out
                            </v-btn>
                        </div>
                    </v-col>
                </v-list>
            </v-card>
        </v-col>
    </div>
</template>

<script>
import * as userAPI from "@/utils/userAPI"
export default {
    layout: 'blank',
    mounted() {
        liff.init({
            liffId: '1656364274-v0dGo98q'
        })
    },
    methods: {
        async logout() {
            await userAPI.logout(localStorage.getItem('lineUserId'))
                .then(response => {
                    console.log(response)
                    localStorage.clear()
                    liff.closeWindow()
                })
                .catch(error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })
                })
        },
        async changepassword() {
            await this.$router.push({ name: 'liff-changepassword' })
        }

    }

}

</script>

<style>

.v-list__title {
    font-weight: bold;
}
.role-btn {
    margin-top: 20px;
    height: 50px !important;
    font-size: 16px;
}
</style>
