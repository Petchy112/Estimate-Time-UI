<template>
    <div class="wrap-page">
        <div class="header">
            <div class="back" @click="back">
                <v-icon size="32px">
                    mdi-arrow-left
                </v-icon>
            </div>
            VOTE RESULT
        </div>
        <v-divider />
        <v-tabs
            v-model="tab"
            slider-color="blue"
            fixed-tabs
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
                    v-for="(data,index) in voteData"
                    :key="index"
                    style="margin: 16px;"
                >
                    <VoteDetail :voteData="data" />
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
    layout: 'plain',
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
            try {
                const response = await voteAPI.resultDetails(this.$route.params.round, this.platform || 'WEBSITE')
                this.voteData = response.data
            }
            catch (error) {
                toastr.error(error.response.error.message)
            }
        },
        async choosePlatform(platform) {
            this.platform = platform
            this.getVoteData()

        },
        back() {
            history.back()
        }
    }
}

</script>

<style lang="scss" scoped>
.wrap-page {
    margin: 24px 16px 0 16px;
    & .header {
        display: flex;
        justify-content: space-between;
        font-size: 32px;
        font-weight: 600;
        margin-right: 64px;
    }
}

</style>
