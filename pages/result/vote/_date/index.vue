<template>
    <voteDetails @choose-platform="choosePlatform" :voteData="voteData" />
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
            platform: 'WEBSITE',
            voteData: [],
            tab: null,
            items: [
                { tab: 'WEBSITE', },
                { tab: 'MOBILE', },

            ],
        }
    },
    async mounted() {
        await voteAPI.show(this.$route.params.date, this.platform)
            .then(response => {
                console.log('RESPONSE', response)
                this.voteData = response.data
            })
            .catch(async error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })
    },
    methods: {
        async choosePlatform(platform) {
            this.platform = platform
            await voteAPI.show(this.$route.params.date, platform)
                .then(response => {
                    console.log('RESPONSE', response)
                    this.voteData = response.data
                })
                .catch(async error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
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
