<template>
    <div>
        <v-col cols="12">
            <v-card elevation="5">
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
export default {
    layout: 'blank',
    methods: {
        async logout() {
            await userAPI.logout()
                .then(response => {
                    console.log(response)
                    localStorage.clear()
                    this.$router.replace({ name: 'login' })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async changepassword() {
            await this.$router.push({ name: 'changepassword' })
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
