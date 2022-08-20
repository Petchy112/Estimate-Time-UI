<template>
    <div>
        <changepassword @change-password="handleChangeClicked" />
    </div>
</template>

<script>
import changepassword from "~/components/auth/changepassword"
export default {
    layout: 'plain',
    components: { changepassword },
    methods: {
        goBack() {
            this.$router.push({ name: 'liff-account' })
        },
    }
}
</script>


