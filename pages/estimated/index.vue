<template>
    <div>
        <div class="ma-3">
            <h1>ผลการประมาณ</h1>
        </div>
        <v-data-table
            :headers="data"
            :items="desserts"
            item-key="name"
            class="elevation-0"
            :search="search"
            :custom-filter="filterOnlyCapsText"
            :click="logs"
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

            <tr
                @click="logs"
            >
                <td @click="logs" />
                <td colspan="4" />
            </tr>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            search: '',
            calories: '',
            desserts: [
                {
                    name: 'Frozen Yogurt',
                },
                {
                    name: 'Ice cream sandwich',
                },
                {
                    name: 'Eclair',
                },
                {
                    name: 'Cupcake',
                },
                {
                    name: 'Gingerbread',
                },
                {
                    name: 'Jelly bean',
                },
                {
                    name: 'Lollipop',
                },
                {
                    name: 'Honeycomb',
                },
                {
                    name: 'Donut',
                },
                {
                    name: 'KitKat',
                },
            ],
        }
    },
    computed: {
        data () {
            return [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: true,
                    value: 'name',
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
