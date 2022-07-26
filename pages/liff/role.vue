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
                            <v-btn v-if="profile.role.includes('VOTER')" @click="selectRole('VOTER')" rounded class="role-btn" color="#37d0ff">
                                VOTER
                            </v-btn>
                            <v-btn v-if="profile.role.includes('COORDINATOR')" @click="selectRole('COORDINATOR')" rounded class="role-btn" color="#37d0ff">
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
import { mapState } from 'vuex'
import userAPI from "~/utils/userAPI"
export default {
    layout: 'plain',
    data() {
        return {
            userData: [],
        }
    },
    computed: {
        ...mapState({
            profile: state => state.profile.profile
        })
    },
    mounted() {
        this.getProfile()
    },
    methods: {
        async getProfile() {
            const response = await userAPI.getProfile()
            this.userData = response.profile
            if (this.userData.role.length == 1) {
                this.selectRole(this.userData.role[0])
            }
            else {
                this.role = this.userData.role
            }
        },
        async selectRole(role) {
            console.log(role)
            await userAPI.selectRole({ 'role': role })
            await liff.closeWindow()
        }

    },

}
</script>

<style lang='scss' scoped>
.back {
    background-color: #37d0ff !important;
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
    color: #fff;
    margin-top: 20px;
    height: 50px !important;
    font-size: 16px;

}
</style>
