<template>
    <div v-if="estimateDetails">
        <div class="mt-5 mx-5">
            <h1> {{ estimateDetails.projectName }}</h1>
            <h3>Platform : {{ estimateDetails.platform }}</h3>
        </div>
        <v-row
            justify="start"
            class="pb-5 px-5"
        >
            <v-card
                width="400"
                class="py-3 my-3"
                flat
            >
                <v-card-content>
                    <v-card-title class="pa-2 pb-1">
                        Number of developer: {{ estimateDetails.qty }}
                    </v-card-title>
                    <v-card-title class="pt-0 pb-0 pl-2">
                        Estimated time : {{ time/5 }} weeks
                    </v-card-title>
                    <v-card-title class="pa-2 pt-1">
                        System size: {{ estimateDetails.size }}
                    </v-card-title>
                </v-card-content>
            </v-card>
        </v-row>
        <v-divider />
        <div class="pt-5">
            <h1>ฟังก์ชันที่เลือก</h1>
        </div>
        <div class="d-flex flex-wrap">
            <v-card
                class="ma-5"
                max-width="344"
                v-for="selected in estimateDetails.choice"
                :key="selected.index"
            >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                />

                <v-card-title class="pa-0">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title>{{ selected }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>

<script>
import * as estimateAPI from "@/utils/estimateAPI"
export default {
    data() {
        return {
            estimateDetails: [],
            time: ''
        }
    },
    async mounted() {
        console.log(this.$route.params.id)
        await estimateAPI.show(this.$route.params.id)
            .then(response => {
                console.log('RESPONSE', response)
                this.estimateDetails = response.data
                this.time = response.data.estimatedTime
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })

    }

}
</script>

<style scoped>
h1 {
    opacity: 70%;
    font-size: 38px;
}
h3 {
    font-size: 18px;
    text-align: center;
    opacity: 70%;
}
</style>
