<template>
  <div class="column container">
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
            />
          </div>
          <div class="column">
            <label class="label">Họ tên</label
            ><input
              v-model="hoTen"
              type="text"
              class="input is-small"
              placeholder="Nhập vào họ tên đầy đủ"
            />
          </div>
        </div>
        <div class="columns"></div>
        <hr class="navbar-divider" />
        <footer class="has-text-right">
          <button @click="findHanthe" class="button is-success is-small">
            <span class="icon">
              <i class="fas fa-search"></i>
            </span>
            <span>Tìm kiếm hồ sơ</span>
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
                <td style="text-align: right">{{ item.diaChi }}</td>
              </tr>
            </tbody>
          </table>
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

      hoTen: "",
      soSoBhxh: "",
      dulieuthe: null,
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

    this.hosoLoitrave();
    this.findHanthe();
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

    async findHanthe() {
      const res = await this.$axios.get(
        `/api/kekhai/tim-dulieuthe?hoTen=${this.hoTen}&soSoBhxh=${this.soSoBhxh}`
      );

      this.dulieuthe = res.data.data;
      // console.log(this.dulieuthe);
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

    async guiDulieuLenCongBhxhvn(data) {
      // console.log(data);
      let matochucDvt = "";
      if (data.maloaihinh == "AR") {
        matochucDvt = "AR0013M";
      } else if (data.maloaihinh == "BI") {
        matochucDvt = "BI0007M";
      } else {
        matochucDvt = "IS0012M";
      }

      const dataPost = {
        hosoIdentity: data.hosoIdentity,
        maSoBhxh: data.masobhxh,
        hoTen: data.hoten,
        soCccd: data.cccd,
        ngaySinh: data.ngaysinh,
        gioiTinh: data.gioitinh,
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
        denNgay: this.calculateEndDate(data.tungay, data.maphuongthucdong),
        soHoSo: data.sohoso,
        dotKeKhai: data.dotkekhai,
        kyKeKhai: data.kykekhai,
        ngayKeKhai: data.ngaykekhai,
        createdBy: this.user.username,
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
          const response = await this.$axios.post(url, dataPost, { headers });
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
            const result = await this.$axios.post(
              `/api/kekhai/saveresponsefrombhvntodb`,
              combinedData
            );
            // console.log(result);
            if (result.data.success == true) {
              // Cập nhật trạng thái isSent
              data.isSent = true;

              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: "success",
                title: "Đã gửi thông tin hồ sơ lên cổng thành công",
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

    // async inBienLaiDientu(item) {
    //   // console.log(item);

    //   const res = await this.$axios(
    //     `/api/kekhai/bienlaidientuf?_id_hskk=${item._id}&hosoIdentity=${item.hosoIdentity}`
    //   );
    //   // console.log(res.data[0]);
    //   let data = res.data[0];

    //   const doc = new jsPDF({
    //     orientation: "l",
    //     format: "a5",
    //   });

    //   // Kích thước trang PDF
    //   const pageWidth = doc.internal.pageSize.getWidth();
    //   const pageHeight = doc.internal.pageSize.getHeight();

    //   // Kích thước ảnh bạn muốn (ví dụ: 100mm x 70mm)
    //   const imageWidth = 100; // Chiều rộng của ảnh
    //   const imageHeight = 70; // Chiều cao của ảnh

    //   // Tính tọa độ để ảnh nằm chính giữa trang
    //   const x = (pageWidth - imageWidth) / 2; // Căn giữa theo chiều ngang
    //   const y = (pageHeight - imageHeight) / 2; // Căn giữa theo chiều dọc

    //   // Thêm ảnh vào PDF
    //   doc.addImage(backgroundImage, "PNG", x, y, imageWidth, imageHeight);

    //   // add the font to jsPDF
    //   doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
    //   doc.setFont("OpenSans-Bold", "bold");
    //   doc.setFontSize(14);
    //   doc.setTextColor("#04368c");
    //   doc.text(`BẢO HIỂM XÃ HỘI HUYỆN DIỄN CHÂU`, 50, 10, {
    //     align: "center",
    //     fontWeight: "bold",
    //   });

    //   doc.setFontSize(14);
    //   doc.setTextColor("ff0000");
    //   doc.text(`CÔNG TY TNHH ASXH PHỦ DIỄN`, 48, 17, {
    //     align: "center",
    //     fontWeight: "bold",
    //   });

    //   doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
    //   doc.setFont("OpenSans-Bold", "bold");
    //   doc.setFontSize(10);
    //   doc.setTextColor("#04368c");
    //   doc.text(`Mẫu số: C45-BB `, 173, 11, {
    //     align: "center",
    //     fontWeight: "bold",
    //   });

    //   doc.addFont(
    //     "OpenSans_SemiCondensed-Italic-normal.ttf",
    //     "OpenSans_SemiCondensed-Italic-normal",
    //     "italic"
    //   );
    //   doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
    //   doc.setFontSize(9);
    //   doc.setTextColor("#04368c");
    //   doc.text(`(Ban hành kèm theo Thông tư số 107/2017/TT-BTC `, 175, 15, {
    //     align: "center",
    //     fontWeight: "bold",
    //   });
    //   doc.text(`ngày 10/10/2017 của Bộ Tài chính) `, 175, 19, {
    //     align: "center",
    //     fontWeight: "bold",
    //   });

    //   doc.addFont(
    //     "OpenSans-ExtraBold-normal.ttf",
    //     "OpenSans-ExtraBold-normal",
    //     "bold"
    //   );
    //   doc.setFont("OpenSans-ExtraBold-normal", "bold");
    //   doc.setFontSize(20);
    //   doc.setTextColor("#dc143c");
    //   doc.text(`BIÊN LAI THU TIỀN `, 105, 35, {
    //     align: "center",
    //     fontWeight: "bold",
    //   });

    //   doc.addFont(
    //     "OpenSans_SemiCondensed-Italic-normal.ttf",
    //     "OpenSans_SemiCondensed-Italic-normal",
    //     "italic"
    //   );
    //   doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
    //   doc.setFontSize(9);
    //   doc.setTextColor("#00008b");
    //   doc.text(
    //     `Do ASXH Phủ Diễn tổ chức được Bảo hiểm xã hội uỷ quyền thu phát hành. `,
    //     105,
    //     41,
    //     {
    //       align: "center",
    //       fontWeight: "bold",
    //     }
    //   );

    //   doc.setFontSize(9);
    //   doc.setTextColor("#00008b");
    //   doc.text(`Ngày: `, 155, 50, {
    //     fontWeight: "bold",
    //   });
    //   doc.text(`${data.ngaybienlai}`, 165, 50, {
    //     fontWeight: "bold",
    //   });

    //   const dateTimeString = data.ngaybienlai;
    //   // Tách chuỗi ngày tháng theo định dạng
    //   const parts = dateTimeString.split(" ")[0].split("-"); // Lấy phần ngày và tách theo dấu "-"
    //   // Lấy giá trị năm
    //   const year = parts[2];

    //   doc.text(`Ký hiệu: `, 155, 55, {
    //     fontWeight: "bold",
    //   });
    //   doc.text(`${data.loaihinh}-${data.madaily}-${year}`, 165, 55, {
    //     fontWeight: "bold",
    //   });

    //   doc.text(`Số: `, 155, 60, {
    //     fontWeight: "bold",
    //   });
    //   doc.text(`${data.sobienlai}`, 165, 60, {
    //     fontWeight: "bold",
    //   });

    //   doc.addImage(qrcode, "PNG", 165, 25, 15, 15);
    //   //font-times-new-roman-normal
    //   const toadoXInfo = 10;
    //   const toadoYInfo = 60;
    //   doc.addFont(
    //     "Times New Roman Bold-normal.ttf",
    //     "Times New Roman Bold-normal",
    //     "bold"
    //   );
    //   doc.setFont("Times New Roman Bold-normal", "bold");
    //   doc.setFontSize(12);
    //   doc.setTextColor("#04368c");
    //   doc.text(`Họ và tên người nộp:`, toadoXInfo, toadoYInfo, {
    //     fontWeight: "bold",
    //   });
    //   doc.text(
    //     `${data.hoten} - Mã số BHXH: ${data.masobhxh}`,
    //     toadoXInfo + 43,
    //     toadoYInfo,
    //     {
    //       fontWeight: "bold",
    //     }
    //   );

    //   const diachi =
    //     data.tothon + "; " + data.tenquanhuyen + "; " + data.tentinh;

    //   doc.text(`Địa chỉ: `, toadoXInfo, toadoYInfo + 8, {
    //     fontWeight: "bold",
    //   });
    //   doc.text(`${diachi}`, toadoXInfo + 16, toadoYInfo + 8, {
    //     fontWeight: "bold",
    //   });

    //   var noidungText = "";

    //   if (data.maloaihinh == "AR" || data.maloaihinh == "BI") {
    //     noidungText = `Tiền đóng BHYT, phương thức đóng ${data.maphuongthucdong} tháng, từ ngày ${data.tungay} đến ngày ${data.denngay}`;
    //   } else {
    //     noidungText = `Đóng tiền tham gia BHXH Tự nguyện`;
    //   }

    //   doc.text(`Nội dung: `, toadoXInfo, toadoYInfo + 16, {
    //     fontWeight: "bold",
    //   });
    //   doc.text(`${noidungText}`, toadoXInfo + 20, toadoYInfo + 16, {
    //     fontWeight: "bold",
    //   });

    //   const formattedMoney = Number(data.sotien).toLocaleString("vi-VN");

    //   doc.text(`Số tiền thu: `, toadoXInfo, toadoYInfo + 24, {
    //     fontWeight: "bold",
    //   });
    //   doc.text(`${formattedMoney}`, toadoXInfo + 24, toadoYInfo + 24, {
    //     fontWeight: "bold",
    //   });

    //   doc.text(`(Loại tiền): VNĐ `, toadoXInfo + 100, toadoYInfo + 24, {
    //     fontWeight: "bold",
    //   });

    //   let tienbangchuText = num2words(data.sotien);
    //   let tienHoa = this.capitalizeFirstLetter(tienbangchuText);
    //   tienHoa += "đồng./.";

    //   doc.text(`(Viết bằng chữ: ${tienHoa}) `, toadoXInfo, toadoYInfo + 32, {
    //     fontWeight: "bold",
    //   });
    //   // doc.text(`${tienHoa}`, toadoXInfo + 35, toadoYInfo + 32, {
    //   //   fontWeight: "bold",
    //   // });

    //   doc.addFont(
    //     "OpenSans-ExtraBold-normal.ttf",
    //     "OpenSans-ExtraBold-normal",
    //     "bold"
    //   );
    //   doc.setFont("OpenSans-ExtraBold-normal", "bold");
    //   doc.setFontSize(13);
    //   doc.setTextColor("#04368c");
    //   doc.text(`NGƯỜI NỘP TIỀN`, toadoXInfo + 20, toadoYInfo + 43, {
    //     fontWeight: "bold",
    //   });

    //   doc.text(`NGƯỜI THU TIỀN`, toadoXInfo + 120, toadoYInfo + 43, {
    //     fontWeight: "bold",
    //   });

    //   doc.addFont(
    //     "OpenSans-Regular-normal.ttf",
    //     "OpenSans-Regular-normal",
    //     "bold"
    //   );
    //   doc.setFont("OpenSans-Regular-normal", "bold");
    //   doc.setFontSize(12);
    //   doc.setTextColor("#dc143c");
    //   doc.text(
    //     `Ký bởi: CÔNG TY TNHH ASXH PHỦ DIỄN`,
    //     toadoXInfo + 100,
    //     toadoYInfo + 53,
    //     {
    //       fontWeight: "bold",
    //     }
    //   );
    //   doc.text(
    //     `Ngày ký: 18/12/2024 15:15:09`,
    //     toadoXInfo + 110,
    //     toadoYInfo + 58,
    //     {
    //       fontWeight: "bold",
    //     }
    //   );

    //   doc.addFont(
    //     "OpenSans-ExtraBold-normal.ttf",
    //     "OpenSans-ExtraBold-normal",
    //     "bold"
    //   );
    //   doc.setFont("OpenSans-ExtraBold-normal", "bold");
    //   doc.setFontSize(11);
    //   doc.setTextColor("#04368c");
    //   doc.text(
    //     `Nhân viên thu: ${this.user.name}`,
    //     toadoXInfo + 107,
    //     toadoYInfo + 70,
    //     {
    //       fontWeight: "bold",
    //     }
    //   );

    //   doc.addFont(
    //     "OpenSans_SemiCondensed-Italic-normal.ttf",
    //     "OpenSans_SemiCondensed-Italic-normal",
    //     "italic"
    //   );
    //   doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
    //   doc.setFontSize(10);
    //   doc.setTextColor("#04368c");
    //   doc.text(`Mã xác nhận: `, toadoXInfo - 8, toadoYInfo + 58, {
    //     fontWeight: "bold",
    //   });

    //   doc.setFontSize(11);
    //   doc.setTextColor("#dc143c");
    //   doc.text(`${data.maxacnhan} `, toadoXInfo + 14, toadoYInfo + 58, {
    //     fontWeight: "bold",
    //   });

    //   doc.setFontSize(10);
    //   doc.setTextColor("#04368c");
    //   doc.text(
    //     `Sử dụng để tra cứu thông tin ghi nhận đóng trên Cổng thông tin điện tử`,
    //     toadoXInfo - 8,
    //     toadoYInfo + 62,
    //     {
    //       fontWeight: "bold",
    //     }
    //   );

    //   doc.text(
    //     `Người tham gia có thể sử dụng ứng dụng VSSID của Bảo hiểm Xã hội`,
    //     toadoXInfo - 8,
    //     toadoYInfo + 70,
    //     {
    //       fontWeight: "bold",
    //     }
    //   );
    //   doc.text(
    //     `Việt Nam để theo dõi quá trính đóng BHXH, sử dụng thay thế thẻ BHYT`,
    //     toadoXInfo - 8,
    //     toadoYInfo + 75,
    //     {
    //       fontWeight: "bold",
    //     }
    //   );
    //   doc.text(
    //     `https://baohiemxahoi.gov.vn/gioithieu/pages/tai-ung-dung-vssid.aspx`,
    //     toadoXInfo - 8,
    //     toadoYInfo + 80,
    //     {
    //       fontWeight: "bold",
    //     }
    //   );

    //   // Lưu file PDF trên một tab mới
    //   const tenbienlai = `bienlaidienthu_${data.hoten}`;
    //   doc.output("dataurlnewwindow");
    //   // window.open(pdfURL, tenbienlai);
    //   // doc.save("a4.pdf");
    // },

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
