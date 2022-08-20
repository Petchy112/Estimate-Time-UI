<template>
    <v-app class="wrap-page">
        <div>
            <div class="wrap-card-role">
                <div class="header">
                    SELECT ROLE
                </div>

                <div class="button-group">
                    <v-btn
                        class="role-btn"
                        v-if="profile.role.includes('VOTER')"
                        @click="selectRole('VOTER')"
                        rounded
                        color="primary"
                    >
                        VOTER
                    </v-btn>
                    <v-btn
                        color="primary"
                        class="role-btn"
                        v-if="profile.role.includes('COORDINATOR')"
                        @click="selectRole('COORDINATOR')"
                        rounded
                    >
                        COORDINATOR
                    </v-btn>
                </div>
            </div>
        </div>
    </v-app>
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
.wrap-page {
    background-color: #37d0ffcc !important;
    padding: 12px;

    .wrap-card-role {
        border-radius: 5px;
        margin: 16px;
        background-color: #fafafa;
        padding: 10px 20px;
        .header {
            color: rgba(0,0,0,0.8);
            font-weight: bold;
            font-size: x-large;
            margin: 16px 0 0 20px;
        }
        & .button-group {
            padding: 8px;
            display: flex;
            flex-direction: column;
            margin: 10px;
            .role-btn {
                color: #fff;
                margin-top: 20px;
                height: 40px !important;
                font-size: 14px;
            }
        }
    }
}


</style>
