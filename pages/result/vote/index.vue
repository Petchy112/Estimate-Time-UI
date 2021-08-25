<template>
    <div>
        <v-col cols="12">
            <h1>Vote results</h1>
        </v-col>
        <v-col cols="12">
            <v-btn dark rounded class="w-100" color="orange">
                Start Voting
            </v-btn>
        </v-col>
        <voteComponant :voteResults="voteResults" />
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
            voteResults: [],
        }
    },
    async mounted() {
        await voteAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.voteResults = response.data
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
