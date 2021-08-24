<template>
    <div>
        <v-app-bar
            color="orange"
            flat
            tile
            max-width="100%"
        >
            <v-toolbar-title>
                Estimate system
            </v-toolbar-title>
        </v-app-bar>


        <v-col cols="12">
            <div class="result">
                Result
            </div>
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-col cols="12">
                    <v-list>
                        <v-list-title>
                            Platform : Website
                        </v-list-title>
                        <v-list-item dense v-for="i in 20" :key="i.index">
                            - choice
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
                            <div><v-text-field flat class="mt-2 mb-0 px-3" solo label="input name of system" /></div>
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
export default {
    layout: 'liff',
    data() {
        return {
            padless: true,
            variant: 'fixed',
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
    font-size: 28px;
    font-weight: bold;
}
.result {
    font-size: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
}

</style>
