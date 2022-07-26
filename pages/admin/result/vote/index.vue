<template>
    <div class="wrap-page">
        <div class="top-section">
            <div class="header">
                VOTE RESULT
            </div>
            <div class="btn-group">
                <v-switch
                    v-model="switchs"
                    :label="`Status : ${switchs == true ? 'OPEN' : 'CLOSE'}`"
                    @click="handleVote"
                />
            </div>
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
        async getStatus () {
            try {
                const response = await functionAPI.functionList()
                console.log(response.functionLists, 'status')
                this.status = response.functionLists[0].status
                if (this.status == 'OPEN') {
                    this.switchs = true
                }
                else {
                    this.switchs = false
                }
            }
            catch (error) {
                toastr.error(error.data)
            }
        },
        async getResult() {
            try {
                const res = await voteAPI.resultLists()
                this.voteResults = res.result_list
            }
            catch (error) {
                toastr.error(error.res.error.message)

            }
        },
        async handleShowClicked(id) {
            this.$router.push(`/admin/result/vote/${id}`)
        },
        async handleVote() {
            await voteAPI.handleVote()
                .then(response => {
                    toastr.success(response.message)
                })
                .catch(error => {
                    toastr.error(error.response.message)
                })
        },
    },
    mounted() {
        this.getResult()
        this.getStatus()
    },
}
</script>

<style lang="scss" scoped>
.wrap-page {

    & .top-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & .btn-group {
            margin-right: 16px;

        }
        & .header {
            font-size: 28px;
            font-weight: 600;
        }

    }

}
</style>
