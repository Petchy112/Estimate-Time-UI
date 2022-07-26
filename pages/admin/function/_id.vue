<template>
    <div class="wrap-page">
        <div class="top">
            <div class="header">
                {{ functionData.group }}
            </div>

            <div class="menu">
                <v-menu offset-y>
                    <template #activator="{ attrs, on }">
                        <v-btn
                            class="button-setting"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Setting
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="item in dialog"
                            :key="item.index"
                            @click="openDialog(item)"
                            link
                        >
                            <v-list-item-title v-text="item" />
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>

        <div class="wrap-card">
            <div
                class="func-card"
                v-for="choice in functionData.choices"
                :key="choice.index"
            >
                <div class="wrap-image">
                    <img :src="choice.imagePath">
                </div>
                <div class="choice">
                    <div class="name">
                        {{ choice.name }}
                    </div>
                    <p class="desc">
                        {{ choice.description }}
                    </p>
                </div>
            </div>
        </div>
        <v-dialog
            v-model="editDialog"
            scrollable
            max-width="1000px"
        >
            <v-card>
                <v-app-bar color="rgb(55, 208, 255)" flat>
                    <v-toolbar-title>
                        EDIT FUNCTION
                    </v-toolbar-title>
                </v-app-bar>
                <div class="wrap-input">
                    <v-text-field
                        dense
                        :rules="groupRules"
                        v-model="editData.group"
                        required
                        outlined
                    >
                        <template slot="label">
                            Group of function choice
                        </template>
                    </v-text-field>
                </div>
                <v-divider />
                <v-card-text style="height: 600px;">
                    <v-card
                        v-for="(editChoice,index) in editData.choices"
                        :key="index"
                        class="ma-2 mb-6"
                        elevation="2"
                    >
                        <div class="remove-btn">
                            <v-btn
                                fab
                                elevation="0"
                                max-width="28px"
                                height="28px"
                                @click="handleCloseClicked(editData.choices.indexOf(choice))"
                                class="error"
                                v-if="editData.choices.length > 1"
                            >
                                <v-icon size="16px">
                                    mdi-close
                                </v-icon>
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
                                    <img :src="editChoice.imagePath ? editChoice.imagePath : defaultProfile">
                                </v-avatar>

                                <v-text-field
                                    dense
                                    placeholder="Function choice"
                                    v-model="editChoice.name"
                                    :rules="choiceRules"
                                    outlined
                                >
                                    <template slot="label">
                                        Function choice
                                    </template>
                                </v-text-field>
                            </v-card-title>
                            <v-card-subtitle>
                                <v-text-field
                                    dense
                                    placeholder="Description"
                                    v-model="editChoice.description"
                                    :rules="descriptionRules"
                                    outlined
                                >
                                    <template slot="label">
                                        Description
                                    </template>
                                </v-text-field>
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
            max-width="400px"
        >
            <v-card class="pa-5">
                <v-card-title class="justify-center mb-2 pb-4">
                    Delete {{ functionData.group }}?
                </v-card-title>
                <div>
                    <v-row justify="space-between">
                        <v-col
                            cols="12"
                        >
                            <div class="btn-action">
                                <v-btn
                                    class="button"
                                    @click="deleteDialog = false"
                                    plain
                                >
                                    No
                                </v-btn>
                                <v-btn
                                    class="button"
                                    color="error"
                                    text
                                    @click="handleDeleteClicked"
                                >
                                    Yes
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import toastr from 'toastr'
import functionAPI from '~/utils/functionAPI'
import imageAPI from "~/utils/imageAPI"
export default {
    data() {
        return {
            editDialog: false,
            deleteDialog: false,
            functionData: [],
            dialog: [
                'EDIT', 'DELETE'
            ],
            editData: {
                _id: '',
                platform: '',
                group: '',
                choices: []
            },
            image: null,
            choice: [
                {
                    name: '',
                    description: '',
                    imageUrl: '',
                    imagePath: ''
                }
            ],
            groupRules: [
                v => !!v || ''
            ],
            choiceRules: [
                v => !!v || ''
            ],
            descriptionRules: [
                v => !!v || ''
            ],
            defaultProfile: require('~/assets/default-profile.png')
        }
    },
    mounted() {
        this.getDatail()
    },
    methods: {
        async getDatail () {
            const response = await functionAPI.functionDetails(this.$route.params.id)
            this.functionData = response.functionLists
        },
        openDialog(event) {
            if (event == 'EDIT') {
                this.editDialog = true
                this.editData.group = this.functionData.group
                for (let index = 0; index < this.functionData.choices.length; index++) {
                    this.editData.choices.push({ name: '', description: '', imagePath: '' })
                }
                this.functionData.choices.forEach((element, index) => {
                    this.editData.choices[index].name = element.name
                    this.editData.choices[index].description = element.description
                    this.editData.choices[index].imagePath = element.imagePath
                })
                this.editData.platform = this.functionData.platform
                this.editData._id = this.functionData._id

            }
            else if (event == 'DELETE') {
                this.deleteDialog = true
            }
        },
        async handlePicture(index) {
            const response = await imageAPI.upload(this.image)
            this.choice[index].imagePath = response
        },
        async PickFile(index) {
            console.warn(index)
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
            await functionAPI.editFunction(this.editData._id, this.editData.group, this.editData.choices)
                .then(response => {
                    toastr.success(response.message)
                })
                .catch(error => {
                    toastr.error(error.response.error.message)
                })
        },
        async handleDeleteClicked() {
            const response = await functionAPI.deleteFunction(this.$route.params.id)
            try {
                toastr.success(response.message)
                this.deleteDialog = false
                this.$router.replace({
                    name: 'admin-function'
                })
            }
            catch (error) {
                toastr.error(error.response.error.message)
            }
        },
        async handleAddClicked () {
            console.log(this.functionData.choices.length)
            this.editData.choices.push({ name: '', description: '', imagePath: '' })
        },
        async handleCloseClicked (index) {
            console.log(index)
            this.editData.choices.splice(index, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap-page {
    margin: 24px;
    & .top {
        display: grid;
        grid-template-columns: auto 150px;
        align-items: center;

    }
    & .header{
        font-size:30px;
        font-weight:bold;
        text-align: center;
        margin: 8px 0 8px ;
    }
    & .menu {
        & .button-setting {
            background-color:#37d0ff;
        }
    }
    & .wrap-card {
        margin: 16px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 250px);
        grid-gap: 16px;
        & .func-card {
            border: 1px solid rgba( #000000,  0.3);
            border-radius: 8px;
            & .wrap-image {
                background-color: #FFF;
                max-width: 250px;
                height: 250px;
                padding: 16px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            & .choice {
                padding: 16px;
                & .name {
                    font-size: 20px;
                    font-weight: 500;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                & .desc {
                    font-size: 14px;
                }
            }
        }
    }


}
 .wrap-input {
    padding: 16px;
}
.btn-action {
    display: flex;
    justify-content: space-around;

}
.btn-img {
    position:absolute;
    margin-top: 50px;
}
</style>

