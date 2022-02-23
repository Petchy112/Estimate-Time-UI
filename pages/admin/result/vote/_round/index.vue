<template>
    <div class="wrap-page">
        <div class="header">
            VOTE RESULT
        </div>
        <v-divider />
        <v-tabs
            v-model="tab"
            slider-color="blue"
        >
            <v-tab
                v-for="(item,index) in items"
                :key="index"
                @click="choosePlatform(item.tab)"
            >
                {{ item.tab }}
            </v-tab>
        </v-tabs>
        <v-tabs-items>
            <div v-if="voteData.length != 0">
                <div
                    v-for="(i,index) in voteData.length"
                    :key="index"
                    style="margin: 20px;"
                >
                    <VoteDetail :voteData="voteData[0]" />
                </div>
            </div>
            <div class="empty" v-else>
                ไม่มีข้อมูล
            </div>
        </v-tabs-items>
    </div>
</template>

<script>
import toastr from 'toastr'
import VoteDetail from '~/components/pages/VoteDetail.vue'

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
    async mounted() {
        this.getVoteData()
    },
    methods: {
        async getVoteData() {
            const response = await voteAPI.resultDetails(this.$route.params.round, this.platform || 'WEBSITE')
            try {
                this.voteData = response
            }
            catch (error) {
                toastr.error(error.response.error.message)
            }
        },
        async choosePlatform(platform) {
            this.platform = platform
            this.getVoteData()

        }
    }
}

</script>

<style lang="scss" scoped>
.wrap-page {
    margin: 24px;
    & .header {
        font-size: 28px;
        font-weight: 600;
    }
}

</style>
