<template>
    <div
        v-if="isCalling"
        class="loading"
    >
        <v-icon
            class="loader"
            type="loading"
            :style="{ fontSize: '60px', color: '#0000FF' }"
        />
    </div>
</template>
<script>
export default {
    data () {
        return {
            isCalling: false
        }
    },
    methods: {
        start () {
            this.isCalling = true
        },
        finish () {
            this.isCalling = false
        }
    }
}
</script>
<style lang='scss' scoped>
.loading {
    width: 100%;
    min-height: 100%;
    z-index: 99999;
    background: rgba(255, 255, 255, 255);
    position: absolute;
}
.loader {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
}
</style>
