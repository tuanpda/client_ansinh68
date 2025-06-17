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
              >Quản lý biên lai điện tử</span
            >
          </div>
        </div>
      </div>

      <div class="box">
        <div class="columns">
          <div class="column">
            <label class="label">Nhóm tham gia</label>
            <div class="select is-small is-fullwidth">
              <select @change="handleChange">
                <option selected disabled>- Chọn trạng thái biên lai -</option>
                <option value="">Không chọn</option>
                <option value="1">Đã phê duyệt</option>
                <option value="0">Đã hủy</option>
              </select>
            </div>
          </div>
          <div class="column">
            <label class="label">Ngày kê khai (từ)</label
            ><input v-model="ngaykekhaitu" type="date" class="input is-small" />
          </div>
          <div class="column">
            <label class="label">Ngày kê khai (đến)</label
            ><input
              v-model="ngaykekhaiden"
              type="date"
              class="input is-small"
            />
          </div>
          <div class="column">
            <label class="label">Mã số BHXH</label
            ><input v-model="masobhxh" type="text" class="input is-small" />
          </div>
          <div class="column">
            <label class="label">Họ tên</label
            ><input v-model="hoten" type="text" class="input is-small" />
          </div>
          <div class="column">
            <label class="label">Đại lý</label
            ><input
              :disabled="isDiemthu"
              v-model="tendaily"
              type="text"
              class="input is-small"
            />
          </div>
          <div class="column">
            <label class="label">Loại hình</label
            ><input v-model="loaihinh" type="text" class="input is-small" />
          </div>
        </div>
        <hr class="navbar-divider" />
        <footer class="has-text-right">
          <div class="buttons is-right">
            <button
              @keyup.enter="findHanthe(1)"
              @click="filterData(1)"
              class="button is-success is-small"
            >
              <span class="icon">
                <i class="fas fa-search"></i>
              </span>
              <span>Tìm kiếm biên lai điện tử</span>
            </button>
          </div>
        </footer>
      </div>

      <div style="margin-top: 20px">
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead style="font-weight: bold">
              <tr style="font-size: small; background-color: #faf0e6">
                <!-- <td rowspan="2" style="text-align: center">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleAll"
                  />
                </td> -->
                <td rowspan="2" style="text-align: center; width: 3%">STT</td>
                <td rowspan="2" style="text-align: center">_ID</td>
                <td style="text-align: center">Trạng thái</td>
                <td style="text-align: center">Biên lai</td>
                <td rowspan="2" style="text-align: center">Ngày biên lai</td>
                <td rowspan="2" style="text-align: center">Mã đại lý</td>
                <td rowspan="2" style="text-align: center">Tên đại lý</td>
                <td rowspan="2" style="text-align: center">
                  Tên người xuất biên lai
                </td>
                <td rowspan="2" style="text-align: center">Loại hình</td>
                <td rowspan="2" style="text-align: center">Mã số BHXH</td>
                <td rowspan="2" style="text-align: center">Họ tên</td>
                <td rowspan="2" style="text-align: center">Ngày sinh</td>
                <td rowspan="2" style="text-align: center">Giới tính</td>
                <td rowspan="2" style="text-align: center">CCCD</td>
                <td rowspan="2" style="text-align: center">Số tiền</td>
              </tr>
            </thead>
            <tbody>
              <tr
                style="font-size: small"
                v-for="(item, index) in data_kekhai"
                :key="index"
              >
                <!-- <td style="text-align: center">
                  <input
                    class=""
                    type="checkbox"
                    v-model="selectedItems"
                    :value="item"
                    :disabled="
                      item.status_naptien === true || item.trangthai === 1
                    "
                  />
                </td> -->

                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="">{{ item._id }}</td>
                <td style="text-align: center">
                  <template v-if="item.active === true">
                    <span style="font-weight: 700; color: #ffc107"
                      >Đã phê duyệt</span
                    >
                  </template>
                  <template v-else>
                    <span style="font-weight: 700; color: #ffc107"
                      >Đã huỷ hoặc chưa duyệt</span
                    >
                  </template>
                </td>
                <td style="text-align: center">
                  <a @click="xemBienLai(item)">
                    <span style="color: #ff69b4" class="icon is-small is-left">
                      <i class="fas fa-print"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center">{{ item.ngaybienlai }}</td>
                <td style="text-align: center">{{ item.madaily }}</td>
                <td style="text-align: left">{{ item.tendaily }}</td>
                <td style="text-align: left">{{ item.nguoithutien }}</td>
                <td style="text-align: center">{{ item.loaihinh }}</td>
                <td style="text-align: center">{{ item.masobhxh }}</td>
                <td style="text-align: left">{{ item.hoten }}</td>
                <td style="text-align: center">{{ item.ngaysinh }}</td>
                <td style="text-align: center">{{ item.gioitinh }}</td>
                <td style="text-align: center">{{ item.cccd }}</td>
                <td style="text-align: center">
                  {{ item.sotien | formatNumber }}
                </td>
              </tr>
            </tbody>
          </table>
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

      <!-- Biểu tượng loading -->
      <div v-if="isLoading" class="loading-overlay">
        <!-- Biểu tượng loading -->
        <div class="loading-spinner"></div>
        <span>waitting some minute ...</span>
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
      trangthai: "", // trạng thái biên lai
      ngaykekhaiden: today,
      ngaykekhaitu: today,
      masobhxh: "",
      hoten: "",
      tendaily: "",
      loaihinh: "",

      madaily: "",
      isDiemthu: false,

      data_kekhai_details: [],
      isRoleSent: false,

      selectedItem: {},

      editKey: 0,

      selectedItems: [], // chứa danh sách các dòng đã được chọn
      selectAll: false,

      dulieuPheduyet: [],
      dulieuHuyPheDuyet: [],
      isLoading: false,
    };
  },

  // mounted() {
  //   this.getDateTime();
  //   this.getDmDiemthu();
  //   this.isRoleSent = this.$auth.user.res_sent;
  //   // console.log(this.$auth.user.res_sent);
  //   if (this.$auth.user.nvcongty == 0) {
  //     this.madaily = this.$auth.user.madaily;
  //     this.diemthu = this.$auth.user.tendaily;
  //     this.isDiemthu = true;
  //   }
  // },

  watch: {
    selectedItems(newVal) {
      this.selectAll = newVal.length === this.data_kekhai.length;
    },
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

    this.getDateTime();
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },

    totalSoTien() {
      if (this.data_xuatmau && this.data_xuatmau.length > 0) {
        return this.data_xuatmau.reduce((acc, item) => {
          // Xóa tất cả dấu phẩy và sau đó chuyển đổi thành số
          const sotienStr = item.sotien.toString().replace(/,/g, ""); // Loại bỏ dấu phẩy
          let numericValue = parseFloat(sotienStr); // Chuyển thành số

          if (isNaN(numericValue)) {
            numericValue = 0; // Xử lý nếu giá trị không hợp lệ
          }

          return acc + numericValue; // Cộng vào tổng
        }, 0);
      }
      return 0; // Trường hợp không có dữ liệu
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
    // toggleAll() {
    //   if (this.selectAll) {
    //     // Lấy toàn bộ các dòng, không lọc gì nữa
    //     this.selectedItems = [...this.data_kekhai];
    //     // console.log(this.selectedItems);
    //   } else {
    //     this.selectedItems = [];
    //   }
    // },

    toggleAll() {
      if (this.selectAll) {
        // Chỉ thêm các item thỏa điều kiện vào selectedItems
        // console.log(typeof this.data_kekhai[0].trangthai);
        // trangthai kiểu number còn status_naptien kiểu boolean

        this.selectedItems = this.data_kekhai.filter(
          (item) => item.status_naptien === false && item.trangthai === 0
        );
      } else {
        // Bỏ chọn tất cả
        this.selectedItems = [];
      }
    },

    validateMonthYear() {
      const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // Định dạng MM/YYYY
      if (!regex.test(this.kykekhai)) {
        this.kykekhai = ""; // Xóa giá trị nếu không đúng định dạng
        alert("Định dạng không đúng. Vui lòng nhập MM/YYYY.");
      }
    },

    async getDmDiemthu() {
      const res = await this.$axios.get(`/api/kekhai/danhmucdaily`);
      // console.log(res);
      this.dtaDiemthu = res.data;
    },

    formatCurrency(text) {
      const number = parseFloat(text);
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },

    formatISODateToDMY(isoDateString) {
      const date = new Date(isoDateString);

      // Lấy ngày, tháng và năm từ đối tượng Date
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      // Tạo chuỗi ngày tháng dd/mm/yyyy
      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },

    getDateTime() {
      const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
      const kyKeKhai = nowInVietnam.toFormat("MM/yyyy");

      // Lấy các phần tử riêng lẻ
      const year = nowInVietnam.year; // Năm
      const month = nowInVietnam.month; // Tháng
      const day = nowInVietnam.day; // Ngày
      const hour = nowInVietnam.hour; // Giờ
      const minute = nowInVietnam.minute; // Phút
      const second = nowInVietnam.second; // Giây

      this.kykekhai = kyKeKhai;
    },

    async handleChange(event) {
      const selectedValue = event.target.value; // Lấy giá trị của option được chọn
      // console.log("Selected value:", selectedValue);
      this.trangthai = selectedValue;
      // console.log(this.loaihinh);
    },

    async filterData(page) {
      // console.log(this.data_kekhai);
      // console.log(this.$auth.user);
      // Tách chuỗi theo dấu gạch ngang
      // const parts = this.tochuc.split("-");
      // const mst = parts[parts.length - 1]; // 2902141757
      // this.matochuc_mst = mst;
      // Xây dựng đường dẫn API dựa trên mã số thuế

      if (this.user.role == 2) {
        // const res = await this.$axios.get(
        //   `/api/kekhai/kykekhai-search-series-pagi-nvcty?kykekhai=${this.kykekhai}&page=${page}`
        // );
        try {
          this.isLoading = true;
          const res = await this.$axios.get(
            `/api/kekhai/bienlai-search?active=${this.trangthai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&masobhxh=${this.masobhxh}&hoten=${this.hoten}&tendaily=${this.tendaily}&loaihinh=${this.loaihinh}&page=${page}`
          );

          if (res.data.results.length > 0) {
            this.data_kekhai = res.data.results;
            this.totalPages = res.data.info.pages;
            this.currentPage = page;
            this.isLoading = false;
          } else {
            this.data_kekhai = [];
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
              title: `Không tìm thấy hồ sơ`,
            });
            this.isLoading = false;
          }
        } catch (error) {
          this.data_kekhai = [];
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
            title: `Có lỗi xảy ra`,
          });
          this.isLoading = false;
        }
      } else {
        try {
          const res = await this.$axios.get(
            `/api/kekhai/bienlai-search-diemthu?madaily=${this.madaily}&active=${this.trangthai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&masobhxh=${this.masobhxh}&hoten=${this.hoten}&loaihinh=${this.loaihinh}&page=${page}`
          );
          if (res.data.results.length > 0) {
            this.data_kekhai = res.data.results;
            this.totalPages = res.data.info.pages;
            this.currentPage = page;
          } else {
            this.data_kekhai = [];
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
              title: `Không tìm thấy hồ sơ`,
            });
          }
        } catch (error) {
          this.data_kekhai = [];
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
            title: `Có lỗi xảy ra`,
          });
        }
      }
    },

    closeDanhsachduyet() {
      this.selectedItems = [];
      this.dulieuPheduyet = [];
      this.dulieuHuyPheDuyet = [];
      this.isActive = false;
    },

    closeDanhsachhuyDuyet() {
      this.selectedItems = [];
      this.dulieuPheduyet = [];
      this.dulieuHuyPheDuyet = [];
      this.isActive_fix = false;
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

    async xemBienLai(item) {
      // console.log(item.hosoIdentity);

      try {
        const res = await this.$axios.get(
          `/api/kekhai/view-item-bienlai?hosoIdentity=${item.hosoIdentity}`
        );

        // console.log(res);

        const hs = res.data.hs;
        if (hs && hs.urlNameInvoice) {
          const fileName = `${hs.sobienlai}_${encodeURIComponent(
            hs.hoten
          )}.pdf`;
          const pdfUrl = `http://14.224.148.17:4042/bienlaidientu/${hs.urlNameInvoice}.pdf`;
          // const pdfUrl = `http://localhost:1970/bienlaidientu/${hs.urlNameInvoice}.pdf`;
          // console.log(pdfUrl);

          window.open(pdfUrl, "_blank");
        } else {
          console.warn("Thiếu thông tin số biên lai hoặc họ tên!");
          this.$swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không lấy được thông tin biên lai.",
          });
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        this.$swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể kết nối đến máy chủ.",
        });
      }
    },

    capitalizeFirstLetter(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
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
