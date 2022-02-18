<template>
    <Votedetail @choose-platform="choosePlatform" :voteData="voteData" />
</template>

<script>

import Votedetail from "~/components/votedetail.vue"
import voteAPI from "~/utils/voteAPI"
export default {
    components: {
        Votedetail
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
        const response = await voteAPI.resultDetails(this.$route.params.round, this.platform || 'WEBSITE')
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
            await voteAPI.resultDetails(this.$route.params.round, platform)
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

<style lang="scss" scoped>

</style>
