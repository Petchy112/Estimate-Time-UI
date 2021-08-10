<template>
    <div>
        <div class="ma-5">
            <h1>
                ผลโหวต
            </h1>
        </div>

        <v-simple-table class="ma-5">
            <template #default>
                <thead>
                    <tr>
                        <th>
                            <v-row
                                class="ml-2 mb-8"
                                justify-md="start"
                            >
                                <v-btn
                                    fixed
                                    color="primary"
                                >
                                    Start Voting
                                </v-btn>
                            </v-row>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(round,index) in results"
                        :key="index"
                    >
                        <td>โหวตครั้งที่ {{ index+1 }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            results: [
                {
                    group: 'Login',
                    choice: [
                        { name: 'normal', time: 2, description: 'normal login' },
                        { name: 'facebook', time: 2.5, description: 'facebook login' }
                    ],
                    order: 1,
                    updateAt: 220
                },
                {
                    group: 'Dashboard',
                    choice: [
                        { name: 'score', time: 1.5, description: 'show score' },
                        { name: 'profile', time: 1.33, description: 'show profile' }
                    ],
                    order: 1,
                    updateAt: 220
                },
            ],
        }
    },
}
</script>

<style>
h1 {
    text-align: center;
}
</style>
