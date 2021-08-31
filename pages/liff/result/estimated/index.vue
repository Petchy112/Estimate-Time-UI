<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-title class="card-title">
                    <div class="my-head my-5">
                        Estimate result
                    </div>
                    <v-text-field
                        append-icon="mdi-magnify"
                        flat
                        v-model="search"
                        label="Search"
                        solo-inverted
                        single-line
                        hide-details
                    />
                </v-card-title>
                <estimateComponant :headers="headers" :estimateData="estimateData" @show-estimated="handleShowClicked" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import * as estimateAPI from "@/utils/estimateAPI"
import estimateComponant from "~/components/estimated/index.vue"
export default {
    layout: 'liff',
    components: {
        estimateComponant
    },
    data () {
        return {
            search: '',
            estimateData: [],
            headers: [
                { text: 'Project Name', align: 'start', sortable: true, value: 'projectName' },
                { text: 'Create by', align: 'start', sortable: true, value: 'createBy' }
            ],
        }
    },
    async mounted() {
        await liff.init({
            liffId: '1656364274-Nyb5rJkp'
        })
        await estimateAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.estimateData = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })
    },
    methods: {
        async handleShowClicked(data) {
            var id = data._id
            this.$router.push({ name: 'liff-result-estimated-id', params: { id } })
        }
    },
}
</script>

<style scoped>
h1 {
    text-align: center;
}
.my-head {
    font-size: 32px !important;

}
.card-title {
    justify-content: center;
}

</style>
