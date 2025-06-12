<template>
  <div class="column">
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #6f42c1" class="icon is-small is-left">
              <i class="fas fa-chalkboard-teacher"></i>
            </span>
            <span style="font-weight: bold; color: #6f42c1"
              >Tra cứu thông tin Hộ gia đình</span
            >
          </div>
        </div>
      </div>

      <div class="box">
        <div class="columns">
          <div class="column">
            <label class="label">Mã số BHXH</label
            ><input
              v-model="soBhxh"
              type="text"
              class="input is-small"
              placeholder="Nhập vào mã số BHXH cần tìm kiếm"
              @keyup.enter="searchHgd()"
            />
          </div>
          <div class="column">
            <label class="label">Căn cước công dân</label
            ><input
              v-model="SO_DDCN_CCCD_BCA"
              type="text"
              class="input is-small"
              placeholder="Nhập Căn cước công dân cần tìm kiếm"
              @keyup.enter="searchHgd()"
            />
          </div>
        </div>
        <div class="columns"></div>
        <hr class="navbar-divider" />
        <footer class="has-text-right">
          <button @click="searchHgd()" class="button is-success is-small">
            <span class="icon">
              <i class="fas fa-search"></i>
            </span>
            <span>Tìm kiếm</span>
          </button>
        </footer>
      </div>

      <div v-if="isFind == true && dulieuHscn">
        <div>
          <span>
            <strong style="color: #198754">Thông tin cá nhân</strong>
          </span>
        </div>
        <div style="margin-top: 5px">
          <div class="table_wrapper">
            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <thead style="font-weight: bold">
                <tr style="font-size: small; background-color: #faf0e6">
                  <td style="text-align: center; width: 3%">STT HO</td>
                  <td style="text-align: center">Họ tên</td>
                  <td style="text-align: center">Mã số BHXH</td>
                  <td style="text-align: center">Ngày sinh</td>
                  <td style="text-align: center">Giới tính</td>
                  <td style="text-align: center">Địa chỉ</td>
                  <td style="text-align: center">Mối quan hệ với chủ hộ</td>
                  <td style="text-align: center">Số CCCD</td>
                  <td style="text-align: center">Mã đối tượng</td>
                  <td style="text-align: center">Hạn thẻ</td>
                </tr>
              </thead>
              <tbody>
                <tr font-size="small">
                  <td style="text-align: center; font-size: small">
                    {{ dulieuHscn.stt_ho }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ dulieuHscn.hoTen }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ dulieuHscn.soBhxh }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ dulieuHscn.ngaySinh }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ dulieuHscn.gioiTinh }}
                  </td>
                  <td style="font-size: small">
                    {{ dulieuHscn.diaChi }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ dulieuHscn.quanHeChuHo }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ dulieuHscn.SO_DDCN_CCCD_BCA }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ dulieuHscn.maDoiTuongDangTg }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ dulieuHscn.hanThe }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        v-if="dulieuHgd.length > 0 && isFind == true && dulieuHscn"
        style="margin-top: 10px"
      >
        <div>
          <p><strong style="color: #0d6efd">Thông tin Hộ gia đình</strong></p>
          <p style="font-weight: 800; color: #dc3545; font-size: 15px">
            Mã hộ: {{ dulieuHscn.maHoGiaDinh }} | Chủ hộ: {{ dulieuHscn.chuHo }}
          </p>
        </div>

        <div style="margin-top: 5px">
          <div class="table_wrapper">
            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <thead style="font-weight: bold">
                <tr style="font-size: small; background-color: #cfe2ff">
                  <td style="text-align: center; width: 3%">STT HO</td>
                  <td>Họ tên</td>
                  <td style="text-align: center">Mã số BHXH</td>
                  <td style="text-align: center">Ngày sinh</td>
                  <td style="text-align: center">Giới tính</td>
                  <td style="text-align: center">Địa chỉ</td>
                  <td style="text-align: center">Mối quan hệ với chủ hộ</td>
                  <td style="text-align: center">Số CCCD</td>
                  <td style="text-align: center">Mã đối tượng</td>
                  <td style="text-align: center">Hạn thẻ</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  style="font-size: small"
                  v-for="(item, index) in dulieuHgd"
                  :key="index"
                >
                  <td style="text-align: center">{{ item.stt_ho }}</td>
                  <td>{{ item.hoTen }}</td>
                  <td style="text-align: center">{{ item.soBhxh }}</td>
                  <td style="text-align: center">{{ item.ngaySinh }}</td>
                  <td style="text-align: center">{{ item.gioiTinh }}</td>
                  <td style="text-align: center">{{ item.diaChi }}</td>
                  <td style="text-align: center">{{ item.quanHeChuHo }}</td>
                  <td style="text-align: center">
                    {{ item.SO_DDCN_CCCD_BCA }}
                  </td>
                  <td style="text-align: center">
                    {{ item.maDoiTuongDangTg }}
                  </td>
                  <td style="text-align: left">{{ item.hanThe }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Biểu tượng loading -->
    <div v-if="isLoading" class="loading-overlay">
      <!-- Biểu tượng loading -->
      <div class="loading-spinner"></div>
      <span>waitting some minute ...</span>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  components: {},

  data() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    return {
      isLoading: false,

      SO_DDCN_CCCD_BCA: "",
      soBhxh: "",
      dulieuHscn: {},
      dulieuHgd: [],
      isFind: false,

      mahogiadinh: "",
      tenchuho: "",
    };
  },

  mounted() {
    const user = this.user;

    this.dailyview = user.madaily;
    this.tochuc = user.matochuc;
    if (user.role == 2) {
      this.diemthu = "Tài khoản tổng hợp";
      // console.log(this.diemthu);
      // console.log(user.role);
    } else {
      this.diemthu = user.tendaily;
    }
    this.isRoleSent = user.res_sent;

    if (user.nvcongty == 0) {
      this.madaily = user.madaily;
      this.diemthu = user.tendaily;
      this.isDiemthu = true;
    }
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },
  },

  methods: {
    async searchHgd() {
      if (this.soBhxh === "" && this.SO_DDCN_CCCD_BCA === "") {
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
          title: `Bạn phải gõ ít nhất 1 thuộc tính trong từ khoá tìm kiếm`,
        });
        return;
      }

      try {
        this.isLoading = true;
        const res = await this.$axios.get(
          `/api/nguoihuong/tim-kiem-thong-tin-hgd?soBhxh=${this.soBhxh}&SO_DDCN_CCCD_BCA=${this.SO_DDCN_CCCD_BCA}`
        );
        // console.log(res);
        if (res.data.canhan !== null) {
          this.isFind = true;
          this.dulieuHscn = res.data.canhan;
          this.dulieuHgd = res.data.thongtinHgd;
          this.isLoading = false;
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
            title: `Không tìm thấy thông tin Hộ gia đình nào với từ khoá tìm kiếm này`,
          });
          this.isLoading = false;
          this.isFind = false;
          this.dulieuHscn = {};
          this.dulieuHgd = [];
        }
      } catch (error) {
        console.log(error);
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

.is-disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
