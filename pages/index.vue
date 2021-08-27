<template>
    <div>
        <login @login-clicked="login" />
    </div>
</template>

<script>
import * as userAPI from "@/utils/userAPI"
import login from "~/components/auth/login.vue"
export default {
    components: {
        login
    },
    layout: 'blank',


    methods: {
        async login(body) {
            await userAPI.login(body)
                .then(async response => {
                    console.log('RESPONSE', response)
                    await localStorage.setItem('token', response.data.accessToken)
                    this.$router.push({ name: 'function' })
                })
                .catch(async error => {
                    console.log('ERROR', error.response)
                    this.message = error.response.data.error.message
                })
        }
    }
}
</script>

<style>
.v-card-subtitle {
    padding-bottom: 10px 0;
}
.width-100 {
    width: 100%;
    margin-bottom:9px ;
}
.v-form {
    padding: 0 20px;
}
.my-header{
    font-weight: bold;
    font-size: x-large;
}
</style>
