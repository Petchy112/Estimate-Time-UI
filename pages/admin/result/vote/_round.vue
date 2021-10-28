<template>
    <voteDetails @choose-platform="choosePlatform" :voteData="voteData" />
</template>

<script>
import voteDetails from "~/components/voteDetail.vue"
import * as voteAPI from "~/utils/voteAPI"
export default {
    components: {
        voteDetails
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
        voteAPI.show(this.$route.params.round, this.platform || 'WEBSITE')
            .then(response => {
                console.log('RESPONSE', response)
                this.voteData = response
            })
            .catch(async error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.error.message
                })
            })
    },
    methods: {
        async choosePlatform(platform) {
            this.platform = platform
            await voteAPI.show(this.$route.params.round, platform)
                .then(response => {
                    console.log('RESPONSE', response)
                    this.voteData = response
                })
                .catch(async error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.error.message
                    })
                })
        }
    }
}
</script>

<style>
h1 {
    text-align: center;

}
</style>
