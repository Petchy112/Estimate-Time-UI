<template>
    <div>
        <v-col cols="12">
            <v-card-title class="card-title">
                <div class="my-head my-5">
                    ESTIMATE RESULTS
                </div>
                <v-text-field
                    flat
                    background-color="rgb(240,240,240)"
                    append-icon="mdi-magnify"
                    v-model="search"
                    label="Search"
                    solo
                    single-line
                    hide-details
                />
            </v-card-title>
            <v-divider class="mt-3 mb-5 mx-2" />
            <div v-if="estimateData==''" class="text-data">
                No data
            </div>
            <div class="grid-container">
                <div
                    class="mx-4 mb-4"
                    v-for="(item,index) in filteredItems"
                    :key="index"
                >
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <div class="proj-header py-2">
                                    {{ item.projectName }}
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <div class="left-box">
                                    Create by : {{ item.createBy }}
                                    <br>
                                    Platform : {{ item.platform }}
                                    <br>
                                    Number of developer : {{ item.qty }} person
                                    <br>
                                    Estimated Time : {{ item.estimatedTime }} Hours
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
                                                    <div v-if="item.choice == ''">
                                                        No Data
                                                    </div>
                                                    <div
                                                        v-else
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
    </div>
</template>


<script>
import estimateAPI from "~/utils/estimateAPI"
export default {
    layout: 'plain',
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
        // await liff.init({
        //     liffId: '1656364274-ADg78Boe'
        // })
        const response = await estimateAPI.estimateLists()
        console.log('RESPONSE', response)
        this.estimateData = response

    },
    computed: {
        filteredItems() {
            return this.estimateData.filter(item => {
                return item.projectName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
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
.text-data {
    text-align: center;
    color: rgba(000,000, 000, 0.3);
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
