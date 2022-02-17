<template>
    <v-app>
        <v-container>
            <Nuxt />
        </v-container>
        <alertDialog />
    </v-app>
</template>

<script>
import userAPI from "~/utils/userAPI"
import alertDialog from "~/components/dialog/alertDialog"
export default {
    components: {
        alertDialog
    },
    data() {
        return {
            userData: [],
        }
    },
    mounted() {
        const response = userAPI.getProfile()
        try {
            this.userData = response
        }
        catch (error) {
            this.$store.dispatch('setDialog', {
                isShow: true,
                title: 'Please try again',
                message: error.response.error.message
            })
            this.$router.push({ name: 'liff' })
        }
    },
}
</script>

<style lang="scss">
@import '~/styles/variables.scss';
.v-application{
    font-family: 'Mitr', sans-serif !important;
    background-color: rgb(55, 208, 255);
}

.w-100{
 width: 100%;
}
.container {
    padding: 0 !important;
}
</style>
