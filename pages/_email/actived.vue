<template>
  <!-- <div class="container" style="margin-top: 20px">

    </template>
    <template v-if="(isActive = true)">
      <span
        >Tài khoản của bạn đã được kích hoạt thành công. Dùng tên đăng nhập và
        mật khẩu đã được gửi về mail của bạn để đăng nhập hệ thống</span
      >
      <span
        >Bấm vào <a href="http://localhost:3000/login">đây</a> để đăng nhập hệ
        thống</span
      >
    </template>
  </div> -->
  <div class="container">
    <template v-if="isActive == false">
      <div>
        <h1>Đây là trang kích hoạt tài khoản</h1>
        <p>
          Bạn vui lòng bấm vào nút bên dưới để tiến hành kích hoạt tài khoản
        </p>
        <div style="margin-top: 20px">
          <button @click="activeAccount" class="button is-success">
            Bấm để kích hoạt tài khoản
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <h1>Chúc mừng!</h1>
        <p>Tài khoản của bạn đã được kích hoạt thành công.</p>
        <p>Bây giờ bạn có thể đăng nhập vào hệ thống.</p>
        <div style="margin-top: 20px">
          <nuxt-link to="/login"
            ><button class="button is-success">Đăng nhập</button></nuxt-link
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "ActivityPage",
  layout: "none", // có thể tạo layout cho riêng trang active
  auth: "guest",
  data() {
    return {
      user: {},
      isActive: false,
    };
  },

  mounted() {
    this.getdata();
  },

  methods: {
    async getdata() {
      try {
        this.user = {};
        //   console.log(this.$route.params.email);
        const res = await this.$axios.$get(
          `/api/auth/findemail?email=${this.$route.params.email}`
        );
        if (res.length <= 0) {
          this.$router.push("/404");
        } else {
          // thực hiện gán user
          this.user = res[0];
          // Kiểm tra thời gian kích hoạt

          const activationTime = new Date(this.user.createdAt); // Giả sử res.activationTime chứa thời gian kích hoạt
          // console.log(activationTime.toString());
          const currentTime = new Date();
          // console.log(currentTime.toString());
          const timeDiff = currentTime - activationTime; // Khoảng thời gian tính bằng millisecond
          // console.log(timeDiff.toString());

          const maxActivationTime = 5 * 60 * 1000; // 5 phút, đổi sang millisecond
          // console.log(maxActivationTime);
          if (timeDiff > maxActivationTime) {
            // Nếu thời gian kích hoạt đã vượt quá thời gian tối đa
            this.$router.push("/404");
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    async activeAccount() {
      const data = {
        email: this.user.email,
      };
      const res_active = await this.$axios.post(`/api/auth/active/user`, data);
      //   console.log(res_active.status);
      if (res_active.status === 200) {
        // to do something
        Swal.fire({
          title: "Kích hoạt thành công tài khoản",
          text: "Tài khoản của bạn đã được kích hoạt",
        });
        this.isActive = true;
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
