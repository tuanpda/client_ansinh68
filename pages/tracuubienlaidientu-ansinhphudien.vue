<template>
  <div>
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div
          v-if="viewXacnhan == true && data"
          class="container has-text-centered"
        >
          <!-- <h2 class="title is-5">Số biên lai: {{ data.sobienlai }}</h2> -->
          <iframe :src="pdfSrc" class="pdf-frame"></iframe>
        </div>
        <div v-else class="container has-text-centered">
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
                <span style="font-weight: bold; font-size: 12px; color: #dc3545"
                  >HỆ THỐNG TRA CỨU BIÊN LAI ĐIỆN TỬ</span
                >
              </div>
              <br />
              <div>
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input"
                      type="username"
                      placeholder="Nhập vào căn cước công dân"
                      v-model="cccd"
                      autofocus=""
                    />
                    <span class="icon is-small is-left">
                      <i class="masobhxh"></i>
                    </span>
                    <span class="icon is-medium is-left">
                      <i class="far fa-address-card"></i>
                    </span>
                  </div>
                </div>
                <div class="field" style="padding-top: 10px">
                  <div class="control has-icons-left">
                    <input
                      v-model="masobhxh"
                      class="input"
                      type="text"
                      placeholder="Nhập vào Mã số Bảo hiểm xã hội"
                      autocomplete="current-password"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-barcode"></i>
                    </span>
                  </div>
                </div>
                <div class="field" style="padding-top: 10px">
                  <div class="control has-icons-left">
                    <input
                      v-model="sobienlai"
                      class="input"
                      type="text"
                      placeholder="Nhập vào Số biên lai"
                    />
                    <span class="icon is-small is-left">
                      <i class="far fa-file-alt"></i>
                    </span>
                  </div>
                </div>
                <div class="field" style="padding-top: 10px">
                  <button
                    @click.prevent="viewBienlai"
                    class="button is-block is-success is-fullwidth"
                    type="button"
                  >
                    Xem Biên lai
                  </button>
                </div>
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

  data() {
    return {
      cccd: "",
      masobhxh: "",
      sobienlai: "",
      viewXacnhan: false,
      data: {},
      pdfSrc: "", // đường dẫn file PDF
    };
  },

  methods: {
    async viewBienlai() {
      const res = await this.$axios.post("/api/auth/view-bienlai-people", {
        cccd: this.cccd,
        masobhxh: this.masobhxh,
        sobienlai: this.sobienlai,
      });

      // console.log(res.data);
      if (res.data.hs) {
        this.data = res.data.hs;
        this.viewXacnhan = true;

        // tạo tên file PDF từ sobienlai và hoten
        const sobienlai = res.data.hs.sobienlai;
        const hoten = res.data.hs.hoten;

        // encode để tránh lỗi Unicode trong URL
        const fileName = `${sobienlai}_${hoten}`;
        let pdfUrl = `http://27.73.37.94:4042/bienlaidientu/${fileName}.pdf`;
        // console.log(this.pdfSrc);

        // this.pdfSrc = `http://27.73.37.94:4042/bienlaidientu/0000003_Th%C3%A1i%20B%C3%A1%20Long.pdf`;

        if (window.innerWidth < 768) {
          // Nếu là mobile, mở tab mới
          window.open(pdfUrl, "_blank");
        } else {
          // Nếu không phải mobile, hiển thị trong iframe
          this.viewXacnhan = true;
          this.pdfSrc = pdfUrl;
        }
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Không tìm thấy biên lai khớp thông tin`,
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

.pdf-frame {
  width: 100%;
  height: 700px;
  border: none;
}

@media (max-width: 768px) {
  .pdf-frame {
    height: 400px; /* Hoặc bất kỳ chiều cao phù hợp */
  }
}
</style>
