<template>
  <div class="column">
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #ea4aaa" class="icon is-small is-left">
              <i class="far fa-address-card"></i>
            </span>
            <span style="font-weight: bold; color: #ea4aaa"
              >Quản lý người dùng tra cứu biên lai BHXH</span
            >
          </div>
        </div>
      </div>

      <!-- functions -->
      <div class="field is-tuanpda">
        <div class="control">
          <button
            @click="onImport"
            style="margin-bottom: 3px"
            class="button is-small is-danger"
          >
            <span class="icon is-small">
              <i class="fas fa-code"></i>
            </span>
            <span>Import Users</span>
          </button>
          <button
            @click="isActive = true"
            style="margin-bottom: 3px"
            class="button is-small is-info"
          >
            <span class="icon is-small">
              <i class="fa fa-save"></i>
            </span>
            <span>Thêm người dùng</span>
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
              <td style="text-align: center; color: white">Mã số BHXH</td>
              <td style="text-align: center; color: white">Tên người dùng</td>
              <td style="text-align: center; color: white">Email</td>
              <td style="text-align: center; color: white">Điện thoại</td>
              <td style="text-align: center; color: white">CCCD</td>
              <td style="text-align: center; color: white">Tên đơn vị</td>
              <td style="text-align: center; color: white">Tình trạng</td>
              <td style="text-align: center; color: white">Chức năng</td>
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
                {{ item.masobhxh }}
              </td>
              <td style="text-align: center">
                {{ item.name }}
              </td>
              <td style="text-align: center">
                {{ item.email }}
              </td>
              <td>
                {{ item.sodienthoai }}
              </td>
              <td style="text-align: center">
                {{ item.cccd }}
              </td>
              <td style="text-align: center">
                {{ item.donvi }}
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
                <a @click="activeUpdate(item)">
                  <span class="icon is-larger" style="color: green">
                    <i class="fas fa-feather"></i>
                  </span>
                </a>
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
        <span>waitting some minute ...</span>
      </div>

      <!-- modal add user -->
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
              <div>
                <div class="field">
                  <label class="label is-small">Mã số BHXH</label>
                  <div class="control">
                    <input
                      v-model="form.masobhxh"
                      class="input is-small"
                      type="number"
                      maxlength="10"
                      minlength="10"
                      placeholder="Nhập vào Mã số BHXH"
                      ref="masobhxhInput"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Họ tên</label>
                  <div class="control">
                    <input
                      v-model="form.name"
                      class="input is-small"
                      type="text"
                      placeholder="Nhập vào Fullname"
                      ref="nameInput"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Căn cước công dân</label>
                  <div class="control">
                    <input
                      v-model="form.cccd"
                      class="input is-small"
                      type="number"
                      maxlength="12"
                      minlength="12"
                      placeholder="Nhập vào CCCD"
                      ref="cccdInput"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Email</label>
                  <div class="control">
                    <input
                      v-model="form.email"
                      class="input is-small"
                      type="email"
                      placeholder="Nhập Email"
                      ref="emailInput"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Số điện thoại</label>
                  <div class="control">
                    <input
                      v-model="form.sodienthoai"
                      class="input is-small"
                      type="number"
                      placeholder="Nhập vào số điện thoại"
                      ref="sdtInput"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Đơn vị công tác</label>
                  <div class="control">
                    <input
                      v-model="form.donvi"
                      class="input is-small"
                      type="text"
                      placeholder="Nhập vào tên đơn vị"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Ảnh đại diện</label>
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
                        <span class="file-label"> Chọn ảnh đại diện </span>
                      </span>
                      <span class="file-name">
                        {{ fileName }}
                      </span>
                    </label>
                  </div>
                </div>

                <div class="field">
                  <div v-if="url" class="column">
                    <div id="preview">
                      <img :src="url" />
                    </div>
                    <span style="color: red" class="icon is-small is-left">
                      <i @click="remove" class="far fa-trash-alt"
                        ><a>Xóa ảnh</a></i
                      >
                    </span>
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

      <!-- modal update user -->
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
              <div v-if="user_data" style="margin-top: 10px">
                <div class="field">
                  <label class="label is-small">Mã số BHXH</label>
                  <div class="control">
                    <input
                      v-model="user_data.masobhxh"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Họ tên</label>
                  <div class="control">
                    <input
                      v-model="user_data.name"
                      ref="nameInput"
                      class="input is-small"
                      type="text"
                      placeholder="Nhập vào họ tên"
                      id="fullName"
                    />
                  </div>
                </div>

                <label class="label is-small">Kích hoạt - Active</label>
                <div class="field">
                  <label class="switch" style="vertical-align: middle">
                    <input v-model="user_data.active" type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>

                <div class="field">
                  <label class="label is-small">Căn cước công dân</label>
                  <div class="control">
                    <input
                      v-model="user_data.cccd"
                      class="input is-small"
                      type="number"
                      maxlength="12"
                      minlength="12"
                      placeholder="Nhập vào CCCD"
                      ref="cccdInput"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Số điện thoại</label>
                  <div class="control">
                    <input
                      v-model="user_data.sodienthoai"
                      class="input is-small"
                      type="number"
                      placeholder="Nhập vào số điện thoại"
                      ref="sdtInput"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Email</label>
                  <div class="control">
                    <input
                      v-model="user_data.email"
                      class="input is-small"
                      type="email"
                      placeholder="Nhập vào email"
                      ref="emailInput"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Đơn vị</label>
                  <div class="control">
                    <input
                      v-model="user_data.donvi"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Ghi chú</label>
                  <div class="control">
                    <input
                      v-model="user_data.ghichu"
                      class="input is-small"
                      type="email"
                      placeholder="Ghi chú thêm"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label is-small">Ảnh đại diện</label>
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
                        <span class="file-label"> Sửa lại ảnh đại diện </span>
                      </span>
                      <span class="file-name">
                        {{ fileName }}
                      </span>
                    </label>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <div v-if="user_data.avatar" class="column">
                        <div id="preview">
                          <img :src="user_data.avatar" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <div v-if="url" class="column">
                        <div id="preview">
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

                <hr />

                <div class="field is-grouped-function">
                  <div class="control">
                    <button
                      @click="onUpdate()"
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
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
export default {
  name: "AddUserAdminPage",
  layout: "admin",

  data() {
    return {
      users_data: [],
      isActive: false,
      user_data: {},

      linkActive: "",
      isLoading: false,
      url: null,

      fileName: "",
      selectedFile: null,
      form: {
        masobhxh: "",
        name: "",
        cccd: "",
        sodienthoai: "",
        email: "",
        password: "",
        donvi: "",
        avatar: "http://27.73.37.94:4042/avatar/default-image.jpg",
        active: 0,
        createdAt: null,
      },
      // sort and pagi
      sortDirection: 1,
      sortKey: "ttqt",
      currentPage: 1,
      itemsPerPage: 10,
      //
      isImport: false,
      data_import: [],
      fileName_import: "",
      selectedFile_import: null,
      res_Data_Success: [],
      res_Data_Failed: [],
      res_Data_Exist: [],
    };
  },

  mounted() {
    this.fetchDataUsers();
    // this.fetchDataTCDVT();

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
    ...mapState("modules/danhmucs", ["dm_Tinhs"]),
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
      return this.users_data.sort((a, b) => {
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
    this.getdmTinhs();
    // this.getdmQuanhuyens();
  },

  methods: {
    ...mapActions("modules/danhmucs", ["getdmTinhs"]),
    // ...mapActions("modules/danhmucs", ["getdmQuanhuyens"]),
    async fetchDataUsers() {
      try {
        const res = await this.$axios.get(
          `/api/users/taikhoan-tracuu-bienlai-dientu`
        );
        this.users_data = res.data;
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

    // check phone number
    isValidPhoneNumber(phoneNumber) {
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
      return cleanedPhoneNumber.length === 10;
    },

    // check mã số BHXH
    isValidBHXH(bhxh) {
      // Loại bỏ tất cả các ký tự không phải số
      const cleanedCCCD = bhxh.replace(/\D/g, "");
      // Kiểm tra độ dài của CCCD và số đầu tiên
      return cleanedCCCD.length === 10;
    },

    // check số cccd
    isValidCCCD(cccd) {
      // Loại bỏ tất cả các ký tự không phải số
      const cleanedCCCD = cccd.replace(/\D/g, "");
      // Kiểm tra độ dài của CCCD và số đầu tiên
      return cleanedCCCD.length === 12 && cleanedCCCD.charAt(0) === "0";
    },

    // check email address
    isValidEmail(email) {
      // Biểu thức chính quy để kiểm tra định dạng email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Kiểm tra định dạng email
      return emailRegex.test(email);
    },

    async checkFormData() {
      // Kiểm tra xem các trường thông tin bắt buộc đã được điền đầy đủ chưa

      if (!this.form.masobhxh) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn mã số BHXH", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.masobhxhInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.form.name) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Tên người dùng không được để trống", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.nameInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.form.cccd) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin CCCD", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.cccdInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.form.email) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Email", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.emailInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.form.sodienthoai) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Số điện thoại", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.sdtInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }

      if (!this.isValidPhoneNumber(this.form.sodienthoai)) {
        this.$toasted.show("Số điện thoại không hợp lệ", {
          duration: 3000,
          theme: "bubble",
        });
        return false;
      }
      if (!this.isValidBHXH(this.form.masobhxh)) {
        this.$toasted.show("Mã số BHXH không hợp lệ", {
          duration: 3000,
          theme: "bubble",
        });
        return false;
      }
      if (!this.isValidCCCD(this.form.cccd)) {
        this.$toasted.show("Căn cước công dân không hợp lệ", {
          duration: 3000,
          theme: "bubble",
        });
        return false;
      }
      if (!this.isValidEmail(this.form.email)) {
        this.$toasted.show("Địa chỉ email không hợp lệ", {
          duration: 3000,
          theme: "bubble",
        });
        return false;
      }

      // Nếu tất cả thông tin đều hợp lệ, trả về true để cho phép quá trình lưu dữ liệu
      return true;
    },

    onFileChange_import(e) {
      if (!e.target.files[0]) {
        return;
      }
      this.perproc = 0;
      this.fileName_import = e.target.files[0].name;
      this.selectedFile_import = e.target.files[0];

      if (
        this.selectedFile_import.type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // console.log(this.selectedFile_import);
        //console.log(this.selectedFile.type);
      } else {
        this.$toasted.show("Chỉ chấp nhận file excel xlsx, 2007 + ", {
          duration: 2000,
          theme: "bubble",
        });
      }

      const files = e.target.files;
      const fileReader = new FileReader(); // construction function that can read the file content
      this.isLoading = true;
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary", // binary
          });
          const wsname = workbook.SheetNames[0]; //take the first sheet
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table

          let titles = Object.keys(ws[0]);
          const firstThreeTitles = titles.slice(0, 3);
          // console.log(firstThreeTitles);

          if (
            firstThreeTitles[0] == "matochuc" &&
            firstThreeTitles[1] == "tentochuc" &&
            firstThreeTitles[2] == "matinh"
          ) {
            this.data_import = ws;
            this.data_import = this.data_import.map((item) => ({
              ...item,
              process: 0,
              statusImport: 0,
            }));
            // console.log(this.data_import);

            this.isLoading = false;
            this.isImport = true;
          } else {
            this.data_import = [];
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
              title: `File không hợp lệ.`,
            });
            this.isLoading = false;
          }
        } catch (error) {
          console.log(error);
        }
      };
      // read file, trigger onload
      fileReader.readAsBinaryString(files[0]);
    },

    onImport() {
      this.isActive_import = true;
    },

    async clickImport() {
      this.res_Data_Exist = [];
      this.res_Data_Failed = [];
      this.res_Data_Success = [];
      const users = await this.$axios.get(`/api/users/`);

      // console.log(users);
      const cccd_users = users.data
        .map((user) => user.cccd)
        .filter((cccd) => cccd);
      const data_import_filtered = this.data_import.filter((record) => {
        if (!record.cccd) {
          console.warn("Bản ghi thiếu CCCD:", record);
          return false;
        }
        if (cccd_users.includes(record.cccd)) {
          this.res_Data_Exist.push(record); // Đẩy vào mảng res_Data_Exist nếu CCCD trùng
          return false; // Loại bỏ khỏi data_import
        }
        return true; // Giữ lại trong data_import
      });
      // console.log(data_import_filtered);
      // console.log(this.res_Data_Exist);
      this.data_import = data_import_filtered;
      // console.log(this.data_import);

      if (this.res_Data_Exist.length <= 0) {
        const result = await Swal.fire({
          title: `Xác nhận tạo user từ import file execl ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });
        if (result.isConfirmed) {
          try {
            this.isLoading = true;
            for (const item of this.data_import) {
              const res = await this.$axios.$post("/api/users/account", item);
              // console.log(res.success);
              if (res.success == true) {
                await this.animateProgress(item, 100, 10); // Tăng dần lên 100
                item.statusImport = 1;
              } else {
                item.process = 0;
                item.statusImport = 0;
              }
            }
            this.isLoading = false;
            this.isImport = false;
            Swal.fire("Tạo thành công các User từ file Excel !");
            this.fetchDataUsers();
          } catch (error) {
            console.log(error);
            Swal.fire("Có lỗi xảy ra", "Import dữ liệu thất bại.", "warning");
            this.fetchDataUsers();
          }
        }
      }
    },

    exitImport() {
      this.data_import = [];
      this.res_Data_Exist = [];
      this.isActive_import = false;
      this.fileName_import = "";
      this.selectedFile_import = null;
    },

    async animateProgress(item, target, step) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (item.process >= target) {
            clearInterval(interval);
            resolve();
          } else {
            item.process += step; // Tăng dần theo step
            if (item.process > target) item.process = target; // Đảm bảo không vượt quá target
          }
        }, 100); // Mỗi 100ms tăng một lần
      });
    },

    catTrung() {
      this.res_Data_Exist = [];
      if (this.data_import.length <= 0) {
        this.isImport = false;
      }
    },

    async onSave() {
      // Kiểm tra dữ liệu trước khi ghi
      const isDataValid = await this.checkFormData();
      if (!isDataValid) {
        // Dừng quá trình lưu dữ liệu nếu dữ liệu không hợp lệ
        return;
      }

      const result = await Swal.fire({
        title: `Xác nhận tạo mới người dùng ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận tạo",
        denyButtonText: `Hủy tạo`,
      });
      if (result.isConfirmed) {
        // Bắt đầu hiển thị biểu tượng loading
        this.isLoading = true;
        // sau này thì username sẽ bằng username + mã đại lý
        // random 8 ký tự
        // activeString
        let passtranfomer = "TracuuBienlai@Bhxh123";
        // console.log(passtranfomer);
        // ngày tạo user
        const current = new Date();
        // console.log(current);
        this.form.createdAt = current;

        let data = new FormData();

        data.append("masobhxh", this.form.masobhxh);
        data.append("name", this.form.name);
        data.append("password", passtranfomer);
        data.append("email", this.form.email);
        data.append("donvi", this.form.donvi);
        data.append("sodienthoai", this.form.sodienthoai);
        data.append("cccd", this.form.cccd);
        if (this.selectedFile) {
          data.append("avatar", this.selectedFile, this.selectedFile.name);
        } else {
          data.append("avatar", this.form.avatar);
        }
        data.append("active", 1);
        data.append("createdAt", this.form.createdAt);
        data.append("createdBy", this.form.createdBy);

        try {
          const response = await this.$axios.post(
            "api/users/account-tracuubienlaidientu-bhxh",
            data
          );
          console.log(response);
          if (response.status == 200) {
            this.isActive = false;
            this.fetchDataUsers();

            this.isLoading = false;
            this.isActive = false;
            Swal.fire({
              title: "Tạo thành công tài khoản",
              text: `Tên đăng nhập là: ${this.form.masobhxh}; Mật khẩu nhập là: ${passtranfomer}`,
            });
            this.fetchDataUsers();
            this.form = [];
            this.tinhthpData = [];
            this.quanhuyenData = [];
            this.xaphuongData = [];
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
              title: `Lỗi! Không thể tạo tài khoản`,
            });
          }
        } catch (error) {
          console.log(error);
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
            title: `Lỗi! Không thể tạo tài khoản`,
          });
        }
      }
    },

    async activeUpdate(data) {
      this.user_data = {};
      this.user_data = data;
      this.isActive = true;
    },

    async onUpdate() {
      const result = await Swal.fire({
        title: `Xác nhận tạo mới người dùng ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận tạo",
        denyButtonText: `Hủy tạo`,
      });
      if (result.isConfirmed) {
        // Bắt đầu hiển thị biểu tượng loading
        this.isLoading = true;

        let data = new FormData();
        data.append("_id", this.user_data._id);
        data.append("masobhxh", this.user_data.masobhxh);
        data.append("name", this.user_data.name);
        data.append("cccd", this.user_data.cccd);
        data.append("sodienthoai", this.user_data.sodienthoai);
        data.append("email", this.user_data.email);
        data.append("donvi", this.user_data.donvi);

        if (this.selectedFile) {
          data.append("avatar", this.selectedFile, this.selectedFile.name);
          data.append("avatarOld", this.user_data.avatar);
        } else {
          data.append("avatar", this.user_data.avatar);
        }

        data.append("active", this.user_data.active);

        try {
          const response = await this.$axios.post(
            "api/users/user/fix-tracuu-bienlaidientu",
            data
          );
          console.log(response);
          if (response.status == 200) {
            this.isLoading = false;
            Swal.fire({
              title: "Cập nhật thành công",
            });
            this.fetchDataUsers();
            this.isActive = false;
          }
        } catch (error) {
          console.log(error);
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
            title: `Lỗi! Không thể cập nhật`,
          });
        }
      }
    },

    async onDelete(data) {
      if (this.user.role === 1) {
        const result = await Swal.fire({
          title: `Xác nhận xóa tài khoản này? Sẽ không thể lấy lại!`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận xóa",
          denyButtonText: `Hủy xóa`,
        });
        if (result.isConfirmed) {
          if (data.role === 1) {
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
              title: `Không thể xóa User này !!!`,
            });
          } else {
            try {
              const res = await this.$axios.post(
                `/api/users/delete/user-tracuuu-bienlai-dientu`,
                data
              );
              // console.log(res.data.success);
              if (res.data.success == true) {
                Swal.fire({
                  title: "Đã xóa tài khoản khỏi hệ thống",
                  text: "Deleted!",
                });
                this.fetchDataUsers();
              }
            } catch (error) {
              console.log(error);
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

.modal-card-import {
  width: 1250px;
  height: 650px;
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
