<template>
    <div v-if="voteData">
        <v-tabs
            v-model="tab"
            slider-color="yellow"
            fixed-tabs
        >
            <v-tab
                v-for="item in items"
                :key="item.tab"
            >
                {{ item.tab }}
            </v-tab>
        </v-tabs>
    </div>
</template>

<script>
export default {
    layout: 'liff'


}
</script>

<style>

</style>
