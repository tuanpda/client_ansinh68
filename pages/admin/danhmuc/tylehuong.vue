<template>
  <div class="columns">
    <div class="column is-offset-2 is-8">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span style="color: #ff0000" class="icon is-small is-left">
                <i class="far fa-bookmark"></i>
              </span>
              <span style="font-weight: bold; color: #ff8c00"
                >Danh mục Tỷ lệ hưởng</span
              >
            </div>
            <div style="margin-top: 20px">
              <div class="columns">
                <div class="column">
                  <div class="titleKk">
                    <hr class="line" />
                    <div class="topleft">
                      <span style="color: red; font-weight: 700">1.</span> Tỷ lệ
                      hỗ trợ cho AR - BHYT Hộ gia đình làm nông lâm MSTB
                    </div>
                  </div>
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td style="color: azure; text-align: center; width: 3%">
                          STT
                        </td>
                        <td style="color: azure; text-align: center">
                          Tỷ lệ Ngân sách <br />
                          trung ương (%)
                        </td>
                        <td style="color: azure; text-align: center">
                          Tỷ lệ Ngân sách <br />
                          địa phương (%)
                        </td>
                        <td style="color: azure; text-align: center">
                          Tỷ lệ <br />
                          Hỗ trợ khác (%)
                        </td>
                        <td style="color: azure; text-align: center">
                          Ghi chú
                        </td>
                        <td
                          style="color: azure; text-align: center; width: 10%"
                        >
                          Cập nhật
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in tylehotroar"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.tylengansachtw"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.tylenngansachdp"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.tylehotrokhac"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="">
                          <input
                            v-model="item.ghichu"
                            type="text"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                          <a @click="updateAr(item)">
                            <span class="icon is-small">
                              <i
                                style="color: hsl(153deg, 53%, 53%)"
                                class="fas fa-check-circle"
                              ></i>
                            </span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="columns">
                <!-- tỷ lệ đóng -->
                <div class="column">
                  <div class="titleKk">
                    <hr class="line" />
                    <div class="topleft">
                      <span style="color: red; font-weight: 700">2.</span> Tỷ lệ
                      đóng hỗ trợ cho IS - BHXH Tự nguyện
                    </div>
                  </div>
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td style="color: azure; text-align: center; width: 3%">
                          STT
                        </td>
                        <td style="color: azure; text-align: center">
                          Tỷ lệ đóng (%)
                        </td>
                        <td style="color: azure; text-align: center">Năm</td>
                        <td
                          style="color: azure; text-align: center; width: 40%"
                        >
                          Ghi chú
                        </td>
                        <td
                          style="color: azure; text-align: center; width: 10%"
                        >
                          Cập nhật
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in tyledongis"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.tyledong"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.nam"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.ghichu"
                            type="text"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                          <a @click="updateIStyledong(item)">
                            <span class="icon is-small">
                              <i
                                style="color: hsl(153deg, 53%, 53%)"
                                class="fas fa-check-circle"
                              ></i>
                            </span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- tỷ lệ địa phương hỗ trợ is -->
              <div class="columns">
                <!-- tỷ lệ đóng -->
                <div class="column">
                  <div class="titleKk">
                    <hr class="line" />
                    <div class="topleft">
                      <span style="color: red; font-weight: 700">3.</span> Tỷ lệ
                      NS Địa phương hỗ trợ cho IS - BHXH Tự nguyện
                    </div>
                  </div>
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td style="color: azure; text-align: center; width: 3%">
                          STT
                        </td>
                        <td style="color: azure; text-align: center">
                          Tỷ lệ địa phương <br />
                          hỗ trợ (%)
                        </td>
                        <td style="color: azure; text-align: center">
                          Tỷ lệ hỗ trợ khác (%)
                        </td>
                        <td style="color: azure; text-align: center">Năm</td>
                        <td
                          style="color: azure; text-align: center; width: 40%"
                        >
                          Ghi chú
                        </td>
                        <td
                          style="color: azure; text-align: center; width: 10%"
                        >
                          Cập nhật
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in tylehotrodiaphuongis"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.tylediaphuong"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.tylekhac"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.nam"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.ghichu"
                            type="text"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                          <a @click="updateNgansachdphtIS(item)">
                            <span class="icon is-small">
                              <i
                                style="color: hsl(153deg, 53%, 53%)"
                                class="fas fa-check-circle"
                              ></i>
                            </span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- chuẩn nghèo -->
              <div class="columns">
                <!-- tỷ lệ đóng -->
                <div class="column">
                  <div class="titleKk">
                    <hr class="line" />
                    <div class="topleft">
                      <span style="color: red; font-weight: 700">4.</span> Chuẩn
                      nghèo
                    </div>
                  </div>
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td style="color: azure; text-align: center; width: 3%">
                          STT
                        </td>
                        <td style="color: azure; text-align: center">
                          Chuẩn nghèo
                        </td>
                        <td style="color: azure; text-align: center">Năm</td>
                        <td
                          style="color: azure; text-align: center; width: 40%"
                        >
                          Ghi chú
                        </td>
                        <td
                          style="color: azure; text-align: center; width: 10%"
                        >
                          Chức năng
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in chuanngheo"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.chuanngheo"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.nam"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center">
                          <input
                            v-model="item.ghichu"
                            type="text"
                            class="input is-small"
                          />
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                          <a @click="updateChuanngheo(item)">
                            <span class="icon is-small">
                              <i
                                style="color: hsl(153deg, 53%, 53%)"
                                class="fas fa-check-circle"
                              ></i>
                            </span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Loading Data -->
      <div class="">
        <div :class="{ 'is-active': isActiveLoading }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card-predata">
            <section class="modal-card-body">
              <div>
                <span
                  style="font-size: small; font-weight: bold; color: #00947e"
                  >Đang load dữ liệu - Xin chờ đợi ....</span
                >
              </div>
              <div>
                <progress class="progress is-small is-danger" max="100">
                  15%
                </progress>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "baohiemxahoi",
  layout: "admin",
  data() {
    return {
      isActiveLoading: false,
      tylehotroar: [],
      tyledongis: [],
      tylehotrodiaphuongis: [],
      chuanngheo: [],
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      const res = await this.$axios.get(`/api/danhmucs/tylehotroall`);
      // console.log(res.data);
      this.tylehotroar = res.data;
      const res1 = await this.$axios.get(`/api/danhmucs/tyledongbhtnall`);
      // console.log(res.data);
      this.tyledongis = res1.data;
      const res2 = await this.$axios.get(`/api/danhmucs/diaphuonghtisall`);
      // console.log(res.data);
      this.tylehotrodiaphuongis = res2.data;
      const res3 = await this.$axios.get(`/api/danhmucs/mucchuanngheoall`);
      // console.log(res.data);
      this.chuanngheo = res3.data;
    },

    async updateAr(data) {
      try {
        const result = await Swal.fire({
          title: `Xác nhận cập nhật? Tỷ lệ thay đổi sẽ làm thay đổi số tiền đóng`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });
        if (result.isConfirmed) {
        }
        const res = await this.$axios.post(`/api/danhmucs/update-ar`, data);
        if (res.data.success === true) {
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
            icon: "success",
            title: `Cập nhật thành công`,
          });
        }
      } catch (error) {
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
          title: `Lỗi! Không cập nhật được`,
        });
      }
    },

    async updateIStyledong(data) {
      try {
        const result = await Swal.fire({
          title: `Xác nhận cập nhật? Tỷ lệ thay đổi sẽ làm thay đổi số tiền đóng`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });
        if (result.isConfirmed) {
        }
        const res = await this.$axios.post(
          `/api/danhmucs/update-tyledongis`,
          data
        );
        if (res.data.success === true) {
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
            icon: "success",
            title: `Cập nhật thành công`,
          });
        }
      } catch (error) {
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
          title: `Lỗi! Không cập nhật được`,
        });
      }
    },

    async updateNgansachdphtIS(data) {
      try {
        const result = await Swal.fire({
          title: `Xác nhận cập nhật? Tỷ lệ thay đổi sẽ làm thay đổi số tiền đóng`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });
        if (result.isConfirmed) {
        }
        const res = await this.$axios.post(
          `/api/danhmucs/update-tylediaphuonghtis`,
          data
        );
        if (res.data.success === true) {
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
            icon: "success",
            title: `Cập nhật thành công`,
          });
        }
      } catch (error) {
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
          title: `Lỗi! Không cập nhật được`,
        });
      }
    },

    async updateChuanngheo(data) {
      try {
        const result = await Swal.fire({
          title: `Xác nhận cập nhật? Tỷ lệ thay đổi sẽ làm thay đổi số tiền đóng`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });
        if (result.isConfirmed) {
        }
        const res = await this.$axios.post(
          `/api/danhmucs/update-chuanngheo`,
          data
        );
        if (res.data.success === true) {
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
            icon: "success",
            title: `Cập nhật thành công`,
          });
        }
      } catch (error) {
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
          title: `Lỗi! Không cập nhật được`,
        });
      }
    },
  },
};
</script>

<style scoped lang="css">
.titleKk {
  position: relative;
}

.topleft {
  position: absolute;
  top: -13px;
  font-size: 16px;
  display: inline-block;
  /* padding-left: 20px; */
  padding-right: 15px;
  background-color: white;
  font-weight: bold;
  color: #008b8b;
}

.line {
  color: red;
  margin-top: 20px;
}

.labelFix {
  font-size: 10px;
  font-weight: 800;
}
</style>
