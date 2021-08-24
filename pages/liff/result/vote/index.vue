<template>
    <div v-if="results">
        <v-col cols="12">
            <h1>Vote Results</h1>
        </v-col>
        <voteComponant />
    </div>
</template>

<script>
import voteComponant from "~/components/vote/index.vue"
import * as voteAPI from "@/utils/voteAPI"
export default {
    layout: 'liff',
    components: {
        voteComponant
    },
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
            this.$router.push({ name: 'liff-result-vote-id', params: { id } })
        }
    }
}
</script>

<style scoped>

.v-btn {
 height: 50px;
}
</style>
