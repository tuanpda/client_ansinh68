import cookieparser from "cookieparser";

export default async function ({ store, redirect, req, app }) {
  // console.log(req);
  // console.log(req.headers.cookie);
  // console.log('Middleware chạy ở:', process.server ? 'Server' : 'Client');
  if (process.server) {
    const cookie = req && req.headers && req.headers.cookie;

    if (!cookie) {
      console.log("Không có cookie");
      redirect("/login"); // nếu muốn chuyển hướng
    } else {
      // console.log('Có cookie:', cookie);
      console.log("Có cookie:");
      try {
        const res = await app.$axios.$get(
          "http://localhost:4209/api/users/auth/user"
        );
        // console.log('API trả về:', res.user);
        store.commit("setUser", res.user);

        const user = store.state.user;
        // console.log(user.role);

        if (user.role === 9) {
          // console.log('check');
          return redirect("/tracuubienlai");
        } else {
          // console.log('check index');
          return redirect("/");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    }
  }
  // if (req && req.headers) {
  //   console.log('Cookies nhận được:', req.headers.cookie);
  //   console.log('fuck');

  //   try {
  //     const res = await app.$axios.$get("http://localhost:1552/api/users/auth/user");
  //     // console.log('API trả về:', res);
  //     await store.dispatch("fetchUsersLogin");
  //     const user = store.state.user.user;
  //     console.log(user);

  //     if (user.role === 9) {
  //         console.log('check');
  //         return redirect("/tracuubienlai");
  //       } else {
  //         return redirect("/");
  //       }

  //   } catch (error) {
  //     console.error('Lỗi khi gọi API:', error);
  //   }

  // }
  // if (req && req.headers && req.headers.cookie) {
  //   console.log(req.headers.cookie);
  //   console.log('fuck');
  //         try {
  //       const res = await app.$axios.$get("/api/users/auth/user");
  //       await store.dispatch("fetchUsersLogin");
  //     } catch (e) {
  //       return redirect("/login");
  //     }
  //   console.log(store.state.user.user);
  // } else {
  //   console.log('req.headers.cookie không tồn tại');
  //   return redirect("/login");
  // }

  //   const parsed = cookieparser.parse(req.headers.cookie);
  // const token = parsed.token;
  // console.log(token);
  // console.log('----------');
  // console.log(store.state.user.user);

  // if (req && req.headers.cookie) {
  //   const parsed = cookieparser.parse(req.headers.cookie);
  //   const token = parsed.token;

  //   console.log(token);

  //   // Nếu user chưa có trong store thì fetch lại từ API
  //   if (!store.state.user.user || !store.state.user.user._id) {
  //     try {
  //       const res = await app.$axios.$get("/api/users/auth/user");
  //       await store.dispatch("fetchUsersLogin");
  //     } catch (e) {
  //       return redirect("/login");
  //     }
  //   }

  //   const user = store.state.user.user;

  //   console.log(user);

  //   if (!token) {
  //     return redirect("/login");
  //   } else {
  //     if (user.role === 9) {
  //       console.log('hhjk');

  //       return redirect("/tracuubienlai");
  //     } else {
  //       return redirect("/");
  //     }
  //   }
  // }
}

// export default async function ({ store, redirect, req }) {
//   if (process.server && req && req.headers.cookie) {
//     const parsed = cookieparser.parse(req.headers.cookie);
//     const token = parsed.token;

//     // console.log(token);

//     if (!token) {
//       // console.log("❌ Không có token, chuyển về login");
//       return redirect("/login");
//     } else {
//       // console.log("✅ Có token, cho phép truy cập");
//       return redirect("/");
//     }
//   }
// }
