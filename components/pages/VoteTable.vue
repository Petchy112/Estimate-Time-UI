<template>
    <div v-if="voteResults">
        <v-simple-table class="mx-3">
            <template #default>
                <thead>
                    <tr>
                        <th style="height:30px color:#999">
                            Round
                        </th>
                        <th style="height:30px color:#999">
                            Created at
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(data,index) in voteResults "
                        :key="index"
                        @click="handleShowClicked(data.id)"
                    >
                        <td class="pt-3">
                            Vote round {{ data.round }}
                        </td>
                        <td class="pt-3" style=" color:#999">
                            {{ data.createdAt }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    props: {
        voteResults: Array
    },
    methods: {
        handleShowClicked(id) {
            console.log(id)
            this.$emit('show-vote', id)
        }
    }
}
</script>


