<template>
    <div v-if="estimateData">
        <v-app>
            <v-container>
                <v-app-bar
                    color="rgb(55, 208, 255)"
                    flat
                    fixed
                    max-width="100%"
                >
                    <v-toolbar-title class="text">
                        Estimate system
                    </v-toolbar-title>
                </v-app-bar>
                <v-container class="container">
                    <v-col cols="12">
                        <div class="subheader1 pa-0 pt-5">
                            Select Platform
                        </div>
                        <v-tabs
                            v-model="tab"
                            height="60px"
                            slider-color="blue"
                            color="rgb(55, 208, 255)"
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
                                <div class="subheader2 pa-0 pt-5 ">
                                    Select Function that you need
                                </div>
                                <v-card
                                    rounded="50%"
                                    class="my-5 mx-5 pb-4"
                                >
                                    <v-card-title class="justify-center">
                                        Select developer
                                    </v-card-title>
                                    <div class="input-time">
                                        <div>
                                            <v-text-field
                                                dense
                                                label="Number"
                                                v-model="selected.qty"
                                                solo-inverted
                                            />
                                        </div>
                                    </div>
                                </v-card>
                                <div
                                    v-for="data in estimateData"
                                    :key="data._id"
                                >
                                    <div v-if="data.choices.length != 0">
                                        <v-card
                                            rounded="50%"
                                            class="my-5 mx-5 py-3"
                                        >
                                            <v-card-title class="justify-center mb-3">
                                                {{ data.group }}
                                            </v-card-title>

                                            <estimateCard
                                                v-for="choice in data.choices"
                                                :choices="choice"
                                                :key="choice.name"
                                                :active="selected.selectedChoice.includes(choice.name)"
                                                @chooseChoice="chooseChoice"
                                            />
                                        </v-card>
                                    </div>
                                </div>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-col>
                </v-container>
                <v-footer
                    :padless="padless"
                    fixed
                    app
                    height="100px"
                >
                    <v-card
                        tile
                        width="100%"
                        color="rgb(55, 208, 255)"
                    >
                        <v-col cols="12">
                            <v-card-text class="pa-0 pb-4 pl-2">
                                <div class="text">
                                    ** Please make sure your selection is correct.
                                </div>
                            </v-card-text>
                            <v-btn dark outlined rounded class="next-btn" @click="nextPage">
                                Next
                            </v-btn>
                        </v-col>
                    </v-card>
                </v-footer>
            </v-container>
        </v-app>
    </div>
</template>

<script>
import * as voteAPI from "~/utils/voteAPI"
import estimateCard from "~/components/estimateCard.vue"
export default {
    layout: 'liff',
    components: {
        estimateCard
    },
    data() {
        return {
            platform: '',
            tab: null,
            padless: true,
            items: [
                { tab: 'WEBSITE' },
                { tab: 'MOBILE' }
            ],

            selected:
                {
                    selectedChoice: [],
                    platform: '' || 'WEBSITE',
                    estimateTime: 0,
                    projectName: '',
                    qty: 1,
                    size: ''
                },
            estimateData: []
        }
    },
    async mounted() {

        await voteAPI.getDataForEstimate('WEBSITE')
            .then(async response => {
                console.log('RESPONSE', response)
                this.estimateData = response.data
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
        async chooseChoice(choice) {
            console.log(choice.name)
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
                    this.estimateData = response.data
                })
        },
        nextPage() {
            this.$store.dispatch('setSelectedEstimate', this.selected)
            this.$router.push({ name: 'liff-estimate-page2' })
        }
    }
}

</script>

<style scoped>
.v-application--wrap {
    background-color:rgb(55, 208, 255);
}
.v-tabs-items {
    background-color:rgb(55, 208, 255) !important;
}
.v-toolbar__title {
    width: 100%;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
}
.next-btn {
    width: 100%;
    margin-bottom: 10px;
}
.subheader1 {
    font-size: 14px;

}
.subheader2 {
    text-align: center;
    color: white
}
.input-time {
    width: 100%;
    display: flex;
    justify-content: center;
    height:50px;


}
.container {
    margin-bottom: 54px;
}
.text {
    color: white;
}
</style>
