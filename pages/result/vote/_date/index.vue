<template>
    <voteDetails :voteData="voteData" />
</template>

<script>
import voteDetails from "~/components/vote/_id/index.vue"
import * as voteAPI from "@/utils/voteAPI"
export default {
    components: {
        voteDetails
    },
    data() {
        return {
            voteData: [],
            tab: null,
            items: [
                { tab: 'web', },
                { tab: 'mobile', },

            ],
        }
    },
    async mounted() {
        console.log('router param', this.$route.params.date)
        await voteAPI.show(this.$route.params.date)
            .then(response => {
                console.log('RESPONSE', response)
                this.voteData = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })
    }
}
</script>

<style>
h1 {
    text-align: center;

}
</style>
