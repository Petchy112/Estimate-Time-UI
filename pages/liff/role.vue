<template>
    <div>
        <v-app class="back">
            <v-col cols="12">
                <div class="wrap-card-role">
                    <div class="text ml-5 mt-4">
                        SELECT ROLE
                    </div>


                    <v-col cols="12">
                        <div class="d-flex flex-column pa-2 pt-0">
                            <v-btn v-if="role.includes('VOTER')" @click="selectRole('VOTER')" outlined rounded class="role-btn" color="rgb(55, 208, 255)">
                                VOTER
                            </v-btn>
                            <v-btn v-if="role.includes('COORDINATOR')" @click="selectRole('COORDINATOR')" outlined rounded class="role-btn" color="rgb(55, 208, 255)">
                                COORDINATOR
                            </v-btn>
                        </div>
                    </v-col>
                </div>
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
        this.getProfile()
    },
    methods: {
        async getProfile() {
            const response = await userAPI.getProfile()
            this.userData = response
            if (this.userData.role.length == 1) {
                this.selectRole(this.userData.role[0])
            }
            else {
                this.role = this.userData.role
            }
        },
        async selectRole(role) {
            await userAPI.selectRole(role)
            await liff.closeWindow()
        }

    },

}
</script>

<style  scoped>
.back {
    background-color: #fefefe !important;
}
.text {
    color: rgba(0,0,0,0.8);
    font-weight: bold;
    font-size: x-large;
}
.wrap-card-role {
    border-radius: 5px;
    margin: 16px;
    background-color: #fafafa;
    padding: 10px 20px;
}
.role-btn {
    margin-top: 20px;
    height: 50px !important;
    font-size: 16px;

}
</style>
