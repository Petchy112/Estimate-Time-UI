<template>
    <div>
        <h1 class="ma-3">
            จัดการฟังก์ชัน
        </h1>
        <v-btn
            fab
            color="cyan accent-2"
            bottom
            right
            fixed
            @click="dialog = !dialog"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog
            v-model="dialog"
            scrollable
            max-width="1000px"
        >
            <v-card>
                <v-card-title>
                    <span class=" mt-4 text-h4">เพิ่มฟังก์ชัน</span>
                </v-card-title>
                <v-text-field
                    class="px-6"
                    placeholder="ชื่อกลุ่มฟังก์ชัน"
                    v-model="group"
                    required
                    solo
                />
                <v-radio-group
                    class="pa-sm-5 pa-xs-1"
                    row
                >
                    <span class="ml-lg-6 mr-lg-6 text-h6">เลือกแพลตฟอร์ม</span>
                    <v-radio
                        label="Option 1"
                        value="radio-1"
                    />
                    <v-radio
                        label="Option 2"
                        value="radio-2"
                    />
                    <v-radio
                        label="Option 3"
                        value="radio-3"
                    />
                </v-radio-group>

                <v-divider />
                <v-card-text style="height: 400px;">
                    <v-card
                        v-for="number in numbers"
                        :key="number"
                        class="ma-2"
                        elevation="1"
                    >
                        <v-btn

                            color="error"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-col cols="12">
                            <v-card-title>
                                <v-avatar
                                    class="mr-3 mb-3"
                                    color="primary"
                                    size="80"
                                />

                                <v-text-field
                                    placeholder="ชื่อฟังก์ชัน"
                                    v-model="body"
                                    solo
                                />
                            </v-card-title>
                            <v-card-subtitle>
                                <v-text-field
                                    placeholder="คำอธิบาย"
                                    solo
                                />
                            </v-card-subtitle>
                        </v-col>
                    </v-card>
                    <v-btn

                        @click="handleAddClicked"
                        color="success"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-btn
                        class="pa-md-4 pa-lg-4 pa-xs-auto"
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        class="pa-md-4 pa-lg-4 pa-xs-auto"
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-text-field
            label="Search"
            solo-inverted
            prepend-inner-icon="mdi-magify"
        />
        <div class="d-flex flex-wrap">
            <v-card
                class="ma-5"
                max-width="344"
                v-for="functions in functionData"
                :key="functions.id"
            >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                />

                <v-card-title>
                    {{ functions.group }}
                </v-card-title>

                <v-spacer />
                <v-card-actions>
                    <v-btn
                        :to="{name:'function-id',params: { id: functions._id }}"
                        color="orange lighten-2"
                        text
                    >
                        Show
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
import * as functionAPI from '@/utils/functionAPI'
export default {
    data() {
        return {
            dialog: false,
            functionData: [],
            numbers: 1
        }
    },
    async mounted() {
        const response = await functionAPI.index()
        console.log('RESPONSE', response)
        this.functionData = response.data
    },
    methods: {
        async handleAddClicked() {
            this.numbers++
            console.log(this.numbers)
        }
    },

}

</script>
<style scoped>
h1{
    text-align: center;
}
v-btn.center {
    align-items: center;
}
</style>
