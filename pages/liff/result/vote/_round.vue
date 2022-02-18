<template>
    <div>
        <Votedetail
            @choose-platform="choosePlatform"
            :voteData="voteData == [] ? null :voteData"
        />
    </div>
</template>

<script>
import Votedetail from "~/components/Votedetail.vue"
import voteAPI from "~/utils/voteAPI"
export default {
    layout: 'liff',
    components: { Votedetail },
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
            const response = await voteAPI.resultDetails(this.$route.params.round, this.platform || 'WEBSITE')
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
