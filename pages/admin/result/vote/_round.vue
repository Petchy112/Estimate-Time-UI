<template>
    <VoteDetail @choose-platform="choosePlatform" :voteData="voteData" />
</template>

<script>

import VoteDetail from "~/components/VoteDetail.vue"
import voteAPI from "~/utils/voteAPI"
export default {
    components: {
        VoteDetail
    },
    data() {
        return {
            platform: 'WEBSITE',
            voteData: [],
            tab: null,
            items: [
                { tab: 'WEBSITE', },
                { tab: 'MOBILE', },

            ],
        }
    },
    mounted() {
        const response = voteAPI.resultDetails(this.$route.params.round, this.platform || 'WEBSITE')
        try {
            console.log('RESPONSE', response)
            this.voteData = response
        }
        catch (error) {
            this.$store.dispatch('setDialog', {
                isShow: true,
                title: 'Please try again',
                message: error.response.error.message
            })
        }
    },
    methods: {
        async choosePlatform(platform) {
            this.platform = platform
            await voteAPI.show(this.$route.params.round, platform)
            try {
                console.log('RESPONSE', response)
                this.voteData = response
            }
            catch (error) {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.error.message
                })
            }
        }
    }
}
</script>

<style>
h1 {
    text-align: center;

}
</style>
