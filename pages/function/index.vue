<template>
    <div>
        <div>
            <h1 class="ma-3">
                จัดการฟังก์ชัน
            </h1>
        </div>

        <v-btn
            fab
            color="success"
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
                <div v-if="message">
                    <v-row justify-md="end">
                        <v-col
                            md="5"
                            class="justify--end"
                        >
                            <v-alert
                                dense
                                elevation="5"
                                type="error"
                            >
                                {{ message }}
                            </v-alert>
                        </v-col>
                    </v-row>
                </div>
                <v-card-title class=" my-4 text-h4">
                    เพิ่มฟังก์ชัน
                </v-card-title>
                <v-text-field
                    class="input-group--focused px-6"
                    placeholder="ชื่อกลุ่มฟังก์ชัน"
                    hint="กรอกชื่อกลุ่มฟังก์ชัน"
                    :rules="groupRules"
                    v-model="group"
                    required
                    solo
                />
                <v-radio-group
                    :rules="[v => !!v || 'Platform is required']"
                    class="pa-sm-5 pa-xs-1"
                    v-model="platform"
                    row
                >
                    <span class="ml-lg-6 mr-lg-6 text-h6">เลือกแพลตฟอร์ม</span>
                    <v-radio
                        label="website"
                        value="WEBSITE"
                    />
                    <v-radio
                        label="mobile"
                        value="MOBILE"
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
                                    class="input-group--focused"
                                    :rules="choiceRules"
                                    hint="ชื่อฟังก์ชัน"
                                    v-model="choices[index].name"
                                    solo
                                />
                            </v-card-title>
                            <v-card-subtitle>
                                <v-text-field
                                    v-model="choices[index].description"
                                    class="input-group--focused"
                                    :rules="descriptionRules"
                                    placeholder="คำอธิบาย"
                                    hint="คำอธิบายฟังก์ชัน"
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
                <v-card-actions class="pa-7">
                    <v-row justify="end">
                        <v-btn
                            class="mx-md-2 pa-md-4 pa-lg-4 pa-xs-auto"
                            color="error"

                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            class="mx-md-2 pa-md-4 pa-lg-4 pa-xs-auto"
                            color="success"

                            @click="handleSaveClicked"
                        >
                            Save
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-tabs
            v-model="tab"
            slider-color="yellow"
        >
            <v-tab
                v-for="item in items"
                :key="item.tab"
            >
                {{ item.tab }}
            </v-tab>
        </v-tabs>
        <v-text-field
            flat
            label="Search"
            v-model="search"
            solo-inverted
            append-icon="mdi-magnify"
            class="mx-4 my-2"
        />
        <v-card
            flat
            :search="search"
        >
            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <div class="d-flex flex-wrap">
                        <v-card
                            class="ma-5"
                            max-width="344"
                            v-for="functions in functionData"
                            :key="functions.index"
                            @click="handleShowClicked(functions._id)"
                            :search="search"
                        >
                            <v-img
                                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                height="200px"
                            />

                            <v-card-title class="justify-center">
                                {{ functions.group }}
                            </v-card-title>
                        </v-card>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script>
import * as functionAPI from '@/utils/functionAPI'
export default {
    data() {
        return {
            search: '',
            message: '',
            dialog: false,
            functionData: [],
            numbers: 1,
            group: '',
            platform: '',
            choices: [
                {
                    name: '',
                    description: ''
                }
            ],
            tab: null,
            items: [
                { tab: 'web', },
                { tab: 'mobile', },

            ],
            groupRules: [
                v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน'
            ],
            choiceRules: [
                v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน'
            ],
            descriptionRules: [
                v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน'
            ],
        }
    },
    async mounted() {
        await functionAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.functionData = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })
    },
    methods: {

        async handleAddClicked() {
            this.choices.push({ title: '', description: '' })
            console.log(this.choices.length)
        },
        async handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'function-id', params: { id } })
        },
        async handleCloseClicked(index) {
            console.log(index)
            this.choices.splice(index, 1)
        },
        async handleSaveClicked () {
            await functionAPI.create(this.group, this.platform, this.choices)
                .then(async response => {
                    console.log('res', response.data)
                    this.dialog = false
                    await this.$router.push({
                        name: 'function-id',
                        params: {
                            id: response.data.id
                        }
                    })
                })
                .catch(async error => {
                    console.log('ERROR', error.response)
                    this.message = error.response.data.error.message
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
