<template>
    <div>
        <v-btn
            fab
            dark
            color="rgb(55, 208, 255)"
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
                <v-app-bar color="rgb(55, 208, 255)" flat dark>
                    <v-toolbar-title>
                        ADD FUNCTION
                    </v-toolbar-title>
                </v-app-bar>

                <v-text-field
                    dense
                    class="input-group--focused pa-6 pb-0"
                    label="Group of function is"
                    :rules="groupRules"
                    v-model="group"
                    required
                    outlined
                />

                <v-radio-group
                    :rules="[v => !!v || 'Platform is required']"
                    class="pa-sm-5 pa-xs-1"
                    v-model="platform"
                    row
                >
                    <span class="ml-lg-6 mr-lg-6">CHOOSE PLATFORM</span>
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
                                dark
                                @click="handleCloseClicked(choices.indexOf(choice))"
                                color="red"
                                v-if="choices.length>1"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                        <v-col cols="12">
                            <v-card-title>
                                <v-avatar
                                    class="mr-3 mb-3"
                                    size="80px"
                                    @change="handlePicture(index)"
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
                                    <img
                                        v-if="choices[index].imageUrl == ''"
                                        src="~/assets/function.jpg"
                                    >
                                    <img
                                        v-else
                                        :src="choices[index].imageUrl"
                                    >
                                </v-avatar>

                                <v-text-field
                                    dense
                                    label="Function choice"
                                    class="input-group--focused"
                                    :rules="choiceRules"
                                    v-model="choices[index].name"
                                    outlined
                                />
                            </v-card-title>
                            <v-card-subtitle>
                                <v-text-field
                                    dense
                                    v-model="choices[index].description"
                                    class="input-group--focused"
                                    :rules="descriptionRules"
                                    label="Description"
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
                    <v-row justify="center" justify-md="end">
                        <v-btn
                            class="mx-md-2 pa-md-3 mx-2 pa-3"
                            color="error"
                            width="100px"
                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            class="mx-md-2 pa-md-3 mx-2 pa-3"
                            color="success"
                            width="100px"
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
import * as imageAPI from "~/utils/imageAPI"
export default {
    data() {
        return {
            dialog: false,
            group: '',
            platform: '',
            choices: [
                {
                    name: '',
                    description: '',
                    imageUrl: '',
                    imagePath: ''
                }
            ],
            image: null,
            groupRules: [
                v => !!v || 'Required'
            ],
            choiceRules: [
                v => !!v || 'Required'
            ],
            descriptionRules: [
                v => !!v || 'Required'
            ],
        }
    },
    methods: {
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
                this.choices[index].imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },
        async handlePicture(index) {
            await imageAPI.upload(this.image)
                .then(async response => {
                    this.choices[index].imagePath = response.data.fullPath
                    console.log(this.choices)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async handleSaveClicked () {
            await functionAPI.create(this.group, this.platform, this.choices)
                .then(async response => {
                    console.log('RESPONSE Add function', response.data)
                    // this.$store.dispatch('setDialog', {
                    //     isShow: true,
                    //     title: 'Success',
                    //     message: response.data.message
                    // })
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
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })

                })

        },
        async handleAddClicked() {
            this.choices.push({ name: '', description: '', imageUrl: '', image: null, imagePath: '' })
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
.btn-img {
    position:absolute;
    margin-top: 50px;
}
.remove-btn {
    display: flex;
    justify-content: flex-end;

}
</style>
