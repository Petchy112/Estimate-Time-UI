<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-title class="card-title">
                    <div class="my-head my-5">
                        ESTIMATE RESULTS
                    </div>
                    <v-text-field
                        dense
                        append-icon="mdi-magnify"
                        flat
                        v-model="search"
                        label="Search"
                        solo-inverted
                        single-line
                        hide-details
                    />
                </v-card-title>
                <v-divider class="mt-3 mb-5" />
                <div class="grid-container">
                    <div
                        class="pl-3 content-column"
                        v-for="(item,index) in estimateData"
                        :key="index"
                    >
                        <v-expansion-panels>
                            <v-expansion-panel
                                class="panel"
                            >
                                <v-expansion-panel-header>
                                    <div class="proj-header">
                                        {{ item.projectName }}
                                    </div>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div class="left-box">
                                        Create by : {{ item.createBy }}
                                        <br>
                                        Platform : {{ item.platform }}
                                        <br>
                                        Number of developer : {{ item.qty }}
                                        <br>
                                        System size : {{ item.size }}
                                        <br>
                                        Estimated Time : {{ item.estimatedTime }}
                                    </div>
                                    <v-divider class="my-5" />
                                    <div class="right-box mt-5">
                                        <template>
                                            <v-expansion-panels flat focusable>
                                                <v-expansion-panel>
                                                    <v-expansion-panel-header expand-icon="mdi-menu-down">
                                                        <div class="proj-header">
                                                            SELECTED FUNCTION
                                                        </div>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        <div
                                                            v-for="select in item.choice"
                                                            :key="select.index"
                                                        >
                                                            {{ select }}
                                                        </div>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </template>
                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>


<script>
import * as estimateAPI from "@/utils/estimateAPI"
export default {
    layout: 'liff',
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
    font-weight: bold;

}
.card-title {
    justify-content: center;
}
.proj-header{
    font-size: 18px;
    font-weight: bold;
}
.selected {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}


</style>
