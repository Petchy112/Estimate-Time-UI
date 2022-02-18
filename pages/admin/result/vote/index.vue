<template>
    <div class="wrap-page">
        <div class="header">
            VOTE RESULT
        </div>
        <div class="btn-group">
            <v-switch
                v-model="switchs"
                inset
                :label="`Status : ${switchs == true ? 'OPEN' : 'CLOSE'}`"
                @click="handleVote(switchs)"
            />
        </div>
        <VoteTable v-if="voteResults.length != 0" @show-vote="handleShowClicked" :voteResults="voteResults" />
        <div v-else class="empty">
            ไม่มีข้อมูล
        </div>
    </div>
</template>

<script>
import VoteTable from "~/components/voteTable"
import voteAPI from "~/utils/voteAPI"
import functionAPI from "~/utils/functionAPI"
import toastr from 'toastr'
export default {
    components: { VoteTable },
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
                this.status = response[0].status
                if (this.status == 'OPEN') {
                    this.switchs = true
                }
                else {
                    this.switchs = false
                }
            }
            catch (error) {
                toastr.error(error.response.error.message)

            }
            const res = await voteAPI.resultLists()
            try {
                this.voteResults = res
            }
            catch (error) {
                toastr.error(error.res.error.message)

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
                    toastr.success(response.data.message)
                })

        }

    }
}
</script>

<style lang="scss" scoped>
.wrap-page {
    margin: 24px;
    & .btn-group {
        margin-top: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & .header {
        font-size: 28px;
        font-weight: 600;
    }
}
</style>
