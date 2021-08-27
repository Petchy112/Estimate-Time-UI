<template>
    <div>
        <v-btn
            fab
            dark
            color="orange"
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
                <v-app-bar color="orange" flat>
                    <v-toolbar-title>
                        ADD FUNCTION
                    </v-toolbar-title>
                </v-app-bar>

                <v-text-field
                    class="input-group--focused pa-6 pb-0"
                    placeholder="Group of function name"
                    hint="Group of function"
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
                    <span class="ml-lg-6 mr-lg-6">Choose platform</span>
                    <v-radio
                        label="WEBSITE"
                        value="WEBSITE"
                    />
                    <v-radio
                        label="MOBILE"
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
                        <div class="remove-btn">
                            <v-btn
                                rounded
                                @click="handleCloseClicked(choices.indexOf(choice))"
                                color="error"
                                v-if="choices.length>1"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
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
                    <div class="d-flex justify-center">
                        <v-btn
                            rounded

                            @click="handleAddClicked"
                            color="success"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </div>
                </v-card-text>
                <v-divider />
                <v-card-actions class="pa-7">
                    <v-row justify="center" justify-md="end">
                        <v-btn
                            class="mx-md-2 pa-md-3 mx-2 pa-3"
                            color="error"

                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            class="mx-md-2 pa-md-3 mx-2 pa-3"
                            color="success"

                            @click="handleSaveClicked"
                        >
                            Save
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import * as functionAPI from "~/utils/functionAPI"
export default {
    data() {
        return {
            dialog: false,
            group: '',
            platform: '',
            choices: [
                {
                    name: '',
                    description: ''
                }
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
    methods: {
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
        },
        async handleAddClicked() {
            this.choices.push({ title: '', description: '' })
            console.log(this.choices.length)
        },
        async handleCloseClicked(index) {
            console.log(index)
            this.choices.splice(index, 1)
        }
    }
}
</script>

<style>
.remove-btn {
    display: flex;
    justify-content: flex-end;
    margin-left: 10px;
}
</style>
