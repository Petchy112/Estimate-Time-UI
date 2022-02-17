<template>
    <div>
        <v-card-title>
            <div class="my-head ma-3">
                USER MANAGEMENT
            </div>
            <v-spacer />
            <v-text-field
                class="mx-4"
                flat
                placeholder="Search"
                v-model="search"
                solo-inverted
                single-line
                append-icon="mdi-magnify"
                hide-details
            />
        </v-card-title>
        <v-divider class="ma-5" />
        <v-btn

            class="px-12 ml-10"
            color="success"
            :to="{
                name: 'register'
            }"
        >
            ADD
        </v-btn>
        <div class="wrap-content">
            <div class="left-zone">
                <div
                    v-for="(user,index) in userLists"
                    :key="index"
                    class="content"
                    @click="getUserDetail(user.userId)"
                >
                    <p>{{ user.firstname }} {{ user.lastname }}</p>
                </div>
            </div>
            <div class="right-zone">
                <div
                    class="wrap-zone"
                    :loading="isCalling"
                    v-if="user"
                >
                    <div class="top">
                        <div class="wrap-image">
                            <img width="100px" src="~/assets/default-profile.png">
                        </div>
                    </div>
                    <div class="data-section">
                        <v-text-field
                            class="text-wrap"
                            label="Firstname"
                            outlined
                            :disabled="isCalling"
                            v-model="user.firstname"
                        />
                        <v-text-field
                            class="text-wrap"
                            label="Lastname"
                            outlined
                            :disabled="isCalling"
                            v-model="user.lastname"
                        />
                        <v-text-field
                            class="text-wrap"
                            label="E-mail"
                            outlined
                            :disabled="isCalling"
                            v-model="user.email"
                        />

                        <v-text-field
                            class="text-wrap"
                            label="Role"
                            outlined
                            :disabled="isCalling"
                            v-model="user.role"
                        />
                    </div>
                    <div class="bottom-section">
                        <div class="delete-button">
                            <v-btn
                                @click="isCalling = !isCalling"
                                :color="isCalling ? 'primary' : 'secondary'"
                            >
                                {{ isCalling ? 'edit' : 'save' }}
                            </v-btn>
                        </div>
                        <div class="delete-button">
                            <v-btn

                                color="error"
                                @click="deleteDialog = !deleteDialog"
                            >
                                Delete
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import toastr from 'toastr'
import userAPI from '~/utils/userAPI'
export default {
    data() {
        return {
            message: '',
            userLists: [],
            user: null,
            deleteDialog: false,
            search: '',
            isCalling: true
        }
    },
    mounted () {
        this.getUserList()
    },
    computed: {
        filteredItems() {
            return this.userLists.filter(item => {
                return item.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    },
    methods: {
        async getUserList () {
            const userlist = await userAPI.userLists()
            this.userLists = userlist
        },
        async getUserDetail(id) {
            // this.$nextTick(() => {
            //     this.$nuxt.$loading.start()
            // })
            const response = await userAPI.userDetails(id)
            try {
                console.log('RESPONSE', response)
                this.user = response
                this.user.role = this.user.role.join(', ')
                // this.$nuxt.$loading.finish()

            }
            catch (error) {
                toastr.error(error.response.error.message)

            }
        },
        async handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'admin-user-id', params: { id } })
        },
    }
}

</script>
<style lang="scss" scoped>
.wrap-content {
    display: grid;
    margin: 16px 16px 0 0;
    grid-auto-flow: column;
    grid-template-columns: 400px auto;
    & .left-zone {
        max-width: 400px;
        max-height: 640px;
        border-right: 1px solid rgba(#000, $alpha: 0.1);
        scroll-behavior: smooth;
        overflow: auto;
        & .content {
            display: flex;
            align-items: center;
            cursor: pointer;
            height: 60px;
            border-bottom: 1px solid rgba(#000, $alpha: 0.1);
            p {
                margin-left: 16px;
            }

        }
    }
    & .right-zone {
        & .wrap-zone {
            display: grid;
            grid-auto-flow: row;
            grid-gap: 16px;
            margin-left: 50px;
            & .top {
                display: flex;
                justify-content: center;
                & .wrap-image {
                    width: 100px;
                    height: 100px;
                    img {
                        width:100%;
                        height: 100%;
                        display: block;
                    }
                }
            }


            & .data-section{
                font-size: 24px;
                margin: 16px;
            }

            & .bottom-section {
                display: grid;
                grid-gap: 8px;
                grid-auto-flow: row;
            }


        }

    }
}
.my-head {
    font-size: 32px !important;
    font-weight: bold;
}
h1 {
    text-align: center;
}
.add-btn {
    position: relative;

}
</style>
