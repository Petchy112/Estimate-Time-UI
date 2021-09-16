<template>
    <div v-if="voteResults">
        <v-simple-table class="mx-3">
            <template #default>
                <thead>
                    <tr>
                        <th>
                            Round
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="data in voteResults "
                        :key="data.index"
                        @click="handleShowClicked(data)"
                    >
                        <td>Vote round {{ data }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    props: {
        voteResults: Array
    },
    methods: {
        handleShowClicked(date) {
            this.$emit('show-vote', date)
        }
    }
}
</script>


