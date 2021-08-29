<template>
    <div>
        <v-app-bar
            color="orange"
            flat
            tile
            max-width="100%"
        >
            <v-toolbar-title>
                result
            </v-toolbar-title>
        </v-app-bar>


        <v-col cols="12">
            <v-card>
                <v-col cols="12">
                    <v-list>
                        <v-list-title class="mx-5 platform">
                            Platform: {{ getSelectedEstimate.platform }}
                        </v-list-title>
                        <br>
                        <div>
                            <div v-if="getSelectedEstimate.estimateTime<40">
                                <v-list-title class="mx-5 time">
                                    Estimate Time: {{ getSelectedEstimate.estimateTime }}  Hours
                                </v-list-title>
                            </div>
                            <div v-else>
                                <v-list-title class="mx-5 time">
                                    Estimate Time: {{ getSelectedEstimate.estimateTime }}  Hours ({{ (getSelectedEstimate.estimateTime/8)/5 }} week)
                                </v-list-title>
                            </div>
                        </div>
                        <v-list-title class="mx-5 time">
                            Developer Quantity: {{ getSelectedEstimate.qty }}
                        </v-list-title>
                        <v-list-item>
                            <div class="my-card d-flex align-content-start flex-wrap">
                                <v-col cols="12">
                                    <v-card class="mt-4 ma-2 pa-4" v-for="item in getSelectedEstimate.selectedChoice" :key="item.name ">
                                        <div class="d-flex">
                                            <v-img width="40px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png" />
                                        </div>
                                        {{ item }}
                                    </v-card>
                                </v-col>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-card>
        </v-col>


        <v-col cols="12">
            <v-footer
                :padless="padless"
                fixed
            >
                <v-card
                    tile
                    width="100%"
                    color="orange"
                >
                    <v-col cols="12">
                        <v-card-action>
                            <div>
                                <v-text-field
                                    flat
                                    class="mt-2 mb-0 px-3"
                                    solo
                                    v-model="projectName"
                                    label="input name of system"
                                    placeholder="input name of system"
                                />
                            </div>
                            <div class="d-flex justify-space-around">
                                <v-btn
                                    outlined
                                    rounded
                                    width="40%"
                                    @click="back"
                                >
                                    back
                                </v-btn>

                                <v-btn
                                    outlined
                                    rounded
                                    width="40%"
                                    @click="estimate"
                                >
                                    save
                                </v-btn>
                            </div>
                        </v-card-action>
                    </v-col>
                </v-card>
            </v-footer>
        </v-col>
    </div>
</template>

<script>
import * as estimateAPI from "~/utils/estimateAPI"
export default {
    layout: 'liff',
    data() {
        return {
            padless: true,
            variant: 'fixed',
            projectName: ''
        }
    },
    computed: {
        getSelectedEstimate() {
            return this.$store.getters.getSelectedEstimate
        }
    },
    methods: {
        async estimate() {
            await this.$store.dispatch('setSelectedEstimate', {
                projectName: this.projectName,
            })
            var body = await this.$store.getters.getSelectedEstimate
            console.log(body)
            await estimateAPI.sentEstimate(body)
                .then(response => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                })
        },
        back() {
            this.$router.push({ name: 'liff-estimate' })
        }
    }
}
</script>

<style scoped>
.v-application {
    background-color: orange !important;
}
.v-toolbar__title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
}
.my-card {
    justify-content: space-around;
}
.time {
    font-size: 16px;
    opacity: 70%;
}
.platform{
    font-size: 20px;
}
</style>
