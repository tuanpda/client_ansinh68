<template>
  <div class="columns is-mobile">
    <div class="column container">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span style="color: #ff0000" class="icon is-small is-left">
                <i class="far fa-bookmark"></i>
              </span>
              <span style="font-weight: bold; color: #ff8c00"
                >Danh mục Xã phường</span
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
                            Mã xã phường
                          </td>
                          <td style="color: azure; text-align: center">
                            Tên xã phường
                          </td>
                          <td style="color: azure; text-align: center">Cấp</td>
                          <td style="color: azure; text-align: center">
                            Mã quận huyện
                          </td>
                          <td style="color: azure; text-align: center">
                            Tên quận huyện
                          </td>
                          <td style="color: azure; text-align: center">
                            Mã tỉnh
                          </td>
                          <td style="color: azure; text-align: center">
                            Tên tỉnh
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          style="font-size: small"
                          v-for="(item, index) in data_xp"
                          :key="index"
                        >
                          <td style="text-align: center">
                            {{ index + 1 }}
                          </td>
                          <td style="text-align: center">
                            {{ item.maxaphuong }}
                          </td>
                          <td>
                            {{ item.tenxaphuong }}
                          </td>
                          <td style="text-align: center">
                            {{ item.cap }}
                          </td>
                          <td style="text-align: center">
                            {{ item.maquanhuyen }}
                          </td>
                          <td>
                            {{ item.tenquanhuyen }}
                          </td>
                          <td style="text-align: center">
                            {{ item.matinh }}
                          </td>
                          <td>
                            {{ item.tentinh }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- Phân trang -->
                  <div style="margin-top: 10px">
                    <nav
                      class="pagination is-centered is-rounded is-small"
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
      data_xp: [],
      currentPage: 1,
      totalPages: 1,
    };
  },

  computed: {
    visiblePages() {
      // Trả về một mảng các số trang mà bạn muốn hiển thị
      const pages = [];
      const maxVisiblePages = 5; // Số lượng trang hiển thị tối đa

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

  mounted() {
    this.getData(1); // Tải dữ liệu cho trang đầu tiên
  },

  computed: {
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
    async getData(page) {
      const res = await this.$axios.get(
        `/api/danhmucs/get-all-xaphuongwithphantrang?page=${page}`
      );
      this.data_xp = res.data.results;
      this.totalPages = res.data.info.pages;
      this.currentPage = page; // Cập nhật trang hiện tại
    },

    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.getData(this.currentPage - 1);
      }
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.getData(this.currentPage + 1);
      }
    },

    goToPage(page) {
      this.getData(page); // Di chuyển đến trang được chỉ định
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
  height: 450px;
}

.pagination {
  margin-top: 1em;
}
</style>
