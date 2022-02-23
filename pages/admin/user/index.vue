<template>
    <div class="warp-page">
        <div class="top-section">
            <div class="my-head ">
                USER MANAGEMENT
            </div>

            <v-text-field
                class="search-tab"
                flat
                placeholder="Search"
                v-model="search"
                solo-inverted
                single-line
                append-icon="mdi-magnify"
                hide-details
            />
        </div>
        <v-divider />
        <v-btn

            class="px-12 ml-10"
            color="success"
            :to="{
                name: 'admin-user-register'
            }"
        >
            ADD
        </v-btn>
        <div class="wrap-content">
            <div class="left-zone">
                <div
                    v-for="(list,index) in filteredItems"
                    :key="index"
                    class="content"
                    @click="getUserDetail(list.userId)"
                >
                    <p>{{ list.firstname }} {{ list.lastname }}</p>
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
        <v-dialog
            v-model="deleteDialog"
            max-width="500"
        >
            <v-card class="pa-5">
                <v-card-title class=" justify-center card-text pa-1 pb-3">
                    Are u sure to delete this user ?
                </v-card-title>


                <v-row class="pa-5" justify="center" justify-md="space-around">
                    <v-btn
                        class="pa-2"
                        color="error"
                        width="100px"
                        plain
                        @click="deleteDialog = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        width="100px"
                        class="pa-2"
                        color="success"
                        text
                        @click="handleDelete(user._id)"
                    >
                        Confirm
                    </v-btn>
                </v-row>
            </v-card>
        </v-dialog>
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
        async handleDelete(id) {
            console.log(id)
            const response = await userAPI.removeUser(id)
            try {
                toastr.success(response.message)
                this.$router.push({ name: 'admin-user' })
            }
            catch (error) {
                toastr.error(error.response.error.message)
            }
        },
        async getUserList () {
            const userlist = await userAPI.userLists()
            this.userLists = userlist
        },
        async getUserDetail(id) {

            const response = await userAPI.userDetails(id)
            try {
                this.user = response
                this.user.role = this.user.role.join(', ')
            }
            catch (error) {
                toastr.error(error.response.error.message)

            }
        },
        async handleShowClicked(id) {
            this.$router.push({ name: 'admin-user-id', params: { id } })
        },
    }
}

</script>
<style lang="scss" scoped>
.warp-page {
    & .top-section {
        display: flex;
        justify-content: space-between;
        & .my-head {
            margin: 12px;
            font-size: 32px !important;
            font-weight: bold;
        }
        & .search-tab {
            margin-top: 12px;
            margin-right: 20px;
            max-width: 600px;
        }
    }
    & .wrap-content {
        display: grid;
        margin: 16px 16px 0 0;
        grid-auto-flow: column;
        grid-template-columns: 400px auto;
        & .left-zone {
            max-width: 400px;
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
}

h1 {
    text-align: center;
}
.add-btn {
    position: relative;

}
</style>
