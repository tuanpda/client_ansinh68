<template>
  <nav
    class="navbar is-transparent is-info"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item">
          <img src="@/assets/logos/evss.svg" />
        </nuxt-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          @click="toggleMenu"
        >
          <div>
            <img
              style="color: #f14668"
              src="@/assets/images/buger.png"
              alt=""
            />
          </div>
        </a>
      </div>

      <div
        class="navbar-menu"
        :class="{ 'is-active': isMenuOpen }"
        id="navbarMenu"
      >
        <div class="navbar-start">
          <!-- Danh mục -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a
              class="navbar-link"
              @click="toggleDropdown_danhmuc"
              style="
                color: hsl(0deg, 0%, 100%);
                font-weight: bold;
                font-size: large;
              "
            >
              <span class="icon is-small is-left">
                <i class="fas fa-layer-group"></i>
              </span>
              &ensp; Danh mục
            </a>

            <div
              @click="toggleDropdown_danhmuc"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_danhmuc"
            >
              <nuxt-link to="/danhmuc/city/" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fa fa-globe"></i>
                </span>
                &ensp; Tỉnh / Thành phố
              </nuxt-link>
              <nuxt-link to="/danhmuc/province/" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fa fa-h-square"></i>
                </span>
                &ensp; Quận / Huyện
              </nuxt-link>
              <nuxt-link to="/danhmuc/xaphuong/" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fa fa-institution"></i>
                </span>
                &ensp; Xã / phường
              </nuxt-link>
              <hr class="navbar-divider" />
              <nuxt-link to="/danhmuc/baohiemxahoi" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fa fa-building"></i>
                </span>
                &ensp; Bảo hiểm xã hội
              </nuxt-link>
            </div>
          </div>

          <!-- Kê khai -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a
              class="navbar-link"
              @click="toggleDropdown_danhmuc"
              style="
                color: hsl(0deg, 0%, 100%);
                font-weight: bold;
                font-size: large;
              "
            >
              <span class="icon is-small is-left">
                <i class="fas fa-broom"></i>
              </span>
              &ensp; Kê khai
            </a>
            <div
              @click="toggleDropdown_danhmuc"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_danhmuc"
            >
              <!-- <nuxt-link
                to="/nhanviendailythu/danhsachkekhai"
                class="navbar-item"
              >
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="far fa-file-pdf"></i>
                </span>
                &ensp; Lịch sử kê khai
              </nuxt-link> -->
              <!-- <nuxt-link
                to="/nhanviendailythu/tracuuhosokekhai"
                class="navbar-item"
              >
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="far fa-calendar-alt"></i>
                </span>
                &ensp; Tra cứu Hồ sơ kê khai
              </nuxt-link> -->
              <!-- <nuxt-link to="/nhanviendailythu/timkiemhoso" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="far fa-calendar-alt"></i>
                </span>
                &ensp; Tra cứu Hồ sơ kê khai (tìm kiếm)
              </nuxt-link> -->
              <nuxt-link to="/nhanviendailythu/taokekhai" class="navbar-item">
                <span style="color: #0d6efd" class="icon is-small is-left">
                  <i class="fas fa-file-signature"></i>
                </span>
                &ensp; Tạo kê khai
              </nuxt-link>
              <nuxt-link to="/nhanviendailythu/hogiadinh" class="navbar-item">
                <span style="color: #6610f2" class="icon is-small is-left">
                  <i class="fas fa-id-card-alt"></i>
                </span>
                &ensp; Tìm kiếm thông tin HGĐ
              </nuxt-link>
              <nuxt-link
                to="/nhanviendailythu/tracuuhanthe"
                class="navbar-item"
              >
                <span style="color: #ffc107" class="icon is-small is-left">
                  <i class="fas fa-server"></i>
                </span>
                &ensp; Tra cứu hạn thẻ
              </nuxt-link>
            </div>
          </div>

          <!-- xử lý hồ sơ -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a
              class="navbar-link"
              @click="toggleDropdown_danhmuc"
              style="
                color: hsl(0deg, 0%, 100%);
                font-weight: bold;
                font-size: large;
              "
            >
              <span class="icon is-small is-left">
                <i class="fas fa-paperclip"></i>
              </span>
              &ensp; Báo cáo
            </a>
            <div
              @click="toggleDropdown_danhmuc"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_danhmuc"
            >
              <nuxt-link to="/nhanviendailythu/timkiemhoso" class="navbar-item">
                <span style="color: #198754" class="icon is-small is-left">
                  <i class="far fa-edit"></i>
                </span>
                &ensp; Phê duyệt hồ sơ
              </nuxt-link>
              <nuxt-link
                to="/nhanviendailythu/xuatfiledayivan"
                class="navbar-item"
              >
                <span style="color: #fd7e14" class="icon is-small is-left">
                  <i class="fas fa-cloud-download-alt"></i>
                </span>
                &ensp; Xuất File đẩy Ivan
              </nuxt-link>
              <nuxt-link
                to="/nhanviendailythu/quanlybienlai"
                class="navbar-item"
              >
                <span style="color: #dc3545" class="icon is-small is-left">
                  <i class="fab fa-cc-mastercard"></i>
                </span>
                &ensp; Quản lý Biên lai điện tử
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div v-if="user" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" @click="toggleDropdown_user"
              ><img
                :src="user.avatar"
                alt=""
                width="40"
                height="80"
                style="border-radius: 50%; border: 2px solid #ffd863"
              />
              &ensp; Xin chào, {{ user.username }}!</a
            >
            <div
              @click="toggleDropdown_user"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_user"
            >
              <a @click="isActive = true" class="navbar-item">
                <span class="icon is-small is-left" style="color: #f96854">
                  <i class="fas fa-address-card"></i>
                </span>
                &ensp; Hồ sơ cá nhân
              </a>
              <nuxt-link to="#" class="navbar-item">
                <span class="icon is-small is-left" style="color: #f96854">
                  <i class="fas fa-book"></i>
                </span>
                &ensp; Trợ giúp
              </nuxt-link>
              <hr class="navbar-divider" />
              <template v-if="user && user.role === 1">
                <nuxt-link to="/admin/" class="navbar-item">
                  <span class="icon is-small is-left" style="color: #ca1f26">
                    <i class="fab fa-buysellads"></i>
                  </span>
                  &ensp; Quản trị viên
                </nuxt-link>
              </template>
              <a @click="logout()" class="navbar-item">
                <span class="icon is-small is-left" style="color: #f96854">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                &ensp; Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal info user-->
      <div class="">
        <div :class="{ 'is-active': isActive }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card-predata">
            <section class="modal-card-body box">
              <div v-if="user">
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Tên tài khoản</label>
                      <div class="control">
                        <input
                          v-model="user.username"
                          class="input is-small"
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Họ tên</label>
                      <div class="control">
                        <input
                          v-model="user.name"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control">
                        <input
                          v-model="user.email"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Số điện thoại</label>
                      <div class="control">
                        <input
                          v-model="user.sodienthoai"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Mật khẩu</label>
                      <div class="control">
                        <input
                          v-model="changePassword.oldPassword"
                          class="input is-small"
                          type="text"
                          placeholder="Mật khẩu hiện tại"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <input
                          v-model="changePassword.newPassword"
                          class="input is-small"
                          type="text"
                          placeholder="Mật khẩu mới"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <input
                          v-model="changePassword.re_newPassword"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập lại mật khẩu mới"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Ảnh đại diện</label>
                      <div class="control" style="text-align: center">
                        <div id="preview1" class="box">
                          <figure class="image is-128x128">
                            <img class="is-rounded" :src="user.avatar" />
                          </figure>
                        </div>
                      </div>
                    </div>

                    <div class="field">
                      <div class="file is-small has-name is-info">
                        <label class="file-label">
                          <input
                            ref="fileInput"
                            @change="onFileChange"
                            class="file-input"
                            type="file"
                            name="resume"
                          />
                          <span class="file-cta">
                            <span class="file-icon">
                              <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                              Sửa lại ảnh đại diện
                            </span>
                          </span>
                          <span class="file-name">
                            {{ fileName }}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div class="field">
                      <div v-if="url" class="column">
                        <div id="preview1">
                          <img :src="url" />
                        </div>
                        <span style="color: red" class="icon is-small is-left">
                          <i @click="remove" class="far fa-trash-alt"
                            ><a>Xóa ảnh</a></i
                          >
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <button
                      @click="updateUser"
                      class="button is-small is-success is-fullwidth"
                    >
                      Cập nhật
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive = false"
                      class="button is-small is-danger is-fullwidth"
                    >
                      Thoát
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen_danhmuc: false,
      isDropdownOpen_user: false,
      activeMenu: "", // Thêm thuộc tính activeMenu để lưu trạng thái menu đang được sử dụng

      isActive: false,

      fileName: "",
      selectedFile: null,
      url: "",

      changePassword: {
        oldPassword: "",
        newPassword: "",
        re_newPassword: "",
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },
  },

  mounted() {
    // console.log(this.user.user);
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    toggleDropdown_danhmuc() {
      this.isDropdownOpen_danhmuc = !this.isDropdownOpen_danhmuc;
    },

    toggleDropdown_user() {
      this.isDropdownOpen_user = !this.isDropdownOpen_user;
    },

    onFileChange(e) {
      this.fileName = e.target.files[0];
      this.url = URL.createObjectURL(this.fileName);
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
    },

    /* Hủy file đính kèm */
    remove() {
      //console.log("removed");
      this.selectedFile = "";
      this.fileName = "";
      this.url = null;
      this.$refs.fileInput.type = "text";
      this.$refs.fileInput.type = "file";
    },

    async logout() {
      try {
        await this.$axios.$post("/api/auth/logout");

        // ✅ Cập nhật store: xóa user trong module 'users'
        this.$store.commit("setUser", {});

        // ✅ Điều hướng về trang login
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },

    async updateUser() {
      // console.log(this.user);
      if (this.changePassword.oldPassword !== "") {
        if (this.changePassword.newPassword === "") {
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
            title: `Bạn đã gõ mật khẩu hiện tại? Nếu muốn đổi mật khẩu phải gõ mật khẩu mới. Hoặc xóa mật khẩu cũ`,
          });
        } else {
          if (
            this.changePassword.newPassword !==
            this.changePassword.re_newPassword
          ) {
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
              title: `Mật khẩu mới không khớp nhau`,
            });
          } else {
            try {
              const current = new Date();
              let data = new FormData();
              data.append("_id", this.user._id);
              data.append("email", this.user.email);
              data.append("name", this.user.name);
              data.append("password", this.changePassword.oldPassword);
              data.append("newPassword", this.changePassword.newPassword);
              data.append("sodienthoai", this.user.sodienthoai);
              if (this.selectedFile) {
                data.append(
                  "avatar",
                  this.selectedFile,
                  this.selectedFile.name
                );
                data.append("avatarOld", this.user.avatar);
              } else {
                data.append("avatar", this.user.avatar);
              }
              data.append("updatedAt", current);
              data.append("updatedBy", this.user.username);

              const res = await this.$axios.post(
                `/api/users/user/fix-info-pass`,
                data
              );
              // console.log(res.data.success);
              if (res.data.success == 5) {
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
                  title: `Mật khẩu hiện tại không đúng`,
                });
              } else {
                Swal.fire({
                  icon: "success",
                  title: "Đã cập nhật thông tin",
                  text: "Hệ thống sẽ đăng xuất bạn. Bấm OK để tiếp tục.",
                  confirmButtonText: "OK",
                }).then(() => {
                  this.logout();
                });
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      } else {
        try {
          const current = new Date();
          let data = new FormData();
          data.append("_id", this.user._id);
          data.append("email", this.user.email);
          data.append("name", this.user.name);
          data.append("sodienthoai", this.user.sodienthoai);
          if (this.selectedFile) {
            data.append("avatar", this.selectedFile, this.selectedFile.name);
            data.append("avatarOld", this.user.avatar);
          } else {
            data.append("avatar", this.user.avatar);
          }
          data.append("updatedAt", current);
          data.append("updatedBy", this.user.username);

          const res = await this.$axios.post(`/api/users/user/fix-info`, data);
          // console.log(res);
          if (res.status == 200) {
            Swal.fire({
              icon: "success",
              title: "Đã cập nhật thông tin",
              text: "Hệ thống sẽ đăng xuất bạn. Bấm OK để tiếp tục.",
              confirmButtonText: "OK",
            }).then(() => {
              this.logout();
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="css" scoped>
.brand-title {
  font-size: 35px;
  font-weight: bold;
}

.navbar-brand {
  padding-right: 30px;
}

.avatar {
  margin-right: 5px;
}

.preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview img {
  width: 50px;
  height: 50px;
}

#preview1 {
  display: flex;
  justify-content: left;
  align-items: left;
}

#preview1 img {
  max-width: 100px;
  max-height: 100px;
  padding: 5px;
}

.modal-card {
  width: 720px;
  height: 600px;
}

.navbar {
  min-height: 5rem !important;
}

.nested.dropdown {
  &:hover > .dropdown-menu {
    display: block;
  }

  .dropdown-menu {
    top: -15px;
    margin-left: 100%;
  }

  .dropdown-trigger {
    button {
      padding: 0px 0px;
      border: 0px;
      font-size: 14px;
      font-weight: 400;
      height: 2em;
    }
  }

  /* Định nghĩa màu nền cho navbar */
  .is-custom-color {
    background-color: red; /* Thay #your-color bằng mã màu bạn muốn sử dụng */
  }

  .logo-text {
    /* kích thước hộp logo */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 200px; /* tương đương width ảnh cũ */
    height: 100px; /* tương đương height ảnh cũ */

    /* kiểu chữ hộp, in hoa, đậm */
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 2rem; /* điều chỉnh cho vừa mắt */
    font-weight: 800;
    letter-spacing: 1px;

    /* màu chữ và nền */
    color: #ffffff; /* chữ trắng */
    background: #1e3a8a; /* nền xanh đậm (tailwind blue-800), đổi tùy ý */

    /* viền bo nhẹ & bóng đổ để “nhìn như hộp” */
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    text-decoration: none; /* bỏ gạch chân link */
  }
}
</style>
