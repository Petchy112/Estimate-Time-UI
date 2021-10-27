<template>
    <v-app>
        <v-container>
            <v-app-bar
                color="primary"
                flat
                fixed
                max-width="100%"
            >
                <v-toolbar-title>
                    VOTE SYSTEM
                </v-toolbar-title>
            </v-app-bar>


            <v-form
                ref="form"
                v-model="valid"
            >
                <div class="container" v-for="item in 3" :key="item._id">
                    <h1>
                        ชื่อฟังก์ชัน
                    </h1>

                    <div
                        rounded="20"
                        class="func-card my-6 mx-6"
                        v-for="input in 2"
                        :key="input.index"
                    >
                        <div class="d-flex flex-column">
                            <div class="top-box pa-4">
                                <v-avatar
                                    size="64px"
                                >
                                    <img src="~/assets/function.jpg">
                                </v-avatar>
                                <div class="choice-name">
                                    efnicnvibfiegjiba9rejhyiodnkzfgoh[4HYH489HYHNH
                                </div>
                            </div>
                            <div class="middle-box">
                                <p class="pa-4 pt-0 text-justify">
                                    kenrignribonbioenigbicbnoerykonoibnrhnion oih98 gh985ho;bvndseginduifbiuw n87e4uirouybtuybvebryub
                                </p>
                            </div>
                        </div>
                        <v-divider class="mx-4" />
                        <v-col cols="12">
                            <p class="text-center mt-4">
                                Input your time (Hour)
                            </p>
                            <div class="input-box">
                                <v-btn elevation="0" @click="minus" width="32px" max-height="32px" fab>
                                    <v-icon size="24px">
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                                <v-text-field hide-details solo flat :rules="timeRules" v-model="time" class="input-time text-center" />
                                <v-btn elevation="0" @click="plus" width="32px" max-height="32px" fab>
                                    <v-icon size="24px">
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                    </div>
                </div>
            </v-form>


            <v-col cols="12">
                <div>
                    <v-btn :disabled="!valid" rounded :loading="loading" @click="next(),valid = !valid">
                        Next
                    </v-btn>
                </div>
            </v-col>
        </v-container>
    </v-app>
</template>

<script>
import * as functionAPI from "~/utils/functionAPI"
import * as voteAPI from "@/utils/voteAPI"
export default {
    layout: 'liff',
    data() {
        return {
            valid: true,
            index: 0,
            functionData: [],
            list: [],
            data: [],
            time: 1,
            timeRules: [
                v => !!v || '',
            ],
            status: ''
        }
    },
    // mounted() {
    //     functionAPI.index('WEBSITE')
    //         .then(async response => {
    //             console.log('res', response)
    //             this.status = response.data[0].status
    //             if (this.status == 'CLOSE') {
    //                 await this.$store.dispatch('setDialog', {
    //                     isShow: true,
    //                     title: 'Sorry !',
    //                     message: 'vote is closed'
    //                 })
    //                 await liff.closeWindow()
    //             }
    //             this.functionData = response.data
    //             this.functionData.forEach(async element => {
    //                 await this.list.push({ fid: element._id, group: element.group, choices: element.choice })
    //             })


    //         })
    //         .catch(error => {
    //             this.$store.dispatch('setDialog', {
    //                 isShow: true,
    //                 title: 'Please try again',
    //                 message: error.response.data.error.message
    //             })
    //         })
    // },


    methods: {
        plus() {
            this.time = this.time + 1
        },
        minus() {
            if (this.time>1) {
                this.time = this.time - 1
            }
            else {
                this.time = 1
            }
        },
        async next() {
            for (let j = 0; j < this.list.length; j++) {
                for (let i = 0; i < this.list[j].choices.length; i++) {
                    await this.data.push({ fid: this.list[j].fid, choiceId: this.list[j].choices[i]._id, name: this.list[j].choices[i].name, description: this.list[j].choices[i].description, imagePath: this.list[j].choices[i].imagePath, time: this.list[j].choices[i].time })
                }
            }

            await voteAPI.sentVote(this.data)
                .then(async response => {
                    await this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                    await liff.closeWindow()
                }).catch(error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })
                })

        },

    }
}
</script>

<style scoped>


.v-toolbar__title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: white;
}
.container {
    padding-top: 40px !important;
}
.func-card {
    background-color: #fafafa;
    border: 1px solid rgba(0, 0, 0, 0.35);
    border-radius: 5px;
}
.top-box {
    display: flex;
    align-items: center;
}
.middle-box {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;

}

.choice-name{
    font-size: 20px;
    padding-left: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.input-box {
    display: flex;
    align-items: center;
    justify-content: center;
}
.input-time {
    max-width: 60px;
    margin-left: 16px;
    margin-right: 8px;
}

.v-btn {
    height: 50px !important ;
    margin-left:10px ;
    width: 95%;
    font-size: 18px;
    font-weight: 600;
}


p {
    color: rgba(000, 000, 000, 0.5);
    font-size: 14px;
    margin:  0 auto;
}
</style>
