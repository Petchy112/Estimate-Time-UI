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
                    console.log(error)
                })
        }
    }
}
</script>

<style>

</style>
