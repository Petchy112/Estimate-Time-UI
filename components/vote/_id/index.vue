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
                    <div>
                        <v-card
                            v-for="(i,index) in voteData"
                            :key="index"
                            tile
                            class="my-5 mx-5"
                        >
                            <v-card-title class="justify-center">
                                {{ i.data.group }}
                            </v-card-title>
                            <div
                                class="d-flex flex-column"
                                v-for="element in i.data.choices"
                                :key="element.name"
                            >
                                <v-list-item class="pb-4" two-line>
                                    <v-list-item-avatar>
                                        <v-avatar>
                                            <img
                                                :src="element.imagePath"
                                            >
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title> {{ element.name }} </v-list-item-title>
                                        <p class="description-text mb-0 pr-5">
                                            {{ element.description }}
                                        </p>
                                    </v-list-item-content>
                                    <div class="result-time">
                                        {{ element.time.toFixed(1) }}  Hours
                                    </div>
                                </v-list-item>
                            </div>
                        </v-card>
                    </div>
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
.description-text {
    color: rgba(000, 000, 000, 0.5);
}
</style>
