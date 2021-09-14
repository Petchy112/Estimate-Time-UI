<template>
    <div>
        <div
            class="ma-5"
        >
            <h1>
                VOTE RESULTS
            </h1>
        </div>
        <v-tabs
            v-model="tab"
            slider-color="yellow"
            fixed-tabs
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
            <div>
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-card
                        v-for="(i,index) in 1"
                        :key="index"
                        tile
                        class="my-5 mx-5"
                    >
                        <v-card-title class="justify-center">
                            i.data.group
                        </v-card-title>
                        <div
                            class="d-flex flex-column"
                            v-for="element in 3"
                            :key="element.name"
                        >
                            <v-list-item two-line>
                                <v-list-item-avatar>
                                    <v-avatar>
                                        <img
                                            :src="element.imagePath"
                                        >
                                    </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title> element.name </v-list-item-title>
                                    <v-list-item-subtitle> name.description </v-list-item-subtitle>
                                </v-list-item-content>
                                <div class="result-time">
                                    element.time.toFixed(1)  Hours
                                </div>
                            </v-list-item>
                        </div>
                    </v-card>
                </v-tab-item>
            </div>
        </v-tabs-items>
    </div>
</template>

<script>

export default {
    props: {
        voteData: Array
    },
    data() {
        return {
            tab: null,
            items: [
                { tab: 'WEBSITE', },
                { tab: 'MOBILE', },

            ],
        }
    },
    methods: {
        choosePlatform(platform) {
            this.$emit('choose-platform', platform)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
