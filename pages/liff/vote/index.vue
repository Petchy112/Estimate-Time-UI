<template>
    <v-app class="bg">
        <div v-if="list">
            <h1 class="mb-10 text">
                VOTE SYSTEM
            </h1>
            <div v-for="item in list" :key="item._id">
                <v-card class="pb-4 ma-5">
                    <h1>
                        {{ item.group }}
                    </h1>
                    <p class="text-center">
                        input time with hour format
                    </p>
                    <v-card
                        color="rgba(55, 208, 255, 0.8)"
                        rounded="20"
                        class="my-5 mx-5"
                        v-for="input in item.choices"
                        :key="input.name"
                    >
                        <div
                            class="d-flex flex-column"
                        >
                            <v-list-item two-line>
                                <v-list-item-avatar>
                                    <v-avatar

                                        size="40px"
                                    >
                                        <img :src="input.imagePath">
                                    </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content class="choice-card">
                                    <v-list-item-title>{{ input.name }}</v-list-item-title>
                                    <p class="pr-2">
                                        {{ input.description }}
                                    </p>
                                </v-list-item-content>
                                <div class="input-time">
                                    <div>
                                        <v-text-field
                                            color="black"
                                            dense
                                            label="Time"
                                            v-model="input.time"
                                            outlined
                                        />
                                    </div>
                                </div>
                            </v-list-item>
                        </div>
                    </v-card>
                </v-card>
            </div>
            <v-col cols="12">
                <div>
                    <v-btn class="" rounded @click="next">
                        Next
                    </v-btn>
                </div>
            </v-col>
        </div>
    </v-app>
</template>

<script>
import * as functionAPI from "~/utils/functionAPI"
import * as voteAPI from "@/utils/voteAPI"
export default {
    layout: 'liff',
    data() {
        return {
            index: 0,
            functionData: [],
            list: [],
            data: []
        }
    },
    mounted() {
        functionAPI.index('WEBSITE')
            .then(async response => {
                console.log('res', response)
                this.functionData = response.data
                this.functionData.forEach(async element => {
                    await this.list.push({ fid: element._id, group: element.group, choices: element.choice })
                })


            })
            .catch(error => {
                console.log(error)
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })
    },
    methods: {
        async next() {
            for (let j = 0; j < this.list.length; j++) {
                for (let i = 0; i < this.list[j].choices.length; i++) {
                    await this.data.push({ fid: this.list[j].fid, choiceId: this.list[j].choices[i]._id, name: this.list[j].choices[i].name, description: this.list[j].choices[i].description, imagePath: this.list[j].choices[i].imagePath, time: this.list[j].choices[i].time })
                }
            }

            await voteAPI.sentVote(this.data)
                .then(async response => {
                    this.$store.dispatch('setDialog', {
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
.bg {
    background-color: rgba(55, 208, 255, 0.8);
}
h1 {
 padding-top: 25px !important;

}
.text{
    color: white;
}
.input-time {
    width: 70px;
    justify-content: flex-end;
    height: 40px;

}
.circle {
    size: 50px;
}
.v-btn {
    height: 50px !important ;
    margin-left:10px ;
    width: 95%;
    font-size: 18px;
    font-weight: 600;
}
.my-back {
    font-size: 18px;
    font-weight: 600;
    text-decoration: underline;
    text-decoration-thickness: 2px;
}


p {
    color: rgba(000, 000, 000, 0.5);
    font-size: 14px;
    margin:  0 auto;
}
</style>
