<template>
    <div v-if="results">
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
                        v-for="(data,index) in results "
                        :key="index"
                        @click="handleShowClicked(data._id)"
                    >
                        <td>โหวตครั้งที่ {{ index+1 }} , ({{ data.votingDate }})</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import * as voteAPI from "@/utils/voteAPI"
export default {
    data () {
        return {
            results: [],
        }
    },
    async mounted() {
        await voteAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.results = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })

    },

    methods: {
        async handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'liff-result-id', params: { id } })
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>
