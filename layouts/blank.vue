<template>
    <v-app>
        <v-container>
            <Nuxt />
        </v-container>
        <alertDialog />
    </v-app>
</template>

<script>
import alertDialog from "~/components/dialog/alertDialog.vue"
export default {
    components: {
        alertDialog
    }

}
</script>

<style scoped>
@import '~/styles/variables.scss';

</style>
