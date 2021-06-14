/* eslint-disable */
export default function ({ req, context, app, $auth, store, route, redirect }) {

  // console.log(req.headers.cookie);
  // console.log(typeof req);
  // console.log("::::");
  //---------------------------------------
  // if(typeof req !== "undefined") {
  //   // console.log(req.headers.cookie);
  //   // console.log(typeof req.headers.cookie);
  //   const array = req.headers.cookie.split(" ");
  //   const cookie = array[1].split("=");
  //   console.log(cookie[1]);
  //   // console.log($auth.$storage.getCookie("auth._token.local"));
  // } else {
  //   console.log("This is undefiined tho");
  // }
  //---------------------------------------
  // console.log($auth.$storage.getCookie("auth._token.local"));
  // console.log($auth.$storage.getUniversal("auth._token.local"));
  // const user = await $auth.$storage.getCookie("auth._token.local");
  // console.log(user);
  //---------------------------------------
  // console.log(store.state.auth);
  // if (route.path !== "/sign-in") {
  //   const redirectUrl = `/sign-in?n=${route.path}`;
  //   if (!store.state.auth.loggedIn) {
  //     return redirect(redirectUrl);
  //   }
  // }
  // else {
  //   return redirect(route.path);
  // }
  //---------------------------------------
  // if (!store.state.auth.loggedIn && route.path !== "/sign-in") {
  //   return redirect(`/sign-in?n=${route.path}`);
  // }
  // return redirect(route.path);
  // console.log({"path": route.path}, {"from store ":store.state.auth.loggedIn}, {"from auth ":$auth.loggedIn}, {"from auth ":$auth.lo});
}
// export default function (req) {
//   console.log(req.headers);
// }
