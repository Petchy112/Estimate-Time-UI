<template>
    <div v-if="functionData">
        <v-app-bar
            color="orange"
            flat
            max-width="100%"
        >
            <v-toolbar-title>
                Estimate system
            </v-toolbar-title>
        </v-app-bar>
        <v-col cols="12">
            <div class="subheader1 pa-0 pt-5">
                Select Platform
            </div>
            <v-tabs
                v-model="tab"
                slider-color="yellow"
                color="orange"
            >
                <v-tab
                    v-for="item in items"
                    :key="item.tab"
                >
                    {{ item.tab }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <div class="subheader2 pa-0 pt-5">
                        Select Function that you need
                    </div>
                    <v-card
                        tile
                        class="my-5 mx-5"
                        v-for="i in 2"
                        :key="i"
                    >
                        <v-card-title class="justify-center">
                            Group
                        </v-card-title>
                        <div
                            class="d-flex flex-column"
                            v-for="n in 3"
                            :key="n"
                        >
                            <v-btn height="80px" class="mb-3 mx-3" @click="logs(n)">
                                <v-list-item two-line>
                                    <v-list-item-avatar>
                                        <v-img max-width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png" />
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>name</v-list-item-title>
                                        <v-list-item-subtitle>description</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-btn>
                        </div>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-col>

        <v-divider />
        <v-footer
            :padless="padless"
            fixed
        >
            <v-card

                tile
                width="100%"
                color="orange"
            >
                <v-col cols="12">
                    <v-card-text class="pa-0 pb-4 pl-2">
                        ** กรุณาตรวจสอบข้อมูลให้เรียบร้อย
                    </v-card-text>
                    <v-btn outlined rounded class="next-btn" @click="nextPage">
                        Next
                    </v-btn>
                </v-col>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
import * as functionAPI from "~/utils/functionAPI"
export default {
    layout: 'liff',
    data() {
        return {
            tab: null,
            padless: true,
            variant: 'fixed',
            functionData: [],
            items: [
                { tab: 'WEBSITE' },
                { tab: 'MOBILE' }
            ]
        }
    },
    async mounted() {
        await functionAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.functionData = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })
    },
    methods: {
        logs(n) {
            console.log(n)
        },
        nextPage() {
            this.$router.push({ name: 'liff-estimate-page2' })
        }
    }
}
</script>

<style scoped>
.v-application--wrap {
    background-color: orange;
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
    opacity: 70%;
}
.subheader2 {
    text-align: center;
    opacity: 70%;
}

</style>
