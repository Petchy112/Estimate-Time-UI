<template>
    <div>
        <Changepassword @change-password="handleChangeClicked" />
    </div>
</template>

<script>
import toastr from 'toastr'
import Changepassword from "~/components/auth/changepassword"
import userAPI from "~/utils/userAPI"
export default {
    components: { Changepassword },
    methods: {
        async handleChangeClicked(body) {
            const response = await userAPI.changepassword(body)
            try {
                toastr.success(response.message)
                await this.$router.push({ name: 'admin-function' })
            }
            catch (error) {
                toastr.error(error.response.error.message)
            }
        }
    }
}
</script>


