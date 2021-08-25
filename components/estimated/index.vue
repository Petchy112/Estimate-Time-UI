<template>
    <div>
        <v-card
            flat
        >
            <v-data-table
                :headers="headers"
                :items="estimateData"
                :search="search"
                :disable-pagination="true"
            />
        </v-card>
    </div>
</template>

<script>

export default {
    props: {
        search: String,
        estimateData: Array
    },
    data() {
        return {
            headers: [
                { text: 'Project Name', align: 'start', sortable: true, value: 'projectName' },
                { text: 'Create by', align: 'start', sortable: true, value: 'createBy' }
            ],
        }
    },
}
</script>


