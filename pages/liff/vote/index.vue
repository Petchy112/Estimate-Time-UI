<template>
    <div class="wrap-page">
        <v-app-bar
            class="app-bar"
            flat
            fixed
        >
            <div class="title">
                VOTE SYSTEM
            </div>
        </v-app-bar>

        <div class="wrap-content">
            <div
                v-for="(item) in list"
                :key="item.index"
            >
                <div class="name-group">
                    {{ item.group }}
                </div>
                <div class="choice">
                    <VoteBox :choice="item.choices" @inputTime="inputTime" />
                </div>
            </div>
            <div class="btn-action">
                <v-btn
                    class="next"
                    :disabled="!valid"
                    @click="next(),valid = !valid"
                >
                    Next
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import functionAPI from '~/utils/functionAPI'
import voteAPI from '~/utils/voteAPI'
import VoteBox from '~/components/pages/VoteBox.vue'
import toastr from 'toastr'
export default {
    layout: 'plain',
    components: { VoteBox },
    data() {
        return {
            valid: true,
            index: 0,
            functionData: [],
            list: [],
            data: [],
            status: '',
            platform: 'WEBSITE'
        }
    },
    computed: {
        ...mapState({
            profile: state => state.profile.profile,
        })
    },
    async mounted() {
        this.getData()
    },


    methods: {
        async getData() {
            const response = await functionAPI.functionList(this.platform)
            this.functionData = response.functionLists
            this.functionData.forEach(async element => {
                await this.list.push({ fid: element._id, group: element.group, choices: element.choices })
            })
        },
        async next() {
            for (let j = 0; j < this.list.length; j++) {
                for (let i = 0; i < this.list[j].choices.length; i++) {
                    await this.data.push({ fid: this.list[j].fid, choiceId: this.list[j].choices[i]._id, name: this.list[j].choices[i].name, description: this.list[j].choices[i].description, imagePath: this.list[j].choices[i].imagePath, time: this.list[j].choices[i].time })
                }
            }

            const response = await voteAPI.sentVote(this.data)
            try {
                toastr.success(response.message)
                await liff.closeWindow()
            }
            catch (error) {
                toastr.error(error.response.error.message)
            }

        },
        inputTime(time) {
            console.log(time)
        }

    }
}
</script>

<style lang='scss' scoped>
.wrap-page {
    & .app-bar{
        display: flex;
        background-color: #37d0ff !important;
        justify-content: center;
        color: #fff;
        & .title {
            font-weight: 600;
            font-size: 28px !important;
        }
    }
    & .wrap-content {

        margin: 60px 10px 0 10px;
        & .name-group {
            font-size: 28px;
            display: flex;
            font-weight: 600;
            justify-content: center;
            padding: 16px;
        }

        & .btn-action {
            margin-top: 20px;
           & .next {
               height: 40px;
               border-radius: 10px;
               width: 100%;
               background: #37d0ff;
               color: #fff;
               font-weight: 600;
               font-size: 18px;
           }

        }
    }
}

</style>
