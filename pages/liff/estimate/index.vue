<template>
    <div class="wrap-page" v-if="estimateData">
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
                    v-for="i in 3"
                    :key="i.tab"
                >
                    <div>
                        <div class="dev-number">
                            <v-text-field
                                dense
                                class="input-group--focused"
                                placeholder="Number of developers"
                                v-model="data.qty"
                                required
                                outlined
                            >
                                <template slot="label">
                                    Number of developers
                                </template>
                            </v-text-field>
                        </div>
                        <v-divider />
                        <div
                            rounded="50%"
                            v-for="data in estimateData"
                            :key="data._id"
                        >
                            <div class="estimate-card" v-if="data.length != 0">
                                <div class="group-name">
                                    {{ data.group }}
                                </div>

                                <EstimateCard
                                    v-for="(choice,index) in data.choices"
                                    :key="index"
                                    :choice="choice"
                                    @click="isClicked(choice)"
                                    @chooseChoice="chooseChoice"
                                />
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
                        <v-btn class="btn" v-if="data.selectedChoice != []" @click="nextPage">
                            Next
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
import toastr from 'toastr'
import EstimateCard from '~/components/pages/EstimateCard.vue'
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
            data: {
                selectedChoice: [],
                platform: '',
                estimateTime: null,
                projectName: '',
                qty: null,
            },
            isActive: false,
            estimateData: []
        }
    },

    mounted() {
        // await liff.init({
        //     liffId: '1656364274-kBvYz6PE'
        // })
        this.getEstimateData()
    },
    methods: {
        isClicked(val) {
            console.log(val, 'petch')
        },
        async getEstimateData () {
            const response = await voteAPI.getDataForEstimate('WEBSITE')
            try {
                this.estimateData = response
            }
            catch (error) {
                toastr.error(response.error.data.message)
            }
        },
        async chooseChoice(choice) {
            if (this.data.selectedChoice.includes(choice.name)) {
                this.isActive = true
                const found = this.data.selectedChoice.find(element => element == choice.name)
                const index = this.data.selectedChoice.indexOf(found)
                this.data.selectedChoice.splice(index, 1)
                console.log(this.data.selectedChoice)
                this.data.estimateTime = this.data.estimateTime - choice.time
                console.log(this.data.estimateTime)
            }
            else {
                this.data.selectedChoice.push(choice.name)
                console.log(this.data.selectedChoice)
                this.data.estimateTime = this.data.estimateTime + choice.time
                console.log(this.data.estimateTime)
            }


        },
        async choosePlatform(platform) {
            this.data.platform = platform || 'WEBSITE'
            console.log(this.selected)
            await voteAPI.getDataForEstimate(platform)
                .then(async response => {
                    console.log('RESPONSE', response)
                    this.estimateData = response
                })
        },
        async nextPage() {
            this.$store.dispatch('setSelectedEstimate', this.selected)
            await this.$router.push({ name: 'liff-estimate-page2' })
        }
    }
}

</script>
<style lang='scss' scoped>
.wrap-page {
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
        margin: 60px 10px 0 10px;
        & .tab-title {
            font-size: 12px;
        }
        & .dev-number {
            margin-top: 24px;
            display: flex;
            // justify-content: space-evenly;
            height:50px;
            align-items: center;
        }
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
