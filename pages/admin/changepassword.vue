<template>
    <div>
        <changepassword @change-password="handleChangeClicked" />
    </div>
</template>

<script>
import changepassword from "~/components/auth/changepassword"
import userAPI from "~/utils/userAPI"
export default {
    components: { changepassword },
    methods: {
        async handleChangeClicked(body) {
            const response = await userAPI.changepassword(body)
            try {
                await this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Success',
                    message: response.message
                })
                await this.$router.push({ name: 'admin-function' })
            }
            catch (error) {
                await this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Please try again',
                    message: error.response.error.message
                })
            }
        }
    }
}
</script>

<style>

</style>
