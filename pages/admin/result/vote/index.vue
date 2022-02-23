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
import VoteTable from '~/components/pages/VoteTable.vue'

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
    computed: {
        theStatus() {
            return this.status
        }
    },
    methods: {
        async getResult () {
            const response = await functionAPI.functionList('WEBSITE')
            this.status = response[0].status
            if (this.status == 'OPEN') {
                this.switchs = true
            }
            else {
                this.switchs = false
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
            this.$router.push({ name: 'admin-vote-round', params: { round } })
        },
        async handleVote(action) {
            await voteAPI.handleVote(action == true ? 'OPEN' : 'CLOSE')
                .then(response => {
                    toastr.success(response.message)
                })
                .catch(error => {
                    toastr.error(error.response.message)
                })
        },
        mounted() {
            this.getResult()
        },
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
