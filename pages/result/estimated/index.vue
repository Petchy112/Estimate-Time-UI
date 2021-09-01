<template>
    <div>
        <v-card-title>
            <div class="my-head ma-3">
                ESTIMATE RESULTS
            </div>
            <v-spacer />
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                flat
                label="Search"
                class="mx-4"
                solo-inverted
                single-line
                hide-details
            />
        </v-card-title>
        <estimateComponant :headers="headers" :estimateData="estimateData" @show-estimated="handleShowClicked" />
    </div>
</template>

<script>
import * as estimateAPI from "@/utils/estimateAPI"
import estimateComponant from "~/components/estimated/index.vue"
export default {
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
        await estimateAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.estimateData = response.data
            })
            .catch(async error => {
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
            this.$router.push({ name: 'result-estimated-id', params: { id } })
        }
    },
}
</script>

<style scoped>

.my-head {
    font-size: 32px !important;
    font-weight: bold;
}
</style>
