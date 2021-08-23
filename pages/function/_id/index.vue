<template>
    <div v-if="functionData">
        <h1
            class="ma-3"
        >
            {{ functionData.group }}
        </h1>
        <v-text-field
            placeholder="Search"
            solo-inverted
            append-icon="mdi-magnify"
            class="mx-4"
        />
        <v-row justify="end">
            <v-menu
                offset-y
            >
                <template #activator="{ attrs, on }">
                    <v-btn
                        color="blue"
                        class="white--text ma-5"
                        v-bind="attrs"
                        v-on="on"
                    >
                        Settings
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="item in items"
                        :key="item.index"
                        @click="openDialog(item)"
                        link
                    >
                        <v-list-item-title v-text="item" />
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-row>
        <div class="d-flex flex-wrap">
            <v-card
                class="ma-5"
                max-width="344"
                v-for="choice in functionData.choice"
                :key="choice.index"
            >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                />

                <v-card-title>
                    {{ choice.name }}
                </v-card-title>
                <v-card-subtitle> {{ choice.description }}</v-card-subtitle>
            </v-card>
        </div>
        <v-dialog
            v-model="editDialog"
            scrollable
            max-width="1000px"
        >
            <v-card>
                <v-card-title class=" my-4 text-h4">
                    แก้ไขฟังก์ชัน
                </v-card-title>
                <v-text-field
                    class="px-6"
                    v-model="functionData.group"
                    placeholder="ชื่อกลุ่มฟังก์ชัน"

                    required
                    solo
                />
                <v-radio-group
                    class="pa-sm-5 pa-xs-1"
                    row
                    v-model="platform"
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
                        v-for="(choice,index) in functionData.choice"
                        :key="index"
                        class="ma-2"
                        elevation="1"
                    >
                        <v-btn
                            fab
                            @click="handleCloseClicked(functionData.choice.indexOf(choice))"
                            color="error"
                            v-if="functionData.choice.length>1"
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
                                    v-model="choice.name"
                                    solo
                                />
                            </v-card-title>
                            <v-card-subtitle>
                                <v-text-field
                                    placeholder="คำอธิบาย"
                                    v-model="choice.description"
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

                            @click="editDialog = false"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            class="mx-md-2 pa-md-4 pa-lg-4 pa-xs-auto"
                            color="success"

                            @click="handleEditClicked"
                        >
                            Save
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="deleteDialog"
            max-width="500"
        >
            <v-card class="pa-5">
                <v-card-title class="text-h5 justify-center mx-4 mb-4">
                    Do you want to delete {{ functionData.group }} ?
                </v-card-title>
                <v-card-action>
                    <v-row justify="space-between">
                        <v-col
                            cols="12"
                        >
                            <v-row justify="space-around">
                                <v-btn
                                    class="pa-2"
                                    @click="deleteDialog = false"
                                >
                                    No
                                </v-btn>
                                <v-btn
                                    class="pa-2"
                                    color="error"
                                    @click="handleDeleteClicked(functionData._id)"
                                >
                                    Yes
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-action>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import * as functionAPI from '@/utils/functionAPI'
export default {
    data() {
        return {
            editDialog: false,
            deleteDialog: false,
            functionData: null,
            items: [
                'Edit', 'Delete'
            ],
            group: null,
            choices: [
                {
                    name: null,
                    description: null
                }
            ]
        }
    },
    async mounted() {
        console.log('THIS.$ROUTE.PARAMS.ID', this.$route.params.id)
        const response = await functionAPI.show(this.$route.params.id)
        console.log('RESPONSE', response)
        this.functionData = response.data
    },
    methods: {
        openDialog(event) {
            if (event == 'Edit') {
                this.editDialog = true
            }
            else if (event == 'Delete') {
                this.deleteDialog = true
            }
        },
        async handleEditClicked () {
            await functionAPI.edit(this.functionData._id, this.functionData.group, this.functionData.choice)
                .then(response => {
                    console.log('res', response.data)
                    this.editDialog = false
                    this.$router.replace({
                        name: 'function-id',
                        params: {
                            id: this.functionData._id
                        }
                    })
                })
                .catch(async error => {
                    console.log('ERROR', error.response)
                    this.message = error.response.data.error.message
                })
        },
        async handleDeleteClicked(id) {
            await functionAPI.del(id)
                .then(response => {
                    console.log('RESPONSE', response)
                    this.deleteDialog = false
                    this.$router.replace({
                        name: 'function'
                    })
                })
                .catch(async error => {
                    console.log('ERROR', error.response)
                    this.message = error.response.data.error.message
                })
        },
        async handleAddClicked () {
            console.log(this.functionData.choice.length)
            this.functionData.choice.push({ title: '', description: '' })
        },
        async handleCloseClicked (index) {
            console.log(index)
            this.functionData.choice.splice(index, 1)
        }
    }
}
</script>

<style>
h1{
    text-align: center;
}
</style>
