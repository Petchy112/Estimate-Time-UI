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
                <v-col cols="12">
                    <v-list>
                        <v-list-item-title class="mx-5 platform">
                            PLATFORM: {{ estimateData.platform }}
                        </v-list-item-title>

                        <v-list-item-title class="mx-5 time">
                            ESTIMATE TIME: {{ estimateData.estimateTime }}  Hours ({{ (estimateData.estimateTime/8).toFixed(1) }} days)
                        </v-list-item-title>

                        <v-list-item-title class="mx-5 time">
                            DEVELOPER QUANTITY: {{ estimateData.qty }}
                        </v-list-item-title>
                        <v-divider class="mt-4 mx-3" />
                        <v-list-item>
                            <v-list-item-content>
                                <v-col cols="12">
                                    <div class="my-card d-flex flex-column ">
                                        <div class="selectFunc">
                                            SELECTED FUNCTION
                                        </div>
                                        <div
                                            class="ma-3"
                                            v-for="(choice,index) in estimateData.selectedChoice"
                                            :key="index "
                                        >
                                            {{ choice }}
                                        </div>
                                    </div>
                                </v-col>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
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

                            width="40%"
                            class="btn mt-3"
                            @click="back"
                        >
                            back
                        </v-btn>

                        <v-btn

                            color="white"
                            class="btn mt-3"
                            width="40%"
                            @click="nameDialog = !nameDialog"
                        >
                            next
                        </v-btn>
                    </div>
                </v-card>
            </v-footer>
            <v-dialog
                v-model="nameDialog"
                max-width="350px"
            >
                <v-card height="150px">
                    <v-col cols="12">
                        <div class="justify-center">
                            <v-text-field
                                class="px-6 pt-6"
                                dense
                                flat
                                outlined
                                v-model="projectName"
                                label="System name"
                                placeholder="System name"
                            />
                        </div>
                        <div class="mt-2">
                            <v-row justify="space-around">
                                <v-btn

                                    width="40%"
                                    color="primary"
                                    text
                                    @click="nameDialog = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn

                                    color="primary"
                                    text
                                    width="40%"
                                    @click="estimate"
                                >
                                    Save
                                </v-btn>
                            </v-row>
                        </div>
                    </v-col>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import estimateAPI from "~/utils/estimateAPI"
export default {
    layout: 'plain',
    data() {
        return {
            padless: true,
            variant: 'fixed',
            projectName: '',
            nameDialog: false
        }
    },
    computed: {
        ...mapState({
            estimateData: state => state.estimate
        })
    },
    methods: {
        async estimate() {
            // await this.$store.dispatch('setSelectedEstimate', {
            //     projectName: this.projectName,
            // })
            // var body = await
            // console.log(body)
            // const response = await estimateAPI.sentEstimate(body)
            // this.nameDialog = false
            // await this.$store.dispatch('setDialog', {
            //     isShow: true,
            //     title: 'Success',
            //     message: response.message
            // })
            await liff.closeWindow()

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

        }
        & .card-footer {
            height: 60px;
            width: 100%;
            background-color: #37d0ff !important;
            & .footer-content {
                margin-top: 10px;
                display: flex;
                justify-content: space-evenly;
                & .btn {
                    width: 100%;
                    border-radius: 8px;
                    font-weight: 600;
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

.selectFunc {
    font-size: 18px;
}

.time {
    font-size: 16px;
    color: rgba(000, 000, 000, 0.5);
}
.platform{
    font-size: 20px;

}
img {
    border-radius: 50%;
}
</style>
