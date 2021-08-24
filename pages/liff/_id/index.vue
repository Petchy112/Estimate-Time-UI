<template>
    <div v-if="functionData">
        <v-card class="pb-2" flat tile color="orange">
            <h1 class="mt-3">
                {{ functionData.group }}
            </h1>
            <v-card-subtitle class="text-center">
                input time with hour format
            </v-card-subtitle>
            <v-card
                rounded="20"
                class="my-5 mx-5"
                v-for="i in 2"
                :key="i"
            >
                <div
                    class="d-flex flex-column"
                    v-for="n in 3"
                    :key="n"
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
                            <v-list-item-title>name</v-list-item-title>
                            <v-list-item-subtitle>description</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-action class="input-time">
                            <v-list-action-text>
                                <v-text-field label="Time" solo-inverted />
                            </v-list-action-text>
                        </v-list-action>
                    </v-list-item>
                </div>
            </v-card>
            <v-col cols="12">
                <div>
                    <v-btn rounded class="my-btn">
                        Next
                    </v-btn>
                </div>
            </v-col>
        </v-card>
    </div>
</template>

<script>
import * as functionAPI from '@/utils/functionAPI'
export default {
    layout: 'blank',
    data() {
        return {
            functionData: []
        }
    },

    async mounted() {
        console.log('THIS.$ROUTE.PARAMS.ID', this.$route.params.id)
        const response = await functionAPI.show(this.$route.params.id)
        console.log('RESPONSE', response)
        this.functionData = response.data
    },

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
