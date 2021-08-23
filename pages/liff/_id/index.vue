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
                    <v-list-item two-line>
                        <v-list-item-avatar>
                            <v-avatar
                                max-width="30px"
                                color="red"
                            />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ choice.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ choice.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-action>
                            <v-text-field label="time" solo />
                        </v-list-action>
                    </v-list-item>
                </div>
            </v-card>
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
    padding: 10px 25px;
}
.v-input {
    width: 30%;
    align-content: space-between;
}
.v-list-action {
    align-content: center;
}
</style>
