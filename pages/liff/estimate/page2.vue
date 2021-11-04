<template>
    <div>
        <v-app-bar
            color="primary"
            flat
            tile
            max-width="100%"
        >
            <v-toolbar-title>
                ESTIMATE TIME
            </v-toolbar-title>
        </v-app-bar>


        <v-col cols="12">
            <div class="result-card ma-5 py-3">
                <v-col cols="12">
                    <v-list>
                        <v-list-item-title class="mx-5 platform">
                            PLATFORM: {{ getSelectedEstimate.platform }}
                        </v-list-item-title>

                        <v-list-item-title class="mx-5 time">
                            ESTIMATE TIME: {{ getSelectedEstimate.estimateTime }}  Hours ({{ (getSelectedEstimate.estimateTime/8).toFixed(1) }} days)
                        </v-list-item-title>

                        <v-list-item-title class="mx-5 time">
                            DEVELOPER QUANTITY: {{ getSelectedEstimate.qty }}
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
            </div>
        </v-col>


        <v-col cols="12">
            <v-footer
                :padless="padless"
                fixed
            >
                <v-card
                    tile
                    width="100%"
                    color="primary"
                    height="80px"
                >
                    <v-col cols="12">
                        <div>
                            <div class="d-flex justify-space-around ">
                                <v-btn
                                    outlined
                                    color="white"
                                    rounded
                                    width="40%"
                                    class="mt-3"
                                    @click="back"
                                >
                                    back
                                </v-btn>

                                <v-btn
                                    color="white"
                                    outlined
                                    rounded
                                    class="mt-3"
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
        </v-col>
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
</template>

<script>
import estimateAPI from "~/utils/estimateAPI"
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
            const response = await estimateAPI.sentEstimate(body)
            this.nameDialog = false
            await this.$store.dispatch('setDialog', {
                isShow: true,
                title: 'Success',
                message: response.message
            })
            await liff.closeWindow()

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
.result-card {
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
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
