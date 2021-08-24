<template>
    <div v-if="estimateData">
        <v-row>
            <v-col cols="12" class="back">
                <v-card-title class="card-title">
                    <div class="my-head my-5">
                        ผลการประมาณ
                    </div>
                    <v-text-field
                        append-icon="mdi-magnify"
                        flat
                        v-model="search"
                        label="Search"
                        solo-inverted
                        single-line
                        hide-details
                    />
                </v-card-title>
                <estimateComponant />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import * as estimateAPI from "@/utils/estimateAPI"
import estimateComponant from "~/components/estimated/index.vue"
export default {
    layout: 'liff',
    components: {
        estimateComponant
    },
    data () {
        return {
            search: '',
            estimateData: [],
            headers: [
                { text: 'Project Name', align: 'start', sortable: true, value: 'projectName' },
                { text: 'Create by', align: 'start', sortable: true, value: 'createBy' }
            ],
        }
    },
    async mounted() {
        await estimateAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.estimateData = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })
    },
    methods: {
        handleListClicked(id) {
            console.log(id)
        }
    },
}
</script>

<style scoped>
h1 {
    text-align: center;
}
.my-head {
    font-size: 32px !important;

}
.card-title {
    justify-content: center;
}

</style>
