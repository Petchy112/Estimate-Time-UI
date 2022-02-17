<template>
    <div>
        <v-col cols="12">
            <h1>VOTE RESULTS</h1>


            <div class="btn-group mt-2">
                <!-- <v-btn v-if="status == 'CLOSE'" @click="handleVote('OPEN')" rounded class="voteControl" color="rgb(55, 208, 255)">
                    Start voting
                </v-btn>
                <v-btn v-if="status == 'OPEN'" @click="handleVote('CLOSE')" rounded class="voteControl" color="rgb(55, 208, 255)">
                    Stop voting
                </v-btn> -->
                <v-switch
                    v-model="switchs"
                    inset
                    :label="`Status : ${switchs == true ? 'OPEN' : 'CLOSE'}`"
                    @click="handleVote(switchs)"
                />
            </div>
        </v-col>

        <VoteList @show-vote="handleShowClicked" :voteResults="voteResults" />
        <div v-if="voteResults == ''" class="text-data">
            No data
        </div>
    </div>
</template>

<script>
import VoteList from "~/components/VoteList"
import voteAPI from "~/utils/voteAPI"
import functionAPI from "~/utils/functionAPI"
export default {
    components: { VoteList },
    data () {
        return {
            voteResults: [],
            status: '',
            switchs: null
        }
    },
    mounted() {

        this.getResult()
    },
    computed: {
        theStatus() {
            return this.status
        }
    },

    methods: {
        async getResult () {
            const response = await functionAPI.functionList('WEBSITE')
            try {
                console.log('RESPONSE', response)
                this.status = response[0].status
                console.log(this.status)
                if (this.status == 'OPEN') {
                    this.switchs = true
                }
                else {
                    this.switchs = false
                }
            }
            catch (error) {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.error.message
                })
            }
            const res = await voteAPI.resultLists()
            try {
                this.voteResults = res
            }
            catch (error) {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.res.error.message
                })
            }
        },
        async handleShowClicked(round) {
            this.$router.push({ name: 'admin-result-vote-round', params: { round } })
        },
        async handleVote(action) {
            if (action == true) {
                action = 'OPEN'
            }
            else if (action == false) {
                action = 'CLOSE'
            }
            console.log(action)
            await voteAPI.handleVote(action)
                .then(async response => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.message
                    })
                })

        }

    }
}
</script>

<style>
.btn-group {
    display: flex;
    justify-content: center;
    align-items: center;
}
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
