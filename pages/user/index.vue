<template>
    <div v-if="userData">
        <div>
            <v-row justify-md="end">
                <v-col
                    md="5"
                    class="justify--end"
                >
                    <v-alert
                        dense
                        elevation="5"
                        type="error"
                    >
                        {{ message }}
                    </v-alert>
                </v-col>
            </v-row>
        </div>
        <div class="ma-5">
            <h1>
                ระบบจัดการผู้ใช้
            </h1>
        </div>
        <v-btn
            class="px-12 ml-10"
            color="success"

            :to="{
                name: 'register'
            }"
        >
            ADD
        </v-btn>
        <div class="d-flex flex-column pa-3 ma-5">
            <v-card
                v-for="user in userData"
                :key="user.index"
                class="pa-3 mb-3"
                @click="handleShowClicked(user._id)"
            >
                <v-card-title>
                    {{ user.firstname }}
                    {{ user.lastname }}
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>

<script>
import * as userAPI from '@/utils/userAPI'
export default {
    data() {
        return {
            userData: [],
            deleteDialog: false
        }
    },
    async mounted () {
        await userAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.userData = response.data

            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })
    },
    methods: {
        async handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'user-id', params: { id } })
        },
    }
}

</script>
<style >
h1 {
    text-align: center;
}
.add-btn {
    position: relative;

}
</style>
