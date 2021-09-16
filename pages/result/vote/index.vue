<template>
    <div>
        <v-col cols="12">
            <h1>VOTE RESULTS</h1>

            <div class="text-center mt-7">
                VOTE STATUS: {{ theStatus }}
            </div>
            <v-row justify="center mt-2">
                <v-btn v-if="status == 'CLOSE'" @click="handleVote('OPEN')" rounded class="voteControl" color="rgb(55, 208, 255)">
                    Start voting
                </v-btn>
                <v-btn v-if="status == 'OPEN'" @click="handleVote('CLOSE')" rounded class="voteControl" color="rgb(55, 208, 255)">
                    Stop voting
                </v-btn>
            </v-row>
        </v-col>

        <voteList @show-vote="handleShowClicked" :voteResults="voteResults" />
        <div v-if="voteResults == ''" class="text-data">
            No data
        </div>
    </div>
</template>

<script>
import voteList from "~/components/voteList.vue"
import * as voteAPI from "@/utils/voteAPI"
import * as functionAPI from "~/utils/functionAPI"
export default {
    components: {
        voteList
    },
    data () {
        return {
            voteResults: [],
            status: ''
        }
    },
    mounted() {
        functionAPI.index('WEBSITE')
            .then(response => {
                console.log('RESPONSE', response)
                this.status = response.data[0].status
            })
            .catch(async error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })
        voteAPI.index()
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
    computed: {
        theStatus() {
            return this.status
        }
    },

    methods: {
        async handleShowClicked(round) {
            this.$router.push({ name: 'result-vote-round', params: { round } })
        },
        async handleVote(action) {
            await voteAPI.handleVote(action)
                .then(async response => {
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
.status{
    font-size:20px;
    font-weight:bold ;
}
.text-data {
    margin-top: 20px;
    text-align: center;
    color: rgba(000, 000, 000, 0.3);
}
.voteControl {
    color: white !important;
    margin-left: 20px;
    margin-right: 20px;
    width: 30%;
}
</style>
