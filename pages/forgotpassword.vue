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
            <div class="box" style="margin-top: 10px; color: red">
              <div style="margin-bottom: 10px">
                <span style="font-weight: bold; font-size: 20px; color: #0000cd"
                  >LẤY LẠI MẬT KHẨU ĐĂNG NHẬP</span
                >
              </div>
              <br />
              <form>
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input"
                      type="email"
                      placeholder="Nhập Email đã đăng ký tài khoản"
                      v-model="formReset.email"
                    />
                    <span class="icon is-small is-left">
                      <i style="" class="fas fa-envelope-open-text"></i>
                    </span>
                  </div>
                </div>
                <div class="field" style="padding-top: 10px">
                  <div class="control has-icons-left">
                    <input
                      v-model="formReset.masobhxh"
                      class="input"
                      type="text"
                      placeholder="Nhập Mã số Bhxh đã đăng ký tài khoản"
                    />
                    <span class="icon is-small is-left">
                      <i style="" class="fab fa-adn"></i>
                    </span>
                  </div>
                </div>
                <div class="field" style="padding-top: 10px">
                  <div class="control has-icons-left">
                    <input
                      v-model="formReset.cccd"
                      class="input"
                      type="text"
                      placeholder="Nhập số CCCD đã đăng ký tài khoản"
                    />
                    <span class="icon is-small is-left">
                      <i style="" class="far fa-address-card"></i>
                    </span>
                  </div>
                </div>
                <br />
                <hr class="navbar-divider" />
                <div class="field" style="padding-top: 10px">
                  <button
                    @click.prevent="resetPass"
                    class="button is-block is-success is-fullwidth"
                  >
                    Lấy lại mật khẩu
                  </button>
                </div>
                <div class="field" style="padding-top: 10px">
                  <button class="button is-block is-info is-fullwidth">
                    <a href="/login">Trở về trang Đăng nhập</a>
                  </button>
                </div>
              </form>
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

          <!-- Biểu tượng loading -->
          <div v-if="isLoading" class="loading-overlay">
            <!-- Biểu tượng loading -->
            <div class="loading-spinner"></div>
            <span>waitting some minute ...</span>
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
      isLoading: false,
      formReset: {
        email: "",
        masobhxh: "",
        cccd: "",
      },
    };
  },

  methods: {
    async resetPass() {
      try {
        const response = await this.$axios.post(
          `/api/auth/callresetpass`,
          this.formReset
        );
        this.isLoading = true;
        // console.log(response);
        if (response.status === 200) {
          this.isLoading = false;
          Swal.fire({
            title: "Reset thành công mật khẩu",
            text: `Đã gửi mật khẩu mới về email ${this.formReset.email}, hãy check mail để lấy mật khẩu đăng nhập hệ thống`,
          });
        }
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 404) {
          this.isLoading = false;
          Swal.fire({
            title: error.response.data.message,
            icon: "error",
          });
        }

        if (error.response.status === 400) {
          this.isLoading = false;
          Swal.fire({
            title: error.response.data.message,
            icon: "error",
          });
        }
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  /* Mờ nền */
  z-index: 9999;
  /* Đặt vị trí cao hơn */
}

/* CSS của biểu tượng loading */
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  /* Màu đường viền của spinner */
  border-top: 4px solid red;
  /* Màu của đường viền phía trên */
  border-radius: 50%;
  /* Hình dạng của spinner */
  width: 30px;
  /* Chiều rộng của spinner */
  height: 30px;
  /* Chiều cao của spinner */
  animation: spin 1s linear infinite;
  /* Animation cho spinner */
  position: absolute;
  /* Đặt vị trí tuyệt đối */
  top: 50%;
  /* Đặt vị trí ở giữa theo chiều dọc */
  left: 50%;
  /* Đặt vị trí ở giữa theo chiều ngang */
  transform: translate(-50%, -50%);
  /* Dịch chuyển spinner về trung tâm */
}
</style>
