<template>
    <div>
        <div class="choice-card" :class="[active ? 'active': '']" @click="unselect">
            <div class="top-box">
                <v-avatar size="40px">
                    <img :src="choice.imagePath ? input.imagePath : require('~/assets/function.jpg')">
                </v-avatar>
                <div class="name">
                    {{ choice.name }}
                </div>
            </div>
            <div class="middle-box">
                <p class="description">
                    {{ choice.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'choice' ],
    data() {
        return {
            active: false
        }
    },
    methods: {
        unselect() {
            this.active = !this.active
            this.$emit('chooseChoice', this.choice)
        }
    }
}

</script>

<style lang='scss' scoped>
.choice-card {
    margin: 8px;
    padding: 8px;
    border-radius: 8px;
    background-color:#e2e2e2;
    &.active {
        background-color:#7BE891;
        color: #404040;
    }
    & .top-box {
        display: grid;
        grid-template-columns: 18% auto;
        padding-bottom: 8px;
        align-items: center;
        & .name {
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    & .description {
        color: #404040;
        white-space: nowrap;
    }
}


</style>
