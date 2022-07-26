<template>
    <v-dialog
        v-model="isShow"
        max-width="290"
        persistent
    >
        <v-card>
            <v-card-title> title </v-card-title>
            <v-card-text v-html="'message'" />
            <v-card-actions>
                <v-spacer />
                <v-btn
                    color="rgb(55, 208, 255)"
                    text
                    @click="close"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        open() {
            this.isShow = true
        },
        close() {
            this.isShow = false
        }

    },
}
</script>
