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
        <v-text-field
            class="mx-4 my-2"
            flat
            label="Search"
            prepend-inner-icon="mdi-magnify"
            solo-inverted
        />
        <v-card flat>
            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-card
                        tile
                        class="my-5 mx-5"
                        v-for="i in 2"
                        :key="i"
                    >
                        <v-card-title class="text-h5 justify-center">
                            ชื่อกลุ่มฟังก์ชัน
                        </v-card-title>
                        <div
                            class="d-flex flex-column"
                            v-for="n in 3"
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
                                <v-list-action>
                                    <v-list-action-text>
                                        <v-text-field width="20px" label="time" solo-inverted />
                                    </v-list-action-text>
                                </v-list-action>
                            </v-list-item>
                        </div>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script>
import * as voteAPI from "@/utils/voteAPI"
export default {
    data() {
        return {
            voteData: [],
            tab: null,
            items: [
                { tab: 'web', },
                { tab: 'mobile', },

            ],
        }
    },
    async mounted() {
        console.log('router param', this.$route.params.id)
        await voteAPI.show(this.$route.params.id)
            .then(response => {
                console.log('RESPONSE', response)
                this.voteData = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })
    }
}
</script>

<style>
h1 {
    text-align: center;

}
</style>
