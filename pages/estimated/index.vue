<template>
    <div v-if="estimateData">
        <v-card
            flat
        >
            <v-card-title class="ma-3 text-h4">
                ผลการประมาณ
                <v-spacer />
                <v-text-field
                    append-icon="mdi-magnify"
                    flat
                    v-model="search"
                    label="Search"
                    class="mx-4"
                    solo-inverted
                    single-line
                    hide-details
                />
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="estimateData"
                :items-per-page="5"
                class="elevation-0"
                :search="search"
                @click="logs"
            />
        </v-card>
    </div>
</template>

<script>
import * as estimateAPI from "@/utils/estimateAPI"
export default {
    data () {
        return {
            search: '',
            estimateData: [],
            headers: [
                { text: 'Project Name', align: 'start', sortable: true, value: 'projectName' },
                { text: 'Create by', align: 'start', sortable: true, value: 'createBy' },
            ],

        }
    },
    async mounted() {
        await estimateAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.estimateData = response.data
            })
    },
    methods: {
        logs() {
            console.log('abc')
        }
    },
}
</script>

<style>
h1 {
    text-align: center;
}
</style>
