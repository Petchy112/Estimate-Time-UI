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
    },

}
</script>

<style>
.v-application{
    font-family: 'Mitr', sans-serif !important;
}
.w-100{
 width: 100%;
}
.container {
    padding: 0 !important;
}
</style>
