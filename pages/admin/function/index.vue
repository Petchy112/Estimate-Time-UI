<template>
    <div class="wrap-page">
        <div>
            <div class="header">
                ALL FUNCTION
            </div>
        </div>
        <AddFunction />
        <v-tabs
            v-model="tab"
            slider-color="blue"
            height="60px"
        >
            <v-tab
                v-for="item,index in items"
                :key="index"
                @change="choosePlatform(item.tab)"
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
                class="search-tab"
            />
        </v-tabs>


        <div class="empty" v-if="functionData.length == 0">
            no data
        </div>
        <v-tabs-items v-model="tab">
            <div class="warp-card">
                <v-hover
                    v-slot="{ hover }"
                    v-for="(functions,index) in filteredItems"
                    :key="index"
                >
                    <v-card
                        class="card-func"
                        :elevation="hover ? 5 :2"
                        :class="{ 'on-hover': hover }"
                        @click="handleShowClicked(functions._id)"
                    >
                        <div class="title">
                            {{ functions.group }}
                        </div>
                    </v-card>
                </v-hover>
            </div>
        </v-tabs-items>
    </div>
</template>

<script>
import AddFunction from "~/components/dialog/addFunction"
import functionAPI from '~/utils/functionAPI'
export default {
    components: {
        AddFunction
    },
    data() {
        return {
            platform: 'WEBSITE',
            search: '',
            functionData: [],
            tab: '',
            items: [
                { tab: 'WEBSITE' },
                { tab: 'MOBILE' },

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
        async getFunctionLists() {
            const response = await functionAPI.functionList(this.platform)
            this.functionData = response
        },
        async handleShowClicked(id) {
            this.$router.push({ name: 'admin-function-id', params: { id } })
        },
        async choosePlatform(platform) {
            this.platform = platform
            this.getFunctionLists()

        }
    }


}
</script>
<style lang='scss' scoped>
.wrap-page{
    & .header{
        font-size:30px;
        font-weight:bold;
        text-align: center;
        margin: 8px 0 8px ;
    }
    & .search-tab {
        margin-top: 8px;
    }
    & .warp-card {
        margin: 24px;
        display: grid;
        grid-template-columns:33% 33% 33% ;
        grid-gap: 10px;
        & .card-func {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 75px;
            border-radius: 16px;
            cursor: pointer;
        }
    }
}
</style>

