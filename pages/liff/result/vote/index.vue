<template>
    <div>
        <v-col cols="12">
            <h1>Vote results</h1>
        </v-col>
        <voteComponant @show-vote="handleShowClicked" :voteResults="voteResults" />
    </div>
</template>

<script>
import voteComponant from "~/components/vote/index.vue"
import * as voteAPI from "@/utils/voteAPI"
export default {
    layout: 'liff',
    components: {
        voteComponant
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
</style>
