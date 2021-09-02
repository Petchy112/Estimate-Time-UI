<template>
    <div v-if="voteResults">
        <v-simple-table class="ma-5">
            <template #default>
                <thead>
                    <tr>
                        <th>
                            Voting round (day)
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


