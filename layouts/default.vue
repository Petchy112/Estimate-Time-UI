<template>
    <v-app>
        <v-app-bar
            :clipped-left="clipped"
            fixed
            app
        >
            <v-app-bar-nav-icon @click="drawer = !drawer" />
            <v-toolbar-title v-text="title" />
            <v-spacer />

            <v-btn
                icon
                @click="rightDrawer = !rightDrawer"
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="clipped"
            fixed
            app
        >
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
        <v-navigation-drawer
            v-model="rightDrawer"
            :right="right"
            temporary
            fixed
            app
        >
            <v-list>
                <v-col cols="12">
                    <v-list-item-title class="profile">
                        Admin, {{ userData.firstname }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="email">
                        {{ userData.email }}
                    </v-list-item-subtitle>
                </v-col>
                <v-list-item-action>
                    <div>
                        <v-col cols="12">
                            <v-btn class="btn-drawer" color="yellow" @click="changepassword">
                                change password
                            </v-btn>
                            <v-btn class="btn-drawer" color="red" @click="logout">
                                Sign out
                            </v-btn>
                        </v-col>
                    </div>
                </v-list-item-action>
            </v-list>
        </v-navigation-drawer>
        <v-footer
            :absolute="!fixed"
            app
        >
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
import * as userAPI from "@/utils/userAPI"
export default {
    data () {
        return {
            userData: [],
            message: '',
            clipped: true,
            drawer: true,
            fixed: true,
            items: [
                {
                    icon: 'mdi-puzzle-outline',
                    title: 'Functions',
                    to: {
                        name: 'function'
                    }
                },
                {
                    icon: 'mdi-account-box',
                    title: 'User Management',
                    to: {
                        name: 'user'
                    }
                },

                {
                    icon: 'mdi-vote',
                    title: 'Vote Result',
                    to: {
                        name: 'vote'
                    }
                },
                {
                    icon: 'mdi-timer-sand',
                    title: 'Estimate Result',
                    to: {
                        name: 'estimated'
                    }
                },
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'ESTIMATE TIME'
        }
    },
    mounted() {
        userAPI.getProfile()
            .then(response => {
                console.log('RESPONSE', response.data)
                this.userData = response.data
            })
            .catch(error => {
                console.log(error)
                this.$router.push({ name: 'index' })
            })
    },
    methods: {
        async logout() {
            await userAPI.logout()
                .then(response => {
                    console.log(response)
                    localStorage.clear()
                    this.$router.replace({ name: 'index' })
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
h1 {
    text-align: center;
}
.v-application {
    font-family: 'Mitr', sans-serif !important;
}
.v-application--wrap {
    background: white;
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: orange !important;
}
.profile {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
}
.email {
    padding-top: 0px;
    text-align: center;
    font-size: 16px;
    opacity: 60%;
}
.btn-drawer {
    width: 100%;
    margin-top: 20px !important;
}
.w-100 {
    width: 100% ;
}
</style>
