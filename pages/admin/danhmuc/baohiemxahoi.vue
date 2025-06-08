<template>
  <div class="column">
    <div class="box container">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #ff0000" class="icon is-small is-left">
              <i class="far fa-bookmark"></i>
            </span>
            <span style="font-weight: bold; color: #ff8c00"
              >Danh mục Bảo hiểm xã hội</span
            >
          </div>
          <div style="margin-top: 20px">
            <div class="columns">
              <div class="column is-6">
                <!-- lương cơ sở -->
                <div class="titleKk">
                  <hr class="line" />
                  <div class="topleft">
                    <span style="color: red; font-weight: 700">1.</span> Lương
                    cơ sở hiện hành
                  </div>
                </div>
                <div class="table_wrapper">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td
                          style="color: azure; text-align: center; width: 20%"
                        >
                          Lương cơ sở
                        </td>
                        <td style="color: azure; text-align: center">Năm</td>
                        <td style="color: azure; text-align: center">
                          Ghi chú
                        </td>
                        <td style="color: azure; text-align: center">Active</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in dmluongcs"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ item.luongcs | formatNumber }}
                        </td>
                        <td style="text-align: center">
                          {{ item.nam }}
                        </td>
                        <td>
                          {{ item.ghichu }}
                        </td>
                        <td style="text-align: center">
                          {{ item.active }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- đối tượng đóng -->
                <div class="titleKk" style="margin-top: 30px">
                  <hr class="line" />
                  <div class="topleft">
                    <span style="color: red; font-weight: 700">2.</span> Đối
                    tượng đóng
                  </div>
                </div>
                <div class="table_wrapper" style="margin-top: 10px">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td
                          style="color: azure; text-align: center; width: 20%"
                        >
                          Mã Đối tượng
                        </td>
                        <td style="color: azure; text-align: center">
                          Tên Đối tượng
                        </td>
                        <td style="color: azure; text-align: center">
                          Tỷ lệ hỗ trợ
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in doituongdong"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ item.madoituong }}
                        </td>
                        <td>
                          {{ item.tendoituong }}
                        </td>
                        <td style="text-align: center">
                          {{ item.tylehotro }} %
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- loại hình -->
                <div class="titleKk" style="margin-top: 30px">
                  <hr class="line" />
                  <div class="topleft">
                    <span style="color: red; font-weight: 700">3.</span> Loại
                    hình tham gia
                  </div>
                </div>
                <div class="table_wrapper" style="margin-top: 10px">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td
                          style="color: azure; text-align: center; width: 20%"
                        >
                          Mã loại hình
                        </td>
                        <td style="color: azure; text-align: center">
                          Tên loại hình
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in loaihinhtg"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ item.maloaihinh }}
                        </td>
                        <td>
                          {{ item.tenloaihinh }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="column is-6">
                <!-- người thứ -->
                <div class="titleKk">
                  <hr class="line" />
                  <div class="topleft">
                    <span style="color: red; font-weight: 700">4.</span> Giảm
                    đóng theo Hộ gia đình
                  </div>
                </div>
                <div class="table_wrapper">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td
                          style="color: azure; text-align: center; width: 20%"
                        >
                          Mã
                        </td>
                        <td style="color: azure; text-align: center">
                          Số thứ tự trong hộ
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in nguoithu"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ item.manguoithu }}
                        </td>
                        <td>
                          {{ item.nguoithu }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- phương thức -->
                <div class="titleKk" style="margin-top: 30px">
                  <hr class="line" />
                  <div class="topleft">
                    <span style="color: red; font-weight: 700">5.</span> Phương
                    thức đóng
                  </div>
                </div>
                <div class="table_wrapper" style="margin-top: 10px">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #4169e1">
                        <td
                          style="color: azure; text-align: center; width: 20%"
                        >
                          Mã PTĐ
                        </td>
                        <td style="color: azure; text-align: center">
                          Tên PTĐ
                        </td>
                        <td style="color: azure; text-align: center">
                          Mã loại hình
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: small"
                        v-for="(item, index) in phuongthucdong"
                        :key="index"
                      >
                        <td style="text-align: center">
                          {{ item.maphuongthuc }}
                        </td>
                        <td>
                          {{ item.tenphuongthuc }}
                        </td>
                        <td style="text-align: center">
                          {{ item.maloaihinh }}
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
import { mixinDmBhxh } from "@/mixins/mixinDmBhxh";
export default {
  name: "baohiemxahoi",
  layout: "admin",
  mixins: [mixinDmBhxh],
  data() {
    return {
      isActiveLoading: false,
    };
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

  methods: {},
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";
</style>
