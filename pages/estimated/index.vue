<template>
    <div>
        <v-card-title>
            <div class="my-head ma-3">
                ผลการประมาณ
            </div>
            <v-spacer />
            <v-text-field
                append-icon="mdi-magnify"
                flat
                v-model="search"
                label="Search"
                class="mx-4"
                solo-inverted
                single-line
                hide-details
            />
        </v-card-title>
        <estimateComponant />
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
                this.message = error.response.data.error.message
            })
    },
    methods: {
        handleListClicked(id) {
            console.log(id)
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
</style>
