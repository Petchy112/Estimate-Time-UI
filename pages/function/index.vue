<template>
    <div v-if="functionData">
        <div>
            <h1 class="ma-3">
                ALL FUNCTION
            </h1>
        </div>
        <addFunction />
        <v-tabs
            v-model="tab"
            slider-color="yellow"
        >
            <v-tab
                v-for="item,index in items"
                :key="index"
                @click="choosePlatform(item.tab)"
            >
                {{ item.tab }}
            </v-tab>
        </v-tabs>
        <v-text-field
            flat
            label="Search"
            v-model="search"
            solo-inverted
            append-icon="mdi-magnify"
            class="mx-4 my-2"
        />
        <v-col cols="12">
            <v-card
                flat
                :search="search"
            >
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="i in 2"
                        :key="i.tab"
                    >
                        <div class="d-flex flex wrap">
                            <v-card
                                v-for="functions,index in functionData"
                                :key="index"
                                class="ma-5"
                                max-width="340"
                                @click="handleShowClicked(functions._id)"
                            >
                                <v-img
                                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                    height="200px"
                                />
                                <v-card-title class="justify-center">
                                    {{ functions.group }}
                                </v-card-title>
                            </v-card>
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>
    </div>
</template>

<script>
import addFunction from "~/components/dialog/addFunction.vue"
import * as functionAPI from '@/utils/functionAPI'
export default {
    components: {
        addFunction
    },
    data() {
        return {
            platform: '',
            search: '',
            functionData: [],
            tab: '',
            items: [
                { tab: 'WEBSITE', },
                { tab: 'MOBILE', },

            ],

        }
    },
    async mounted() {
        await functionAPI.index('WEBSITE')
            .then(response => {
                console.log('RESPONSE', response)
                this.functionData = response.data
            })
            .catch(async error => {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.data.error.message
                })
            })
    },
    methods: {
        async handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'function-id', params: { id } })
        },
        async choosePlatform(platform) {
            this.platform = platform
            await functionAPI.index(platform)
                .then(response => {
                    console.log('RESPONSE', response)
                    this.functionData = response.data
                })
        }
    }


}
</script>
<style scoped>
h1{
    text-align: center;
}
v-btn.center {
    align-items: center;
}
</style>
