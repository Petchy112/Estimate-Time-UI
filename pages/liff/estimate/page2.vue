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
                        <v-list-title class="mx-5">
                            Platform : Website
                        </v-list-title>
                        <v-list-item>
                            <div class="my-card d-flex align-content-start flex-wrap">
                                <v-card class="mt-4 ma-2 pa-4" v-for="i in 20" :key="i.index ">
                                    <div class="d-flex">
                                        <v-img width="40px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png" />
                                    </div>
                                    choice
                                </v-card>
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
                            <div><v-text-field flat class="mt-2 mb-0 px-3" solo label="input name of system" placeholder="input name of system" /></div>
                            <div class="d-flex justify-space-around">
                                <v-btn
                                    outlined
                                    rounded
                                    width="40%"
                                >
                                    back
                                </v-btn>

                                <v-btn
                                    outlined
                                    rounded
                                    width="40%"
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
            selected: [ {
                selectedChoice: [],
                selectedPlatform: '',
                estimateTime: '',
                projectName: '',
                qty: '',
                size: ''
            } ]
        }
    },
    methods: {
        async estimate() {
            await estimateAPI.sentEstimate(selected)
                .then(response => {
                    console.log(response)
                })
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

</style>
