<template>
    <div>
        <div
            class="d-flex flex-column"
        >
            <v-card rounded="sm" flat class="mb-3 mx-3 choice-card" :class="active == true ? 'active': ''" @click="$emit('chooseChoice',choices)">
                <v-col cols="12">
                    <v-list-item>
                        <v-list-item-avatar size="50px">
                            <v-avatar>
                                <img :src="choices.imagePath">
                            </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ choices.name }}</v-list-item-title>
                            <p class=" pa-0  ma-0 sub-title">
                                {{ choices.description }}
                            </p>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-card>
        </div>
    </div>
</template>
<script>
export default {
    props: [ 'choices', 'active' ]


}

</script>
<style lang="scss" scoped>
.sub-title {
    color: rgba($color: #000000, $alpha: 0.4);
}
.choice-card{
    background-color:#e3e3e3  !important ;
    &.active {
    background-color: #7BE891 !important ;

}
}
.v-list-item__title {
    font-weight:400;

}
.v-list-item__subtitle {
    font-weight:300;
    opacity: 80%;
}

</style>
