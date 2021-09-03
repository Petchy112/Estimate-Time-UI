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
                        <v-list-item-title class="mx-5 platform">
                            Platform: {{ getSelectedEstimate.platform }}
                        </v-list-item-title>
                        <br>
                        <div>
                            <div v-if="getSelectedEstimate.estimateTime<40">
                                <v-list-item-title class="mx-5 time">
                                    Estimate Time: {{ getSelectedEstimate.estimateTime }}  Hours
                                </v-list-item-title>
                            </div>
                            <div v-else>
                                <v-list-item-title class="mx-5 time">
                                    Estimate Time: {{ getSelectedEstimate.estimateTime.toFixed(0) }}  Hours ({{ ((getSelectedEstimate.estimateTime/8)/5).toFixed(1) }} week)
                                </v-list-item-title>
                            </div>
                        </div>
                        <v-list-item-title class="mx-5 time">
                            Developer Quantity: {{ getSelectedEstimate.qty }}
                        </v-list-item-title>
                        <v-list-item>
                            <v-list-item-content>
                                <v-col cols="12">
                                    <div class="my-card d-flex flex-wrap ">
                                        <v-card max-width="100px" class="mt-4 ma-2 pa-4" v-for="item in getSelectedEstimate.selectedChoice" :key="item.name ">
                                            <v-avater size="80px" class="d-flex justify-center mb-3">
                                                <v-img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUPEhIVFRUVFxcVFRUVFRcVFRUVFRUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ8PFS0ZFRkrLTcrKystKystNystLS0tNzc3NzctLTc3LS0tNy03LSsrNysrLS03KzcrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAGhABAQEAAwEAAAAAAAAAAAAAAAEREiHhAv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A00BAAUBUAAAVFBAAVFQAAAAABABVEBQQUBBaAgqIAAACgAAaAAAAAAAAAACAAAAoAAAtBAAMDkiCqgoAAAAAAKICoAAACoAAABFBAAAAUQAAAAAAQFQUAEABQAAwAAVAVAQVAABVBAAFQBUAAAQUAAQBUigAAqAAAAABQAoKCAIACgAAKAioAAAoAIAgCooBVBAAVABUAAVAAEABQFRAAUAAAAAoChoCAIACgAAACoAAACoAAoCCoIACiCgUKAABVQAAAgCAAoUAAVAAAAAAUEVFBAABUQAFDFqAAqAUAF0MQAVABUAAAAQBUUUQAAAUQBQAQEAVFANAAABUA7DQAFBAAKqAEAAAAABUFBAAWICAAoqAAAAqACoAuCIChFBAAAAAABaAgAAqAqFKgAAAqiBAAAAooIAgoCiQAFQIAUABUAAAABUAAAFSKkQAFAIIACioFAAQXBNFAAABAAAAAAUAAAAAEAACAAAVQAAAAAQXUVAAFAAAAAAFQAVAAAAgCAAAoigAAqAAAACC4JooqIA6KgC1IAHoAHytAEgAFVAAABUAUAAqACwAIACRaAKAD//Z" />
                                            </v-avater>
                                            {{ item }}
                                        </v-card>
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
                    color="orange"
                    height="80px"
                >
                    <v-col cols="12">
                        <div>
                            <div class="d-flex justify-space-around">
                                <v-btn
                                    outlined
                                    rounded
                                    dark
                                    width="40%"
                                    @click="back"
                                >
                                    back
                                </v-btn>

                                <v-btn
                                    outlined
                                    rounded
                                    dark
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
                                        class="pa-2 mb-4"
                                        dark
                                        rounded
                                        width="40%"
                                        color="orange"
                                        @click="nameDialog = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        class="pa-2 mb-4"
                                        dark
                                        rounded
                                        color="orange"
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

.time {
    font-size: 16px;
    opacity: 70%;
}
.platform{
    font-size: 20px;
}
</style>
