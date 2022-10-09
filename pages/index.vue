<template>
    <div />
</template>

<script>

import { mapMutations, mapState } from 'vuex'

export default {
    layout: 'plain',
    data () {
        return {
            role: '',
            action: '',
            params: ''
        }
    },
    computed: {
        ...mapState({
            auth: state => state.auth
        })
    },
    mounted () {
        try {
            liff.init({ liffId: '1656364274-ADg78Boe' }, () => {
                if (liff.isLoggedIn()) {
                    const queryString = decodeURIComponent(window.location.search).replace('?liff.state=', '')
                    const params = new URLSearchParams(queryString)
                    this.params = params
                    liff.getProfile().then((profile) => {
                        this.setLine(profile)
                        window.alert(this.$route.query.action)
                        if (params.get('role') === 'COORDINATOR') {
                            switch (params.get('action')) {
                                case 'RESULT':
                                    this.$router.push('/liff/result/estimated')
                                    break
                                case 'ESTIMATE':
                                    this.$router.push('/liff/estimate')
                                    break
                                case 'ACCOUNT':
                                    this.$router.push('/liff/account')
                                    break

                            }
                        }
                        else if (params.get('role') === 'VOTER') {
                            switch (this.$route.query.action) {
                                case 'VOTE':
                                    this.$router.push('/liff/vote')
                                    break
                                case 'RESULT':
                                    this.$router.push(`/liff/result/vote`)
                                    break
                                case 'ACCOUNT':
                                    this.$router.push('/liff/account')
                                    break
                            }
                        }
                        else {
                            this.$router.push('/liff/login')
                        }
                    })
                }
                else {
                    liff.login()
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    },
    methods: {
        ...mapMutations({
            setLine: 'line/setLine'
        })
    }
}
</script>

