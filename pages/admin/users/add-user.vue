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
              >Thêm mới người dùng</span
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
              <td style="text-align: center; color: white">Họ tên</td>
              <td style="text-align: center; color: white">Tên người dùng</td>
              <td style="text-align: center; color: white">CCCD</td>
              <td style="text-align: center; color: white">Email</td>
              <td style="text-align: center; color: white">Điện thoại</td>
              <td style="text-align: center; color: white">Điểm thu</td>
              <td style="text-align: center; color: white">Tình trạng</td>
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
              <td style="text-align: center">
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
                {{ item.tendaily }}
              </td>
              <td style="text-align: center">
                <span v-if="item.active === false">
                  <i style="color: #ffd863" class="fa fa-circle"></i>
                </span>
                <span v-else>
                  <i style="color: #00947e" class="fa fa-circle"></i>
                </span>
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

              <label class="label is-small">Tên tổ chức</label>
              <div class="field">
                <div class="control">
                  <div class="select is-small">
                    <select @change="TcdvthugChange($event)">
                      <option selected>-- Chọn tổ chức dịch vụ thu --</option>
                      <option
                        v-for="(item, index) in tochucdvt"
                        :key="index"
                        :value="item.matochuc"
                      >
                        {{ item.tentochuc }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div style="margin-top: 10px">
                <div class="field">
                  <label class="label is-small">Họ tên</label>
                  <div class="control">
                    <input
                      v-model="form.name"
                      ref="nameInput"
                      class="input is-small"
                      type="text"
                      placeholder="Nhập vào họ tên"
                      id="fullName"
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

                <!-- select quận huyện -->
                <div class="field">
                  <label class="label is-small">Quận huyện / Thị xã</label>
                  <input
                    :disabled="isDisabled_Huyenxa"
                    autoComplete="on"
                    list="districtSuggestions"
                    class="custom-input"
                    @blur="quanhuyenChange"
                    ref="districtInput"
                  />
                  <datalist id="districtSuggestions">
                    <option v-for="(item, index) in quanhuyenData" :key="index">
                      {{ item.maquanhuyen }} - {{ item.tenquanhuyen }}
                    </option>
                  </datalist>
                </div>

                <!-- select xã phường -->
                <div class="field">
                  <label class="label is-small">Xã phường</label>
                  <input
                    :disabled="isDisabled_Xaphuong"
                    autoComplete="on"
                    list="xaphuongSuggestions"
                    class="custom-input"
                    @blur="xaphuongChange"
                    ref="xphuongInput"
                  />
                  <datalist id="xaphuongSuggestions">
                    <option v-for="(item, index) in xaphuongData" :key="index">
                      {{ item.maxaphuong }} - {{ item.tenxaphuong }}
                    </option>
                  </datalist>
                </div>

                <label class="label is-small">Điểm thu - Công ty DV thu?</label>
                <div class="field">
                  <div class="control">
                    <div class="select is-small">
                      <select
                        @change="nhanvienCtyChange($event)"
                        :disabled="isDisabled_Daily"
                      >
                        <option selected>-- Chọn phân cấp --</option>
                        <option value="true">Nhân viên công ty</option>
                        <option value="false">Điểm thu</option>
                      </select>
                    </div>
                  </div>
                </div>

                <label class="label is-small">Gửi lên cổng BHXH VN?</label>
                <div class="field">
                  <div class="control">
                    <div class="select is-small">
                      <select
                        @change="sentChange($event)"
                        :disabled="isDisabled_Daily"
                      >
                        <option selected>-- Chọn quyền --</option>
                        <option value="true">Cho phép</option>
                        <option value="false">Không cho phép</option>
                      </select>
                    </div>
                  </div>
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
                  <label class="label is-small">Email</label>
                  <div class="control">
                    <input
                      v-model="form.email"
                      class="input is-small"
                      type="email"
                      placeholder="Nhập vào email"
                      ref="emailInput"
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

      <!-- modal import user -->
      <div class="">
        <div :class="{ 'is-active': isActive_import }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card-import box">
            <section class="modal-card-body">
              <div style="text-align: end">
                <button @click="exitImport" class="button is-small is-danger">
                  Thoát
                </button>
              </div>

              <div class="columns">
                <div class="column is-10">
                  <div class="file is-small is-info has-name">
                    <label class="file-label">
                      <input
                        ref="fileInput"
                        @change="onFileChange_import"
                        class="file-input"
                        type="file"
                        name="resume"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      />
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label"> Chọn file excel </span>
                      </span>
                      <span class="file-name">
                        {{ fileName_import }}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <!-- progress import -->
              </div>

              <div class="column">
                <div v-if="res_Data_Exist.length > 0">
                  <span style="color: #ea4aaa; font-weight: 600"
                    >Có dữ liệu trùng, kéo xuống dưới để xem chi tiết</span
                  >
                </div>
                <div style="text-align: right; margin-bottom: 5px">
                  <button>
                    <a
                      href="http://27.73.37.94:4042/filemauimport/importusers.xlsx"
                      >Download File mẫu Import</a
                    >
                  </button>
                  <button
                    :disabled="!isImport || res_Data_Exist.length > 0"
                    @click="clickImport"
                    class="button is-small is-success"
                  >
                    Import người dùng
                  </button>
                </div>

                <template>
                  <div class="table_wrapper">
                    <table
                      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                    >
                      <thead style="font-size: small; font-weight: bold">
                        <tr style="">
                          <td style="text-align: center; width: 3%">STT</td>
                          <td style="text-align: center">Tiến trình import</td>
                          <td style="text-align: center">Status Import</td>
                          <td style="text-align: center">Họ tên</td>
                          <td style="text-align: center">Tên người dùng</td>
                          <td style="text-align: center">CCCD</td>
                          <td style="text-align: center">Điện thoại</td>
                          <td style="text-align: center">Địa chỉ</td>
                          <td style="text-align: center">Mã Điểm thu</td>
                          <td style="text-align: center">Tên điểm thu</td>
                          <td style="text-align: center">Mã số BHXH</td>
                        </tr>
                      </thead>
                      <tbody v-if="data_import.length > 0">
                        <tr
                          v-for="(item, index) in data_import"
                          :key="index"
                          style="font-size: small"
                        >
                          <td style="text-align: center">
                            {{ index + 1 }}
                          </td>
                          <td tyle="text-align: center">
                            <progress
                              class="progress is-success"
                              :value="item.process"
                              max="100"
                            ></progress>
                          </td>
                          <td style="text-align: center">
                            <template v-if="item.statusImport == 0">
                              <span style="font-weight: 500; color: red"
                                >Chưa import</span
                              >
                            </template>
                            <template v-else>
                              <span style="font-weight: 500; color: #00947e"
                                >Thành công</span
                              >
                            </template>
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
                          <td style="text-align: center">
                            {{ item.sodienthoai }}
                          </td>
                          <td>
                            {{ item.diachi }}
                          </td>
                          <td>
                            {{ item.madaily }}
                          </td>
                          <td>
                            {{ item.tendaily }}
                          </td>
                          <td>
                            {{ item.masobhxh }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>

                <!-- dữ liệu trùng -->
                <template v-if="res_Data_Exist.length > 0">
                  <div class="table_wrapper">
                    <div style="margin-bottom: 5px; margin-top: 5px">
                      <span style="font-weight: bold; color: red"
                        >Người dùng đã tồn tại trong CSDL (Trùng CCCD)</span
                      >
                      |
                      <a @click="catTrung"
                        ><span style="font-weight: bold"
                          >Xác nhận cắt bỏ các dòng trùng để tiếp tục
                          import</span
                        ></a
                      >
                    </div>
                    <table
                      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                    >
                      <thead
                        style="
                          font-size: small;
                          font-weight: bold;
                          background-color: #ea4aaa;
                        "
                      >
                        <tr style="">
                          <td style="text-align: center; width: 3%">STT</td>
                          <td style="text-align: center">Họ tên</td>
                          <td style="text-align: center">Tên người dùng</td>
                          <td style="text-align: center">CCCD</td>
                          <td style="text-align: center">Điện thoại</td>
                          <td style="text-align: center">Địa chỉ</td>
                          <td style="text-align: center">Mã Điểm thu</td>
                          <td style="text-align: center">Tên điểm thu</td>
                          <td style="text-align: center">Mã số BHXH</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in res_Data_Exist"
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
                          <td style="text-align: center; color: #ea4aaa">
                            {{ item.cccd }}
                          </td>
                          <td style="text-align: center">
                            {{ item.sodienthoai }}
                          </td>
                          <td>
                            {{ item.diachi }}
                          </td>
                          <td>
                            {{ item.madaily }}
                          </td>
                          <td>
                            {{ item.tendaily }}
                          </td>
                          <td>
                            {{ item.masobhxh }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
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
      isActive_import: false,
      checkHuyenxaOpen: false,
      checkXaphuongOpen: false,
      checkDailyOpen: false,
      fileName: "",
      selectedFile: null,
      tochucdvt: [],
      tinhthpData: [],
      quanhuyenData: [],
      xaphuongData: [],
      dailyData: [],
      linkActive: "",
      isLoading: false,
      url: null,
      form: {
        matochuc: "",
        tentochuc: "",
        matinh: "",
        tentinh: "",
        mahuyen: "",
        tenhuyen: "",
        maxa: "",
        tenxa: "",
        madaily: "",
        tendaily: "",
        nvcongty: 0,
        diachi: "",
        masobhxh: "",
        cccd: "",
        sodienthoai: "",
        email: "",
        username: "",
        name: "",
        password: "",
        role: 4, // nomal user
        avatar: "http://27.73.37.94:4042/avatar/default-image.jpg",
        active: 0,
        // createdBy: this.$auth.user.username,
        createdAt: null,
        updatedBy: "",
        updatedAt: "",
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

      dm_Tinhs: [],
    };
  },

  mounted() {
    this.fetchDataUsers();
    this.fetchDataTCDVT();
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

    async fetchDataTCDVT() {
      try {
        const res = await this.$axios.get(`/api/tochucdvt/all-org`);
        this.tochucdvt = res.data;
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

    // tổ chức dịch vụ thu
    async TcdvthugChange(e) {
      this.form.matochuc = e.target.value;
      this.form.tentochuc = e.target.options[e.target.selectedIndex].text;
      // console.log(this.form.tentochuc.text);
    },

    // tỉnh
    async provinceChange(event) {
      const selectedOption = event.target.value;
      let position = selectedOption.split("-");
      // console.log(position);
      if (selectedOption) {
        this.form.matinh = position[0].trim();
        this.form.tentinh = position[1].trim();
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
      }
    },

    async quanhuyenChange(event) {
      const selectedOption = event.target.value;
      let position = selectedOption.split("-");
      // console.log(position);
      if (selectedOption) {
        this.form.mahuyen = position[0].trim();
        this.form.tenhuyen = position[1].trim();
        try {
          const response = await this.$axios.get(
            `/api/danhmucs/dmxaphuongwithmahuyen?maquanhuyen=${this.form.mahuyen}`
          );
          this.xaphuongData = response.data;
          // console.log(this.xaphuongData);
          if (this.xaphuongData.length > 0) {
            this.checkXaphuongOpen = true;
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    },

    async xaphuongChange(event) {
      const selectedOption = event.target.value;
      let position = selectedOption.split("-");
      // console.log(position);
      if (selectedOption) {
        this.form.maxa = position[0].trim();
        this.form.tenxa = position[1].trim();
      }
      this.checkDailyOpen = true;

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

    nhanvienCtyChange(event) {
      const selectedOption = event.target.value;
      // console.log(selectedOption); // nhận giá trị true hoặc false - true là nhân viên công ty - giá trị mặc định là false
      if (selectedOption) {
        this.form.nvcongty = selectedOption;
      }
    },

    sentChange(event) {
      const selectedOption = event.target.value;
      // console.log(selectedOption);

      if (selectedOption) {
        this.form.res_sent = selectedOption;
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
      // Kiểm tra tồn tại email
      const res_email_exists = await this.$axios.get(
        `/api/users/findemail?email=${this.form.email}`
      );
      // console.log(res_email_exists.data.length);
      if (res_email_exists.data.length > 0) {
        Swal.fire({
          title: "Tài khoản đã tồn tại",
          text: "Email này đã tồn tại trong hệ thống",
        });
        this.$refs.emailInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      // Kiểm tra xem các trường thông tin bắt buộc đã được điền đầy đủ chưa
      if (!this.form.name) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Tên người dùng không được để trống", {
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
      if (!this.form.mahuyen || !this.form.tenhuyen) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Quận huyện", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.districtInput.focus();
        return false; // Trả về false để ngăn chặn quá trình lưu dữ liệu
      }
      if (!this.form.maxa || !this.form.tenxa) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Xã phường", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.xphuongInput.focus();
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
      if (!this.form.masobhxh) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn mã số BHXH", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.masobhxhInput.focus();
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
      if (!this.form.sodienthoai) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Chọn thông tin Số điện thoại", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.sdtInput.focus();
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
        const randomString = this.generateRandomString(10);
        // activeString
        let passtranfomer = this.form.username + this.form.cccd + randomString;
        // console.log(passtranfomer);
        // ngày tạo user
        const current = new Date();
        // console.log(current);
        this.form.createdAt = current;

        let data = new FormData();
        data.append("matochuc", this.form.matochuc);
        data.append("tentochuc", this.form.tentochuc);
        data.append("matinh", this.form.matinh);
        data.append("tentinh", this.form.tentinh);
        data.append("mahuyen", this.form.mahuyen);
        data.append("tenhuyen", this.form.tenhuyen);
        data.append("maxa", this.form.maxa);
        data.append("tenxa", this.form.tenxa);
        data.append("madaily", this.form.maxa);
        data.append("tendaily", this.form.tenxa);
        data.append("nvcongty", this.form.nvcongty);
        data.append("diachi", this.form.diachi);
        data.append("cccd", this.form.cccd);
        data.append("masobhxh", this.form.masobhxh);
        data.append("sodienthoai", this.form.sodienthoai);
        data.append("email", this.form.email);
        data.append("username", this.form.cccd);
        data.append("name", this.form.name);
        data.append("password", passtranfomer);
        data.append("role", this.form.role);
        if (this.selectedFile) {
          data.append("avatar", this.selectedFile, this.selectedFile.name);
        } else {
          data.append("avatar", this.form.avatar);
        }
        data.append("active", this.form.active);
        data.append("createdAt", this.form.createdAt);
        data.append("createdBy", this.form.createdBy);
        data.append("updatedAt", this.form.updatedAt);
        data.append("updatedBy", this.form.updatedBy);
        data.append("res_sent", this.form.res_sent);
        data.append("macqbhxh", "04013");
        data.append("tencqbhxh", "Bảo hiểm xã hội thị xã Kỳ Anh");

        try {
          const response = await this.$store.dispatch("createUser", data);
          if (response.success == true) {
            this.isActive = false;
            // console.log(this.form);
            // Swal.fire({
            //   title: "Tạo thành công tài khoản",
            //   text: `Mật khẩu của bạn là (ghi nhớ mật khẩu trước khi tắt thông báo): ${passtranfomer}`,
            // });
            this.fetchDataUsers();
            // tạo chuỗi active
            // this.linkActive = `http://localhost:3000/${this.form.email}/actived`;
            this.linkActive = `http://ansinhbhxh.online:4042/${this.form.email}/actived`;
            //   // gửi mail kích hoạt và mật khẩu gọi API send mail
            const data_send_mail = {
              email: this.form.email,
              subject: `Mail kích hoạt tài khoản đăng ký sử dụng phần mềm hỗ trợ Tổ chức dịch vụ thu`,
              content: `
              <p>Xin chào bạn ${this.form.cccd}!</p>
              <p>Chúng tôi đã nhận được đăng ký sử dụng phần mềm từ bạn hoặc cá nhân tổ chức nào đó lấy thông tin email của bạn để đăng ký (nếu trường hợp không phải là bạn thì bạn hãy bỏ qua email này và không bấm vào link kích hoạt mà gửi email phản hồi lại cho chúng tôi thông qua email sonthucompany@gmail.com)</p>
              <hr />
              <p>Bạn đã đăng ký thành công tài khoản sử dụng phần mềm kê khai dành cho tổ chức dịch vụ thu của chúng tôi. Cảm ơn bạn. Sau đây là thông tin tài khoản của bạn:</p>
              <ul>
                <li>Email: ${this.form.email}</li>
                <li>Username: ${this.form.cccd} (Đây là thông tin tài khoản dùng truy cập vào phần mềm)</li>
                <li>Password: ${passtranfomer} (Đây là mật khẩu đăng nhập vào phần mềm, tuyệt đối không tiết lộ hay chia sẽ cho bất kỳ ai)</li>
              </ul>
              <hr />
              <p>Cuối cùng để hoàn thành việc đăng ký sử dụng bạn hãy kích hoạt tài khoản bằng cách bấm vào link kích hoạt bên dưới (nếu chính bạn là người đã đăng ký sử dụng)</p>
              <p>Link kích hoạt tài khoản của bạn là: <a href="${this.linkActive}">Link kích hoạt tài khoản</a></p>
              <p>* LƯU Ý THỜI GIAN KÍCH HOẠT TỪ KHI TẠO TÀI KHOẢN LÀ 5 PHÚT. SAU 5 PHÚT LINK SẼ KHÔNG CÒN TỒN TẠI *</p>
            `,
            };

            // GỌI ENDPOINT SEND EMAIL ĐẾN CHO NGƯỜI ĐĂNG KÝ -- tạm khoá chức năng gửi mail
            // const res_send_mail = await this.$axios.post(
            //   `/api/nodemailer/email/send`,
            //   data_send_mail
            // );
            // console.log(res_send_mail.status == 200);
            // if (res_send_mail.status == 200) {
            //   // Khi gửi email thành công, dừng hiển thị biểu tượng loading
            //   this.isLoading = false;
            //   this.isActive = false;
            //   this.form = [];
            //   // console.log(this.form);
            //   Swal.fire({
            //     title: "Tạo thành công tài khoản",
            //     text: `Tên đăng nhập là: ${this.form.cccd}`,
            //     text: `Mật khẩu nhập là: ${passtranfomer}`,
            //   });
            //   this.fetchDataUsers();
            // }
            this.isLoading = false;
            this.isActive = false;
            Swal.fire({
              title: "Tạo thành công tài khoản",
              text: `Tên đăng nhập là: ${this.form.cccd}; Mật khẩu nhập là: ${passtranfomer}`,
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
