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
              >Tìm kiếm hồ sơ kê khai</span
            >
          </div>
        </div>
      </div>

      <div class="box">
        <div class="columns">
          <!-- <div class="column">
            <label class="label">Điểm thu</label>
            <div class="autocomplete">
              <input
                class="input is-small is-danger"
                type="text"
                v-model="diemthu"
                @input="onInput"
                :disabled="isDiemthu"
              />
              <div class="autocomplete-items" v-if="suggestions.length">
                <div
                  class="autocomplete-item"
                  v-for="suggestion in suggestions"
                  @click="selectSuggestion(suggestion)"
                >
                  {{ suggestion }}
                </div>
              </div>
            </div>
          </div> -->
          <div class="column">
            <label class="label">Nhóm tham gia</label>
            <div class="select is-small is-fullwidth">
              <select @change="handleChange">
                <option selected disabled>- Chọn loại hình -</option>
                <option value="">Không chọn</option>
                <option value="AR">Bảo hiểm y tế - Nông lâm - MSTB</option>
                <option value="BI">Bảo hiểm y tế - HGĐ</option>
                <option value="IS">Bảo hiểm xã hội tự nguyện</option>
                <option value="IL">
                  Người tham gia lực lượng An ninh cơ sở
                </option>
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
            <label class="label">Kỳ Kê khai</label>
            <input
              v-model="kykekhai"
              @blur="validateMonthYear"
              type="text"
              placeholder="MM/YYYY"
              class="input is-small"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <label class="label">Đợt Kê khai</label>
            <div class="input-group">
              <input
                type="number"
                min="1"
                max="12"
                class="input is-small"
                placeholder="Đợt kê khai của hồ sơ"
                v-model="dotkekhai"
              />
            </div>
          </div>
          <div class="column">
            <label class="label">Số hồ sơ</label
            ><input
              v-model="sohoso"
              type="text"
              class="input is-small"
              placeholder="Số hồ sơ đã nạp"
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
        <div class="columns">
          <!-- <div class="column is-2">
            <label class="label">Nhóm tham gia</label>
            <div class="select is-small is-fullwidth">
              <select @change="handleChange">
                <option selected disabled>- Chọn loại hình -</option>
                <option value="BI">Bảo hiểm y tế</option>
                <option value="AR">Bảo hiểm y tế - HGĐ</option>
                <option value="IS">Bảo hiểm xã hội tự nguyện</option>
              </select>
            </div>
          </div> -->
        </div>
        <hr class="navbar-divider" />
        <footer class="has-text-right">
          <div class="buttons is-right">
            <button @click="filterData(1)" class="button is-success is-small">
              <span class="icon">
                <i class="fas fa-search"></i>
              </span>
              <span>Tìm kiếm hồ sơ</span>
            </button>

            <button
              :disabled="user.role !== 2"
              @click="xacNhanBienLai()"
              class="button is-small is-danger"
            >
              <span class="icon">
                <i class="fab fa-amazon-pay"></i>
              </span>
              <span>PHÊ duyệt hồ sơ</span>
            </button>

            <button
              :disabled="user.role !== 2"
              @click="xacHUYNhanBienLai()"
              class="button is-small is-warning"
            >
              <span class="icon">
                <i class="fab fa-amazon-pay"></i>
              </span>
              <span>HUỶ duyệt hồ sơ</span>
            </button>

            <!-- <ExportExcel_Viettel :data_execl="data_kekhai" />
            <ExportExcel_Vnpt :data_execl="data_kekhai" /> -->
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
                <td rowspan="2" style="text-align: center">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleAll"
                  />
                </td>
                <td rowspan="2" style="text-align: center; width: 3%">STT</td>
                <td rowspan="2" style="text-align: center">_ID</td>
                <td style="text-align: center">Trạng thái</td>
                <td style="text-align: center">Biên lai</td>
                <td rowspan="2" style="text-align: center">Số hồ sơ</td>
                <td rowspan="2" style="text-align: center">Mã đại lý</td>
                <td rowspan="2" style="text-align: center">Tên đại lý</td>
                <td rowspan="2" style="text-align: center">Họ tên</td>
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
                <td rowspan="2" style="text-align: center">Mô tả lỗi</td>
              </tr>
            </thead>
            <tbody>
              <tr
                style="font-size: small"
                v-for="(item, index) in data_kekhai"
                :key="index"
              >
                <td style="text-align: center">
                  <input
                    class=""
                    type="checkbox"
                    v-model="selectedItems"
                    :value="item"
                  />
                </td>

                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="">{{ item._id }}</td>
                <td style="text-align: center">
                  <template v-if="item.trangthai === 1">
                    <span style="font-weight: 700; color: #ffc107"
                      >Đã huỷ duyệt</span
                    ></template
                  >
                  <template v-else>
                    <template v-if="item.status_naptien == 1">
                      <span style="font-weight: 700; color: #00947e"
                        >Đã duyệt</span
                      >
                    </template>
                    <template v-else>
                      <span style="font-weight: 700; color: #dc3545"
                        >Chưa duyệt</span
                      >
                    </template>
                  </template>
                </td>
                <td style="text-align: center">
                  <a @click="xemBienLai(item)">
                    <span style="color: #ff69b4" class="icon is-small is-left">
                      <i class="fas fa-print"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center">{{ item.sohoso }}</td>
                <td style="text-align: center">{{ item.madaily }}</td>
                <td style="text-align: left">{{ item.tendaily }}</td>
                <td style="text-align: left">{{ item.tennguoitao }}</td>
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
                <td style="text-align: center">{{ item.motaloi }}</td>
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

      <!-- modal dữ liệu đã duyệt -->
      <div class="">
        <div :class="{ 'is-active': isActive }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card box">
            <section class="modal-card-body">
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Báo cáo trạng thái DUYỆT hồ sơ</span
                >
              </div>
              <div style="text-align: end">
                <button
                  @click="isActive = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>

              <div style="margin-top: 10px">
                <div v-if="dulieuPheduyet.length > 0" class="table_wrapper">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #fff8dc">
                        <td style="text-align: center; width: 3%">_ID HS</td>
                        <td style="text-align: center">Mã số BHXH</td>
                        <td style="text-align: center">Họ tên</td>
                        <td style="text-align: center">
                          Trạng thái gửi Phê duyệt vào hệ thống
                        </td>
                        <td style="text-align: center">Lỗi (nếu có)</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dulieuPheduyet"
                        :key="index"
                        style="font-size: small"
                      >
                        <td style="text-align: center; vertical-align: middle">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center; font-weight: 500">
                          {{ item.masobhxh }}
                        </td>
                        <td style="font-weight: 500">
                          {{ item.hoten }}
                        </td>
                        <td style="text-align: center">
                          {{ item.status }}
                        </td>
                        <td style="text-align: center">
                          {{ item.error }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <!-- modal dữ liệu huỷ duyệt -->
      <div class="">
        <div :class="{ 'is-active': isActive_fix }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card box">
            <section class="modal-card-body">
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Báo cáo trạng thái HUỶ duyệt hồ sơ</span
                >
              </div>
              <div style="text-align: end">
                <button
                  @click="isActive_fix = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>

              <div style="margin-top: 10px">
                <div v-if="dulieuHuyPheDuyet.length > 0" class="table_wrapper">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #fff8dc">
                        <td style="text-align: center; width: 3%">_ID HS</td>
                        <td style="text-align: center">Mã số BHXH</td>
                        <td style="text-align: center">Họ tên</td>
                        <td style="text-align: center">
                          Trạng thái gửi HUỶ phê duyệt vào hệ thống
                        </td>
                        <td style="text-align: center">Lý do hủy duyệt</td>
                        <td style="text-align: center">Lỗi (nếu có)</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dulieuHuyPheDuyet"
                        :key="index"
                        style="font-size: small"
                      >
                        <td style="text-align: center; vertical-align: middle">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center; font-weight: 500">
                          {{ item.masobhxh }}
                        </td>
                        <td style="font-weight: 500">
                          {{ item.hoten }}
                        </td>
                        <td style="text-align: center">
                          {{ item.status }}
                        </td>
                        <td style="text-align: center">
                          {{ item.ghichu }}
                        </td>
                        <td style="text-align: center">
                          {{ item.error }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

      selectedItems: [], // chứa danh sách các dòng đã được chọn
      selectAll: false,

      dulieuPheduyet: [],
      dulieuHuyPheDuyet: [],
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
    this.getDmDiemthu();
    this.hosoLoitrave();
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

    handleClick(item) {
      if (item.status_hosoloi !== 1) return;
      this.vieweditHs(item);
    },
    // suggest điểm thu
    onInput() {
      if (!this.diemthu) {
        this.suggestions = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      this.suggestions = this.dtaDiemthu
        .map((c) => c.tenDiemThu)
        .filter((tenDiemThu) =>
          tenDiemThu.toLowerCase().includes(this.diemthu.toLowerCase())
        )
        .map((tenDiemThu) => tenDiemThu.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion(suggestion) {
      if (suggestion) {
        this.diemthu = suggestion.trim();
        this.suggestions = [];
      }
    },
    // end suggest điểm thu

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

    async hosoLoitrave() {
      const madaily = { madaily: this.dailyview };
      try {
        const res = await this.$axios.post(
          `/api/kekhai/hosoloitrave-diemthu`,
          madaily
        );
        // console.log(res);
        if (res.data.success == true) {
          this.listhsloi = res.data.hs;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async view_details(data) {
      this.data_kekhai_details = [];

      const rs = await this.$axios.get(
        `/api/kekhai/get-all-kekhai-xuatmau?sohoso=${data.sohoso}`
      );
      // console.log(rs.data.kekhai);
      this.data_kekhai_details = rs.data.kekhai;
      this.data_kekhai_details = this.data_kekhai_details.map((item) => ({
        ...item,
        isSent: false, // Gán trạng thái gửi mặc định là chưa gửi
      }));
      this.isActive_detail = true;
    },

    calculateEndDate(tuNgay, soThang) {
      // Chuyển đổi tuNgay từ chuỗi "dd/mm/yyyy" sang đối tượng Date
      const [day, month, year] = tuNgay.split("/").map(Number);
      let startDate = new Date(year, month - 1, day); // Month in Date is 0-based

      // Cộng thêm số tháng vào ngày bắt đầu
      startDate.setMonth(startDate.getMonth() + Number(soThang));

      // Trừ một ngày để có ngày cuối cùng của tháng trước tháng kết thúc
      startDate.setDate(startDate.getDate() - 1);

      // Lấy ngày, tháng, năm của ngày kết thúc
      let endDay = String(startDate.getDate()).padStart(2, "0");
      let endMonth = String(startDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
      let endYear = startDate.getFullYear();

      // Trả về ngày kết thúc dưới dạng "dd/mm/yyyy"
      return `${endDay}/${endMonth}/${endYear}`;
    },

    async handleChange(event) {
      const selectedValue = event.target.value; // Lấy giá trị của option được chọn
      // console.log("Selected value:", selectedValue);
      this.maloaihinh = selectedValue;
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
          // const res = await this.$axios.get(
          //   `/api/kekhai/kykekhai-search-hoso?kykekhai=${this.kykekhai}&dotkekhai=${this.dotkekhai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&sohoso=${this.sohoso}&masobhxh=${this.masobhxh}&hoten=${this.hoten}&tendaily=${this.diemthu}&maloaihinh=${this.maloaihinh}&page=${page}`
          // );
          // tạm thời bỏ điểm thu ra code ngày 07/5/2025
          const res = await this.$axios.get(
            `/api/kekhai/kykekhai-search-hoso?kykekhai=${this.kykekhai}&dotkekhai=${this.dotkekhai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&sohoso=${this.sohoso}&masobhxh=${this.masobhxh}&hoten=${this.hoten}&maloaihinh=${this.maloaihinh}&page=${page}`
          );
          // console.log(res);
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
      } else {
        try {
          const res = await this.$axios.get(
            `/api/kekhai/kykekhai-search-hoso-diemthu?kykekhai=${this.kykekhai}&dotkekhai=${this.dotkekhai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&sohoso=${this.sohoso}&masobhxh=${this.masobhxh}&hoten=${this.hoten}&madaily=${this.madaily}&maloaihinh=${this.maloaihinh}&page=${page}`
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

    // HÀM XÁC NHẬN HỒ SƠ KE KHAI CHO TRƯỜNG STATUS_NAPTIEN==1
    async xacNhanBienLai() {
      if (!this.selectedItems || this.selectedItems.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Chưa chọn hồ sơ",
          text: "Vui lòng chọn ít nhất một hồ sơ trước khi xác nhận.",
        });
        return;
      }

      const result = await Swal.fire({
        title: `Xác nhận PHÊ duyệt hồ sơ ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy gửi`,
      });

      if (result.isConfirmed) {
        let ketquaTongHop = [];

        for (const item of this.selectedItems) {
          try {
            const res = await this.$axios.post(
              "/api/kekhai/apply-invoice-status",
              {
                _id: item._id,
                hoten: item.hoten,
                masobhxh: item.masobhxh,
                hosoIdentity: item.hosoIdentity,
              }
            );

            if (res.data.success) {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                status: "✅ Thành công",
                message: res.data.message,
              });
            } else {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                status: "❌ Thất bại",
                error: res.data.message,
              });
            }
          } catch (error) {
            ketquaTongHop.push({
              _id: item._id,
              hoten: item.hoten,
              masobhxh: item.masobhxh,
              status: "❌ Lỗi hệ thống",
              error: error.response?.data?.message || error.message,
            });
          }
        }

        // Hiển thị kết quả ra console (bạn có thể dùng để show lên modal)
        this.dulieuPheduyet = ketquaTongHop;
        this.dulieuHuyPheDuyet = []; // Reset dữ liệu huỷ phê duyệt

        this.isActive = true;
      }
    },

    // HÀM HUỶ DUYỆT HỒ SƠ TRANGTHAI=1
    async xacHUYNhanBienLai1() {
      if (!this.selectedItems || this.selectedItems.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Chưa chọn hồ sơ",
          text: "Vui lòng chọn ít nhất một hồ sơ trước khi xác nhận.",
        });
        return;
      }

      const result = await Swal.fire({
        title: `Xác nhận HUỶ phê duyệt hồ sơ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy gửi`,
      });

      if (result.isConfirmed) {
        let ketquaTongHop = [];

        for (const item of this.selectedItems) {
          try {
            const res = await this.$axios.post(
              "/api/kekhai/cancel-invoice-status",
              {
                _id: item._id,
                hoten: item.hoten,
                masobhxh: item.masobhxh,
                hosoIdentity: item.hosoIdentity,
              }
            );

            if (res.data.success) {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                status: "✅ Thành công",
                message: res.data.message,
              });
            } else {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                status: "❌ Thất bại",
                error: res.data.message,
              });
            }
          } catch (error) {
            ketquaTongHop.push({
              _id: item._id,
              hoten: item.hoten,
              masobhxh: item.masobhxh,
              status: "❌ Lỗi hệ thống",
              error: error.response?.data?.message || error.message,
            });
          }
        }

        // Hiển thị kết quả ra console (bạn có thể dùng để show lên modal)
        // console.table(ketquaTongHop);
        this.dulieuHuyPheDuyet = ketquaTongHop;
        this.dulieuPheduyet = []; // Reset dữ liệu phê duyệt

        this.isActive_fix = true;
      }
    },

    async xacHUYNhanBienLai() {
      if (!this.selectedItems || this.selectedItems.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Chưa chọn hồ sơ",
          text: "Vui lòng chọn ít nhất một hồ sơ trước khi xác nhận.",
        });
        return;
      }

      const { value: lyDo, isConfirmed } = await Swal.fire({
        title: "Lý do hủy duyệt",
        input: "textarea",
        inputLabel: "Nhập lý do hủy duyệt hồ sơ",
        inputPlaceholder: "Nhập lý do tại đây...",
        inputAttributes: {
          "aria-label": "Nhập lý do hủy duyệt hồ sơ",
        },
        showCancelButton: true,
        confirmButtonText: "Xác nhận hủy duyệt",
        cancelButtonText: "Hủy",
        inputValidator: (value) => {
          if (!value) {
            return "Bạn phải nhập lý do HỦY hồ sơ này!";
          }
        },
      });

      if (isConfirmed && lyDo) {
        // Thực hiện xử lý với lý do
        console.log("Lý do hủy duyệt:", lyDo);

        let ketquaTongHop = [];

        for (const item of this.selectedItems) {
          try {
            const res = await this.$axios.post(
              "/api/kekhai/cancel-invoice-status",
              {
                _id: item._id,
                hoten: item.hoten,
                masobhxh: item.masobhxh,
                ghichu: lyDo,
              }
            );

            if (res.data.success) {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                ghichu: res.data.data.ghichu,
                status: "✅ Thành công",
                message: res.data.message,
              });
            } else {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                ghichu: res.data.data.ghichu,
                status: "❌ Thất bại",
                error: res.data.message,
              });
            }
          } catch (error) {
            ketquaTongHop.push({
              _id: item._id,
              hoten: item.hoten,
              masobhxh: item.masobhxh,
              ghichu: res.data.data.ghichu,
              status: "❌ Lỗi hệ thống",
              error: error.response?.data?.message || error.message,
            });
          }
        }

        // Hiển thị kết quả ra console (bạn có thể dùng để show lên modal)
        // console.table(ketquaTongHop);
        this.dulieuHuyPheDuyet = ketquaTongHop;
        this.dulieuPheduyet = []; // Reset dữ liệu phê duyệt

        this.isActive_fix = true;
      }
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

    exportToExcel() {
      if (this.data_kekhai.length == 0) {
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
          title: `Chưa có dữ liệu hồ sơ`,
        });
      } else {
        // 1. Chuyển đổi mảng dữ liệu thành worksheet
        const worksheet = XLSX.utils.json_to_sheet(this.data_kekhai);

        // 2. Tạo workbook và thêm worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        // 3. Xuất file Excel
        XLSX.writeFile(workbook, "hosokekhai.xlsx");
      }
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
          const pdfUrl = `http://14.224.129.177:1970/bienlaidientu/${hs.urlNameInvoice}.pdf`;
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

    async inBienLaiDientu(item) {
      try {
        const res = await this.$axios.get(
          `/api/kekhai/view-item-bienlai?hosoIdentity=${item.hosoIdentity}`
        );

        const hs = res.data.hs;
        if (hs && hs.sobienlai && hs.hoten) {
          const fileName = `${hs.sobienlai}_${encodeURIComponent(
            hs.hoten
          )}.pdf`;
          const pdfUrl = `http://27.73.37.94:4042/bienlaidientu/${fileName}`;
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

    async inBienLaiDientu(data) {
      // console.log(data);

      // const res = await this.$axios(
      //   `/api/kekhai/bienlaidientu?_id_hskk=${item._id}&hosoIdentity=${item.hosoIdentity}`
      // );
      // // console.log(res.data[0]);
      // let data = res.data[0];
      // bỏ đoạn này do in biên lai khi gửi lên cổng code ngày 08/5/2025

      const doc = new jsPDF({
        orientation: "l",
        format: "a5",
      });

      // Kích thước trang PDF
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Kích thước ảnh bạn muốn (ví dụ: 100mm x 70mm)
      const imageWidth = 100; // Chiều rộng của ảnh
      const imageHeight = 70; // Chiều cao của ảnh

      // Tính tọa độ để ảnh nằm chính giữa trang
      const x = (pageWidth - imageWidth) / 2; // Căn giữa theo chiều ngang
      const y = (pageHeight - imageHeight) / 2; // Căn giữa theo chiều dọc

      // Thêm ảnh vào PDF
      doc.addImage(backgroundImage, "PNG", x, y, imageWidth, imageHeight);

      // add the font to jsPDF
      doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
      doc.setFont("OpenSans-Bold", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#04368c");
      doc.text(`BẢO HIỂM XÃ HỘI LIÊN HUYỆN DIỄN CHÂU - NGHI LỘC`, 60, 10, {
        align: "center",
        fontWeight: "bold",
      });

      doc.setFontSize(12);
      doc.setTextColor("ff0000");
      doc.text(`CÔNG TY TNHH ASXH PHỦ DIỄN`, 60, 17, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
      doc.setFont("OpenSans-Bold", "bold");
      doc.setFontSize(10);
      doc.setTextColor("#04368c");
      doc.text(`Mẫu số: C45-BB `, 173, 11, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans_SemiCondensed-Italic-normal.ttf",
        "OpenSans_SemiCondensed-Italic-normal",
        "italic"
      );
      doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      doc.setFontSize(9);
      doc.setTextColor("#04368c");
      doc.text(`(Ban hành kèm theo Thông tư số 107/2017/TT-BTC `, 175, 15, {
        align: "center",
        fontWeight: "bold",
      });
      doc.text(`ngày 10/10/2017 của Bộ Tài chính) `, 175, 19, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(20);
      doc.setTextColor("#dc143c");
      doc.text(`BIÊN LAI THU TIỀN `, 105, 35, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans_SemiCondensed-Italic-normal.ttf",
        "OpenSans_SemiCondensed-Italic-normal",
        "italic"
      );
      doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      doc.setFontSize(9);
      doc.setTextColor("#00008b");
      doc.text(
        `Do ASXH Phủ Diễn tổ chức được Bảo hiểm xã hội uỷ quyền thu phát hành. `,
        105,
        41,
        {
          align: "center",
          fontWeight: "bold",
        }
      );

      doc.setFontSize(9);
      doc.setTextColor("#00008b");
      doc.text(`Ngày: `, 155, 50, {
        fontWeight: "bold",
      });
      doc.text(`${data.ngaybienlai}`, 165, 50, {
        fontWeight: "bold",
      });

      // const dateTimeString = data.ngaybienlai;
      // // Tách chuỗi ngày tháng theo định dạng
      // const parts = dateTimeString.split(" ")[0].split("-"); // Lấy phần ngày và tách theo dấu "-"
      // // Lấy giá trị năm
      // const year = parts[2];

      const year = data.ngaybienlai.split("-")[2].split(" ")[0];

      doc.text(`Ký hiệu: `, 155, 55, {
        fontWeight: "bold",
      });
      doc.text(`${data.maloaihinh}-${data.maDaiLy}-${year}`, 165, 55, {
        fontWeight: "bold",
      });

      doc.text(`Số: `, 155, 60, {
        fontWeight: "bold",
      });
      doc.text(`${data.sobienlai}`, 165, 60, {
        fontWeight: "bold",
      });

      doc.addImage(qrcode, "PNG", 165, 25, 15, 15);
      //font-times-new-roman-normal
      const toadoXInfo = 10;
      const toadoYInfo = 60;
      doc.addFont(
        "Times New Roman Bold-normal.ttf",
        "Times New Roman Bold-normal",
        "bold"
      );
      doc.setFont("Times New Roman Bold-normal", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#04368c");
      doc.text(`Họ và tên người nộp:`, toadoXInfo, toadoYInfo, {
        fontWeight: "bold",
      });
      doc.text(
        `${data.hoTen} - Mã số BHXH: ${data.maSoBhxh}`,
        toadoXInfo + 43,
        toadoYInfo,
        {
          fontWeight: "bold",
        }
      );

      const diachi = data.tenquanhuyen + "; " + data.tentinh;
      // data.tothon + "; " +

      doc.text(`Địa chỉ: `, toadoXInfo, toadoYInfo + 8, {
        fontWeight: "bold",
      });
      doc.text(`${diachi}`, toadoXInfo + 16, toadoYInfo + 8, {
        fontWeight: "bold",
      });

      var noidungText = "";

      if (data.maloaihinh == "AR" || data.maloaihinh == "BI") {
        noidungText = `Tiền đóng BHYT, phương thức đóng ${data.soThang} tháng, từ ngày ${data.tuNgay} đến ngày ${data.denNgay}`;
      } else {
        noidungText = `Đóng tiền tham gia BHXH Tự nguyện`;
      }

      doc.text(`Nội dung: `, toadoXInfo, toadoYInfo + 16, {
        fontWeight: "bold",
      });
      doc.text(`${noidungText}`, toadoXInfo + 20, toadoYInfo + 16, {
        fontWeight: "bold",
      });

      const formattedMoney = Number(data.soTien).toLocaleString("vi-VN");
      // console.log(formattedMoney);

      doc.text(`Số tiền thu: `, toadoXInfo, toadoYInfo + 24, {
        fontWeight: "bold",
      });
      doc.text(`${formattedMoney}`, toadoXInfo + 24, toadoYInfo + 24, {
        fontWeight: "bold",
      });

      doc.text(`(Loại tiền): VNĐ `, toadoXInfo + 100, toadoYInfo + 24, {
        fontWeight: "bold",
      });

      // console.log(data.soTien);

      let tienbangchuText = num2words(data.soTien);
      let tienHoa = this.capitalizeFirstLetter(tienbangchuText);
      tienHoa += "đồng./.";

      // console.log(tienHoa);

      doc.text(`(Viết bằng chữ: ${tienHoa}) `, toadoXInfo, toadoYInfo + 32, {
        fontWeight: "bold",
      });
      // doc.text(`${tienHoa}`, toadoXInfo + 35, toadoYInfo + 32, {
      //   fontWeight: "bold",
      // });

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(13);
      doc.setTextColor("#04368c");
      doc.text(`NGƯỜI NỘP TIỀN`, toadoXInfo + 20, toadoYInfo + 43, {
        fontWeight: "bold",
      });

      doc.text(`NGƯỜI THU TIỀN`, toadoXInfo + 120, toadoYInfo + 43, {
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans-Regular-normal.ttf",
        "OpenSans-Regular-normal",
        "bold"
      );
      doc.setFont("OpenSans-Regular-normal", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#dc143c");
      // doc.text(
      //   `Ký bởi: CÔNG TY TNHH ASXH PHỦ DIỄN`,
      //   toadoXInfo + 100,
      //   toadoYInfo + 53,
      //   {
      //     fontWeight: "bold",
      //   }
      // );
      // doc.text(
      //   `Ngày ký: 18/12/2024 15:15:09`,
      //   toadoXInfo + 110,
      //   toadoYInfo + 58,
      //   {
      //     fontWeight: "bold",
      //   }
      // );

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#04368c");
      doc.text(
        `Nhân viên thu: ${this.user.name}`,
        toadoXInfo + 107,
        toadoYInfo + 70,
        {
          fontWeight: "bold",
        }
      );

      doc.addFont(
        "OpenSans_SemiCondensed-Italic-normal.ttf",
        "OpenSans_SemiCondensed-Italic-normal",
        "italic"
      );
      doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      doc.setFontSize(10);
      doc.setTextColor("#04368c");
      doc.text(`Mã xác nhận: `, toadoXInfo - 8, toadoYInfo + 58, {
        fontWeight: "bold",
      });

      // console.log(data.maXacNhan);

      doc.setFontSize(11);
      doc.setTextColor("#dc143c");
      doc.text(`${data.maXacNhan} `, toadoXInfo + 14, toadoYInfo + 58, {
        fontWeight: "bold",
      });

      doc.setFontSize(10);
      doc.setTextColor("#04368c");
      doc.text(
        `Sử dụng để tra cứu thông tin ghi nhận đóng trên Cổng thông tin điện tử`,
        toadoXInfo - 8,
        toadoYInfo + 62,
        {
          fontWeight: "bold",
        }
      );

      doc.text(
        `Người tham gia có thể sử dụng ứng dụng VSSID của Bảo hiểm Xã hội`,
        toadoXInfo - 8,
        toadoYInfo + 70,
        {
          fontWeight: "bold",
        }
      );
      doc.text(
        `Việt Nam để theo dõi quá trính đóng BHXH, sử dụng thay thế thẻ BHYT`,
        toadoXInfo - 8,
        toadoYInfo + 75,
        {
          fontWeight: "bold",
        }
      );
      doc.text(
        `https://baohiemxahoi.gov.vn/gioithieu/pages/tai-ung-dung-vssid.aspx`,
        toadoXInfo - 8,
        toadoYInfo + 80,
        {
          fontWeight: "bold",
        }
      );

      // Lưu file PDF trên một tab mới
      const tenbienlai = `${data.sobienlai}_${data.hoTen}`;
      // doc.output("dataurlnewwindow");
      // window.open(pdfURL, tenbienlai);
      // doc.save("a4.pdf");

      const pdfBlob = doc.output("blob");

      const formData = new FormData();
      formData.append("pdf", pdfBlob, `${tenbienlai}.pdf`);

      // Gửi về backend
      await this.$axios.post("/api/kekhai/upload-bienlai", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    capitalizeFirstLetter(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    async vieweditHs(item) {
      this.isActive_fix = true;
      // console.log(data);
      // this.selectedItem = item;
      this.selectedItem = JSON.parse(JSON.stringify(item)); // tạo bản sao để không ảnh hưởng dữ liệu gốc
      this.editKey = Date.now(); // tạo key mới để ép component con re-render
      // console.log(this.selectedItem);
    },

    closeModal() {
      this.isActive_fix = false;
      this.selectedItem = null;
      this.filterData(1);
    },

    async guiDulieuLenCongBhxhvn(data) {
      const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
      const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");

      // console.log(data);
      let matochucDvt = "";
      if (data.maloaihinh == "AR") {
        matochucDvt = "AR0013M";
      } else if (data.maloaihinh == "BI") {
        matochucDvt = "BI0007M";
      } else {
        matochucDvt = "IS0012M";
      }

      // thông tin biên lai
      const currentYear = new Date().getFullYear();
      // console.log(currentYear);

      const getCurrentSobienlai = await this.$axios.get(
        `/api/kekhai/sobienlai?namtaichinh=${currentYear}`
      );
      // console.log(getCurrentSobienlai.data.bienlai);
      let maxInvoiceStr = getCurrentSobienlai.data.bienlai || null;

      let nextInvoice = "";

      if (!maxInvoiceStr) {
        // Nếu chưa có biên lai năm nay → bắt đầu từ 0000001
        nextInvoice = "0000001";
      } else {
        const nextNumber = parseInt(maxInvoiceStr, 10) + 1;
        nextInvoice = String(nextNumber).padStart(7, "0");
      }

      const dataPost = {
        _id_hskk: data._id,
        hosoIdentity: data.hosoIdentity,
        maSoBhxh: data.masobhxh,
        hoTen: data.hoten,
        soCccd: data.cccd,
        ngaySinh: data.ngaysinh,
        gioiTinh: data.gioitinh,
        soDienThoai: data.dienthoai,
        loaiDt: data.tenloaihinh,
        soTien: data.sotien,
        soThang: data.maphuongthucdong,
        maToChucDvt: matochucDvt,
        tenToChucDvt: data.tentochuc,
        maNhanVienThu: "NVT" + data.cccd,
        tenNhanVienThu: this.user.name,
        maCqBhxh: this.user.macqbhxh,
        tenCqBhxh: this.user.tencqbhxh,
        keyfrombhvn: data.key,
        tuNgay: data.tungay,
        denNgay: data.denngay,
        tuThang: data.tuthang,
        denThang: data.denthang,
        maDaiLy: data.madaily,
        tenDaiLy: data.tendaily,
        soHoSo: data.sohoso,
        dotKeKhai: data.dotkekhai,
        kyKeKhai: data.kykekhai,
        ngayKeKhai: data.ngaykekhai,
        createdBy: this.user.username,
        sobienlai: nextInvoice,
        ngaybienlai: formattedDate,
        maloaihinh: data.maloaihinh,
        currentYear: currentYear,
        tothon: data.tothon,
        tenquanhuyen: data.tenquanhuyen,
        tentinh: data.tentinh,
      };

      // console.log(dataPost);

      const result = await Swal.fire({
        title: `Xác nhận gửi hồ sơ lên cổng BHXH VN ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        // const url = '10.0.119.10:8186/dvtService/api/DVT/insertThongtin'
        const url = `/api/kekhai/pushinfotoportbhxhvn`;

        const headers = {
          "Content-Type": "application/json",
          Charset: "utf-8",
        };

        try {
          // console.log("pushinfotoportbhxhvn");
          const response = await this.$axios.post(url, dataPost);
          // console.log(response);
          // response.data.data
          const resDatafromBHXHVN = {
            maLoi: response.data.data.maLoi,
            moTaLoi: response.data.data.moTaLoi,
            maXacNhan: response.data.data.maXacNhan,
            noiDung: response.data.data.noiDung,
          };

          // Kết hợp dataPost và resDatafromBHXHVN
          const combinedData = {
            ...dataPost,
            ...resDatafromBHXHVN,
          };

          // console.log(combinedData);

          if (response.data.data.maLoi == 0) {
            // ghi dữ liệu biên lai
            const ghibienlai = await this.$axios.post(
              `/api/kekhai/ghidulieubienlai`,
              combinedData
            );

            // lưu biên lai vào máy chủ
            await this.inBienLaiDientu(combinedData);

            // console.log("ghidulieubienlai");
            // console.log(ghibienlai);

            const result = await this.$axios.post(
              `/api/kekhai/saveresponsefrombhvntodb`,
              combinedData
            );

            // console.log("saveresponsefrombhvntodb");
            // console.log(result);
            if (result.data.success == true) {
              // Cập nhật trạng thái isSent
              data.isSent = true;

              // const Toast = Swal.mixin({
              //   toast: true,
              //   position: "top-end",
              //   showConfirmButton: false,
              //   timer: 3000,
              //   timerProgressBar: true,
              //   didOpen: (toast) => {
              //     toast.addEventListener("mouseenter", Swal.stopTimer);
              //     toast.addEventListener("mouseleave", Swal.resumeTimer);
              //   },
              // });
              // Toast.fire({
              //   icon: "success",
              //   title: "Đã gửi thông tin hồ sơ lên cổng thành công",
              // });

              Swal.fire({
                title: "Gửi thành công!",
                text: "Đã gửi thông tin hồ sơ lên cổng BHXH VN!",
                icon: "success",
              });

              // đổi trạng thái của hồ sơ trong kê khai
              let bodyRes = {};
              bodyRes = result.data.datares;
              // console.log(bodyRes);
              bodyRes._id = data._id;

              const resUpdate = await this.$axios.post(
                `/api/kekhai/updatestatushoso`,
                bodyRes
              );
              // console.log(resUpdate);

              this.view_details(data);
            }
          }
        } catch (error) {
          console.error("Error posting data:", error);
          throw error;
        }
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
