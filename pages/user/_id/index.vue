<template>
    <div v-if="user">
        <v-col cols="12">
            <v-card max-width="500px" class="mt-4 ma-2 pa-4 user-card">
                <v-row justify="center">
                    <div class="circle my-7">
                        <v-img max-width="100px" src="https://i.pinimg.com/originals/55/6c/38/556c381559c59fd2231498de3014e7c2.png" />
                    </div>
                </v-row>


                <v-card-title class="justify-start ">
                    Firstname : {{ user.firstname }}
                </v-card-title>
                <v-card-title class="justify-start ">
                    Lastname : {{ user.lastname }}
                </v-card-title>
                <v-card-title class="justify-start ">
                    Email : {{ user.email }}
                </v-card-title>
                <v-card-title class="justify-start ">
                    Role : {{ user.role }}
                </v-card-title>
                <v-card-action
                    class="card-action"
                >
                    <div class="d-flex justify-content flex-end">
                        <v-btn
                            class="mt-4"
                            rounded
                            color="error"
                            @click="deleteDialog = !deleteDialog"
                        >
                            Delete
                        </v-btn>
                    </div>
                </v-card-action>
            </v-card>
        </v-col>

        <v-dialog
            v-model="deleteDialog"
            max-width="500"
        >
            <v-card class="pa-5">
                <v-card-title class=" justify-center card-text pa-1 pb-3">
                    Do you want to delete user {{ user.firstname }} ?
                </v-card-title>


                <v-row class="pa-5" justify="center" justify-md="space-around">
                    <v-btn
                        class="pa-2"
                        color="error"
                        rounded
                        @click="deleteDialog = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        rounded
                        class="pa-2"
                        color="success"
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
import * as userAPI from '@/utils/userAPI'
export default {
    data() {
        return {
            user: [],
            deleteDialog: false
        }
    },
    async mounted() {
        console.log('router param', this.$route.params.id)
        await userAPI.show(this.$route.params.id)
            .then(response => {
                console.log('RESPONSE', response)
                this.user = response.data
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
        async handleDelete(id) {
            console.log(id)
            await userAPI.remove(id)
                .then(async response => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                    this.deleteDialog = false
                    await this.$router.replace({ name: 'user' })
                })
                .catch(async error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })
                })
        }
    }
}
</script>

<style scoped>
.user-card {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

}
.card-text {
    font-size: 24px !important;
    font-weight: bold;
}
.v-application .d-flex {
    display: flex !important;
    justify-content: flex-end;
}
</style>
