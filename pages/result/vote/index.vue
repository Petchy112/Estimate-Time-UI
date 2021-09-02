<template>
    <div>
        <v-col cols="12">
            <h1>VOTE RESULTS</h1>
        </v-col>
        <v-col cols="12">
            <v-btn dark rounded class="w-100" color="orange">
                Start voting
            </v-btn>
        </v-col>
        <voteComponant @show-vote="handleShowClicked" :voteResults="voteResults" />
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
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })

    },

    methods: {
        async handleShowClicked(round) {
            this.$router.push({ name: 'result-vote-round', params: { round } })
        }
    }
}
</script>

<style>
.v-btn {
 height: 50px;
}
</style>
