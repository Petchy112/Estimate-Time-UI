<template>
    <div>
        <div class="picture">
            <v-btn
                class="secondary btn-upload"
                fab
                width="30px"
                height="30px"
                @click="onPickFile"
            >
                <v-icon size="20px">
                    mdi-camera
                </v-icon>
            </v-btn>

            <img
                :src="profilePreview ? profilePreview : defaultProfileImg"
            >
        </div>
        <input
            type="file"
            style="display:none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"
        >
    </div>
</template>

<script>
export default {
    props: [ 'profilePreview' ],
    data() {
        return {
            defaultProfileImg: require('~/assets/default-profile.png')
        }
    },
    methods: {
        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            this.$emit('selectImg', event)
        },
        upload() {
            this.$emit('uploadImg')
        }
    }

}
</script>

<style scoped>
img {
    object-fit: contain;
    width: 100px !important;
    height: 100px !important;
}
</style>
