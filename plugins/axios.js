/* eslint-disable */
// export default function(context) {
//   const { $axios, app } = context;
//   $axios.interceptors.response.use(
//     function(response) {
//       return response;
//     },
//     function(error) {
//       const code = parseInt(error.response && error.response.status);
//       if ([401, 403].includes(code)) {
//         // app.$auth.fetchUser();
//         // app.$auth.logout();
//         window.location.reload();
//       }
//       return Promise.reject(error);
//     }
//   );
// }
