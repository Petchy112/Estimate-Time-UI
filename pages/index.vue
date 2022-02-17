<template>
    <div />
</template>

<script>
// import liff from '@line/liff'
// import { mapMutations, mapState } from 'vuex'

// export default {
//     data () {
//         return {
//             role: '',
//             action: '',
//             params: ''
//         }
//     },
//     computed: {
//         ...mapState({
//             auth: state => state.auth
//         })
//     },
//     mounted () {
//         try {
//             liff.init({ liffId: '1656485269-RQoM7d63' }, () => {
//                 if (liff.isLoggedIn()) {
//                     const queryString = decodeURIComponent(window.location.search).replace('?liff.state=', '')
//                     const params = new URLSearchParams(queryString)
//                     this.params = params

//                     liff.getProfile().then((profile) => {
//                         this.setLineId(profile.userId)
//                         // window.alert(this.$route.query.action)
//                         if (params.get('role') === 'MANAGER') {
//                             if (this.auth.managerLoggedin) {
//                                 switch (params.get('action')) {
//                                     case 'dailyReport':
//                                         this.$router.push('/manager/dailyReport')
//                                         break
//                                     case 'monthlyReport':
//                                         this.$router.push('/manager/monthlyReport')
//                                         break
//                                     case 'more':
//                                         this.$router.push('/manager/more')
//                                         break
//                                     case 'ot':
//                                         this.$router.push('/manager/dailyReport/ot')
//                                         break
//                                     case 'leave':
//                                         this.$router.push('/manager/dailyReport/leave')
//                                         break
//                                     default:
//                                         this.$router.push('/manager/dailyReport')
//                                         break
//                                 }
//                             }
//                             else {
//                                 this.$router.push('/manager/register')
//                             }
//                         }
//                         if (params.get('role') === 'STAFF') {
//                             if (this.auth.staffLoggedin) {
//                                 switch (this.$route.query.action) {
//                                     case 'clockin':
//                                         this.$router.push('/staff/clock/clockin')
//                                         break
//                                     case 'clockout':
//                                         this.$router.push(`/staff/clock/clockout?recordId=${this.$route.query.recordId}`)
//                                         break
//                                     case 'leave':
//                                         this.$router.push('/staff/request/leave')
//                                         break
//                                     case 'ot':
//                                         this.$router.push('/staff/request/ot')
//                                         break
//                                     case 'more':
//                                         this.$router.push('/staff/more')
//                                         break
//                                     default:
//                                         this.$router.push('/staff/clock/clockin')
//                                         break
//                                 }
//                             }
//                             else {
//                                 this.$router.push('/staff/register')
//                             }
//                         }
//                     })
//                 }
//                 else {
//                     liff.login()
//                 }
//             })
//         }
//         catch (error) {
//             console.log(error)
//         }
//     },
//     methods: {
//         ...mapMutations({
//             setLineId: 'auth/setLineId'
//         })
//     }
// }
// </script>

