<template>
    <div>
        <div
            rounded="20"
            class="func-card my-6 mx-6"
            v-for="input,index in choice"
            :key="index"
        >
            <div class="d-flex flex-column">
                <div class="top-box pa-4">
                    <v-avatar
                        size="64px"
                    >
                        <img :src="input.imagePath">
                    </v-avatar>
                    <div class="choice-name">
                        {{ input.name }}
                    </div>
                </div>
                <div class="middle-box">
                    <p class="pa-4 pt-0 text-justify">
                        {{ input.description }}
                    </p>
                </div>
            </div>
            <v-divider class="mx-4" />
            <v-col cols="12">
                <p class="text-center mt-4">
                    Input your time (Hour)
                </p>

                <div class="input-box">
                    <!-- <v-btn elevation="0" @click="minus" width="32px" max-height="32px" fab>
                        <v-icon size="24px">
                            mdi-minus
                        </v-icon>
                    </v-btn> -->

                    <v-text-field
                        @change="$emit('inputTime',input.time)"
                        hide-details
                        solo
                        flat
                        placeholder="time"
                        :rules="timeRules"
                        v-model="input.time"
                        class="input-time text-center"
                    />
                    <!-- <v-btn elevation="0" @click="plus" width="32px" max-height="32px" fab>
                        <v-icon size="24px">
                            mdi-plus
                        </v-icon>
                    </v-btn> -->
                </div>
            </v-col>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'choice' ],
    data() {
        return {
            t: 1,
            timeRules: [
                v => !!v || '',
            ],
        }
    },
    computed: {

    },
    methods: {

        plus(val) {
            val + 1
            return val
        },
        minus() {
            if (this.time>1) {
                this.time = this.time - 1
            }
            else {
                this.time = 1
            }
        },
    }

}
</script>

<style>
.func-card {
    background-color: #fafafa;
    border: 1px solid rgba(0, 0, 0, 0.35);
    border-radius: 5px;
}
.top-box {
    display: flex;
    align-items: center;
}
.middle-box {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;

}
.choice-name{
    font-size: 20px;
    padding-left: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.input-box {
    display: flex;
    align-items: center;
    justify-content: center;
}
.input-time {
    max-width: 60px;
    margin-left: 16px;
    margin-right: 8px;
}
</style>
