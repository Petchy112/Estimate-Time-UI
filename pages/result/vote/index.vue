<template>
    <div>
        <v-col cols="12">
            <h1>VOTE RESULTS</h1>
        </v-col>
        <v-col cols="12">
            <v-btn dark @click="handleVote('OPEN')" rounded class="w-100" color="rgb(55, 208, 255)">
                Start voting
            </v-btn>
            <v-btn dark @click="handleVote('CLOSE')" rounded class="w-100 mt-6" color="rgb(55, 208, 255)">
                Stop voting
            </v-btn>
        </v-col>

        <voteComponant @show-vote="handleShowClicked" :voteResults="voteResults" />
        <div v-if="voteResults==null" class="text-data">
            No data
        </div>
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
        },
        async handleVote(action) {
            await voteAPI.handleVote(action)
                .then(response => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                })
        }

    }
}
</script>

<style>
.v-btn {
 height: 50px;
}
.text-data {
    text-align: center;
    color: rgba(000, 000, 000, 0.3);
}
</style>
