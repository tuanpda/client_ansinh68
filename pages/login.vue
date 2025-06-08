<template>
  <div>
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <div class="centered-image">
              <img
                src="@/assets/logos/ansinhphudien-login-logo.png"
                alt="Your Image"
                width="150"
                height="150"
              />
            </div>
            <div class="box" style="margin-top: 10px">
              <div style="margin-bottom: 10px">
                <span style="font-weight: bold; font-size: 20px; color: #ffa07a"
                  >ĐĂNG NHẬP HỆ THỐNG</span
                >
              </div>
              <br />

              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="username"
                    placeholder="Tên đăng nhập"
                    v-model="username"
                    autofocus=""
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                  <span class="icon is-medium is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
              <div class="field" style="padding-top: 10px">
                <div
                  class="control has-icons-left has-icons-right"
                  style="position: relative"
                >
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    class="input"
                    placeholder="Mật khẩu"
                    autocomplete="current-password"
                  />
                  <!-- Icon khóa bên trái -->
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                  <!-- Icon con mắt bên phải -->
                  <span
                    class="icon is-small is-right"
                    @click="togglePassword"
                    style="cursor: pointer; z-index: 10; pointer-events: auto"
                  >
                    <i
                      :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    ></i>
                  </span>
                </div>
              </div>
              <div class="field" style="padding-top: 10px">
                <button
                  @click.prevent="signIn"
                  class="button is-block is-success is-fullwidth"
                >
                  Đăng nhập
                </button>
              </div>
              <div class="field" style="padding-top: 10px">
                <a href="/forgotpassword"
                  ><span class="forgotpas">Quên mật khẩu ?</span></a
                >
              </div>
            </div>
            <div class="centered-image">
              <img
                src="@/assets/images/logobhxh.png"
                alt="Your Image"
                width="100"
                height="40"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "LoginPage",
  layout: "none",
  auth: "guest",
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
    };
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async signIn() {
      try {
        // await this.$auth.loginWith("custom", {
        //   data: {
        //     username: this.username,
        //     password: this.password,
        //   },
        // });

        // this.$router.push("/");
        const res = await this.$axios.$post("/api/auth/access/login", {
          username: this.username,
          password: this.password,
        });
        // console.log(res);

        // lấy thông tin này đem vào để gọi me
        const item = await this.$axios.$get("/api/users/auth/user");
        // console.log(item.user);

        // Gọi commit vào module auth

        const comitLogin = await this.$store.dispatch(
          "fetchUsersLogin",
          item.user
        );

        // console.log(comitLogin);
        if (comitLogin.success == true && item.user.role === 9) {
          this.$router.push("/tracuubienlai");
        } else {
          this.$router.push("/");
        }
      } catch (error) {
        // Xử lý lỗi khi đăng nhập không thành công
        const errorResponse = error.response;
        const successCode = errorResponse ? errorResponse.data.success : null;

        let errorMessage = "Đăng nhập thất bại";
        if (successCode) {
          switch (successCode) {
            case 9:
              errorMessage = "Đăng nhập thất bại";
              break;
            case 4:
              errorMessage =
                "Tài khoản chưa được kích hoạt. Liên hệ quản trị hệ thống !!!";
              break;
            case 7:
              errorMessage = "Đăng nhập thất bại";
              break;
            default:
              errorMessage = "Lỗi xác thực";
              break;
          }
        }

        Swal.fire({
          title: errorMessage,
          icon: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.hero.is-success {
  background: #d3d3d3;
  background-image: url("../assets/images/login2.jpg");
  background-size: cover;
}

.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.box {
  margin-top: 5rem;
  /* background-color: transparent; */
  border: 5px solid white;
}

.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}

.avatar img {
  height: 128px;
  width: 128px;
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}

p.subtitle {
  padding-top: 1rem;
}

.centered-image {
  margin: 0 auto;
  display: block;
}

.forgotpas {
  color: #800000;
  font-weight: 600;
  font-size: 13px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  transition: color 0.3s; /* Thời gian chuyển tiếp khi thay đổi màu */
}

.forgotpas:hover {
  color: #ffcc00; /* Màu vàng khi di chuột */
}
</style>
