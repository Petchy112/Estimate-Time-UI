<template>
    <div v-if="estimateData">
        <div class="ma-3">
            <h1>ผลการประมาณ</h1>
        </div>
        <v-data-table
            :headers="data"
            :items="estimateData"
            item-key="projectName"
            class="elevation-0"
            :search="search"
            :custom-filter="filterOnlyCapsText"
            @click="logs"
        >
            <template #top>
                <v-text-field
                    flat
                    v-model="search"
                    label="Search"
                    class="mx-4"
                    solo-inverted
                />
            </template>

            <tr>
                <td colspan="4" />
            </tr>
        </v-data-table>
    </div>
</template>

<script>
import * as estimateAPI from "@/utils/estimateAPI"
export default {
    data () {
        return {
            search: '',
            calories: '',
            estimateData: [],

        }
    },
    async mounted() {
        await estimateAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.estimateData = response.data
            })
    },
    computed: {
        data () {
            return [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: true,
                    value: 'projectName',

                },

            ]
        },
    },
    methods: {
        filterOnlyCapsText (value, search, item) {
            return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleLowerCase().indexOf(search) !== -1
        },
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
