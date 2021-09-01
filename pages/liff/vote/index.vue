<template>
    <div v-if="functionData">
        <v-list>
            <v-col cols="12">
                <v-list-item-title class="head">
                    Vote
                </v-list-item-title>
                <v-list-item-subtitle class="subhead">
                    input time that you make that function
                </v-list-item-subtitle>
            </v-col>
            <v-col cols="12">
                <v-tabs
                    v-model="tab"
                    slider-color="orange"
                >
                    <v-tab
                        v-for="item in items"
                        :key="item.index"
                        @click="choosePlatform(item.tab)"
                    >
                        {{ item.tab }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="i in 2"
                        :key="i.tab"
                    >
                        <div class="d-flex flex-column">
                            <v-card
                                class="my-func"
                                color="orange"
                                elevation="1"
                                v-for="func in functionData"
                                :key="func.index"
                                @click="handleShowClicked(func._id)"
                            >
                                <v-card-title class="justify-center">
                                    {{ func.group }}
                                </v-card-title>
                            </v-card>
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-list>
    </div>
</template>

<script>
import * as functionAPI from '@/utils/functionAPI'
export default {
    layout: 'liff',
    data() {
        return {
            tab: '',
            functionData: [],
            items: [
                { tab: 'WEBSITE', },
                { tab: 'MOBILE', },
            ],
        }
    },
    async mounted() {
        liff.init({
            liffId: '1656364274-OB6Pd9Rp'
        })
        functionAPI.index('WEBSITE')
            .then(response => {
                console.log('RESPONSE', response)
                this.functionData = response.data
            })
            .catch(error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })
    },
    methods: {
        handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'liff-vote-id', params: { id } })
        },
        choosePlatform(platform) {
            console.log(platform)
            functionAPI.index(platform)
                .then(response => {
                    console.log('RESPONSE', response)
                    this.functionData = response.data
                })
        }
    }
}

</script>

<style>
.v-application--wrap {
    color: white;
}
.head {
    text-align: center;
    font-weight: bold;
    font-size: 36px;
}
.subhead {
    padding-top: 0px;
    text-align: center;
    font-size: 16px;
    opacity: 60%;
}
.d-flex flex columns{
    margin-top: 14px;

}
.my-func {
    margin-top: 10px;
    margin-bottom: 10px;
}


</style>
