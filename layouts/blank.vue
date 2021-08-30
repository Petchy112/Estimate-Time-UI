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
.v-application{
    font-family: 'Mitr', sans-serif !important;
}
.v-application--wrap {
    justify-content: center ;
    background: gray;
}

.w-100{
 width: 100%;
}
</style>
