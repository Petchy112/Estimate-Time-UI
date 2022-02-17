<template>
    <div v-if="functionData">
        <div>
            <h1 style="font-size:30px; font-weight:bold;" class="ma-3">
                ALL FUNCTION
            </h1>
        </div>
        <AddFunction />
        <v-tabs
            v-model="tab"
            slider-color="yellow"
            height="60px"
        >
            <v-tab
                v-for="item,index in items"
                :key="index"
                @click="choosePlatform(item.tab)"
            >
                {{ item.tab }}
            </v-tab>
            <v-spacer />
            <v-text-field
                label="Search"
                v-model="search"
                solo
                background-color="rgb(240,240,240)"
                flat
                append-icon="mdi-magnify"
                class="mx-4 my-2 search-tab"
            />
        </v-tabs>

        <v-col cols="12">
            <v-card
                flat
            >
                <div class="text-data" v-if="functionData == ''">
                    No Data
                </div>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="i in 2"
                        :key="i.tab"
                    >
                        <div class="d-flex flex-wrap">
                            <v-card
                                v-for="functions,index in filteredItems"
                                :key="index"

                                class="ma-5"
                                width="300px"
                                @click="handleShowClicked(functions._id)"
                            >
                                <img
                                    :src="defaultFunctionImg"
                                    height="200px"

                                    class="image"
                                >
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
import AddFunction from "~/components/dialog/addFunction.vue"
import functionAPI from '~/utils/functionAPI'
export default {
    components: {
        AddFunction
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
            defaultFunctionImg: require('~/assets/function.jpg')
        }
    },
    mounted() {
        this.getFunctionLists()
    },
    computed: {
        filteredItems() {
            return this.functionData.filter(item => {
                return item.group.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    },
    methods: {
        async getFunctionLists(platform) {
            const response = await functionAPI.functionList(platform)
            try {
                console.log('RESPONSE', response)
                this.functionData = response
            }
            catch (error) {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.error.message
                })
            }
        },
        async handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'admin-function-id', params: { id } })
        },
        async choosePlatform(platform) {
            this.getFunctionLists(platform)

        }
    }


}
</script>
<style scoped>
.search-tab {
    color:blue;
    width: 1px;
}
.text-data {
    text-align: center;
    color: rgba(000,000, 000, 0.3);
}
h1{
    text-align: center;
}
.text-data {
    text-align: center;
    color: rgba(000,000, 000, 0.3);
}
.image {
    width: 100%;
    object-fit: cover;

}

</style>
