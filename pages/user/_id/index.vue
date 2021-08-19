<template>
    <div v-if="user">
        <v-card
            class="card-outter"
            max-width="400px"
        >
            <v-col
                cols="12"
            >
                <v-img

                    src=""
                    height="100px"
                    width="100px"
                />

                <v-card-title class="justify-start text-h5">
                    Firstname : {{ user.firstname }}
                </v-card-title>
                <v-card-title class="justify-start text-h5">
                    Lastname : {{ user.lastname }}
                </v-card-title>
                <v-card-title class="justify-start text-h5">
                    Email : {{ user.email }}
                </v-card-title>
                <v-card-action
                    class="card-action"
                >
                    <v-btn
                        right
                        color="error"
                        @click="deleteDialog = !deleteDialog"
                    >
                        Delete
                    </v-btn>
                </v-card-action>
            </v-col>
        </v-card>
        <v-dialog
            v-model="deleteDialog"
            max-width="500"
        >
            <v-card class="pa-5">
                <v-card-title class="text-h5 justify-center">
                    Do you want to delete this user ?
                </v-card-title>

                <v-row
                    justify="center"
                >
                    <v-col>
                        <v-btn
                            class="pa-2"
                            color="error"
                            @click="deleteDialog = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            class="pa-2"
                            color="success"
                            @click="handleDelete(user._id)"
                        >
                            Confirm
                        </v-btn>
                    </v-col>
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
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })

    },
    methods: {
        async handleDelete(id) {
            console.log(id)
            await userAPI.del(id)
                .then(async response => {
                    console.log('Response', response)
                    this.deleteDialog = false
                    await this.$router.replace({ name: 'user' })
                })
                .catch(async error => {
                    console.log('ERROR', error.response)
                    this.message = error.response.data.error.message
                })
        }
    }
}
</script>

<style>
.card-action {
  position:relative;
  bottom: 0;
}
</style>
