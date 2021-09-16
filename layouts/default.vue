<template>
    <v-app>
        <v-app-bar
            :clipped-left="clipped"
            app
            dark
            flat
            color="rgb(55, 208, 255)"
        >
            <v-app-bar-nav-icon @click="drawer = !drawer" />
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <div class="text-center">
                <v-menu

                    :close-on-content-click="false"
                    :nudge-width="200"
                    offset-y
                >
                    <template #activator="{ on, attrs }">
                        <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-account</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-list>
                            <div class="picture">
                                <v-avatar
                                    class="ma-3"
                                    size="100px"
                                >
                                    <v-btn
                                        class="secondary btn-upload"
                                        fab
                                        width="30px"
                                        height="30px"
                                        @click="onPickFile"
                                    >
                                        <v-icon size="20px">
                                            mdi-camera
                                        </v-icon>
                                    </v-btn>
                                    <img v-if="profileImageUrl == undefined || ''" src="~/assets/default-profile.png" alt="">
                                    <img
                                        v-else
                                        :src="profileImageUrl"
                                    >
                                </v-avatar>
                            </div>


                            <v-list-item-title class="profile">
                                Admin, {{ userData.firstname }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="email">
                                {{ userData.email }}
                            </v-list-item-subtitle>
                            <v-list-item-action>
                                <div>
                                    <input
                                        type="file"
                                        style="display:none"
                                        ref="fileInput"
                                        accept="image/*"
                                        @change="onFilePicked"
                                    ><v-btn class="btn-drawer" color="success" @click="upload">
                                        Save Image
                                    </v-btn>
                                    <br>
                                    <v-btn class="btn-drawer" color="primary" @click="changepassword">
                                        change password
                                    </v-btn>
                                    <br>
                                    <v-btn class="btn-drawer" color="error" @click="logout">
                                        Sign out
                                    </v-btn>
                                </div>
                            </v-list-item-action>
                        </v-list>
                    </v-card>
                </v-menu>
            </div>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="clipped"
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
            <alertDialog />
        </v-main>

        <v-footer
            :absolute="!fixed"
            color="rgb(55, 208, 255)"
            app
            dark
        >
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
import alertDialog from "~/components/dialog/alertDialog.vue"
import * as userAPI from "@/utils/userAPI"
import * as imageAPI from "@/utils/imageAPI"
export default {
    components: {
        alertDialog
    },
    data () {
        return {
            userData: [],
            userId: '',
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
                        name: 'result-vote'
                    }
                },
                {
                    icon: 'mdi-timer-sand',
                    title: 'Estimate Result',
                    to: {
                        name: 'result-estimated'
                    }
                },
            ],
            profileImageUrl: '',
            profileImage: null,
            miniVariant: false,
            right: true,

            title: 'ESTIMATE TIME'
        }
    },
    async mounted() {
        await userAPI.getProfile()
            .then(response => {
                console.log('RESPONSE', response.data)
                this.userData = response.data
                this.userId = response.data.id
            })
            .catch(async error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
                await this.$router.push({ name: 'index' })
            })
        await imageAPI.getImage(this.userId)
            .then(response => {
                console.log('RESPONSE', response.data)

                this.profileImageUrl = response.data.fullPath

            })
            .catch(async error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })
    },
    methods: {
        async upload() {
            await imageAPI.uploadProfile(this.profileImage)
                .then(response => {
                    console.log('response', response)
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0) {
                return alert('plase add vaild file')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.profileImageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.profileImage = files[0]
        },
        async logout() {
            await userAPI.logout()
                .then(response => {
                    localStorage.clear()
                    this.$router.replace({ name: 'index' })
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
            await this.$router.push({ name: 'changepassword' })
        }
    }
}
</script>
<style>
.btn-upload {
    background-color: brown;
    margin-top: 70px;
    position: absolute;
}
h1 {
    text-align: center;
}
.v-application {
    font-family: 'Mitr', sans-serif !important;
    background-color: white  ;
}

.picture {
    border-radius: 50% !important;
    display: flex;
    justify-content: center;
    align-items: center;
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
}
.btn-drawer {
    margin-top: 20px !important;
    width: 115%;
}
.w-100 {
    width: 100% ;
}
</style>
