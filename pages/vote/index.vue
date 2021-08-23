<template>
    <div>
        <v-col cols="12">
            <h1>Vote Results</h1>
        </v-col>
        <v-col cols="12">
            <v-btn rounded class="w-100" color="orange">
                Start Voting
            </v-btn>
        </v-col>
        <voteComponant />
    </div>
</template>

<script>
import voteComponant from "~/components/vote/index.vue"
import * as voteAPI from "@/utils/voteAPI"
export default {
    components: {
        voteComponant
    },
    data () {
        return {
            results: [],
        }
    },
    async mounted() {
        await voteAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.results = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })

    },

    methods: {
        async handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'vote-id', params: { id } })
        }
    }
}
</script>

<style>
.v-btn {
 height: 50px;
}
</style>
