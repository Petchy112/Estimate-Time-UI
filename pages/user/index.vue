<template>
    <div v-if="userData">
        <div class="ma-5">
            <h1>
                USER MANAGEMENT
            </h1>
        </div>
        <v-col cols="12">
            <v-text-field
                class="mx-4"
                flat
                placeholder="Search"
                v-model="search"
                solo-inverted
                append-icon="mdi-magnify"
            />
        </v-col>
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
                v-for="user in filteredItems"
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
            message: '',
            userData: [],
            deleteDialog: false,
            search: '',
        }
    },

    async mounted () {
        await userAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.userData = response.data

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
        filteredItems() {
            return this.userData.filter(item => {
                return item.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
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
