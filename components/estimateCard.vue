<template>
    <div>
        <div
            class="d-flex flex-column"
        >
            <v-card flat class="mb-3 mx-3 choice-card" :class="active == true ? 'active': ''" @click="$emit('chooseChoice',choices)">
                <div class="top-box px-4 pt-4">
                    <v-avatar size="64px">
                        <img src="~/assets/function.jpg">
                    </v-avatar>
                    <v-card-title class="pa-0 pl-4">
                        Nameeeeeeeeeeeeeeeeeeeeee Choicee
                    </v-card-title>
                </div>
                <div class="middle-box">
                    <p class=" pa-4  ma-0 sub-title">
                        pppppppppppppppppppppppppppppppppppppppppppppppppp
                    </p>
                </div>
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
    border-radius: 8px;
    background-color:#e2e2e2  !important ;
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
.top-box {
    display: flex;
    align-items: center;
}

</style>
