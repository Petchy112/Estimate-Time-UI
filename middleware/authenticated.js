// export default ({ route: { path, query, params }, redirect, store }) => {
//     const blacklistRoutes = [
//         `/admin/changepassword`,
//         '/liff/changepassword',
//         '/liff/account',
//         '/liff/role',
//         '/liff',
//         '/',
//     ]
//     const blacklistAdmin = [
//         '/admin/function',
//         `/admin/function/${params.id}`,
//         '/admin/user',
//         `/admin/user/${params.id}`,
//         '/admin/user/register',
//         '/admin/result/estimated',
//         '/admin/result/vote',
//         `/admin/result/vote/${params.round}`,
//         `/admin/result/leave/${params.id}`,
//     ]
//     const blacklistLiff = [
//         '/liff/account',
//         '/liff/vote',
//         '/liff/estimate',
//         '/liff/estimate/page2',
//         '/liff/result/estimated',
//         '/liff/result/vote',
//         `/liff/result/vote/${params.round}`

//     ]
//     if (blacklistRoutes.includes(path)) {
//         console.log(path, 'a')
//         // if (store.state.auth.lineUserId) {
//         //     if (store.state.auth.role === 'MANAGER') {
//         //         redirect('/manager/dailyReport')
//         //     }
//         //     redirect('/staff/clock/clockin')
//         // }
//     }
//     else {
//         console.log(path)
//         // if (store.state.auth.lineUserId) {
//         //     if (store.state.auth.role === 'MANAGER') {
//         //         if (blacklistManager.includes(path)) {
//         //             return
//         //         }
//         //         redirect('/manager/dailyReport')
//         //     }
//         //     if (baclklistStaff.includes(path)) {
//         //         return
//         //     }
//         //     redirect('/staff/register')
//         // }
//         // if (query.role === 'MANAGER') {
//         //     redirect('/manager/register')
//         // }
//         redirect('/login')
//     }
// }
