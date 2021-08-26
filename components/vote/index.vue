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
                        v-for="(data,index) in voteResults "
                        :key="index"
                        @click="handleShowClicked(data.votingDate)"
                    >
                        <td>โหวตครั้งที่ {{ index+1 }} , ({{ data.votingDate }})</td>
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


