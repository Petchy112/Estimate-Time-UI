<template>
    <div v-if="functionData">
        <div>
            <h1 class="ma-3">
                จัดการฟังก์ชัน
            </h1>
        </div>
        <addFunction />
        <v-tabs
            v-model="tab"
            slider-color="yellow"
        >
            <v-tab
                v-for="item in items"
                :key="item.index"
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
        <v-card
            flat
            :search="search"
        >
            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="functions in functionData"
                    :key="functions"
                >
                    <div class="d-flex flex-wrap">
                        <v-card
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
            search: '',
            message: '',
            functionData: [],
            tab: '',
            items: [
                { tab: 'WEBSITE', },
                { tab: 'MOBILE', },

            ],
            groupRules: [
                v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน'
            ],
            choiceRules: [
                v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน'
            ],
            descriptionRules: [
                v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน'
            ],
        }
    },
    async mounted() {
        await functionAPI.index()
            .then(response => {
                console.log('RESPONSE', response)
                this.functionData = response.data
            })
            .catch(async error => {
                console.log('ERROR', error.response)
                this.message = error.response.data.error.message
            })
    },
    methods: {
        async handleShowClicked(id) {
            console.log(id)
            this.$router.push({ name: 'function-id', params: { id } })
        },
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
