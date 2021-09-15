<template>
    <div v-if="functionData">
        <h1
            class="ma-3"
        >
            {{ functionData.group }}
        </h1>
        <!-- <v-text-field
            dense
            flat
            placeholder="Search"
            solo-inverted
            append-icon="mdi-magnify"
            class="mx-4"
        /> -->
        <v-col
            cols="12"
        >
            <div class="menu">
                <v-menu
                    offset-y
                >
                    <template #activator="{ attrs, on }">
                        <v-btn
                            color="blue"
                            class="white--text mx-5 my-0"
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
            </div>

            <div class="d-flex flex-wrap">
                <v-card
                    class="ma-5"
                    width="300px"
                    v-for="choice in functionData.choice"
                    :key="choice.index"
                >
                    <img
                        width="300px"

                        :src="choice.imagePath"
                    >


                    <v-card-title class="py-0 pt-2">
                        {{ choice.name }}
                    </v-card-title>
                    <p class="ml-4 ma-0 mb-3">
                        {{ choice.description }}
                    </p>
                </v-card>
            </div>
            <v-dialog
                v-model="editDialog"
                scrollable
                max-width="1000px"
            >
                <v-card>
                    <v-app-bar color="rgb(55, 208, 255)" flat >
                        <v-toolbar-title>
                            EDIT FUNCTION
                        </v-toolbar-title>
                    </v-app-bar>
                    <v-text-field
                        dense
                        class="pa-6 pb-0"
                        v-model="functionData.group"
                        placeholder="Group of function"
                        required
                        outlined
                    />


                    <v-divider />
                    <v-card-text style="height: 500px;">
                        <v-card
                            v-for="(choice,index) in functionData.choice"
                            :key="index"
                            class="ma-2"
                            elevation="1"
                        >
                            <div class="remove-btn">
                                <v-btn
                                    rounded
                                    
                                    @click="handleCloseClicked(functionData.choice.indexOf(choice))"
                                    color="red"
                                    v-if="functionData.choice.length>1"
                                >
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </div>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-avatar
                                        @change="handlePicture(index)"
                                        class="mr-3 mb-3"
                                        size="80px"
                                    >
                                        <v-btn
                                            class="secondary btn-img"
                                            fab
                                            width="30px"
                                            height="30px"
                                            @click="PickFile(index)"
                                        >
                                            <v-icon size="20px">
                                                mdi-camera
                                            </v-icon>
                                        </v-btn>
                                        <input
                                            type="file"
                                            style="display:none"
                                            :id="`fileInput-${index}`"
                                            accept="image/*"
                                            @change="Picked($event,index)"
                                        >
                                        <img :src="choice.imagePath" alt="">
                                    </v-avatar>
                                    <v-text-field
                                        dense
                                        placeholder="Function choice"
                                        v-model="choice.name"
                                        outlined
                                    />
                                </v-card-title>
                                <v-card-subtitle>
                                    <v-text-field
                                        dense
                                        placeholder="Description"
                                        v-model="choice.description"
                                        outlined
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
                        <v-row justify="end">
                            <v-btn
                                class="mx-md-2 pa-md-4 pa-lg-4 pa-xs-auto"
                                color="error"
                                width="100px"
                                @click="editDialog = false"
                            >
                                Close
                            </v-btn>
                            <v-btn
                                class="mx-md-2 pa-md-4 pa-lg-4 pa-xs-auto"
                                color="success"
                                width="100px"
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
                max-width="500px"
            >
                <v-card class="pa-5">
                    <v-card-title class="justify-center mx-4 mb-4">
                        Do you want to delete {{ functionData.group }} ?
                    </v-card-title>
                    <div>
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
                    </div>
                </v-card>
            </v-dialog>
        </v-col>
    </div>
</template>

<script>
import * as functionAPI from '@/utils/functionAPI'
import * as imageAPI from "~/utils/imageAPI"
export default {
    data() {
        return {
            editDialog: false,
            deleteDialog: false,
            functionData: null,
            items: [
                'EDIT', 'DELETE'
            ],
            group: null,
            image: null,
            choice: [
                {
                    name: null,
                    description: null,
                    imageUrl: null,
                    imagePath: ''
                }
            ],
            groupEdit: null,
            choicesEdit: [
                {
                    name: null,
                    description: null,
                    imageUrl: '',
                    imagePath: ''
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
            if (event == 'EDIT') {
                this.editDialog = true
            }
            else if (event == 'DELETE') {
                this.deleteDialog = true
            }
        },
        async handlePicture(index) {
            await imageAPI.upload(this.image)
                .then(async response => {
                    this.choice[index].imagePath = response.data.fullPath
                    console.log(this.choice)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async PickFile(index) {
            document.getElementById(`fileInput-${index}`).click()
        },
        async Picked(event, index) {
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0) {
                return alert('plase add vaild file')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.choice[index].imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },
        async handleEditClicked () {
            await functionAPI.edit(this.functionData._id, this.functionData.group, this.functionData.choice)
                .then(response => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                    this.editDialog = false
                    this.$router.replace({
                        name: 'function-id',
                        params: {
                            id: this.functionData._id
                        }
                    })
                })
                .catch(async error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })
                })
        },
        async handleDeleteClicked(id) {
            await functionAPI.del(id)
                .then(response => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                    this.deleteDialog = false
                    this.$router.replace({
                        name: 'function'
                    })
                })
                .catch(async error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })
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
.menu {
    padding-top: 0;
    display: flex;
    justify-content: flex-end;
}
.remove-btn {
    display: flex;
    justify-content: flex-end;
    size: 10px;
}
p{
    color: rgba(000, 000, 000, 0.3);
}
.btn-img {
    position:absolute;
    margin-top: 50px;
}
</style>
