<template>
    <div>
        <VoteDetails
            @choose-platform="choosePlatform"
            :voteData="voteData == [] ? null :voteData"
        />
    </div>
</template>

<script>
import VoteDetails from "~/components/voteDetail.vue"
import * as voteAPI from "~/utils/voteAPI"
export default {
    layout: 'liff',
    components: { VoteDetails },
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
    methods: {
        async showResult() {
            const response = await voteAPI.show(this.$route.params.round, this.platform || 'WEBSITE')
            this.voteData = response
        },
        async choosePlatform(platform) {
            this.platform = platform
            this.showResult()
        }
    },
    mounted() {
        this.showResult()
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
