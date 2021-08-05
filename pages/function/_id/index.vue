<template>
    <div v-if="functionData">
        <h1
            class="ma-3"
        >
            {{ functionData.group }}
        </h1>
        <v-text-field
            placeholder="Search"
            solo-inverted
            prepend-inner-icon="mdi-magnify"
            class="mx-4"
        />

        <div class="d-flex flex-wrap">
            <v-card
                class="ma-5"
                max-width="344"
                v-for="choice in functionData.choice"
                :key="choice.index"
            >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                />

                <v-card-title>
                    {{ choice.name }}
                </v-card-title>
                <v-card-subtitle>Time : {{ choice.time }}</v-card-subtitle>
            </v-card>
        </div>
    </div>
</template>

<script>
import * as functionAPI from '@/utils/functionAPI'
export default {
    data() {
        return {
            functionData: null
        }
    },
    async mounted() {
        console.log('THIS.$ROUTE.PARAMS.ID', this.$route.params.id)
        const response = await functionAPI.show(this.$route.params.id)
        console.log('RESPONSE', response)
        this.functionData = response.data
    }
}
</script>

<style>
h1{
    text-align: center;
}
</style>
