<template>
    <div v-if="userData">
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
        <v-col
            cols="12"
        >
            <v-btn
                id="add"
                color="success"
                :to="{
                    name: 'register'
                }"
            >
                ADD
            </v-btn>
        </v-col>
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
    },
    methods: {
        async handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'user-id', params: { id } })
        },
    }
}

</script>
<style scoped>
v-btn #add {
    align-self: center;
}
</style>
