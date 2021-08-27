<template>
    <div>
        <v-card
            flat
        >
            <v-data-table
                :headers="headers"
                :items="estimateData"
                class="elevation-0"
                @click:row="handleShowClicked(item)"
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
    methods: {
        handleShowClicked(row) {
            console.log(row)
            this.$emit('show-estimated', row)
        }

    }
}
</script>


