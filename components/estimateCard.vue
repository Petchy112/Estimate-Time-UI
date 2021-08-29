<template>
    <div>
        <div
            class="d-flex flex-column"

            v-for="choice in choices"
            :key="choice.name"
        >
            <v-card height="80px" class="mb-3 mx-3 choice-card" @click="$emit('chooseChoice',choice)">
                <v-col cols="12">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img max-width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ choice.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ choice.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-card>
        </div>
    </div>
</template>
<script>
export default {
    props: [ 'choices' ]


}

</script>
<style lang="scss" scoped>

.choice-card-active {
    background-color: green !important ;

}

</style>
