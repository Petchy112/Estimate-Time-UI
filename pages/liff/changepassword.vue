<template>
    <div>
        <changepassword @change-password="handleChangeClicked" />
    </div>
</template>

<script>
import toastr from 'toastr'
import changepassword from "~/components/auth/changepassword"
import userAPI from "~/utils/userAPI"
export default {
    layout: 'plain',
    components: { changepassword },
    methods: {
        goBack() {
            this.$router.push({ name: 'liff-account' })
        },
        async handleChangeClicked(body) {
            console.log(body)
            const response = await userAPI.changepassword(body)
            try {
                toastr.success(response.message)
                await liff.closeWindow()
            }
            catch (error) {
                toastr.error(error.response.error.message)
            }
        }
    }
}
</script>


