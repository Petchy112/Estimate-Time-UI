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
                        v-for="(choice,index) in choices"
                        :key="index"
                        class="ma-2"
                        elevation="1"
                    >
                        <v-btn
                            fab
                            @click="handleCloseClicked(choices.indexOf(choice))"
                            color="error"
                            v-if="choices.length>1"
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
                                    v-model="choices[index].name"
                                    solo
                                />
                            </v-card-title>
                            <v-card-subtitle>
                                <v-text-field
                                    v-model="choices[index].description"
                                    placeholder="คำอธิบาย"
                                    solo
                                />
                            </v-card-subtitle>
                        </v-col>
                    </v-card>
                    <v-btn
                        fab
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
                        @click="handleSaveClicked"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-text-field
            label="Search"
            solo-inverted
            append-icon="mdi-magnify"
            class="mx-4"
        />
        <div class="d-flex flex-wrap">
            <v-card
                class="ma-5"
                max-width="344"
                v-for="functions in functionData"
                :key="functions.id"
                @click="logs"
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
            numbers: 1,
            group: '',
            choices: [
                {
                    name: '',
                    description: ''
                }
            ]
        }
    },
    async mounted() {
        await functionAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.functionData = response.data
            })
    },
    methods: {

        async handleAddClicked() {
            this.choices.push({ title: '', description: '' })
            console.log(this.choices.length)
        },
        async handleCloseClicked(index) {
            console.log(index)
            this.choices.splice(index, 1)
        },
        async handleSaveClicked () {
            await functionAPI.create(this.group, this.choices)
                .then(response => {
                    console.log('res', response.data)
                    this.dialog = false
                    this.$router.push({
                        name: 'function-id',
                        params: {
                            id: response.data.id
                        }
                    })
                })
        }
    }


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
