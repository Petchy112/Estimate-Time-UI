<template>
    <div>
        <v-card
            flat
        >
            <v-data-table
                :headers="headers"
                :items="estimateData"
                class="elevation-0"
                @click:row="handleShowClicked"
            />
        </v-card>
    </div>
</template>

<script>

export default {
    props: [
        'search',
        'estimateData',
        'headers'
    ],

    methods: {
        handleShowClicked(row) {
            this.$emit('show-estimated', row)
        }

    }
}
</script>


