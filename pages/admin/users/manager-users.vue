<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span style="color: #ea4aaa" class="icon is-small is-left">
                <i class="fa fa-cog"></i>
              </span>
              <span style="font-weight: bold; color: #ea4aaa"
                >Quản trị người dùng</span
              >
            </div>
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
                <td style="text-align: center; color: white">Họ tên</td>
                <td style="text-align: center; color: white">Tên người dùng</td>
                <td style="text-align: center; color: white">CCCD</td>
                <td style="text-align: center; color: white">Email</td>
                <td style="text-align: center; color: white">Điện thoại</td>
                <td style="text-align: center; color: white">Quyền</td>
                <td style="text-align: center; width: 40%; color: white">
                  Địa chỉ
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
                  {{ item.name }}
                </td>
                <td style="">
                  {{ item.username }}
                </td>
                <td style="text-align: center">
                  {{ item.cccd }}
                </td>
                <td>
                  {{ item.email }}
                </td>
                <td style="text-align: center">
                  {{ item.sodienthoai }}
                </td>
                <td style="text-align: center">
                  <template v-if="item.role === 1">
                    <span>Quản trị viên</span>
                  </template>
                </td>
                <td style="text-align: left">
                  {{ item.diachi }}
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

                  <!-- select tỉnh thành phố -->
                  <div class="field">
                    <label
                      class="label is-small"
                      style="font-weight: bold; color: red"
                      >* {{ user_data.tentinh }}</label
                    >
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

                  <!-- select quận huyện -->
                  <div class="field">
                    <label
                      class="label is-small"
                      style="font-weight: bold; color: red"
                      >* {{ user_data.tenhuyen }}</label
                    >
                    <input
                      :disabled="isDisabled_Huyenxa"
                      autoComplete="on"
                      list="districtSuggestions"
                      class="custom-input"
                      @blur="quanhuyenChange"
                      ref="districtInput"
                    />
                    <datalist id="districtSuggestions">
                      <option
                        v-for="(item, index) in quanhuyenData"
                        :key="index"
                      >
                        {{ item.maquanhuyen }} - {{ item.tenquanhuyen }}
                      </option>
                    </datalist>
                  </div>

                  <!-- select xã phường -->
                  <div class="field">
                    <label
                      class="label is-small"
                      style="font-weight: bold; color: red"
                      >* {{ user_data.tenxa }}</label
                    >
                    <input
                      :disabled="isDisabled_Xaphuong"
                      autoComplete="on"
                      list="xaphuongSuggestions"
                      class="custom-input"
                      @blur="xaphuongChange"
                      ref="xphuongInput"
                    />
                    <datalist id="xaphuongSuggestions">
                      <option
                        v-for="(item, index) in xaphuongData"
                        :key="index"
                      >
                        {{ item.maxaphuong }} - {{ item.tenxaphuong }}
                      </option>
                    </datalist>
                  </div>

                  <div class="field">
                    <label class="label is-small">Đại lý</label>
                    <div class="control">
                      <input
                        v-model="user_data.tendaily"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập vào địa chỉ"
                        ref="diachiInput"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label is-small">Địa chỉ</label>
                    <div class="control">
                      <input
                        v-model="user_data.diachi"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập vào địa chỉ"
                        ref="diachiInput"
                      />
                    </div>
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
                          <span
                            style="color: red"
                            class="icon is-small is-left"
                          >
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
// import { viCharMap } from "@/utils/viCharMap.js";
import Swal from "sweetalert2";
export default {
  name: "AddUserAdminPage",
  layout: "admin",
  components: {},

  data() {
    return {
      users_data: [],
      user_data: {},
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
        mahuyen: "",
        tenhuyen: "",
        maxa: "",
        tenxa: "",
        madaily: "",
        tendaily: "",
        diachi: "",
        cccd: "",
        sodienthoai: "",
        email: "",
        username: "",
        name: "",
        password: "",
        role: 4, // nomal user
        avatar: "http://localhost:3000/avatar/default-image.png",
        active: 0,
        // createdBy: this.$auth.user.username,
        createdAt: null,
        updatedBy: "",
        updatedAt: "",
        ghichu: "",
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
    this.fetchDataUsers();
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
    // this.getdmTinhs();
    // this.getdmQuanhuyens();
  },

  methods: {
    // ...mapActions("modules/danhmucs", ["getdmTinhs"]),
    // ...mapActions("modules/danhmucs", ["getdmQuanhuyens"]),
    async fetchDataUsers() {
      try {
        const res = await this.$axios.get(`/api/users/`);
        this.users_data = res.data;
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
          title: `Lỗi trong quá trình lấy dữ liệu. Liên hệ quản trị viên`,
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

    async provinceChange(event) {
      const selectedOption = event.target.value;
      let position = selectedOption.split("-");
      // console.log(position);
      this.user_data.matinh = position[0];
      this.user_data.tentinh = position[1];
      try {
        const response = await this.$axios.get(
          `/api/danhmucs/dmquanhuyenwithmatinh?matinh=${this.user_data.matinh}`
        );
        this.quanhuyenData = response.data;
        if (this.quanhuyenData.length > 0) {
          this.checkHuyenxaOpen = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async quanhuyenChange(event) {
      const selectedOption = event.target.value;
      let position = selectedOption.split("-");
      // console.log(position);
      this.user_data.mahuyen = position[0];
      this.user_data.tenhuyen = position[1];
      try {
        const response = await this.$axios.get(
          `/api/danhmucs/dmxaphuongwithmahuyen?maquanhuyen=${this.user_data.mahuyen}`
        );
        this.xaphuongData = response.data;
        // console.log(this.xaphuongData);
        if (this.xaphuongData.length > 0) {
          this.checkXaphuongOpen = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async xaphuongChange(event) {
      const selectedOption = event.target.value;
      let position = selectedOption.split("-");
      // console.log(position);
      this.user_data.maxa = position[0];
      this.user_data.tenxa = position[1];
      // try {
      //   const response = await this.$axios.get(
      //     `/api/danhmucs/dmxaphuongwithmahuyen?maquanhuyen=${this.form.mahuyen}`
      //   );
      //   this.xaphuongData = response.data;
      //   if (this.xaphuongData.length > 0) {
      //     this.checkXaphuongOpen = true;
      //   }
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
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
      if (!this.user_data.name) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Tên người dùng không được để trống", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.nameInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.user_data.matinh || !this.user_data.tentinh) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Tỉnh / Thành phố", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.provinceInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.user_data.mahuyen || !this.user_data.tenhuyen) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Quận huyện", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.districtInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.user_data.maxa || !this.user_data.tenxa) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Xã phường", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.xphuongInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.user_data.diachi) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Địa chỉ", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.diachiInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.user_data.cccd) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin CCCD", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.cccdInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.user_data.sodienthoai) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Số điện thoại", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.sdtInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.user_data.email) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Email", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.emailInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.isValidPhoneNumber(this.user_data.sodienthoai)) {
        this.$toasted.show("Số điện thoại không hợp lệ", {
          duration: 3000,
          theme: "bubble",
        });
        return false;
      }
      if (!this.isValidCCCD(this.user_data.cccd)) {
        this.$toasted.show("Căn cước công dân không hợp lệ", {
          duration: 3000,
          theme: "bubble",
        });
        return false;
      }
      if (!this.isValidEmail(this.user_data.email)) {
        this.$toasted.show("Địa chỉ email không hợp lệ", {
          duration: 3000,
          theme: "bubble",
        });
        return false;
      }

      // Nếu tất cả thông tin đều hợp lệ, trả về true để cho phép quá trình lưu dữ liệu
      return true;
    },

    async activeUpdate(data) {
      this.user_data = {};
      this.user_data = data;
      this.isActive = true;
    },

    async onSave() {
      const result = await Swal.fire({
        title: `Xác nhận tạo mới người dùng ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận tạo",
        denyButtonText: `Hủy tạo`,
      });
      if (result.isConfirmed) {
        // console.log(this.user_data);
        // Kiểm tra dữ liệu trước khi ghi
        const isDataValid = await this.checkFormData();
        if (!isDataValid) {
          // Dừng quá trình lưu dữ liệu nếu dữ liệu không hợp lệ
          return;
        }

        // Bắt đầu hiển thị biểu tượng loading
        this.isLoading = true;
        const current = new Date();
        // console.log(current);
        this.user_data.updatedAt = current;

        let data = new FormData();
        data.append("_id", this.user_data._id);
        data.append("matinh", this.user_data.matinh);
        data.append("tentinh", this.user_data.tentinh);
        data.append("mahuyen", this.user_data.mahuyen);
        data.append("tenhuyen", this.user_data.tenhuyen);
        data.append("maxa", this.user_data.maxa);
        data.append("tenxa", this.user_data.tenxa);
        data.append("madaily", this.user_data.madaily);
        data.append("tendaily", this.user_data.tendaily);
        data.append("diachi", this.user_data.diachi);
        data.append("cccd", this.user_data.cccd);
        data.append("sodienthoai", this.user_data.sodienthoai);
        data.append("email", this.user_data.email);
        data.append("name", this.user_data.name);
        if (this.selectedFile) {
          data.append("avatar", this.selectedFile, this.selectedFile.name);
          data.append("avatarOld", this.user_data.avatar);
        } else {
          data.append("avatar", this.user_data.avatar);
        }
        data.append("active", this.user_data.active);
        data.append("updatedAt", this.user_data.updatedAt);
        data.append("updatedBy", this.user.username);
        data.append("ghichu", this.user_data.ghichu);

        try {
          const response = await this.$store.dispatch("updateUser", data);

          if (response.success == true) {
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
                `/api/users/delete/user`,
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

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 15px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f14668;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 7px;
  width: 7px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
