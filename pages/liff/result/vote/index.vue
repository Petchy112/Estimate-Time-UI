<template>
    <div>
        <v-col cols="12">
            <v-card-title class="justify-center">
                <div class="my-head mt-5">
                    VOTE RESULT
                </div>
            </v-card-title>

            <Votelist @show-vote="handleShowClicked" :voteResults="voteResults" />
            <div v-if="!voteResults" class="text-data">
                No data
            </div>
        </v-col>
    </div>
</template>

<script>
import Votelist from "~/components/Votelist.vue"
import voteAPI from "~/utils/voteAPI"
export default {
    layout: 'liff',
    components: {
        Votelist
    },
    data () {
        return {
            voteResults: [],
        }
    },
    async mounted() {
        // liff.init({
        //     liffId: '1656364274-nbwL6MA9'
        // })
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

<style scoped>
.my-head {
    font-size: 32px !important;
    font-weight: bold;
}
.v-btn {
 height: 50px;
}
.text-data {
    margin-top: 20px;
    text-align: center;
    color: rgba(000, 000, 000, 0.3);
}
</style>
