<template>
    <div class="wrap-page">
        <div class="top-section">
            <div class="header">
                ESTIMATE RESULTS
            </div>

            <v-text-field
                background-color="rgba(240,240,240)"
                v-model="search"
                append-icon="mdi-magnify"
                flat
                placeholder="Search"
                class="search-tab"
                solo
                single-line
                hide-details
            />
        </div>
        <v-divider />
        <div v-if="this.estimateData.length == 0" class="empty">
            ไม่มีข้อมูล
        </div>
        <div v-else class="wrap-content">
            <div
                v-for="(item,index) in filteredItems"
                :key="index"
            >
                <v-expansion-panels>
                    <v-expansion-panel class="panel">
                        <v-expansion-panel-header>
                            <div class="proj-header">
                                {{ item.projectName }}
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="content">
                            <p>Create by : {{ item.createBy }}</p>
                            <p>Platform : {{ item.platform }}</p>
                            <p>Number of developer : {{ item.qty }}  person</p>
                            <p>Estimated Time : {{ item.estimatedTime }}  hours</p>
                            <v-divider />

                            <template>
                                <v-expansion-panels flat focusable>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header expand-icon="mdi-menu-down">
                                            <div class="choice-header">
                                                Selected Function
                                            </div>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="choice-content">
                                            <div class="empty" v-if="item.choice == ''">
                                                ไม่มีข้อมูล
                                            </div>
                                            <div
                                                class="choice"
                                                v-for="(select,index) in item.choice"
                                                :key="index"
                                            >
                                                {{ select }}
                                            </div>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </template>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </div>
    </div>
</template>

<script>
import estimateAPI from "~/utils/estimateAPI"
export default {
    data () {
        return {
            search: '',
            estimateData: [],
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
        this.getResult()
    },
    methods: {
        async getResult() {
            const response = await estimateAPI.estimateLists()
            this.estimateData = response.estimateList
        }
    },
}
</script>

<style lang='scss' scoped>
.wrap-page {
    margin: 0 auto;
    & .top-section {
        display: flex;
        justify-content: space-between;
        & .header {
            margin: 12px;
            font-size: 32px !important;
            font-weight: bold;
        }
        & .search-tab {
            margin-top: 12px;
            margin-right: 20px;
            max-width: 600px;
        }
    }
    & .wrap-content {
        display: grid;
        grid-template-columns: repeat(auto-fill ,500px);
        grid-gap: 20px;
        & .panel {
            padding: 10px;
            & .proj-header {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 20px;
                font-weight: bold;
            }
            & .choice-header{
                font-size: 18px;
                font-weight: bold;
            }
           & .choice-content {
               margin-top: 10px;
               display: flex;
               & .choice{
                   line-height: 30px;
               }
           }
        }

    }
}

</style>
