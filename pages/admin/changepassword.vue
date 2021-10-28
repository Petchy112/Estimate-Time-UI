<template>
    <div>
        <changepassword @change-password="handleChangeClicked" />
    </div>
</template>

<script>
import changepassword from "~/components/auth/changepassword.vue"
import * as userAPI from "~/utils/userAPI"
export default {
    components: { changepassword },
    methods: {
        async handleChangeClicked(body) {
            await userAPI.changepassword(body)
                .then(async response => {
                    await this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Success',
                        message: response.message
                    })
                    await this.$router.push({ name: 'admin-function' })
                })
                .catch(async error => {
                    await this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.error.message
                    })
                })
        }
    }
}
</script>

<style>

</style>
