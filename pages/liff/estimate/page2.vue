<template>
    <div class="wrap-page">
        <v-app-bar
            class="app-bar"
            flat
            fixed
        >
            <div class="title">
                ESTIMATE TIME
            </div>
        </v-app-bar>
        <div class="wrap-content">
            <div class="result-card">
                <v-list>
                    <v-list-item-title class="mx-5 platform">
                        PLATFORM: {{ estimateData.platform }}
                    </v-list-item-title>

                    <v-list-item-title class="mx-5 time">
                        ESTIMATE TIME: {{ estimateData.estimateTime }}  Hours ({{ (estimateData.estimateTime/8).toFixed(1) }} days)
                    </v-list-item-title>

                    <v-list-item-title class="mx-5 time">
                        DEVELOPER QUANTITY: {{ estimateData.quantity }} person
                    </v-list-item-title>
                    <v-divider class="mt-4 mx-3" />
                    <v-list-item>
                        <v-list-item-content>
                            <div class="function-card">
                                <div class="function-header">
                                    SELECTED FUNCTION
                                </div>
                                <div
                                    class="list-choice"
                                    v-for="(choice,index) in estimateData.selectedChoice"
                                    :key="index "
                                >
                                    - {{ choice.name }}
                                </div>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </div>
            <v-footer
                :padless="padless"
                fixed
            >
                <v-card
                    class="card-footer"
                    tile
                >
                    <div class="footer-content">
                        <v-btn
                            color="white"
                            class="btn"
                            @click="back"
                        >
                            back
                        </v-btn>
                        <NameDialog
                            class="nameDialog"
                            @estimateSystem="estimateSystem"
                        />
                    </div>
                </v-card>
            </v-footer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import estimateAPI from "~/utils/estimateAPI"

import NameDialog from '~/components/dialog/nameDialog.vue'
export default {
    components: { NameDialog },
    layout: 'plain',
    data: () => ({
        padless: true,
        variant: 'fixed',
    }),
    computed: {
        ...mapState({
            estimateData: state => state.estimate
        })
    },
    methods: {
        async estimateSystem(projectName) {
            console.log(projectName, this.estimateData)
            const response = await estimateAPI.sentEstimate(this.estimateData, ...projectName)
            // await liff.closeWindow()

        },
        back() {
            history.back()
        }
    },
    mounted() {
        console.log(this.estimateData)
    }
}
</script>

<style lang='scss' scoped>
.wrap-page {
    & .app-bar{
        display: flex;
        background-color: #37d0ff !important;
        justify-content: center;
        color: #fff;
        & .title {
            font-weight: 600;
            font-size: 28px !important;
        }
    }
    & .wrap-content {
        margin: 60px 10px 0 10px;
        & .result-card {
            border: 1px solid rgba(0, 0, 0, 0.35);
            border-radius: 10px;
            margin: 16px;
            padding: 20px;
            & .time {
                font-size: 16px;
                color: rgba(000, 000, 000, 0.5);
            }
            & .platform{
                font-size: 20px;
            }

        }
        & .function-card {
            & .function-header {
                font-size: 18px;
                text-decoration-line: underline;
            }
            & .list-choice {
                margin: 10px;
            }
        }
        & .card-footer {
            height: 60px;
            width: 100%;
            background-color: #37d0ff !important;
            & .footer-content {
                margin-top: 10px;
                display: grid;
                grid-template-columns: 50% 50%;
                & .btn {
                    margin: 0px 20px 10px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                }
                & .nameDialog {
                    margin: 0px 20px 10px 20px;
                }
            }

        }
    }
}
.v-toolbar__title {
    width: 100%;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: white;
}


img {
    border-radius: 50%;
}
</style>
