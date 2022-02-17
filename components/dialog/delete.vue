<template>
    <v-dialog
        v-model="deleteDialog"
        max-width="500"
    >
        <v-card class="pa-5">
            <v-card-title class=" justify-center card-text pa-1 pb-3">
                Do you want to delete user  user.firstname }} ?
            </v-card-title>


            <v-row class="pa-5" justify="center" justify-md="space-around">
                <v-btn
                    class="pa-2"
                    color="error"
                    width="100px"
                    @click="deleteDialog = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    width="100px"
                    class="pa-2"
                    color="success"
                    @click="handleDelete(user._id)"
                >
                    Confirm
                </v-btn>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
export default {

}
</script>

<style>

</style>
