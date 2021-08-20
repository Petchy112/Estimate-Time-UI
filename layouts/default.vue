<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
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
        <v-app-bar
            :clipped-left="clipped"
            fixed
            app
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn
                icon
                @click.stop="miniVariant = !miniVariant"
            >
                <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
            <v-btn
                icon
                @click.stop="clipped = !clipped"
            >
                <v-icon>mdi-application</v-icon>
            </v-btn>
            <v-btn
                icon
                @click.stop="fixed = !fixed"
            >
                <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-toolbar-title>
                Admin , {{ userData.firstname }}
            </v-toolbar-title>
            <v-btn
                icon
                @click.stop="rightDrawer = !rightDrawer"
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
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
        >
            <v-list>
                <v-row justify-md="center">
                    <v-list-title class="ma-5 text-h4">
                        User
                    </v-list-title>
                    <v-list-item three-line>
                        <v-list-item-action>
                            <v-col cols="12">
                                <div class="ma-2">
                                    <v-btn class="yellow" color="error" @click="changepassword">
                                        change password
                                    </v-btn>
                                </div>
                                <div class="ma-2">
                                    <v-btn color="error" @click="logout">
                                        Sign out
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-list-item-action>
                    </v-list-item>
                </v-row>
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
            clipped: true,
            drawer: true,
            fixed: true,
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Welcome',
                    to: '/'
                },
                {
                    icon: 'mdi-account-box',
                    title: 'User Management',
                    to: {
                        name: 'user'
                    }
                },
                {
                    icon: 'mdi-puzzle-outline',
                    title: 'Functions',
                    to: {
                        name: 'function'
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
    async mounted() {
        await userAPI.getProfile()
            .then(response => {
                console.log('RESPONSE', response.data)
                this.userData = response.data
            })
            .catch(error => {
                this.$router.replace({ name: 'login' })
            })
    },
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
