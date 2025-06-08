<template>
  <div class="custom-background column">
    <div style="padding: 2rem">
      <div
        class="container box is-flex is-align-items-center is-justify-content-space-between"
      >
        <!-- User Info -->
        <div v-if="user" class="is-flex is-align-items-center">
          <!-- Avatar -->
          <figure class="image is-48x48 mr-3">
            <img
              class="is-rounded"
              :src="
                user.avatar || `https://i.pravatar.cc/48?u=${user.username}`
              "
              alt="Avatar"
            />
          </figure>

          <!-- Name + Email -->
          <div>
            <p class="has-text-weight-semibold">{{ user.name }}</p>
            <p class="is-size-7 has-text-grey">{{ user.email }}</p>
            <p class="is-size-7 has-text-grey">{{ user.cccd }}</p>
          </div>
        </div>

        <!-- Logout Button -->
        <button class="button is-small is-danger" @click="logout">
          <span class="icon">
            <i class="fas fa-sign-out-alt"></i>
          </span>
          <span>Logout</span>
        </button>
      </div>

      <div class="container">
        <!-- Box chứa input lọc -->
        <div class="box">
          <div class="columns">
            <div class="column">
              <label class="label">Nhóm tham gia</label>
              <div class="select is-small is-fullwidth">
                <select @change="handleChange">
                  <option selected disabled>- Chọn loại hình -</option>
                  <option value="">Không chọn</option>
                  <option value="BI">Bảo hiểm y tế</option>
                  <option value="AR">Bảo hiểm y tế - HGĐ</option>
                  <option value="IS">Bảo hiểm xã hội tự nguyện</option>
                </select>
              </div>
            </div>
            <div class="column">
              <label class="label">Ngày biên lai (từ)</label
              ><input
                v-model="ngaybienlaitu"
                type="date"
                class="input is-small"
              />
            </div>
            <div class="column">
              <label class="label">Ngày biên lai (đến)</label
              ><input
                v-model="ngaybienlaiden"
                type="date"
                class="input is-small"
              />
            </div>
            <div class="column">
              <label class="label">Mã số BHXH</label
              ><input
                v-model="masobhxh"
                type="text"
                class="input is-small"
                placeholder="Số hồ sơ đã nạp"
              />
            </div>
            <div class="column">
              <label class="label">Họ tên</label
              ><input
                v-model="hoten"
                type="text"
                class="input is-small"
                placeholder="Số hồ sơ đã nạp"
              />
            </div>
          </div>
          <hr class="navbar-divider" />
          <footer class="has-text-right">
            <button @click="viewBienlai" class="button is-success is-small">
              <span class="icon"><i class="fas fa-search"></i></span>
              <span>Tra cứu Biên lai</span>
            </button>
          </footer>
        </div>

        <!-- Box chứa bảng dữ liệu -->
        <div class="box">
          <div class="table_wrapper">
            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <thead style="font-weight: bold">
                <tr style="font-size: small; background-color: #faf0e6">
                  <td style="text-align: center; width: 3%">STT</td>
                  <td style="text-align: center">_ID</td>
                  <td style="text-align: center">Số biên lai</td>
                  <td style="text-align: center">Xem</td>
                  <td style="text-align: center">Ngày biên lai</td>
                  <td style="text-align: center">Họ tên</td>
                  <td style="text-align: center">Mã số BHXH</td>
                  <td style="text-align: center">CCCD</td>
                  <td style="text-align: center">Ngày sinh</td>
                  <td style="text-align: center">Giới tính</td>
                  <td style="text-align: center">Loại hình</td>
                  <td style="text-align: center">Số tiền</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in dataBienlai"
                  :key="index"
                  style="font-size: small"
                >
                  <td style="text-align: center; vertical-align: middle">
                    {{ index + 1 }}
                  </td>
                  <td style="text-align: center">
                    {{ item._id }}
                  </td>
                  <td style="text-align: center; font-weight: 500">
                    {{ item.sobienlai }}
                  </td>
                  <td style="text-align: center">
                    <a @click="inBienLaiDientu(item)">
                      <span
                        style="color: #ff69b4"
                        class="icon is-small is-left"
                      >
                        <i class="fas fa-print"></i>
                      </span>
                    </a>
                  </td>

                  <td style="text-align: center; font-weight: 500">
                    {{ item.ngaybienlai }}
                  </td>
                  <td style="">
                    {{ item.hoten }}
                  </td>
                  <td style="text-align: center">
                    {{ item.masobhxh }}
                  </td>
                  <td style="text-align: center">
                    {{ item.cccd }}
                  </td>
                  <td style="text-align: center">
                    {{ item.ngaysinh }}
                  </td>
                  <td style="text-align: center">
                    {{ item.gioitinh }}
                  </td>
                  <td style="text-align: center">
                    {{ item.loaihinh }}
                  </td>
                  <td style="text-align: center; font-weight: 500; color: red">
                    {{ item.sotien | formatNumber }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Phân trang -->
          <div v-if="dataBienlai.length > 0" style="margin-top: 10px">
            <nav
              class="pagination is-centered is-rounded"
              role="navigation"
              aria-label="pagination"
            >
              <!-- Nút trang đầu tiên -->
              <button
                :disabled="currentPage === 1"
                @click="goToPage(1)"
                class="pagination-previous button is-info is-light is-small"
              >
                Đầu tiên
              </button>

              <!-- Nút Previous -->
              <button
                :disabled="currentPage === 1"
                @click="goToPreviousPage"
                class="pagination-previous button is-info is-light is-small"
              >
                Trang trước
              </button>

              <!-- Nút Next -->
              <button
                :disabled="currentPage === totalPages"
                @click="goToNextPage"
                class="pagination-next button is-danger is-light is-small"
              >
                Trang tiếp
              </button>

              <!-- Nút trang cuối cùng -->
              <button
                :disabled="currentPage === totalPages"
                @click="goToPage(totalPages)"
                class="pagination-next button is-danger is-light is-small"
              >
                Cuối cùng
              </button>

              <ul class="pagination-list">
                <!-- Hiển thị các nút phân trang -->
                <li v-for="page in visiblePages" :key="page">
                  <button
                    :class="[
                      'pagination-link',
                      { 'is-current': page === currentPage },
                      'is-small',
                    ]"
                    @click="goToPage(page)"
                  >
                    {{ page }}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  layout: "tracuubienlai-bhxh",

  data() {
    return {
      dataBienlai: [],
      pdfSrc: "", // đường dẫn file PDF

      // pagi
      currentPage: 1,
      totalPages: 1,

      maloaihinh: "",
      ngaybienlaitu: "",
      ngaybienlaiden: "",
      masobhxh: "",
      hoten: "",
    };
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },

    visiblePages() {
      const pages = [];
      const maxVisiblePages = 5; // Số lượng trang hiển thị tối đa

      // Xác định phạm vi của các trang hiển thị
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    },
  },

  methods: {
    // pagi
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.viewBienlai(this.currentPage - 1);
      }
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.viewBienlai(this.currentPage + 1);
      }
    },

    goToPage(page) {
      this.viewBienlai(page); // Di chuyển đến trang được chỉ định
    },

    async viewBienlai() {
      try {
        const res = await this.$axios.get(
          "/api/kekhai/search-bienlai-dientu-bhxh",
          {
            params: {
              loaihinh: this.maloaihinh,
              ngaybienlaitu: this.ngaybienlaitu,
              ngaybienlaiden: this.ngaybienlaiden,
              masobhxh: this.masobhxh,
              hoten: this.hoten,
            },
          }
        );
        // console.log(res);
        if (res.status == 200 && res.data.hs.length > 0) {
          this.dataBienlai = res.data.hs;
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
            title: `Không tìm thấy dữ liệu biên lai`,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      // console.log("logout");

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

    async handleChange(event) {
      const selectedValue = event.target.value; // Lấy giá trị của option được chọn
      // console.log("Selected value:", selectedValue);
      this.maloaihinh = selectedValue;
      // console.log(this.maloaihinh);
    },

    async inBienLaiDientu(data) {
      const res = await this.$axios.post("/api/auth/view-bienlai-people", {
        cccd: data.cccd,
        masobhxh: data.masobhxh,
        sobienlai: data.sobienlai,
      });

      // console.log(res.data);
      if (res.data.hs) {
        this.data = res.data.hs;
        this.viewXacnhan = true;

        // tạo tên file PDF từ sobienlai và hoten
        const sobienlai = res.data.hs.sobienlai;
        const hoten = res.data.hs.hoten;

        // encode để tránh lỗi Unicode trong URL
        const fileName = `${sobienlai}_${hoten}`.replace(/\s+/g, "%20");
        this.pdfSrc = `http://27.73.37.94:4042/bienlaidientu/${fileName}.pdf`;
        // console.log(this.pdfSrc);

        // ✅ Mở ra tab mới
        window.open(this.pdfSrc, "_blank");
      }
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";
@import "@/assets/customCss/footerTable.css";

.pagination {
  margin-top: 1em;
}

/* .custom-background {
  min-height: auto;
  background: #d3d3d3;
  background-image: url("../assets/images/login2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 3rem;
}

.box {
  margin-top: 2rem;
  border: 5px solid white;
} */

/* (giữ nguyên các phần khác như avatar, table_wrapper, pdf-frame...) */
</style>
