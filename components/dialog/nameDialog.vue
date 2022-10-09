<template>
    <div data-app>
        <v-btn
            color="white"
            class="next-btn"
            @click="nameDialog = !nameDialog"
        >
            NEXT
        </v-btn>
        <v-dialog
            v-model="nameDialog"
            max-width="350px"
        >
            <v-app-bar color="rgb(55, 208, 255)" flat>
                <v-toolbar-title class="header">
                    System Name
                </v-toolbar-title>
            </v-app-bar>
            <v-card class="system-card" height="150px">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <div class="justify-center">
                        <v-text-field
                            class="px-6 pt-6"
                            dense
                            flat
                            :rules="rules"
                            outlined
                            v-model="projectName"
                            placeholder="System name"
                        />
                    </div>
                    <div class="button-group mt-2">
                        <v-btn
                            class="btn"
                            width="40%"
                            @click="nameDialog = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            class="btn"
                            width="40%"
                            @click="estimate()"
                        >
                            Save
                        </v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nameDialog: false,
            projectName: '',
            rules: [
                v => !!v || 'Required',
            ],
            valid: false
        }
    },
    methods: {
        estimate() {
            if (this.$refs.form.validate()) {
                this.$emit('estimateSystem', this.projectName)
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.system-card {
    margin: 0 auto;
    padding: 16px;
    & .button-group {
        display: flex;
        justify-content: space-around;
    }
    & .btn {
        background: rgb(55, 208, 255);
        color: white;
        font-weight: 500;
    }

}
.next-btn {
    width: 100%;
    margin-right: 20px;
    border-radius: 8px;
    font-weight: 600;
}
.header {
    color:white;
}
</style>
