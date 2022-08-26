<template>
    <div class="wrap-zone">
        <div
            class="func-card"
            v-for="input,index in choice"
            :key="index"
        >
            <div class="func-data">
                <div class="top-box">
                    <v-avatar size="60px">
                        <img :src="input.imagePath ? input.imagePath : require('~/assets/function.jpg')">
                    </v-avatar>
                    <div class="choice-name">
                        {{ input.name }}
                    </div>
                </div>
                <div class="middle-box">
                    {{ input.description }}
                </div>
            </div>
            <v-divider />
            <div class="input-section">
                <p>
                    Input your time (Hour)
                </p>

                <div class="input-box">
                    <v-text-field
                        @change="$emit('inputTime',input.time)"
                        hide-details
                        solo
                        flat
                        type="number"
                        placeholder="Time"
                        :rules="timeRules"
                        v-model="input.time"
                        class="input-time text-center"
                    >
                        <template slot="label">
                            Time
                        </template>
                    </v-text-field>
                </div>
            </div>
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

<style lang='scss' scoped>
.wrap-zone {
    margin: 12px;
    display: grid;
    grid-gap: 12px;
    & .func-card {
        background-color: #fafafa;
        border: 1px solid rgba(0, 0, 0, 0.35);
        border-radius: 5px;
        padding: 16px;
        & .func-data{
            & .top-box {
                align-items: center;
                display: grid;
                grid-template-columns: 60px auto;
                // align-items: center;
                & .choice-name{
                    font-size: 20px;
                    padding-left: 16px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            & .middle-box {
                margin: 10px;
                color: rgba(0, 0, 0, 0.6);
                font-size: 16px;

            }
        }
        & .input-section{
            display: grid;
            grid-template-columns: 60% 40%;
            align-items: center;
            p {
                font-size: 14px;
            }
            & .input-time{
                max-width: 75px;
                margin-left: 8px;
            }
        }
    }
}
</style>
