<template>
    <div>
        <v-app-bar
            color="rgb(55, 208, 255)"
            flat
            tile
            max-width="100%"
        >
            <v-toolbar-title>
                RESULTS
            </v-toolbar-title>
        </v-app-bar>


        <v-col cols="12">
            <v-card>
                <v-col cols="12">
                    <v-list>
                        <v-list-item-title class="mx-5 platform">
                            Platform: {{ getSelectedEstimate.platform }}
                        </v-list-item-title>

                        <div>
                            <v-list-item-title class="mx-5 time">
                                Estimate Time: {{ getSelectedEstimate.estimateTime }}  Hours ({{ (getSelectedEstimate.estimateTime/8).toFixed(1) }} days)
                            </v-list-item-title>
                        </div>

                        <v-list-item-title class="mx-5 time">
                            Developer Quantity: {{ getSelectedEstimate.qty }}
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
                                            v-for="item in getSelectedEstimate.selectedChoice"
                                            :key="item.index "
                                        >
                                            {{ item }}
                                        </div>
                                    </div>
                                </v-col>
                            </v-list-item-content>
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
                    color="rgb(55, 208, 255)"
                    height="80px"
                >
                    <v-col cols="12">
                        <div>
                            <div class="d-flex justify-space-around ">
                                <v-btn
                                    outlined
                                    rounded
                                    width="40%"
                                    class="mt-3 footer-btn"
                                    @click="back"
                                >
                                    back
                                </v-btn>

                                <v-btn
                                    outlined
                                    rounded
                                    class="mt-3 footer-btn"
                                    width="40%"
                                    @click="nameDialog = !nameDialog"
                                >
                                    next
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-card>
            </v-footer>
            <v-dialog
                v-model="nameDialog"
                max-width="500px"
            >
                <v-card class="pa-5">
                    <v-card-title class="justify-center">
                        <v-text-field
                            dense
                            flat
                            class=""
                            outlined
                            v-model="projectName"
                            label="input name of system"
                            placeholder="input name of system"
                        />
                    </v-card-title>
                    <div>
                        <v-row justify="space-between">
                            <v-col
                                cols="12"
                            >
                                <v-row justify="space-around">
                                    <v-btn
                                        class="pa-2 mb-4 footer-btn"
                                        rounded
                                        width="40%"
                                        color="rgb(55, 208, 255)"
                                        @click="nameDialog = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        class="pa-2 mb-4 footer-btn"
                                        rounded
                                        color="rgb(55, 208, 255)"
                                        width="40%"
                                        @click="estimate"
                                    >
                                        Save
                                    </v-btn>
                                </v-row>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>
            </v-dialog>
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
            projectName: '',
            nameDialog: false
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
                .then(async response => {
                    this.nameDialog = false
                    await this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                    await liff.closeWindow()
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
    background-color: rgb(55, 208, 255) !important;
}
.v-toolbar__title {
    width: 100%;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: white;
}
.selectFunc {
    margin-bottom: 10px;
    font-size: 18px;
}

.time {
    font-size: 16px;
    color: rgba(000, 000, 000, 0.5);
}
.platform{
    font-size: 20px;

}
.footer-btn{
    color :white
}
img {
    border-radius: 50%;
}
</style>
