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
                class="tab-title pa-0 pt-11"
                v-model="tab"
                height="60px"
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
                        <v-card-title class="justify-center">
                            SELECT NUMBER OF DEVELOPER
                        </v-card-title>
                        <div class="dev-number">
                            <v-btn class="mx-4" elevation="0" fab width="32px" height="32px" @click="minus">
                                <v-icon size="24px">
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                            <div class="mx-4">
                                {{ selected.qty }}
                            </div>
                            <v-btn class="mx-4" elevation="0" fab width="32px" height="32px" @click="plus">
                                <v-icon size="24px">
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </div>
                        <v-divider class="ma-2" />

                        <div class="subheader2 pa-0 pt-5 ">
                            SELECT FUNCTION THAT YOU NEED
                        </div>
                        <div
                            rounded="50%"
                            class="my-5 mx-5 py-3"
                            v-for="data in estimateData"
                            :key="data._id"
                        >
                            <div class="estimate-card" v-if="data.length != 0">
                                <div class="group-name">
                                    {{ data.group }}
                                </div>

                                <EstimateCard
                                    v-for="choice in data.choices"
                                    :key="choice.name"
                                    :choice="choice"
                                    :active="selected.selectedChoice.includes(choice.name)"
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
                color="primary"
            >
                <v-col cols="12">
                    <v-card-text class="pa-0 pb-4 pl-2">
                        <div class="text">
                            ** Please make sure your selection is correct.
                        </div>
                    </v-card-text>
                    <div class="next-btn">
                        <v-btn v-if="selected.selectedChoice != []" width="40%" outlined color="white" rounded @click="nextPage">
                            Next
                        </v-btn>
                    </div>
                </v-col>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
import EstimateCard from '~/components/pages/EstimateCard.vue'
import voteAPI from '~/utils/voteAPI'

export default {
    layout: 'plain',
    components: { EstimateCard },
    data() {
        return {
            platform: this.$store.getters.getSelectedEstimate.platform,
            tab: null,
            padless: true,
            items: [
                { tab: 'WEBSITE' },
                { tab: 'MOBILE' }
            ],

            selected: {
                selectedChoice: [],
                platform: this.$store.getters.getSelectedEstimate.platform,
                estimateTime: this.$store.getters.getSelectedEstimate.estimateTime,
                projectName: this.$store.getters.getSelectedEstimate.projectName,
                qty: this.$store.getters.getSelectedEstimate.qty,
                size: this.$store.getters.getSelectedEstimate.size
            },
            estimateData: []
        }
    },

    async mounted() {
        // await liff.init({
        //     liffId: '1656364274-kBvYz6PE'
        // })
        this.getEstimateData()
    },
    methods: {
        async getEstimateData () {
            const response = await voteAPI.getDataForEstimate('WEBSITE')
            try {
                console.log('RESPONSE', response)
                this.estimateData = response
            }
            catch (error) {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.error.message
                })
            }
        },
        plus() {
            this.selected.qty = this.selected.qty + 1
        },
        minus() {
            if (this.selected.qty>1) {
                this.selected.qty = this.selected.qty - 1
            }
            else {
                this.selected.qty = 1
            }
        },
        async chooseChoice(choice) {
            console.log(choice)
            if (this.selected.selectedChoice.includes(choice.name)) {
                const found = this.selected.selectedChoice.find(element => element == choice.name)
                const inSelected = this.selected.selectedChoice.indexOf(found)
                this.selected.selectedChoice.splice(inSelected, 1)
                console.log(this.selected.selectedChoice)
                this.selected.estimateTime = this.selected.estimateTime - choice.time
                console.log(this.selected.estimateTime)
            }
            else {
                this.selected.selectedChoice.push(choice.name)
                console.log(this.selected.selectedChoice)
                this.selected.estimateTime = this.selected.estimateTime + choice.time
                console.log(this.selected.estimateTime)
            }


        },
        async choosePlatform(platform) {
            this.selected.platform = platform || 'WEBSITE'
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
            font-size: 14px;

}
    }
}

.v-toolbar__title {
    width: 100%;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: white;
}
.estimate-card {
    background-color: #fafafa;
    border: 1px solid rgba(0, 0, 0, 0.35);
    border-radius: 16px;
}
.group-name {
    font-size: 24px;
    text-align: center;
    padding: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.next-btn {
    display: flex;
    /* justify-content: end; */
    align-items: center;
    margin-bottom: 10px;
}

.tab-title {
    font-size: 14px;

}
.subheader2 {
    text-align: center;
    font-size: 16px;

}
.dev-number {
    display: flex;
    justify-content: center;
    height:50px;
    align-items: center;
}
.container {
    margin-bottom: 54px;
}
.text {
    color: white;
}
</style>
