<template>
    <div class="wrap-page">
        <div class="header">
            <div class="back" @click="back">
                <v-icon>mdi-arrow-left</v-icon>
            </div>
            VOTE RESULT
        </div>


        <VoteTable class="table" v-if="voteResults.length != 0" @show-vote="handleShowClicked" :voteResults="voteResults" />
        <div v-else class="empty">
            ไม่มีข้อมูล
        </div>
    </div>
</template>

<script>
import VoteTable from '~/components/pages/VoteTable.vue'
import voteAPI from "~/utils/voteAPI"
export default {
    layout: 'plain',
    components: {
        VoteTable
    },
    data () {
        return {
            voteResults: [],
        }
    },
    async mounted() {
        const response = await voteAPI.resultLists()
        this.voteResults = response.result_list
    },

    methods: {
        async handleShowClicked(round) {
            this.$router.push({ name: 'liff-result-vote-round', params: { round } })
        },
        back() {
            history.back()
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap-page {
    margin: 24px 16px 0 16px;
    & .header {
        display: flex;
        justify-content: space-between;
        font-size: 32px;
        font-weight: 600;
        margin-right: 64px;

    }
    & .table {
        margin-top:16px;
    }
}
</style>
