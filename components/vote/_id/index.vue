<template>
    <div v-if="voteData">
        <div class="ma-5">
            <h1>
                โหวตครั้งที่ 1
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
            >
                {{ item.tab }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-card flat>
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-card
                        tile
                        class="my-5 mx-5"
                        v-for="results in voteData"
                        :key="results.index"
                    >
                        <v-card-title class="justify-center">
                            {{ results.group }}
                        </v-card-title>
                        <div
                            class="d-flex flex-column"
                            v-for="n in results.choice"
                            :key="n"
                        >
                            <v-list-item two-line>
                                <v-list-item-avatar>
                                    <v-avatar
                                        class="ma-3 ml-6"
                                        color="red"
                                        size="120px"
                                    />
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>name</v-list-item-title>
                                    <v-list-item-subtitle>description</v-list-item-subtitle>
                                </v-list-item-content>
                                <div class="result-time">
                                    time hours
                                </div>
                            </v-list-item>
                        </div>
                    </v-card>
                </v-tab-item>
            </v-card>
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
}
</script>

