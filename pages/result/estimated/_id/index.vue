<template>
    <estimateDetailsPage />
</template>

<script>
import estimateDetailsPage from "~/components/estimated/_id/index.vue"
import * as estimateAPI from "@/utils/estimateAPI"
export default {
    components: {
        estimateDetailsPage
    },
    data() {
        return {
            estimateDetails: [],
            time: ''
        }
    },
    async mounted() {
        console.log(this.$route.params.id)
        await estimateAPI.show(this.$route.params.id)
            .then(response => {
                console.log('RESPONSE', response)
                this.estimateDetails = response.data
                this.time = response.data.estimatedTime
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })

    }

}
</script>

<style>
h1 {
    opacity: 70%;
}
h3 {

    opacity: 70%;
}
</style>
