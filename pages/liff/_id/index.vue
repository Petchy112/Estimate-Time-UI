<template>
    <div v-if="functionData">
        <v-card class="pb-2" flat color="orange">
            <h1 class="mt-3">
                {{ functionData.group }}
            </h1>
            <v-card class="my-card">
                <div
                    class="d-flex flex-column"
                    v-for="choice in functionData.choice"
                    :key="choice.index"
                >
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-avatar color="red" class="circle" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ choice.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ choice.description }}</v-list-item-subtitle>
                            <v-list-item-action>
                                <div class="input-time">
                                    <v-text-field filled label="TIME" dense />
                                </div>
                            </v-list-item-action>
                        </v-list-item-content>
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
.my-card {
    margin: 20px 20px;
}
.v-list-item {
    margin: 10px 10px;
}
.v-list-item__action {
    margin-left: 0px !important;
}
.input-time {
    width: 30%;
    text-align: center !important;
    margin: 0;
    height:55px;
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
