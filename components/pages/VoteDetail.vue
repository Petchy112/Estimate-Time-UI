<template>
    <div class="result-card">
        <v-card-title class="card-title">
            {{ voteData.group }}
        </v-card-title>
        <div
            class="wrap-choice"
            v-for="choice in voteData.choices"
            :key="choice.name"
        >
            <v-list-item two-line>
                <v-list-item-avatar>
                    <v-avatar class="logo">
                        <img
                            :src="choice.imagePath ? input.imagePath : require('~/assets/function.jpg')"
                        >
                    </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                    <div class="name">
                        {{ choice.name }}
                    </div>
                    <p>
                        {{ choice.description }}
                    </p>
                </v-list-item-content>
                <div class="result-time">
                    {{ choice.time.toFixed(1) }}  Hours
                </div>
            </v-list-item>
        </div>
    </div>
</template>

<script>

export default {
    props: [ 'voteData' ]
}
</script>

<style lang='scss' scoped>
.result-card{
    border: 1px solid #d1d1d1;
    border-radius: 8px;
    & .card-title {
        border-bottom: 1px solid #d1d1d1;
        font-weight: 600;
        justify-content: center;
    }
    & .wrap-choice{
        display: flex;
        flex-direction: column;
    }
    & .name{
        padding: 0 0 10px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

    }
    & p {
        color: rgba(000, 000, 000, 0.5);
        font-size: 14px;
        padding-right: 10px;
    }
}

</style>
