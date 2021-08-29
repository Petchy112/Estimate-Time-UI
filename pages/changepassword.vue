<template>
    <div>
        <changepassword @change-password="handleChangeClicked" />
    </div>
</template>

<script>
import changepassword from "~/components/auth/changepassword.vue"
import * as userAPI from "@/utils/userAPI"
export default {
    components: { changepassword },
    methods: {
        async handleChangeClicked(body) {
            await userAPI.changepassword(body)
                .then(response => {
                    console.log('RESONSE', response)
                    this.$router.push({ name: 'function' })
                })
                .catch(error => {
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title: 'Please try again',
                        message: error.response.data.error.message
                    })
                })
        }
    }
}
</script>

<style>

</style>
