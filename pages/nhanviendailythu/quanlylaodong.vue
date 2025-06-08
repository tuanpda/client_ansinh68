<template>
  <div class="column">
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #ff0000" class="icon is-small is-left">
              <i class="fab fa-earlybirds"></i>
            </span>
            <span style="font-weight: bold; color: #ff8c00"
              >Quản lý lao động</span
            >
          </div>

          <div style="margin-top: 20px">
            <div class="columns">
              <div class="column is-4">
                <input
                  v-model="masobhxh"
                  type="text"
                  class="input is-small"
                  placeholder="Mã số BHXH"
                />
              </div>
              <div class="column is-4">
                <input
                  v-model="tenlaodong"
                  type="text"
                  class="input is-small"
                  placeholder="Tên lao động"
                />
              </div>
              <div class="column">
                <button
                  @click="filter(1)"
                  class="button is-small is-success is-fullwidth"
                >
                  <span class="icon">
                    <i class="fas fa-search"></i>
                  </span>
                  <span>Tìm kiếm</span>
                </button>
              </div>
              <div class="column is">
                <button
                  @click="isActive = true"
                  :disabled="user.role !== 1"
                  class="button is-small is-primary is-fullwidth"
                >
                  <span class="icon">
                    <i class="fas fa-arrow-alt-circle-down"></i>
                  </span>
                  <span>Import</span>
                </button>
              </div>
              <div class="column is">
                <button
                  :disabled="user.role != 1"
                  class="button is-small is-warning is-fullwidth"
                >
                  <a
                    href="http://27.73.37.94:4042/filemauimport/filemau_import_nguoitg.xlsx"
                    ><span class="icon">
                      <i class="fas fa-file-excel"></i>
                    </span>
                    <span>Tải file mẫu</span></a
                  >
                </button>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div style="margin-bottom: 5px" v-if="sumrecord > 0">
                  <span style="font-weight: bold; color: #ff0000"
                    >Tìm được tất cả: {{ sumrecord }} bản ghi.</span
                  >
                </div>
                <div class="table_wrapper">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td style="color: azure; text-align: center; width: 3%">
                          STT
                        </td>
                        <td style="color: azure; text-align: center">Họ tên</td>
                        <td style="color: azure; text-align: center">
                          Mã số BHXH
                        </td>
                        <td style="color: azure; text-align: center">
                          Ngày sinh
                        </td>
                        <td style="color: azure; text-align: center">
                          Giới tính
                        </td>
                        <td style="color: azure; text-align: center">CCCD</td>
                        <td style="color: azure; text-align: center">
                          Số điện thoại
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in data"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ index + 1 }}
                        </td>
                        <td>
                          {{ item.HoTen }}
                        </td>
                        <td style="text-align: center">
                          {{ item.MaSoBhxh }}
                        </td>
                        <td style="text-align: center">
                          {{ item.NgaySinh }}
                        </td>
                        <td style="text-align: center">
                          {{ item.GioiTinh }}
                        </td>
                        <td style="text-align: center">
                          {{ item.Cmnd }}
                        </td>
                        <td style="text-align: center">
                          {{ item.DienThoai }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- Phân trang -->
                <div v-if="data.length > 0" style="margin-top: 10px">
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
        </div>
      </div>
    </div>

    <!-- Modal Loading Data -->
    <!-- Biểu tượng loading -->
    <div v-if="isLoading" class="loading-overlay">
      <!-- Biểu tượng loading -->
      <div class="loading-spinner"></div>
      <span>waitting some minute ...</span>
    </div>

    <!-- modal import -->
    <div class="">
      <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card box">
          <section class="modal-card-body">
            <div>
              <span style="font-weight: 800; font-size: 15px; color: red"
                >Import Người tham gia</span
              >
            </div>
            <div style="text-align: end">
              <button @click="exitImport" class="button is-small is-info">
                Thoát
              </button>
            </div>

            <hr class="navbar-divider" />

            <div class="columns">
              <div class="column is-10">
                <div class="file is-small is-info has-name">
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
                      <span class="file-label"> Chọn file định dạng csv </span>
                    </span>
                    <span class="file-name">
                      {{ fileName }}
                    </span>
                  </label>
                </div>
              </div>
              <div class="column">
                <button
                  :disabled="!isImport"
                  @click="confirmImport"
                  class="button is-small is-success"
                >
                  Import Dữ liệu
                </button>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div v-show="isshow == true">
                  <div style="text-align: center">
                    <span
                      style="font-size: small; font-weight: bold; color: red"
                      >{{ showcount }} / {{ showsuccess }} (dự kiến xong trong:
                      {{ estimatedHours }}h : {{ estimatedMinutes }}m :
                      {{ estimatedSeconds }}s)</span
                    >
                  </div>
                  <div>
                    <progress
                      id="progress-bar"
                      class="progress is-success"
                    ></progress>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="
                thongbao1 == false &&
                progressOnTime == false &&
                progressSuccess == false
              "
              class="notification is-info"
            >
              Chức năng bạn đang được phép sử dụng đây là chức năng import dữ
              liệu người tham gia BHXH, BHYT. <br />
              1: Chọn file định dạng .csv. <br />
              2: Chờ đợi cho đến khi phần mềm đọc xong file thì sẽ có thông báo
              lại. <br />
              3: File import chỉ được phép tối đa là 500 ngàn bản ghi.
            </div>

            <div v-if="thongbao1 == true" class="notification is-warning">
              1: File đã đúng định dạng .csv <br />
              2: File có tổng cộng {{ this.jsonData.length }} bản ghi <br />
              3: {{ alertInfoFile }}
            </div>

            <div v-if="progressOnTime == true" class="notification is-danger">
              Tiến trình đẩy dữ liệu đang được thực hiện. Lưu ý: <br />
              1: Không tắt trình duyệt khi đẩy dữ liệu tránh gây dán đoạn.
              <br />
              2: Theo dõi thời gian hoàn thành tiến trình để biết quá trình đẩy.
              <br />
              3: Tiến trình chạy xong hết số bản ghi là xong.
            </div>

            <div v-if="progressSuccess == true" class="notification is-success">
              Dữ liệu đã đẩy xong <br />
              1: Ghi thành công {{ this.recordSuccess }} bản ghi vào CSDL.
              <br />
              2: Có {{ this.recordFalse }} bản ghi không được ghi vào CSDL.
              <br />
              3: Lý do không được ghi vào có thể do lỗi trùng dữ liệu hoặc lý do
              khác.
              <span v-if="recordSuccess.length >= 0 || recordFalse.length >= 0">
                Ghi dữ liệu thành công: {{ recordSuccess }} bản ghi <br />
                Ghi dữ liệu thất bại: {{ recordFalse }} bản ghi
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinDmBhxh } from "../../mixins/mixinDmBhxh";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
const { DateTime } = require("luxon");
export default {
  name: "baohiemxahoi",
  mixins: [mixinDmBhxh],
  data() {
    return {
      data: [],
      currentPage: 1,
      totalPages: 1,
      masobhxh: "",
      tenlaodong: "",
      isLoading: false,
      sumrecord: 0,
      isActive: false,
      fileName: "",
      selectedFile: null,
      data_import: [],
      // đếm
      showcount: 0,
      showsuccess: 0,
      isshow: false,
      ketQua: [],
      isImport: false,
      jsonData: [],
      thongbao1: false,
      alertInfoFile: "",
      progressOnTime: false,
      progressSuccess: false,
      recordSuccess: 0,
      recordFalse: 0,
      estimatedHours: null,
      estimatedMinutes: null,
      estimatedSeconds: null,
    };
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },

    visiblePages() {
      // Trả về một mảng các số trang mà bạn muốn hiển thị
      const pages = [];
      const maxVisiblePages = 10; // Số lượng trang hiển thị tối đa

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

  async created() {
    this.$on("danhmucs-loaded", () => {
      //   console.log("Tất cả các danh mục đã được tải.");
      // console.log(this.loaihinhtg);
      //   console.log(this.dmluongcs);
      //   console.log(this.nguoithu);
      //   console.log(this.phuongthucdong);
      //   console.log(this.doituongdong);
    });
  },

  mounted() {},

  methods: {
    async filter(page) {
      if (this.masobhxh === "" && this.tenlaodong === "") {
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
        this.sumrecord = 0;
        this.isLoading = true;
        const res = await this.$axios.get(
          `/api/nguoihuong/get-all-quanlylaodong-pagi?page=${page}&MaSoBhxh=${this.masobhxh}&HoTen=${this.tenlaodong}`
        );
        // console.log(res);
        if (res.data.results.length > 0) {
          this.sumrecord = res.data.info.count;
          this.data = res.data.results;
          this.totalPages = res.data.info.pages;
          this.currentPage = page; // Cập nhật trang hiện tại
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
            title: `Không tìm thấy dữ liệu`,
          });
        }
      } catch (error) {
        this.isLoading = false;
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
          title: `Có lỗi xảy ra`,
        });
      }
    },

    async onFileChange(e) {
      this.fileName = e.target.files[0];
      this.selectedFile = e.target.files[0];
      this.jsonData = [];
      this.isLoading = true;
      this.progressOnTime = false;
      this.thongbao1 = false;
      this.showcount = 0;
      this.showsuccess = 0;
      this.progressSuccess = false;
      this.estimatedHours = 0;
      this.estimatedMinutes = 0;
      this.estimatedSeconds = 0;

      if (!this.selectedFile.name.endsWith(".csv")) {
        this.isLoading = false;
        // Swal.fire({
        //   title: "File không đúng định dạng",
        //   text: "Vui lòng chọn lại file .csv!",
        //   icon: "success",
        // });
        Swal.fire({
          icon: "error",
          title: "File không đúng định dạng cho phép",
          text: "Vui lòng chọn lại file!",
        });
        return;
      } else {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const csvData = event.target.result;
          // Chuyển CSV thành JSON
          const rows = csvData.split("\n"); // Tách từng dòng
          const headers = rows[0].split(","); // Tách tiêu đề
          this.jsonData = rows.slice(1).map((row) => {
            const values = row.split(","); // Tách từng giá trị
            return headers.reduce((acc, header, index) => {
              acc[header.trim()] = values[index]?.trim(); // Ánh xạ tiêu đề và giá trị
              return acc;
            }, {});
          });

          if (this.jsonData.length > 0) {
            this.isLoading = false;
            this.isImport = true;
            this.thongbao1 = true;

            // Lưu tiêu đề vào một biến để hiển thị
            this.headers = headers.map((header) => header.trim());
            // console.log("Fields:", this.headers);
            if (
              (this.headers[0] != "STT_HSNS") &
              (this.headers[1] != "MaSoBhxh") &
              (this.headers[2] != "HoTen")
            ) {
              this.alertInfoFile = `File này không đúng định dạng như file mẫu đã cho. Xin chọn lại file đúng định dạng file mẫu`;
            } else {
              this.alertInfoFile = `File đã đúng định dạng .csv, Hợp lệ do tổng số lượng bản ghi <= 500 ngàn.`;
            }
          }
          if (this.jsonData.length > 500000) {
            Swal.fire({
              icon: "error",
              title: `File có ${this.jsonData.length} bản ghi, số lượng này quá lớn `,
              text: "File lớn sẽ làm ảnh hưởng cơ sở dữ liệu, hãy cắt bớt số dòng cần import!",
            });
          }
        };

        reader.readAsText(this.selectedFile); // Đọc file CSV dưới dạng text
      }
    },

    calculateEstimatedTime(totalRows, delayMs) {
      const totalTimeInSeconds = (totalRows * delayMs) / 1000;
      const minutes = Math.floor(totalTimeInSeconds / 60);
      const seconds = Math.floor(totalTimeInSeconds % 60);
      this.estimatedTime = { minutes, seconds };
    },

    async confirmImport() {
      this.recordFalse = 0;
      this.recordSuccess = 0;
      this.progressSuccess = false;
      this.thongbao1 = false;
      // console.log("Parsed JSON Data:", jsonData);
      // const sendData = jsonData.slice(0, 50);
      // console.log(sendData);
      const result = await Swal.fire({
        title: `Xác nhận import dữ liệu người tham gia ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        this.progressOnTime = true;

        const chunkSize = 1; // Số bản ghi mỗi phần
        const chunks = []; // Mảng chứa các phần đã tách

        for (let i = 0; i < this.jsonData.length; i += chunkSize) {
          const chunk = this.jsonData.slice(i, i + chunkSize); // Lấy từng phần
          chunks.push(chunk); // Thêm phần vào mảng
        }

        const lengtData = chunks.length;
        // console.log(this.showcount);
        this.showsuccess = lengtData;
        this.isshow = true;
        const progressBar = document.getElementById("progress-bar");
        // console.log(progressBar);
        progressBar.value = this.showcount;
        progressBar.max = this.showsuccess;

        const delayTime = 100; // Thời gian chờ giữa các lần gửi (ms)
        const processingTime = 500; // Giả định thời gian xử lý backend (ms)
        const estimatedTimeMs = lengtData * (delayTime + processingTime); // Tổng thời gian ước tính (ms)
        const estimatedTimeSec = Math.ceil(estimatedTimeMs / 1000); // Đổi sang giây

        // Tính giờ, phút, giây
        this.estimatedHours = Math.floor(estimatedTimeSec / 3600); // Tổng số giờ
        const remainingSecondsAfterHours = estimatedTimeSec % 3600; // Số giây còn lại sau khi trừ giờ
        this.estimatedMinutes = Math.floor(remainingSecondsAfterHours / 60); // Tổng số phút
        this.estimatedSeconds = remainingSecondsAfterHours % 60; // Số giây còn lại sau khi trừ phút

        // Hàm chờ
        function delay(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }

        // console.log(chunks.length);

        // Gửi dữ liệu từng phần với khoảng cách 10 giây
        for (let i = 0; i < chunks.length; i++) {
          // console.log(`Sending chunk ${i + 1}/${chunks.length}...`);
          const res = await this.$axios.post(
            "/api/nguoihuong/importNtg",
            chunks[i]
          );
          // console.log(res);

          if (res.data.success == 1) {
            this.recordSuccess++;
          } else {
            this.recordFalse++;
          }

          // console.log(`Chunk ${i + 1} sent.`);
          this.showcount++;
          progressBar.value = this.showcount;

          // Nếu không phải phần cuối cùng, chờ 10 giây
          if (i < chunks.length - 1) {
            await delay(delayTime); // Chờ 1 giây
          }
        }

        // console.log("All chunks have been sent.");
        // console.log(this.recordSuccess);
        // console.log(this.recordFalse);

        this.progressSuccess = true;
        this.progressOnTime = false;
        this.isImport = false;
        this.selectedFile = "";
        this.fileName = "";
      }
    },

    exitImport() {
      this.jsonData = [];
      this.selectedFile = "";
      this.fileName = "";
      this.isActive = false;
      this.thongbao1 = false;
      this.alertInfoFile = "";
      this.progressOnTime = false;
      this.progressSuccess = false;
      this.recordSuccess = 0;
      this.recordFalse = 0;
      this.estimatedHours = 0;
      this.estimatedMinutes = 0;
      this.estimatedSeconds = 0;
      this.showcount = 0;
      this.showsuccess = 0;
      this.isshow = false;
    },

    async clickImport() {
      const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
      const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");

      // Cập nhật dữ liệu import với thời gian và người dùng hiện tại
      this.data_import = this.data_import.map((item) => ({
        ...item,
        ngayip: formattedDate,
        nguoiip: this.user.username,
      }));

      // Mảng lưu kết quả xử lý
      const results = [];

      // console.log(this.selected.length);
      const lengtData = this.data_import.length;
      // console.log(this.showcount);
      this.showsuccess = lengtData;
      this.isshow = true;
      const progressBar = document.getElementById("progress-bar");
      // console.log(progressBar);
      progressBar.value = this.showcount;
      progressBar.max = this.showsuccess;

      for (const item of this.data_import) {
        try {
          // Gửi dữ liệu từng bản ghi
          const res = await this.$axios.$post(
            "/api/nguoihuong/add-nguoithamgia",
            item
          );

          // Thêm kết quả vào mảng results
          if (res.success === 5) {
            results.push({
              MaSoBhxh: item.MaSoBhxh,
              message: `Mã số ${item.MaSoBhxh} đã tồn tại.`,
              status: "duplicate",
            });
          } else if (res.success === 1) {
            results.push({
              MaSoBhxh: item.MaSoBhxh,
              message: `Mã số ${item.MaSoBhxh} đã nhập thành công.`,
              status: "success",
            });
          } else {
            results.push({
              MaSoBhxh: item.MaSoBhxh,
              message: `Mã số ${item.MaSoBhxh} bị lỗi trong quá trình nhập.`,
              status: "error",
            });
          }

          this.showcount++;
          progressBar.value = this.showcount;
        } catch (error) {
          // Xử lý lỗi khi gọi API
          results.push({
            MaSoBhxh: item.MaSoBhxh,
            message: `Mã số ${item.MaSoBhxh} gặp lỗi kết nối: ${error.message}`,
            status: "error",
          });
        }
      }

      this.showcount = 0;
      this.showsuccess = 0;
      this.isshow = false;
      this.isImport = false;

      // Hiển thị kết quả xử lý cho người dùng
      // console.log("Kết quả xử lý:", results);
      this.ketQua = results;
    },

    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.filter(this.currentPage - 1);
      }
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.filter(this.currentPage + 1);
      }
    },

    goToPage(page) {
      this.filter(page); // Di chuyển đến trang được chỉ định
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";

@import "@/assets/customCss/footerTable.css";

.modal-card {
  width: 850px;
  height: 400px;
}
</style>
