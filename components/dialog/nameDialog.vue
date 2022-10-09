<template>
    <v-application>
        <div>
            <v-btn
                color="white"
                class="btn"
                @click="nameDialog = !nameDialog"
            >
                NEXT
            </v-btn>
            <v-dialog
                v-model="nameDialog"
                max-width="350px"
            >
                <v-card height="150px">
                    <div class="justify-center">
                        <v-text-field
                            class="px-6 pt-6"
                            dense
                            flat
                            outlined
                            v-model="projectName"
                            label="System name"
                            placeholder="System name"
                        />
                    </div>
                    <div class="mt-2">
                        <v-row justify="space-around">
                            <v-btn

                                width="40%"
                                color="primary"
                                text
                                @click="nameDialog = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn

                                color="primary"
                                text
                                width="40%"
                                @click="estimate"
                            >
                                Save
                            </v-btn>
                        </v-row>
                    </div>
                </v-card>
            </v-dialog>
        </div>
    </v-application>
</template>

<script>
export default {
    data() {
        return {
            nameDialog: false,
            projectName: '',
        }
    },
    methods: {
        estimate() {
            this.$emit('estimate', this.projectName)
        },
    }
}
</script>

<style lang="scss" scoped>
.btn {
    width: 100%;
    margin-right: 20px;
    border-radius: 8px;
    font-weight: 600;
}
</style>
