<template>
    <div>
        <div class="ma-5">
            <h1>VOTE RESULTS</h1>
        </div>
        <v-tabs
            v-model="tab"
            slider-color="blue"
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
                    <div v-if="voteData">
                        <div
                            v-for="(i,index) in voteData"
                            :key="index"
                            tile
                            class="result-card"
                        >
                            <v-card-title class="card-title">
                                {{ i.data.group }}
                            </v-card-title>
                            <div
                                class="d-flex flex-column"
                                v-for="element in i.data.choices"
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
                                        <v-list-item-title class="name">
                                            {{ element.name }}
                                        </v-list-item-title>
                                        <p class="description ">
                                            {{ element.description }}
                                        </p>
                                    </v-list-item-content>
                                    <div class="result-time">
                                        {{ element.time.toFixed(1) }}  Hours
                                    </div>
                                </v-list-item>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-data">
                        {{ voteData }}
                    </div>
                </v-tab-item>
            </div>
        </v-tabs-items>
    </div>
</template>

<script>

export default {
    props: [ 'voteData' ],
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

<style  scoped>
.name{
    margin: 0px;
    padding-right: 10px;
}
.description {
    color: rgba(000, 000, 000, 0.5);
    margin: 0px;
    padding-right: 10px;
}
.result-card{
    border: 1px solid rgba(0,0,0,0.4);
    border-radius: 8px;
    margin: 32px;
}
.card-title {
    border-bottom: 1px solid rgba(0,0,0,0.4);
    background-color: #f3f3f3;
    justify-content: center;
}
.text-data {
    /* text-align: center;
     transform: translateY(60%);
    color: rgba(000, 000, 000, 0.3); */
}
</style>
