<template>
    <div>
        <v-card-title>
            <div class="my-head ma-3">
                ESTIMATE RESULTS
            </div>
            <v-spacer />
            <v-text-field
                background-color="rgba(240,240,240)"
                v-model="search"
                append-icon="mdi-magnify"
                flat
                placeholder="Search"
                class="mx-4"
                solo
                single-line
                hide-details
            />
        </v-card-title>
        <v-divider class="ma-5" />
        <div v-if="this.estimateData == ''" class="text-data">
            No data
        </div>
        <div v-else class="grid-container">
            <div
                class="pl-3 content-column"
                v-for="(item,index) in filteredItems"
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
                                                <div class="text-data" v-if="item.choice == ''">
                                                    No Data
                                                </div>
                                                <div
                                                    class="mt-3"
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
    </div>
</template>

<script>
import * as estimateAPI from "~/utils/estimateAPI"
export default {

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
    computed: {
        filteredItems() {
            return this.estimateData.filter(item => {
                return item.projectName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    },
    mounted() {
        estimateAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.estimateData = response
            })
            .catch(async error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.error.message
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
.proj-header{
    font-size: 18px;
    font-weight: bold;
}
.selected {
    font-size: 16px;
    font-weight: bold;
}
.v-expansion-panels {
    width: 400px;
}
.text-data {
    text-align: center;
    color: rgba(000,000, 000, 0.3);
}
.panel {
    margin: 5px 5px ;
    padding: 5px 5px;
}
.grid-container {
    display: flex;
    flex-wrap: wrap;
}
.text-data {
    text-align: center;
    color: rgba(000,000, 000, 0.3);
}

</style>
