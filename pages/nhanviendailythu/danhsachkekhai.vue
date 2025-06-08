<template>
  <div class="column">
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #00947e" class="icon is-small is-left">
              <i class="fas fa-clipboard-check"></i>
            </span>
            <span style="font-weight: bold; color: #00947e"
              >Danh sách Kê khai BHXH BHYT</span
            >
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <label class="label">Chọn loại hình kê khai</label>
          <div class="control has-icons-left">
            <div class="select is-small">
              <select @change="loaihinhChange($event)">
                <!-- <option selected disabled>-- Chọn loại hình tham gia --</option> -->
                <option
                  v-for="(item, index) in loaihinhtg"
                  :key="index"
                  :value="item.maloaihinhtg"
                >
                  {{ item.maloaihinhtg }} - {{ item.tenloaihinhtg }}
                </option>
              </select>
            </div>
            <div class="icon is-small is-left">
              <i style="color: #fed604" class="far fa-bookmark"></i>
            </div>
          </div>
        </div>
        <div class="column">
          <label class="label">Từ ngày</label
          ><input
            @change="findDate"
            v-model="tungay"
            type="date"
            class="input is-small"
          />
        </div>
        <div class="column">
          <label class="label">Đến ngày (Ngày biên lai)</label
          ><input
            v-model="denngay"
            @change="findDate"
            type="date"
            class="input is-small"
          />
        </div>
        <div class="column">
          <label class="label">Tìm mã số BHXH</label
          ><input v-model="masobhxh" type="text" class="input is-small" />
        </div>
      </div>

      <div style="margin-top: 20px">
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <div v-show="maloaihinh == 'AR'">
              <DataTableAr :data="data_kekhai" />
            </div>
            <div v-show="maloaihinh == 'BI'">
              <DataTableBI :data="data_kekhai" />
            </div>
            <div v-show="maloaihinh == 'IS'">
              <DataTableIS :data="data_kekhai" />
            </div>
          </table>
        </div>
        <div class="button-container">
          <!-- Các nút thêm dòng và gửi kê khai -->
          <button class="button is-info is-small">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
            <span>...</span>
          </button>
          &nbsp;
          <button class="button is-danger is-small">
            <span class="icon is-small">
              <i class="far fa-file-excel"></i>
            </span>
            <span>Xuất Execl</span>
          </button>

          <!-- Tổng số tiền, nằm bên phải -->
          <div class="total-sotien">
            Tổng số tiền:
            <span style="font-weight: 900; color: red">{{
              formatCurrency(totalSoTien)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import DataTableAr from "@/components/table/DataTableAr";
import DataTableBI from "@/components/table/DataTableBI";
import DataTableIS from "@/components/table/DataTableIS";
export default {
  name: "DanhsachKekhaiPage",
  components: {
    DataTableAr,
    DataTableBI,
    DataTableIS,
  },

  data() {
    return {
      data_kekhai: [],
      loaihinhtg: [
        {
          maloaihinhtg: "AR",
          tenloaihinhtg: "BHYT Hộ gia đình làm nông lâm MSTB",
        },
        {
          maloaihinhtg: "BI",
          tenloaihinhtg: "BHYT Hộ gia đình",
        },
        {
          maloaihinhtg: "IS",
          tenloaihinhtg: "BHXH Tự nguyện",
        },
      ],
      isPhuongan: "AR",
      maloaihinh: "AR",
      tenloaihinh: "BHYT Hộ gia đình làm nông lâm MSTB",
      tungay: "",
      denngay: "",
      masobhxh: "",
      madaily: this.$auth.user.madaily,
    };
  },

  mounted() {
    this.danhsachkekhai();
  },

  computed: {
    totalSoTien() {
      if (this.data_kekhai && this.data_kekhai.length > 0) {
        return this.data_kekhai.reduce((acc, item) => {
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
  },

  methods: {
    async danhsachkekhai() {
      const res = await this.$axios.get(
        `/api/kekhai/getallkekhaiwithuser?madaily=${this.madaily}&maloaihinh=${this.maloaihinh}`
      );
      // console.log(res);
      this.data_kekhai = res.data;
    },

    // chọn loại hình
    loaihinhChange(e) {
      this.data_kekhai = [];
      const selectedOption = e.target.value;
      const getLh = e.target.options[e.target.selectedIndex].text;
      this.isPhuongan = selectedOption;
      let position = getLh.split("-");
      if (position) {
        this.maloaihinh = position[0].trim();
        this.tenloaihinh = position[1].trim();
      }
      this.danhsachkekhai();
    },

    async findDate() {
      const get_Tungay = this.tungay.split("T")[0];
      const get_Denngay = this.denngay.split("T")[0];
      // console.log(get_Tungay, get_Denngay);
      const res = await this.$axios.get(
        `/api/kekhai/hskekhaifromtotungay?maloaihinh=${this.maloaihinh}&madaily=${this.madaily}&tungay=${get_Tungay}&denngay=${get_Denngay}`
      );
      // console.log(res);
      this.data_kekhai = res.data;
    },

    formatCurrency(number) {
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";
@import "@/assets/customCss/footerTable.css";
</style>
