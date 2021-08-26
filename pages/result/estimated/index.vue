<template>
    <div>
        <v-card-title>
            <div class="my-head ma-3">
                Estimate result
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
        <estimateComponant @show-estimated="handleShowClicked" :estimateData="estimateData" />
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
                console.log('ERROR', error.response)

            })
    },
    methods: {
        async handleShowClicked(id) {
            console.log(id)
            // this.$router.push({ name: 'result-estimated-date', params: { id } })
        }
    },
}
</script>

<style scoped>

.my-head {
    font-size: 32px !important;
}
</style>
