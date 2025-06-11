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
              >Hồ sơ đã được DUYỆT</span
            >
          </div>
        </div>
      </div>

      <div style="margin-top: 20px">
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead style="font-weight: bold">
              <tr style="font-size: small; background-color: #faf0e6">
                <td rowspan="2" style="text-align: center; width: 3%">STT</td>
                <td rowspan="2" style="text-align: center">_ID</td>
                <td rowspan="2" style="text-align: center">Số hồ sơ</td>
                <td rowspan="2" style="text-align: center">Mã đại lý</td>
                <td rowspan="2" style="text-align: center">Tên đại lý</td>
                <td rowspan="2" style="text-align: center">Loại hình</td>
                <td rowspan="2" style="text-align: center">Kỳ kê khai</td>
                <td rowspan="2" style="text-align: center">Ngày kê khai</td>
                <td rowspan="2" style="text-align: center">Mã số BHXH</td>
                <td rowspan="2" style="text-align: center">Họ tên</td>
                <td rowspan="2" style="text-align: center">Ngày sinh</td>
                <td rowspan="2" style="text-align: center">Giới tính</td>
                <td rowspan="2" style="text-align: center">CCCD</td>
                <td rowspan="2" style="text-align: center">Điện thoại</td>
                <td rowspan="2" style="text-align: center">Phương án</td>
                <td rowspan="2" style="text-align: center">Số tiền</td>
                <td rowspan="2" style="text-align: center">Từ ngày</td>
                <td rowspan="2" style="text-align: center">Số tháng</td>
                <td rowspan="2" style="text-align: center">Mức tiền đóng</td>
                <td rowspan="2" style="text-align: center">Từ tháng</td>
                <td rowspan="2" style="text-align: center">Đối tượng</td>
              </tr>
            </thead>
            <tbody>
              <tr
                style="font-size: small"
                v-for="(item, index) in data_kekhai"
                :key="index"
              >
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="">{{ item._id }}</td>

                <td
                  style="text-align: center; font-weight: 700; color: chocolate"
                >
                  {{ item.sohoso }}
                  <i
                    class="fas fa-copy"
                    style="margin-left: 8px; cursor: pointer; color: #555"
                    @click="copyToClipboard(item.sohoso)"
                    title="Copy số hồ sơ"
                  ></i>
                </td>
                <td style="text-align: center">{{ item.madaily }}</td>
                <td style="text-align: left">{{ item.tendaily }}</td>
                <td style="text-align: center">{{ item.maloaihinh }}</td>
                <td style="text-align: center">{{ item.kykekhai }}</td>
                <td style="text-align: center">{{ item.ngaykekhai }}</td>

                <td style="text-align: center">{{ item.masobhxh }}</td>
                <td style="text-align: center">{{ item.hoten }}</td>
                <td style="text-align: right">{{ item.ngaysinh }}</td>
                <td style="text-align: center">{{ item.gioitinh }}</td>
                <td style="text-align: center">{{ item.cccd }}</td>

                <td style="text-align: center">{{ item.dienthoai }}</td>
                <td style="text-align: center">{{ item.maphuongan }}</td>
                <td style="text-align: right; color: red; font-weight: 700">
                  {{ item.sotien | formatNumber }}
                </td>
                <td style="text-align: center">{{ item.tungay }}</td>
                <td style="text-align: center">{{ item.maphuongthucdong }}</td>

                <td style="text-align: right; color: red; font-weight: 700">
                  {{ item.muctiendong | formatNumber }}
                </td>
                <td style="text-align: center">{{ item.tuthang }}</td>
                <td style="text-align: center">{{ item.tendoituong }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top: 10px" class="total-sotien">
          Tổng số tiền:
          <span style="font-weight: 900; color: red">{{
            formatCurrency(totalSoTien)
          }}</span>
        </div>

        <!-- Phân trang -->
        <div v-if="data_kekhai.length > 0" style="margin-top: 10px">
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
      data_kekhai: [],
      data_xuatmau: [],
      isActive: false,
      isActive_detail: false,
      isActive_fix: false,
      isVtVnpt: false,

      // pagi
      currentPage: 1,
      totalPages: 1,

      // new code
      kykekhai: "",
      dotkekhai: "",
      ngaykekhaiden: today,
      ngaykekhaitu: today,
      sohoso: "",
      matochuc_mst: "",
      masobhxh: "",
      hoten: "",
      maloaihinh: "",

      data_kekhai_details: [],
      isRoleSent: false,

      // input suggest
      suggestions: [],
      suggestions_diemthu: [],
      diemthu: "",
      madaily: "",
      isDiemthu: false,

      dtaDiemthu: [],
      listhsloi: [],
      selectedItem: {},

      editKey: 0,
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

    this.getDataChuakekhai();
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },

    totalSoTien() {
      if (this.data_kekhai && this.data_kekhai.length > 0) {
        return this.data_kekhai.reduce((acc, item) => {
          if (item.status_naptien === true) {
            const sotienStr = item.sotien.toString().replace(/,/g, ""); // Loại bỏ dấu phẩy
            let numericValue = parseFloat(sotienStr); // Chuyển thành số

            if (isNaN(numericValue)) {
              numericValue = 0;
            }

            return acc + numericValue;
          }
          return acc; // Bỏ qua nếu status_naptien != 1
        }, 0);
      }
      return 0;
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
    copyToClipboard(text) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Đã copy số hồ sơ!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            console.error("Lỗi khi copy:", err);
            Swal.fire({
              icon: "error",
              title: "Không thể copy",
              text: "Vui lòng thử lại.",
            });
          });
      } else {
        // Fallback cho HTTP (hoặc trình duyệt cũ)
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Đã copy số hồ sơ!",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (err) {
          console.error("Fallback copy failed:", err);
          Swal.fire({
            icon: "error",
            title: "Không thể copy",
            text: "Vui lòng thử lại.",
          });
        }

        document.body.removeChild(textArea);
      }
    },

    async getDataChuakekhai() {
      if (this.user.role == 2) {
        try {
          const res = await this.$axios.get(`/api/kekhai/hosodadaylencongbhvn`);
          // console.log(res);
          if (res.data.success == true) {
            this.data_kekhai = res.data.hs;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const madaily = { madaily: this.dailyview };
        try {
          const res = await this.$axios.post(
            `/api/kekhai/hosodadaylencongbhvn-diemthu`,
            madaily
          );
          // console.log(res);
          if (res.data.success == true) {
            this.data_kekhai = res.data.hs;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    formatCurrency(text) {
      const number = parseFloat(text);
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },

    // pagi
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.filterData(this.currentPage - 1);
      }
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.filterData(this.currentPage + 1);
      }
    },

    goToPage(page) {
      this.filterData(page); // Di chuyển đến trang được chỉ định
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
