<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span style="color: #e44d26" class="icon is-small is-left">
                <i class="fas fa-landmark"></i>
              </span>
              <span style="font-weight: bold; color: #e44d26"
                >Quản lý tổ chức</span
              >
            </div>
          </div>
        </div>
        <!-- functions -->
        <div class="field is-tuanpda">
          <div class="control">
            <button
              @click="isActive = true"
              style="margin-bottom: 3px"
              class="button is-small is-info"
            >
              <span class="icon is-small">
                <i class="fa fa-save"></i>
              </span>
              <span>Thêm tổ chức</span>
            </button>
          </div>
        </div>

        <!-- table data -->
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead style="font-size: small; font-weight: bold">
              <tr style="background-color: hsl(207deg, 61%, 53%)">
                <td style="text-align: center; width: 3%; color: white">STT</td>
                <td style="text-align: center; color: white">Thuộc tỉnh</td>
                <td style="text-align: center; color: white">Tên tổ chức</td>
                <td style="text-align: center; color: white">Mã số thuế</td>
                <td style="text-align: center; color: white">Địa chỉ</td>
                <td style="text-align: center; color: white">
                  Đơn vị bảo hiểm
                </td>
                <td style="text-align: center; color: white">Tình trạng</td>
                <td style="text-align: center; color: white">Cập nhật</td>
                <td style="text-align: center; color: white">Xóa</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in paginatedTable"
                :key="index"
                style="font-size: small"
              >
                <td style="text-align: center">
                  {{ index + 1 }}
                </td>
                <td style="">
                  {{ item.tentinh }}
                </td>
                <td style="">
                  {{ item.tentochuc }}
                </td>
                <td style="text-align: center">
                  {{ item.masothue }}
                </td>
                <td>
                  {{ item.diachi }}
                </td>
                <td style="text-align: center">
                  {{ item.tendonvibaohiem }}
                </td>
                <td style="text-align: center">
                  <span v-if="item.active === false">
                    <i style="color: #ffd863" class="fa fa-circle"></i>
                  </span>
                  <span v-else>
                    <i style="color: #00947e" class="fa fa-circle"></i>
                  </span>
                </td>
                <td style="text-align: center">
                  <a>
                    <span class="icon is-larger" style="color: green">
                      <i class="fas fa-feather"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(item)">
                    <span class="icon is-larger" style="color: red">
                      <i class="fas fa-trash-alt"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- pagi -->
        <div class="pagination-container">
          <div class="pagination-input">
            <input
              type="number"
              min="1"
              max="100"
              v-model="itemsPerPage"
              class="input is-small"
              style="width: 100%"
            />
          </div>
          <div class="pagination">
            <button
              class="button is-small is-success"
              @click="changePage(1)"
              :disabled="currentPage === 1"
            >
              Đầu tiên
            </button>
            <button
              class="button is-small is-info"
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
            >
              Trước
            </button>
            <button
              class="button is-small"
              v-for="(page, index) in pages"
              :key="index"
              @click="changePage(page)"
              :class="{ active: page === currentPage }"
            >
              {{ page }}
            </button>
            <button
              class="button is-small is-info"
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === pageCount"
            >
              Sau
            </button>
            <button
              class="button is-small is-success"
              @click="changePage(pageCount)"
              :disabled="currentPage === pageCount"
            >
              Cuối
            </button>
          </div>
        </div>

        <!-- Biểu tượng loading -->
        <div v-if="isLoading" class="loading-overlay">
          <!-- Biểu tượng loading -->
          <div class="loading-spinner"></div>
          <span
            >Xin chờ hệ thống gửi Email xác nhận cho người dùng mới ...</span
          >
        </div>

        <!-- modal add tổ chức -->
        <div class="">
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card box">
              <section class="modal-card-body">
                <div style="text-align: end">
                  <button
                    @click="isActive = false"
                    class="button is-small is-info"
                  >
                    Thoát
                  </button>
                </div>

                <div style="margin-top: 10px">
                  <div class="field">
                    <label class="label is-small">Tên tổ chức</label>
                    <div class="control">
                      <input
                        v-model="form.tentochuc"
                        ref="nameInput"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập vào tên tổ chức"
                        id="fullName"
                        @blur="matochucGenerate()"
                      />
                    </div>
                  </div>

                  <!-- select tỉnh thành phố -->
                  <div class="field">
                    <label class="label is-small">Tỉnh / Thành phố</label>
                    <input
                      autoComplete="on"
                      list="provinceSuggestions"
                      class="custom-input"
                      @blur="provinceChange"
                      ref="provinceInput"
                    />
                    <datalist id="provinceSuggestions">
                      <option v-for="(item, index) in dm_Tinhs" :key="index">
                        {{ item.matinh }} - {{ item.tentinh }}
                      </option>
                    </datalist>
                  </div>

                  <div class="field">
                    <label class="label is-small">Địa chỉ</label>
                    <div class="control">
                      <input
                        v-model="form.diachi"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập vào địa chỉ"
                        ref="diachiInput"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label is-small">Mã số thuế</label>
                    <div class="control">
                      <input
                        v-model="form.masothue"
                        class="input is-small"
                        type="number"
                        maxlength="12"
                        minlength="12"
                        placeholder="Nhập vào Mã số thuế"
                        ref="masothueInput"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label is-small">Đơn vị Bảo hiểm xã hội</label>
                    <div class="control">
                      <input
                        v-model="form.tendonvibaohiem"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập tên đơn vị Bảo hiểm xã hội"
                        ref="sdtInput"
                      />
                    </div>
                  </div>

                  <hr />

                  <div class="field is-grouped-function">
                    <div class="control">
                      <button
                        @click="onSave()"
                        class="button is-success is-small"
                      >
                        Ghi dữ liệu
                      </button>
                    </div>
                    &nbsp;
                    <div class="control">
                      <button
                        @click="isActive = false"
                        class="button is-info is-small"
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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { viCharMap } from "@/utils/viCharMap.js";
import Swal from "sweetalert2";
export default {
  name: "ManageOrgAdminPage",
  layout: "admin",
  components: {},

  data() {
    return {
      org_data: [],
      isActive: false,
      checkHuyenxaOpen: false,
      checkXaphuongOpen: false,
      checkDailyOpen: false,
      fileName: "",
      selectedFile: null,
      tinhthpData: [],
      quanhuyenData: [],
      xaphuongData: [],
      dailyData: [],
      linkActive: "",
      isLoading: false,
      url: null,
      form: {
        matinh: "",
        tentinh: "",
        matochuc: "",
        tentochuc: "",
        diachi: "",
        masothue: "",
        madonvibaohiem: "",
        tendonvibaohiem: "VP BẢO HIỂM XÃ HỘI TỈNH HÀ TĨNH",
        active: 0,
        // createdBy: this.$auth.user.username,
        createdAt: null,
      },
      // sort and pagi
      sortDirection: 1,
      sortKey: "ttqt",
      currentPage: 1,
      itemsPerPage: 10,

      dm_Tinhs: [],
    };
  },

  mounted() {
    this.fetchDataOrg();
    this.fetchDatadmTinh();
    const user = this.user;
    this.form.createdBy = user.username;
  },

  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },
  },

  computed: {
    user() {
      return this.$store.state.user;
    },

    // load data from the store
    // ...mapState("modules/danhmucs", ["dm_Tinhs"]),
    // ...mapState("modules/danhmucs", ["dm_Quanhuyens"]),

    isDisabled_Huyenxa() {
      return this.checkHuyenxaOpen == false;
    },
    isDisabled_Xaphuong() {
      return this.checkXaphuongOpen == false;
    },
    isDisabled_Daily() {
      return this.checkDailyOpen == false;
    },

    sortedTable() {
      return this.org_data.sort((a, b) => {
        if (a[this.sortKey] < b[this.sortKey]) return -1 * this.sortDirection;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * this.sortDirection;
        return 0;
      });
    },
    pageCount() {
      return Math.ceil(this.sortedTable.length / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.startIndex + this.itemsPerPage;
    },
    paginatedTable() {
      return this.sortedTable.slice(this.startIndex, this.endIndex);
    },
    pages() {
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(this.pageCount, this.currentPage + 2);

      let pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < this.pageCount) {
        pages.push("...");
        pages.push(this.pageCount);
      }

      return pages;
    },
  },

  created() {
    // this.getUsers(); // Gọi action để lấy dữ liệu từ Vuex
    // this.getdmTinhs();
    // this.getdmQuanhuyens();
  },

  methods: {
    // ...mapActions("modules/danhmucs", ["getdmTinhs"]),
    // ...mapActions("modules/danhmucs", ["getdmQuanhuyens"]),
    async fetchDataOrg() {
      try {
        const res = await this.$axios.get(`/api/tochucdvt/all-org`);
        this.org_data = res.data;
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Lỗi",
          text: "Lỗi trong quá trình tải dữ liệu từ máy chủ",
        });
      }
    },

    async fetchDatadmTinh() {
      try {
        const res = await this.$axios.get(`/api/danhmucs/dmtinh`);
        this.dm_Tinhs = res.data;
        // console.log(this.dm_Tinhs);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Lỗi",
          text: "Lỗi trong quá trình tải dữ liệu từ máy chủ",
        });
      }
    },

    sortTable(key) {
      if (key === this.sortKey) {
        this.sortDirection *= -1;
      } else {
        this.sortDirection = 1;
        this.sortKey = key;
      }
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.pageCount) {
        this.currentPage = pageNumber;
      }
    },

    generateRandomString(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    },

    matochucGenerate() {
      // Bước 1: Chuyển chuỗi thành chữ thường và loại bỏ dấu tiếng Việt
      let stringWithoutDiacritics = this.form.tentochuc
        .toLowerCase()
        .split("")
        .map((char) => viCharMap[char] || char) // Thay thế các ký tự tiếng Việt thành ký tự không dấu
        .join("");

      // Bước 2: Loại bỏ dấu cách
      this.form.matochuc = stringWithoutDiacritics.replace(/\s/g, "");
      //   console.log(this.form.matochuc);
    },

    async provinceChange(event) {
      const selectedOption = event.target.value;
      let position = selectedOption.split("-");
      // console.log(position);
      this.form.matinh = position[0];
      this.form.tentinh = position[1];
      try {
        const response = await this.$axios.get(
          `/api/danhmucs/dmquanhuyenwithmatinh?matinh=${this.form.matinh}`
        );
        // console.log(response.data);
        this.quanhuyenData = response.data;
        if (this.quanhuyenData.length > 0) {
          this.checkHuyenxaOpen = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async checkFormData() {
      // Kiểm tra tồn tại mã số thuế
      // const res_email_exists = await this.$axios.get(
      //   `/api/users/findemail?email=${this.form.email}`
      // );
      // // console.log(res_email_exists.data.length);
      // if (res_email_exists.data.length > 0) {
      //   Swal.fire({
      //     title: "Tài khoản đã tồn tại",
      //     text: "Email này đã tồn tại trong hệ thống",
      //   });
      //   this.$refs.emailInput.focus();
      //   return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      // }
      // Kiểm tra xem các trường thông tin bắt buộc đã được điền đầy đủ chưa
      if (!this.form.tentochuc) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Tên tổ chức không được để trống", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.nameInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.form.matinh || !this.form.tentinh) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Tỉnh / Thành phố", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.provinceInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.form.diachi) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Địa chỉ", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.diachiInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.form.masothue) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Mã số thuế", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.masothueInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }

      // Nếu tất cả thông tin đều hợp lệ, trả về true để cho phép quá trình lưu dữ liệu
      return true;
    },

    async onSave() {
      // Kiểm tra dữ liệu trước khi ghi
      const isDataValid = await this.checkFormData();
      if (!isDataValid) {
        // Dừng quá trình lưu dữ liệu nếu dữ liệu không hợp lệ
        return;
      }

      const result = await Swal.fire({
        title: `Xác nhận tạo mới tổ chức ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận tạo",
        denyButtonText: `Hủy tạo`,
      });
      if (result.isConfirmed) {
        // Bắt đầu hiển thị biểu tượng loading
        this.isLoading = true;
        const current = new Date();
        // console.log(current);
        this.form.createdAt = current;

        this.form.matochuc = this.form.matochuc + "-" + this.form.masothue;

        try {
          const res = await this.$axios.post(
            `api/tochucdvt/add-org`,
            this.form
          );
          // console.log(res);
          if (res.status == 200) {
            this.isLoading = false;
            this.isActive = false;
            Swal.fire({
              title: "Tạo thành công tổ chức mới",
            });
            this.fetchDataOrg();
          } else {
            // Dừng hiển thị biểu tượng loading
            this.isLoading = false;
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
              title: `Lỗi! Không thể tạo mới tổ chức`,
            });
          }
        } catch (error) {
          this.isLoading = false;
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
            title: `Lỗi! Không thể tạo mới tổ chức`,
          });
        }
      }
    },

    async onDelete(data) {
      if (this.$auth.user.role === 1) {
        const result = await Swal.fire({
          title: `Xác nhận xóa tổ chức này? Sẽ không thể lấy lại!`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận xóa",
          denyButtonText: `Hủy xóa`,
        });
        if (result.isConfirmed) {
          // todo something
          try {
            const res = await this.$axios.post(
              `/api/tochucdvt/delete/org`,
              data
            );
            console.log(res);
            if (res.data.success == true) {
              Swal.fire({
                title: "Đã xóa Tổ chức",
                text: "Deleted!",
              });
              this.fetchDataOrg();
            }
          } catch (error) {
            // console.log(error);
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
              title: `Lỗi! Không thể xóa`,
            });
          }
        }
      } else {
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title:
            "Bạn không có quyền xóa dữ liệu này. Liên hệ quản trị phần mềm !!!",
        });
      }
    },
  },
};
</script>

<style scoped lang="css">
.table_wrapper {
  display: block;
  overflow: scroll;
  white-space: nowrap;
  position: sticky;
  left: 0;
}

.pagination {
  display: flex;
  justify-content: right;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #ccc;
  color: #fff;
  cursor: pointer;
}

.pagination button.active {
  background-color: #cb4b10;
}

.field.is-tuanpda {
  display: flex;
  justify-content: flex-end;
}

.field.is-grouped-function {
  display: flex;
  justify-content: center;
}

.modal-card {
  width: 850px;
  height: 550px;
}

/* Tùy chỉnh giao diện của input */
.custom-input {
  width: 50%;
  height: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
}

/* Tùy chỉnh giao diện của datalist */
datalist {
  position: absolute;
  width: 100%;
  max-height: 50px;
  /* Điều chỉnh chiều cao tối đa của datalist */
  overflow-y: auto;
  /* Cho phép cuộn nếu danh sách quá dài */
  border: 1px solid #ccc;
  border-radius: 1px;
  background-color: #fff;
  z-index: 1;
  /* Đảm bảo datalist hiển thị phía trên các phần tử khác */
}

/* Tùy chỉnh giao diện của các option trong datalist */
datalist option {
  padding: 8px;
  cursor: pointer;
}

/* Tùy chỉnh giao diện của option được chọn */
datalist option:checked {
  background-color: #f0f0f0;
}

/* Tùy chỉnh giao diện của option mặc định */
datalist option:not(:checked) {
  background-color: transparent;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 20px; */
}

.pagination-input {
  margin-right: 10px;
  /* Khoảng cách giữa input và phân trang */
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #ccc;
  color: #fff;
  cursor: pointer;
}

.pagination button.active {
  background-color: #cb4b10;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  /* Góc quay ban đầu */
  100% {
    transform: rotate(360deg);
  }

  /* Góc quay cuối cùng */
}

#preview {
  display: flex;
  justify-content: left;
  align-items: left;
}

#preview img {
  max-width: 100px;
  max-height: 100px;
  padding: 5px;
}
</style>
