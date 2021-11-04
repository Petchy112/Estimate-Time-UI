<template>
    <div>
        <div
            class="d-flex flex-column"
        >
            <v-card flat class="mb-3 mx-3 choice-card" :class="active == true ? 'active': ''" @click="$emit('chooseChoice',choice)">
                <div class="top-box px-4 pt-4">
                    <v-avatar size="64px">
                        <img :src="choice.imagePath">
                    </v-avatar>
                    <v-card-title class="pa-0 pl-4">
                        {{ choice.name }}
                    </v-card-title>
                </div>
                <div class="middle-box">
                    <p class=" pa-4  ma-0 sub-title">
                        {{ choice.description }}
                    </p>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'choice', 'active' ]
}

</script>

<style scoped>
.sub-title {
    color: rgba( 0,0,0,0.4);
}
.choice-card{
    border-radius: 8px;
    background-color:#e2e2e2  !important ;
}
.v-list-item__title {
    font-weight:400;

}
.v-list-item__subtitle {
    font-weight:300;
    opacity: 80%;
}
.top-box {
    display: flex;
    align-items: center;
}

</style>
