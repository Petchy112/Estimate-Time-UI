<template>
    <div class="wrap-page">
        <div class="header">
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
        this.voteResults = response

    },

    methods: {
        async handleShowClicked(round) {
            this.$router.push({ name: 'liff-result-vote-round', params: { round } })
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap-page {
    margin: 24px 16px 0 16px;
    & .header {
        display: flex;
        justify-content: center;
        font-size: 32px;
        font-weight: 600;
    }
    & .table {
        margin-top:16px;
    }
}
</style>
