<template>
    <estimateDetailsPage :estimateDetails="estimateDetails" :time="time" />
</template>

<script>
import estimateDetailsPage from "~/components/estimated/_id/index.vue"
import * as estimateAPI from "@/utils/estimateAPI"
export default {
    layout: 'liff',
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
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })

    }

}
</script>


