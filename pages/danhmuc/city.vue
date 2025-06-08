<template>
  <div class="columns is-mobile">
    <div class="column is-half container">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span style="color: #ff0000" class="icon is-small is-left">
                <i class="far fa-bookmark"></i>
              </span>
              <span style="font-weight: bold; color: #ff8c00"
                >Danh mục Tỉnh / Thành phố</span
              >
            </div>
            <div style="margin-top: 20px">
              <div class="columns">
                <div class="column">
                  <div class="table_wrapper">
                    <table
                      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                    >
                      <thead style="font-weight: bold">
                        <tr style="font-size: small; background-color: #4169e1">
                          <td
                            style="color: azure; text-align: center; width: 3%"
                          >
                            STT
                          </td>
                          <td style="color: azure; text-align: center">
                            Mã tỉnh
                          </td>
                          <td style="color: azure; text-align: center">
                            Tên tỉnh
                          </td>
                          <td style="color: azure; text-align: center">Cấp</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          style="font-size: small"
                          v-for="(item, index) in dmtinhthanhpho"
                          :key="index"
                        >
                          <td style="text-align: center">
                            {{ index + 1 }}
                          </td>
                          <td style="text-align: center">
                            {{ item.matinh }}
                          </td>
                          <td>
                            {{ item.tentinh }}
                          </td>
                          <td style="text-align: center">
                            {{ item.cap }}
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
import { mixinDmBhxh } from "../../mixins/mixinDmBhxh";
export default {
  name: "baohiemxahoi",
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
.table_wrapper {
  display: block;
  overflow: scroll;
  white-space: nowrap;
  position: sticky;
  left: 0;
  height: 450px;
}
</style>
