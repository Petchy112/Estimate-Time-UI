<template>
    <div>
        <v-col cols="12">
            <v-card elevation="5">
                <v-list>
                    <v-list-title>
                        <div class="my-text ml-5 mt-4">
                            เลือกประเภทบัญชี :
                        </div>
                    </v-list-title>

                    <v-col cols="12">
                        <div class="d-flex flex-column pa-2">
                            <v-btn rounded class="role-btn" color="orange">
                                พนักงาน
                            </v-btn>
                            <v-btn rounded class="role-btn" color="orange">
                                ผู้ประสานงาน
                            </v-btn>
                        </div>
                    </v-col>
                </v-list>
            </v-card>
        </v-col>
    </div>
</template>

<script>
export default {
    layout: 'blank'
}
</script>

<style scoped>
.my-text {
    font-weight: bold;
    font-size: x-large;
}
.v-list__title {
    font-weight: bold;
}
.role-btn {
    margin-top: 20px;
    height: 50px !important;
    font-size: 16px;
}
</style>
