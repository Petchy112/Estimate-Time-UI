<template>
    <div v-if="functionData">
        <v-card class="pb-2" flat tile color="rgb(55, 208, 255)">
            <h1 class="mt-3">
                {{ functionData.group }}
            </h1>
            <v-card-subtitle class="text-center">
                input time with hour format
            </v-card-subtitle>
            <v-card
                rounded="20"
                class="my-5 mx-5"
                v-for="(choice,index) in data"
                :key="index"
            >
                <div
                    class="d-flex flex-column"
                >
                    <v-list-item two-line>
                        <v-list-item-avatar>
                            <v-avatar
                                class="ma-3 ml-6"
                                color="red"
                                size="120px"
                            />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ choice.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ choice.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <div class="input-time">
                            <div>
                                <v-text-field label="Time" v-model="choice.time" outlined />
                            </div>
                        </div>
                    </v-list-item>
                </div>
            </v-card>
            <v-col cols="12">
                <div>
                    <v-btn @click="handleNextClicked(data)" rounded class="my-btn">
                        Next
                    </v-btn>
                </div>
            </v-col>
        </v-card>
    </div>
</template>

<script>
import * as functionAPI from '@/utils/functionAPI'
import * as voteAPI from "@/utils/voteAPI"
export default {
    layout: 'blank',
    data() {
        return {
            functionData: [],
            data: []
        }
    },

    async mounted() {
        console.log('THIS.$ROUTE.PARAMS.ID', this.$route.params.id)
        const response = await functionAPI.show(this.$route.params.id)
        console.log('RESPONSE', response)
        this.functionData = response.data
        for (let i = 0; i < this.functionData.choice.length; i++) {
            this.data.push({ choiceId: this.functionData.choice[i]._id, name: this.functionData.choice[i].name, description: this.functionData.choice[i].description, time: '' })
        }
        console.log('test', this.data)

    },

    methods: {
        logs() {
            console.log(this.data)
        },
        async handleNextClicked(body) {
            await voteAPI.sentVote(this.$route.params.id, body)
                .then(response => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.data.message
                    })
                    this.$router.push({ name: 'liff-vote' })
                }).catch(error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })
                })
        }
    }
}
</script>

<style scoped>

h1 {
 padding-top: 25px !important;

}
.input-time {
    width: 20%;
    justify-content: flex-end;
    align-content: center;
    height:50px;
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
</style>
