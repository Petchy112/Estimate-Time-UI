<template>
    <div>
        <v-col cols="12">
            <h1>VOTE RESULT</h1>
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
export default {
    layout: 'liff',
    components: {
        voteList
    },
    data () {
        return {
            voteResults: [],
        }
    },
    async mounted() {
        await liff.init({
            liffId: '1656364274-AGm9jZ4x'
        })
        await voteAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.voteResults = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })

    },

    methods: {
        async handleShowClicked(round) {
            this.$router.push({ name: 'liff-result-vote-round', params: { round } })
        }
    }
}
</script>

<style scoped>

.v-btn {
 height: 50px;
}
.text-data {
    margin-top: 20px;
    text-align: center;
    color: rgba(000, 000, 000, 0.3);
}
</style>
