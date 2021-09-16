<template>
    <div v-if="user">
        <v-col cols="12">
            <v-card max-width="500px" class="mt-4 ma-2 pa-4 user-card">
                <v-row justify="center">
                    <div class="circle my-7">
                        <img width="100px" :src="imageUrl">
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
                    Role : <v-text v-for="role in user.role" :key="role.index">
                        {{ role }} <br>
                    </v-text>
                </v-card-title>
                <div
                    class="card-action"
                >
                    <div class="d-flex justify-content flex-end">
                        <v-btn
                            class="mt-4"

                            color="error"
                            @click="deleteDialog = !deleteDialog"
                        >
                            Delete
                        </v-btn>
                    </div>
                </div>
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
                        width="100px"
                        @click="deleteDialog = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        width="100px"
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
import * as imageAPI from "~/utils/imageAPI"
export default {
    data() {
        return {
            user: [],
            deleteDialog: false,
            imageUrl: '',
            image: null

        }
    },
    mounted() {
        userAPI.show(this.$route.params.id)
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
    computed: {
        picture() {
            return console.log(this.image)
        }
    },
    methods: {
        async upload() {
            await imageAPI.upload(this.image)
                .then(response => {
                    console.log('response', response)
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
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },
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
