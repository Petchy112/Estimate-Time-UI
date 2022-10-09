<template>
    <div class="wrap-page">
        <v-app-bar
            class="app-bar"
            flat
            fixed
        >
            <div class="title">
                ESTIMATE TIME
            </div>
        </v-app-bar>
        <div class="wrap-content">
            <v-tabs
                class="tab-title"
                v-model="tab"
                slider-color="blue"
            >
                <v-tab
                    v-for="item in items"
                    :key="item.tab"
                    @click="choosePlatform(item.tab)"
                >
                    {{ item.tab }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="i in 2"
                    :key="i.tab"
                >
                    <div>
                        <div class="dev-number">
                            <v-text-field
                                dense
                                class="input-group--focused"
                                label="Number of developers"
                                v-model="fromData.qty"
                                required
                                outlined
                            >
                                <template slot="label">
                                    Number of developers
                                </template>
                            </v-text-field>
                        </div>
                        <v-divider />
                        <div class="card">
                            <div
                                rounded="50%"
                                v-for="(estimate,index) in estimateData"
                                :key="index"
                            >
                                <div class="estimate-card">
                                    <div class="group-name">
                                        {{ estimate.group }}
                                    </div>

                                    <EstimateCard
                                        v-for="(choice, index) in estimate.choices"
                                        :key="index"
                                        :choice="choice"
                                        @chooseChoice="chooseChoice"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </div>
        <v-footer
            :padless="padless"
            fixed
            app
            height="100px"
        >
            <v-card
                tile
                width="100%"
                color="#37d0ff"
            >
                <div class="footer-content">
                    <div class="remark">
                        ** Please make sure your selection is correct.
                    </div>
                    <div class="next-btn">
                        <v-btn class="btn" @click="nextPage">
                            Next
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import toastr from 'toastr'
import EstimateCard from '~/components/pages/EstimateCard'
import voteAPI from '~/utils/voteAPI'

export default {
    layout: 'plain',
    components: { EstimateCard },
    data() {
        return {
            tab: null,
            padless: true,
            items: [
                { tab: 'WEBSITE' },
                { tab: 'MOBILE' }
            ],
            fromData: {
                selectedChoice: [],
                platform: 'WEBSITE',
                estimateTime: 0,
                projectName: '',
                qty: 1,
            },
            isActive: false,
            estimateData: []
        }
    },
    computed: {
        ...mapState({
            estimate: (state) => state.estimate
        })
    },

    methods: {
        ...mapMutations({
            setEstimateData: "estimate/setEstimateData",
        }),
        async getEstimateData () {
            await voteAPI.getDataForEstimate('WEBSITE')
                .then(response => {
                    this.estimateData = response.data
                }).catch (error => {
                    toastr.error(error.data.message)
                })
        },
        async chooseChoice(choice) {
            if (this.fromData.selectedChoice.includes(choice)) {
                this.isActive = true
                const found = this.fromData.selectedChoice.find(element => element == choice.name)
                const index = this.fromData.selectedChoice.indexOf(found)
                this.fromData.selectedChoice.splice(index, 1)
                this.fromData.estimateTime = this.fromData.estimateTime - choice.time
            }
            else {
                this.fromData.selectedChoice.push(choice)
                this.fromData.estimateTime = this.fromData.estimateTime + choice.time
            }
        },
        async choosePlatform(platform) {
            this.fromData.platform = platform
            await voteAPI.getDataForEstimate(platform)
                .then(async response => {
                    this.estimateData = response.data
                })
        },
        async nextPage() {
            this.setEstimateData(this.fromData)
            await this.$router.push({ name: 'liff-estimate-page2' })
        }
    },
    mounted() {
        this.getEstimateData()
        // this.fromData.selectedChoice = this.estimate.selectedChoice
        // this.fromData.quantity = this.estimate.quantity
    },
}

</script>
<style lang='scss' scoped>
.wrap-page {
    padding-bottom: 120px;
    & .app-bar{
        display: flex;
        background-color: #37d0ff !important;
        justify-content: center;
        color: #fff;
        & .title {
            font-weight: 600;
            font-size: 28px !important;
        }
    }
    & .wrap-content {
        margin: 60px 10px 0px 10px;
        & .tab-title {
            font-size: 12px;
        }
        & .dev-number {
            margin-top: 30px;
            display: flex;
            // justify-content: space-evenly;
            height:50px;
            align-items: center;
        }
        & .card {
            display: grid;
            grid-gap: 16px;
            & .estimate-card {
                background-color: #fafafa;
                border: 1px solid rgba(0, 0, 0, 0.35);
                border-radius: 16px;
                & .group-name {
                    font-size: 20px;
                    font-weight: 600;
                    text-align: center;
                    padding: 16px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
    & .footer-content {
        height: 100px;
        margin: 8px;
        display: grid;
        & .remark {
            color: #fff;
        }
        & .next-btn {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            & .btn {
                width: 100%;
                border-radius: 8px;
                font-weight: 600;
            }

        }

    }
}
</style>
