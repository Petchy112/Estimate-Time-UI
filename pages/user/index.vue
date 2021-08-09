<template>
    <div v-if="userData">
        <div class="d-flex flex-column pa-3 ma-5">
            <v-card
                v-for="user in userData"
                :key="user.index"
                class="pa-3"
            >
                <v-card-title>{{ user.firstname }}</v-card-title>
                <v-card-action>
                    <v-btn
                        color="blue"
                        right
                    >
                        Show
                    </v-btn>
                    <v-btn
                        color="error"
                        right
                        @click="handleDeleteClicked(user._id)"
                    >
                        Delete
                    </v-btn>
                </v-card-action>
            </v-card>
        </div>
        <v-col
            cols="12"
        >
            <v-btn
                id="add"
                color="success"
                :to="{
                    name: 'user-register'
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
            userData: []
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
        async handleDeleteClicked (id) {
            const response = await userAPI.del(id)
            console.log('Response', response)
            await this.$router.push({ name: 'user' })
        }
    }
}

</script>
<style scoped>
v-btn #add {
    align-self: center;
}
</style>
