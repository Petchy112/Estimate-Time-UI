<template>
    <div>
        <voteDetails @choose-platform="choosePlatform" :voteData="voteData" />
    </div>
</template>

<script>
import voteDetails from "~/components/voteDetail.vue"
import * as voteAPI from "@/utils/voteAPI"
export default {
    layout: 'liff',
    components: { voteDetails },
    data() {
        return {
            platform: '',
            voteData: [],
            tab: null,
            items: [
                { tab: 'WEBSITE', },
                { tab: 'MOBILE', },

            ],
        }
    },
    async mounted() {
        await voteAPI.show(this.$route.params.round, this.platform || 'WEBSITE')
            .then(response => {
                console.log('RESPONSE', response)
                this.voteData = response.data
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
        async choosePlatform(platform) {
            this.platform = platform
            await voteAPI.show(this.$route.params.round, platform)
                .then(response => {
                    console.log('RESPONSE', response)
                    this.voteData = response.data
                })
                .catch(error => {
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
.bg{
    background-color: rgb(55, 208, 255) !important
}
h1 {
    text-align: center;

}
</style>
