<template>
  <div class="column">
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #198754" class="icon is-small is-left">
              <i class="far fa-calendar-alt"></i>
            </span>
            <span style="font-weight: bold; color: #198754"
              >Tra cứu hạn thẻ</span
            >
          </div>
        </div>
      </div>

      <div class="box">
        <div class="columns">
          <div class="column">
            <label class="label">Mã số BHXH</label
            ><input
              v-model="soSoBhxh"
              type="text"
              class="input is-small"
              placeholder="Nhập vào mã số BHXH cần tìm kiếm"
              @keyup.enter="findHanthe(1)"
            />
          </div>
          <div class="column">
            <label class="label">Họ tên</label
            ><input
              v-model="hoTen"
              type="text"
              class="input is-small"
              placeholder="Nhập vào họ tên đầy đủ"
              @keyup.enter="findHanthe(1)"
            />
          </div>
        </div>
        <div class="columns"></div>
        <hr class="navbar-divider" />
        <footer class="has-text-right">
          <button @click="findHanthe(1)" class="button is-success is-small">
            <span class="icon">
              <i class="fas fa-search"></i>
            </span>
            <span>Tìm kiếm</span>
          </button>
        </footer>
      </div>

      <div style="margin-top: 20px">
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead style="font-weight: bold">
              <tr style="font-size: small; background-color: #faf0e6">
                <td rowspan="2" style="text-align: center; width: 3%">STT</td>
                <td rowspan="2" style="text-align: center">Mã số BHXH</td>
                <td style="text-align: center">Họ tên</td>
                <td style="text-align: center">Ngày sinh</td>
                <td rowspan="2" style="text-align: center">Giới tính</td>
                <td rowspan="2" style="text-align: center">Mã đối tượng</td>
                <td rowspan="2" style="text-align: center">Mã đơn vị thu</td>
                <td rowspan="2" style="text-align: center">Từ ngày</td>
                <td rowspan="2" style="text-align: center">Đến ngày</td>
                <td rowspan="2" style="text-align: center">Địa chỉ</td>
              </tr>
            </thead>
            <tbody>
              <tr
                style="font-size: small"
                v-for="(item, index) in dulieuthe"
                :key="index"
              >
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="text-align: center">{{ item.soSoBhxh }}</td>
                <td style="text-align: center">{{ item.hoTen }}</td>
                <td style="text-align: center">{{ item.ngaySinh }}</td>
                <td style="text-align: center">{{ item.gioiTinh }}</td>
                <td style="text-align: center">{{ item.maDoiTuong }}</td>
                <td style="text-align: center">{{ item.maDonViThu }}</td>
                <td style="text-align: center">{{ item.tuNgay }}</td>
                <td style="text-align: center">{{ item.denNgay }}</td>
                <td style="text-align: left">{{ item.diaChi }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Phân trang -->
        <div v-if="dulieuthe.length > 0" style="margin-top: 10px">
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
        <!-- Biểu tượng loading -->
        <div v-if="isLoading" class="loading-overlay">
          <!-- Biểu tượng loading -->
          <div class="loading-spinner"></div>
          <span>waitting some minute ...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExportExcel_Viettel from "@/components/exportExecl/viettel";
import ExportExcel_Vnpt from "@/components/exportExecl/vnpt";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
import * as XLSX from "xlsx";
const { DateTime } = require("luxon");
import jsPDF from "jspdf";
import "~/assets/font/OpenSans-Light-normal";
import "~/assets/font/OpenSans-SemiBold-normal";
import "~/assets/font/OpenSans-Bold-normal";
import "~/assets/font/OpenSans_SemiCondensed-Italic-normal";
import "~/assets/font/OpenSans-ExtraBold-normal";
import "~/assets/font/OpenSans_Condensed-Bold-normal";
import "~/assets/font/OpenSans-Regular-normal";
import "~/assets/font/font-times-new-roman-normal";
import "~/assets/font/Times New Roman Bold-normal";

import backgroundImage from "~/assets/images/bhxh.png";
import qrcode from "~/assets/images/QR-BHXH.png";

import num2words from "vn-num2words";

import editAR from "@/components/nghiepvu/editAR";

export default {
  name: "DanhsachKekhaiPage",
  components: {
    ExportExcel_Viettel,
    ExportExcel_Vnpt,
    editAR,
  },

  data() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    return {
      // pagi
      currentPage: 1,
      totalPages: 1,

      isLoading: false,

      hoTen: "",
      soSoBhxh: "",
      dulieuthe: [],
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
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.findHanthe(this.currentPage - 1);
      }
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.findHanthe(this.currentPage + 1);
      }
    },

    goToPage(page) {
      this.findHanthe(page); // Di chuyển đến trang được chỉ định
    },

    async findHanthe(page) {
      this.isLoading = true;
      const res = await this.$axios.get(
        `/api/nguoihuong/tim-kiem-thong-tin-han-the?page=${page}&hoTen=${this.hoTen}&soSoBhxh=${this.soSoBhxh}`
      );
      console.log(res.data.results.length);
      if (res.data.results.length > 0) {
        this.dulieuthe = res.data.results;
        this.totalPages = res.data.info.pages;
        this.currentPage = page; // Cập nhật trang hiện tại
        this.isLoading = false;
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
