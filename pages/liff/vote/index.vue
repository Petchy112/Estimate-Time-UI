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
                <div class="container" v-for="item in list" :key="item._id">
                    <h1>
                        {{ item.group }}
                    </h1>
                    <Votebox :choice="item.choices" @inputTime="inputTime" />
                </div>
            </v-form>


            <v-col cols="12">
                <div>
                    <v-btn :disabled="!valid" rounded @click="next(),valid = !valid">
                        Next
                    </v-btn>
                </div>
            </v-col>
        </v-container>
    </v-app>
</template>

<script>
import functionAPI from "~/utils/functionAPI"
import voteAPI from "~/utils/voteAPI"
import Votebox from '~/components/Votebox.vue'
export default {
    layout: 'liff',
    components: { Votebox },
    data() {
        return {
            valid: true,
            index: 0,
            functionData: [],
            list: [],
            data: [],
            status: ''
        }
    },
    async mounted() {
        // liff.init({
        //     liffId: '1656364274-lqgZY5w3'
        // })
        const response = await functionAPI.functionList('WEBSITE')
        this.functionData = response
        this.functionData.forEach(async element => {
            await this.list.push({ fid: element._id, group: element.group, choices: element.choices })
        })


    },


    methods: {

        async next() {
            for (let j = 0; j < this.list.length; j++) {
                for (let i = 0; i < this.list[j].choices.length; i++) {
                    await this.data.push({ fid: this.list[j].fid, choiceId: this.list[j].choices[i]._id, name: this.list[j].choices[i].name, description: this.list[j].choices[i].description, imagePath: this.list[j].choices[i].imagePath, time: this.list[j].choices[i].time })
                }
            }

            const response = await voteAPI.sentVote(this.data)
            try {
                await this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Success',
                    message: response.message
                })
                await liff.closeWindow()
            }
            catch (error) {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.error.message
                })
            }

        },
        inputTime(time) {
            console.log(time)
        }

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
