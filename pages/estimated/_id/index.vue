<template>
    <div>
        <div class="mt-5 mx-5">
            <h1>ชื่อระบบ:A</h1>
            <h3>แพลตฟอร์ม:Website</h3>
        </div>
        <v-row
            justify="start"
            class="pb-5 px-5"
        >
            <v-card
                width="400"
                class="py-3 my-3"
                flat
            >
                <v-card-content>
                    <v-card-title class="text-h6 pa-2">
                        จำนวนนักพัฒนา : 2
                    </v-card-title>
                    <v-card-title class="text-h6 pt-0 pb-0 pl-2">
                        เวลาการพัฒนา : 2 weeks
                    </v-card-title>
                    <v-card-title class="text-h6 pa-2">
                        ขนาดระบบ : กลาง (8-10 ฟังก์ชัน)
                    </v-card-title>
                </v-card-content>
            </v-card>
        </v-row>
        <v-divider />
        <div class="pt-5">
            <h1>ฟังก์ชันที่เลือก</h1>
        </div>
        <div class="d-flex flex-wrap">
            <v-card
                class="ma-5 pa-5"
                width="500px"
                tile
                v-for="i in 10"
                :key="i"
            >
                <v-card-title class="text-h5 justify-center">
                    ชื่อกลุ่มฟังก์ชัน
                </v-card-title>
                <div
                    v-for="n in 3"
                    :key="n"
                >
                    <v-list-item two-line>
                        <v-list-item-avatar>
                            <v-avatar
                                class="ma-3 ml-6"
                                color="red"
                                size="120px"
                            />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>name</v-list-item-title>
                            <v-list-item-subtitle>description</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
h1 {
    opacity: 70%;
}
h3 {

    opacity: 70%;
}
</style>
