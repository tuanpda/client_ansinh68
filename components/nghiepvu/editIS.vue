<template>
  <div>
    <div class="titleKk">
      <hr class="line" />
      <div class="topleft">
        <span style="color: red; font-weight: 700">1.</span> Thông tin người kê
        khai
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div style="display: flex; align-items: center">
          <div style="margin-right: 10px">
            <label class="labelFix">Mã số BHXH </label>
          </div>
          <div style="flex-grow: 1">
            <span style="color: red; font-weight: 600"
              ><input
                v-model="hoso.masobhxh"
                class="input is-small"
                type="text"
                @blur="findNguoihuong(hoso.masobhxh)"
            /></span>
          </div>
        </div>
      </div>
      <div class="column">
        <div style="display: flex; align-items: center">
          <div style="margin-right: 10px">
            <label class="labelFix">Họ tên </label>
          </div>
          <div style="flex-grow: 1">
            <span style="color: red; font-weight: 600"
              ><input v-model="hoso.hoten" class="input is-small" type="text"
            /></span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div style="display: flex; align-items: center">
          <div style="margin-right: 10px">
            <label class="labelFix">Ngày sinh </label>
          </div>
          <div style="flex-grow: 1">
            <template v-if="hoso.ngaysinh !== ''">
              <input
                v-model="hoso.ngaysinh"
                class="input is-small"
                ref="ngaysinhInput"
              />
            </template>
            <template v-else>
              <date-picker
                v-model="hoso.ngaysinh"
                valueType="format"
                format="DD/MM/YYYY"
              ></date-picker>
            </template>
          </div>
        </div>
      </div>
      <div class="column">
        <div style="display: flex; align-items: center">
          <div style="margin-right: 10px">
            <label class="labelFix">Giới tính </label>
          </div>
          <div style="flex-grow: 1">
            <div class="select is-fullwidth is-small">
              <select v-model="hoso.gioitinh">
                <!-- Bind v-model để liên kết giá trị -->
                <option value="" selected>- Chọn giới tính -</option>
                <!-- Tùy chọn mặc định -->
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div style="display: flex; align-items: center">
          <div style="margin-right: 10px">
            <label class="labelFix">Căn cước </label>
          </div>
          <div style="flex-grow: 1">
            <input
              @blur="findNguoihuong_cccd(hoso.cccd)"
              v-model="hoso.cccd"
              class="input is-small"
              type="number"
              ref="cccdInput"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div style="display: flex; align-items: center">
          <div style="margin-right: 10px">
            <label class="labelFix">Điện thoại </label>
          </div>
          <div style="flex-grow: 1">
            <input
              v-model="hoso.dienthoai"
              class="input is-small"
              type="number"
              ref="dienthoaiInput"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="titleKk" style="margin-top: 10px">
      <hr class="line" />
      <div class="topleft">
        <span style="color: red; font-weight: 700">2.</span> Thủ tục kê khai
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Phương án</label>
        </div>
        <div class="select is-fullwidth is-small">
          <select
            @change="phuonganChange"
            ref="phuonganSelect"
            v-model="hoso.maphuongan"
          >
            <option selected disabled>- Chọn phương án -</option>
            <option
              v-for="(item, index) in phuongan"
              :key="index"
              :value="item.maphuongan"
            >
              {{ item.tenphuongan }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Mức thu nhập hàng tháng</label>
        </div>
        <div>
          <input
            v-model="hoso.muctiendong"
            class="input is-small"
            type="text"
            v-mask="mask"
            @blur="limitTiendong(hoso.muctiendong)"
          />
        </div>
      </div>
      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Từ tháng</label>
        </div>
        <div>
          <td style="text-align: center">
            <input
              v-model="hoso.tuthang"
              @blur="validateMonthYear(hoso.tuthang)"
              type="text"
              placeholder="MM/YYYY"
              class="input is-small"
            />
          </td>
        </div>
      </div>

      <template v-if="hoso.maphuongan == 'DB'">
        <div class="column">
          <div style="margin-bottom: 5px">
            <label class="labelFix">Đối tượng đóng</label>
          </div>
          <div>
            <div class="select is-fullwidth is-small">
              <select @change="doituongChangeDongbu" v-model="hoso.madoituong">
                <option selected disabled>- Chọn đối tượng đóng -</option>
                <option
                  v-for="(item, index) in doituongdong"
                  :key="index"
                  :value="item.madoituong"
                >
                  {{ item.tendoituong }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          class="column"
          v-if="checkDong1lanchocacnamvesauVaConthieu == false"
        >
          <div style="margin-bottom: 5px">
            <label class="labelFix">Đối tượng đóng</label>
          </div>
          <div>
            <div class="select is-fullwidth is-small">
              <select
                @change="doituongChange"
                ref="doituongSelect"
                v-model="hoso.madoituong"
              >
                <option selected disabled>- Chọn đối tượng đóng -</option>
                <option
                  v-for="(item, index) in doituongdong"
                  :key="index"
                  :value="item.madoituong"
                >
                  {{ item.tendoituong }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column" v-else>
          <div style="margin-bottom: 5px">
            <label class="labelFix">Đối tượng đóng</label>
          </div>
          <div>
            <div class="select is-fullwidth is-small">
              <select
                @change="doituongChangeDongbu"
                ref="doituongSelect"
                v-model="hoso.madoituong"
              >
                <option selected disabled>- Chọn đối tượng đóng -</option>
                <option
                  v-for="(item, index) in doituongdong"
                  :key="index"
                  :value="item.madoituong"
                >
                  {{ item.tendoituong }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="columns">
      <!-- đoạn này nếu chọn đóng bù thì phải code input khác -->
      <template v-if="hoso.maphuongan == 'DB'">
        <div class="column">
          <div style="margin-bottom: 5px">
            <label class="labelFix">Số tháng</label>
          </div>
          <div>
            <div class="select is-fullwidth is-small">
              <select
                @change="phuongthucdChangeDongbu"
                ref="phuongthucdongSelect"
                v-model="hoso.maphuongthucdong"
              >
                <option selected disabled>- Chọn phương thức đóng -</option>
                <option
                  v-for="(item, index) in phuongthucdongDongbu"
                  :key="index"
                  :value="item.maphuongthuc"
                >
                  {{ item.tenphuongthuc }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- nếu như đóng 1 lần còn thiếu và về sau thì thêm 1 ô nhập số tháng -->
        <template v-if="checkDong1lanchocacnamvesauVaConthieu == true">
          <div class="column">
            <div style="margin-bottom: 5px">
              <label class="labelFix">Số tháng</label>
            </div>
            <div>
              <input
                v-if="NCT == true"
                v-model="hoso.sothang"
                class="input is-small"
                style="font-weight: 800; color: red"
                type="number"
                min="0"
                max="120"
                @blur="maxNCT"
                placeholder="NCT"
              />
              <input
                v-else="NVS == true"
                v-model="hoso.sothang"
                class="input is-small"
                style="font-weight: 800; color: red"
                type="number"
                min="0"
                max="80"
                @blur="maxNVS"
                placeholder="NVS"
              />
            </div>
          </div>
        </template>

        <div class="column">
          <div style="margin-bottom: 5px">
            <label class="labelFix">Số tiền phải đóng</label>
          </div>
          <div>
            <input
              v-mask="mask"
              v-model="hoso.sotien"
              class="input is-small"
              style="font-weight: 800; color: red"
            />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="column">
          <div style="margin-bottom: 5px">
            <label class="labelFix">Số tháng</label>
          </div>
          <div>
            <div class="select is-fullwidth is-small">
              <select
                @change="phuongthucdChange"
                ref="phuongthucdongSelect"
                v-model="hoso.maphuongthucdong"
              >
                <option selected disabled>- Chọn phương thức đóng -</option>
                <option
                  v-for="(item, index) in phuongthucdong"
                  :key="index"
                  :value="item.maphuongthuc"
                >
                  {{ item.tenphuongthuc }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- nếu như đóng 1 lần còn thiếu và về sau thì thêm 1 ô nhập số tháng -->
        <template v-if="checkDong1lanchocacnamvesauVaConthieu == true">
          <div class="column">
            <div style="margin-bottom: 5px">
              <label class="labelFix">Số tháng đóng bù</label>
            </div>
            <div>
              <input
                v-if="NCT == true"
                v-model="hoso.sothang"
                class="input is-small"
                style="font-weight: 800; color: red"
                type="number"
                min="0"
                max="120"
                @blur="maxNCT"
              />
              <input
                v-else="NVS == true"
                v-model="hoso.sothang"
                class="input is-small"
                style="font-weight: 800; color: red"
                type="number"
                min="0"
                max="80"
                @blur="maxNVS"
              />
            </div>
          </div>

          <div class="column">
            <div style="margin-bottom: 5px">
              <label class="labelFix">Số tiền phải đóng</label>
            </div>
            <div>
              <input
                v-mask="mask"
                v-model="hoso.sotien"
                class="input is-small"
                style="font-weight: 800; color: red"
              />
            </div>
          </div>
        </template>

        <template v-else>
          <div class="column">
            <div style="margin-bottom: 5px">
              <label class="labelFix">Số tiền phải đóng</label>
            </div>
            <div>
              <input
                v-mask="mask"
                v-model="hoso.sotien"
                class="input is-small"
                style="font-weight: 800; color: red"
                disabled
              />
            </div>
          </div>
        </template>
      </template>

      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Hình thức nạp tiền</label>
        </div>
        <div>
          <div class="select is-fullwidth is-small">
            <select ref="hinhthucnapInput" v-model="hoso.hinhthucnap">
              <option disabled selected>- Chọn hình thức nạp tiền -</option>
              <option :value="false">Tiền mặt</option>
              <option :value="true">Chuyển khoản</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Tỉnh</label>
        </div>
        <div>
          <div class="select is-fullwidth is-small">
            <select v-model="hoso.matinh" @change="provinceChange">
              <option
                v-for="(dt, index) in dmtinhthanhpho"
                :key="index"
                :value="dt.matinh"
              >
                {{ dt.tentinh }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Quận huyện</label>
        </div>
        <div class="select is-fullwidth is-small">
          <select @change="quanhuyenChange" v-model="hoso.maquanhuyen">
            <option
              v-for="(dt, index) in dmquanhuyen"
              :key="index"
              :value="dt.maquanhuyen"
            >
              {{ dt.tenquanhuyen }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Xã phường</label>
        </div>
        <div>
          <div class="select is-fullwidth is-small">
            <select @change="xaphuongChange" v-model="hoso.maxaphuong">
              <option
                v-for="(dt, index) in info_xaphuong"
                :key="index"
                :value="dt.maxaphuong"
              >
                {{ dt.tenxaphuong }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Tổ thôn</label>
        </div>
        <div>
          <input
            v-model="hoso.tothon"
            class="input is-small"
            type="text"
            ref="tothonInput"
          />
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Ghi chú</label>
        </div>
        <div>
          <input v-model="hoso.ghichu" class="input is-small" type="text" />
        </div>
      </div>
    </div>

    <hr class="navbar-divider" />
    <div class="columns">
      <div class="column" style="margin-top: 10px">
        <div class="field is-grouped is-flex is-justify-content-center">
          <div class="control">
            <button @click="onChangeEdit" class="button is-success is-small">
              Xác nhận
            </button>
          </div>
          <div class="control">
            <button
              @click="closeModal"
              class="button is-warning is-light is-small"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Biểu tượng loading -->
    <div v-if="isLoading" class="loading-overlay">
      <!-- Biểu tượng loading -->
      <div class="loading-spinner"></div>
      <span>waitting some minute ...</span>
    </div>
  </div>
</template>

<script>
import { mixinDmBhxh } from "../../mixins/mixinDmBhxh";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const { DateTime } = require("luxon");
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
import Swal from "sweetalert2";
import XLSX from "xlsx";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  mixins: [mixinDmBhxh],
  props: ["hoso"],

  components: { DatePicker, vSelect },

  data() {
    return {
      mask: currencyMask,
      phuongan: [
        {
          maphuongan: "TM",
          tenphuongan: "Tăng mới",
        },
        {
          maphuongan: "ON",
          tenphuongan: "Đóng tiếp",
        },
        {
          maphuongan: "DB",
          tenphuongan: "Đóng bù",
        },
      ],
      phuongthucdongDongbu: [
        { maphuongthuc: "1", tenphuongthuc: "1 tháng" },
        { maphuongthuc: "2", tenphuongthuc: "2 tháng" },
        { maphuongthuc: "3", tenphuongthuc: "3 tháng" },
        { maphuongthuc: "4", tenphuongthuc: "4 tháng" },
        { maphuongthuc: "5", tenphuongthuc: "5 tháng" },
        { maphuongthuc: "6", tenphuongthuc: "6 tháng" },
        { maphuongthuc: "7", tenphuongthuc: "7 tháng" },
        { maphuongthuc: "8", tenphuongthuc: "8 tháng" },
        { maphuongthuc: "9", tenphuongthuc: "9 tháng" },
        { maphuongthuc: "10", tenphuongthuc: "10 tháng" },
        { maphuongthuc: "11", tenphuongthuc: "11 tháng" },
        { maphuongthuc: "12", tenphuongthuc: "12 tháng" },
        {
          maphuongthuc: "D1LNCT",
          tenphuongthuc: "Đóng 1 lần cho những năm còn thiếu (Nghỉ hưu)",
        },
        {
          maphuongthuc: "D1LNVS",
          tenphuongthuc: "Đóng 1 lần cho những năm về sau",
        },
      ],

      matinh: "",
      tentinh: "",
      dmquanhuyen: [],
      dmbenhvien: [],
      info_huyen: [],
      info_xaphuong: [],
      checkXaphuongOpen: false,

      isLoading: false,
      checkDong1lanchocacnamvesauVaConthieu: false,
      NVS: false,
      NCT: false,

      chuanngheo: 0,
    };
  },

  async created() {
    this.$on("danhmucs-loaded", () => {
      // console.log("Tất cả các danh mục đã được tải.");
      // console.log(this.loaihinhtg);
      // console.log(this.dmluongcs);
      // console.log(this.nguoithu);
      // console.log(this.phuongthucdong);
      // console.log(this.doituongdong);
      // console.log(this.dmtylehotro);
      // console.log(this.dmtinhthanhpho);
      // console.log(this.dmtyledongbhtn);
      // console.log(this.dmchuanngheo);
      // console.log(this.dmtylehotrodiaphuongis);
      if (this.dmluongcs.length > 0) {
        this.luongcoso = this.dmluongcs[0].luongcs;
      }
      if (this.dmtylehotro.length > 0) {
        this.tylengansachtw = this.dmtylehotro[0].tylengansachtw;
        this.tylenngansachdp = this.dmtylehotro[0].tylenngansachdp;
        this.hotrokhac = this.dmtylehotro[0].tylehotrokhac;
      }
      if (this.dmtyledongbhtn.length > 0) {
        this.tyledongbhyt = this.dmtyledongbhtn[0].tyledong;
      }
      if (this.dmchuanngheo.length > 0) {
        this.chuanngheo = this.dmchuanngheo[0].chuanngheo;
      }
      if (this.dmtylehotrodiaphuongis.length > 0) {
        this.tylediaphuonghotroIs =
          this.dmtylehotrodiaphuongis[0].tylediaphuong;
        this.tylehotrokhacIs = this.dmtylehotrodiaphuongis[0].tylekhac;
        // console.log(this.tylediaphuonghotroIs);
        // console.log(this.tylehotrokhacIs);
      }
      if (this.phuongthucdong.length > 0) {
        this.phuongthucdong = this.phuongthucdong.filter(
          (item) => item.maloaihinh !== "AR"
        );
      }
    });

    if (this.user) {
      // Kiểm tra xem người dùng đã đăng nhập chưa
      // console.log("Thông tin người dùng:", this.user);
      this.matinh = this.user.matinh;
      this.tentinh = this.user.tentinh;

      const res_quanhuyen = await this.$axios.get(
        `/api/danhmucs/dmquanhuyenwithmatinh?matinh=${this.matinh}`
      );
      this.dmquanhuyen = res_quanhuyen.data;

      const res_xaphuong = await this.$axios.get(
        `/api/danhmucs/dmxaphuong-camxuyen`
      );
      this.info_xaphuong = res_xaphuong.data;

      const res_benhvien = await this.$axios.get(
        `/api/danhmucs/dmbenhvienwithtinh-camxuyen?matinh=${this.matinh}`
      );
      this.dmbenhvien = res_benhvien.data;
    } else {
      console.log("Người dùng chưa đăng nhập.");
      // Chuyển hướng người dùng đến trang đăng nhập
      this.$router.push("/login");
    }
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },
  },

  mounted() {
    // console.log(this.hoso);
  },

  methods: {
    maxNCT() {
      if (this.hoso.sothang > 120) {
        Swal.fire({
          text: `Số tháng đóng bù không được lớn hơn 120 tháng`,
          icon: "error",
        });
      }
      if (this.hoso.sothang < 0) {
        Swal.fire({
          text: `Số tháng đóng bù không được nhập nhỏ hơn 0`,
          icon: "error",
        });
      }
    },

    maxNVS() {
      if (this.hoso.sothang > 80) {
        Swal.fire({
          text: `Số tháng đóng bù không được lớn hơn 80 tháng`,
          icon: "error",
        });
      }
      if (this.hoso.sothang < 0) {
        Swal.fire({
          text: `Số tháng đóng bù không được nhập nhỏ hơn 0`,
          icon: "error",
        });
      }
    },

    maxNCTItem(item, index) {
      // console.log(item);
      // console.log(index);

      const value = item.sothang;

      // console.log(value);

      if (value > 120) {
        Swal.fire({
          text: `Hàng ${
            index + 1
          }: Số tháng đóng bù không được lớn hơn 120 tháng`,
          icon: "error",
        });
      } else if (value < 0) {
        Swal.fire({
          text: `Hàng ${index + 1}: Số tháng đóng bù không được nhỏ hơn 0`,
          icon: "error",
        });
      }
    },

    maxNVSItem(item, index) {
      // console.log(item);
      // console.log(index);
      const value = item.sothang;

      // console.log(value);

      if (value > 80) {
        Swal.fire({
          text: `Hàng ${
            index + 1
          }: Số tháng đóng bù không được lớn hơn 80 tháng`,
          icon: "error",
        });
      } else if (value < 0) {
        Swal.fire({
          text: `Hàng ${index + 1}: Số tháng đóng bù không được nhỏ hơn 0`,
          icon: "error",
        });
      }
    },

    closeModal() {
      this.$emit("close");
    },

    formatCurrency(number) {
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    async findNguoihuong(masobhxh, index) {
      if (masobhxh !== "") {
        const isDuplicate = this.items.some(
          (item, idx) =>
            idx !== index &&
            (item.masobhxh === masobhxh || item.cccd === this.items[index].cccd)
        );

        if (isDuplicate) {
          Swal.fire({
            text: `Mã số ${masobhxh} vừa được đăng ký trong loại hình này xong, vui lòng kiểm tra lại!`,
            icon: "error",
          });

          // Xoá mã số BHXH vừa nhập
          this.items[index].masobhxh = "";
          return;
        }

        try {
          const res = await this.$axios.get(
            `/api/nguoihuong/find-nguoihuong-masobhxh-theodstg?soBhxh=${masobhxh}`
          );
          this.isLoading = true;
          // console.log(res.data);
          if (res.data.length > 0) {
            this.isLoading = false;
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
              title:
                "Dữ liệu chỉ mang tính chất tham khảo. Xem và sửa nếu cần thiết !",
            });
            const data = res.data[0];
            try {
              this.items[index].hoten = data.hoTen;
              this.items[index].ngaysinh = data.ngaySinh;
              this.items[index].gioitinh = data.gioiTinh;
              this.items[index].cccd = data.soCmnd;
              this.items[index].dienthoai = data.soDienThoai;
              this.items[index].matinh = data.maTinh;
              // đi tìm tên tỉnh
              const res_tinh = await this.$axios.get(
                `/api/nguoihuong/find-tentinh?matinh=${data.maTinh}`
              );
              if (res_tinh.data.length > 0) {
                this.items[index].tentinh = res_tinh.data[0].tentinh;
              }
              this.items[index].maquanhuyen = data.maHuyenLh;
              // đi tìm tên quận huyện
              const res_huyen = await this.$axios.get(
                `/api/nguoihuong/find-tenhuyen?matinh=${data.maTinh}&maquanhuyen=${data.maHuyenLh}`
              );
              if (res_huyen.data.length > 0) {
                this.items[index].tenquanhuyen = res_huyen.data[0].tenquanhuyen;
              }
              this.items[index].maxaphuong = data.maXaLh;
              // đi tìm tên xã
              const res_xa = await this.$axios.get(
                `/api/nguoihuong/find-tenxa?matinh=${data.maTinh}&maquanhuyen=${data.maHuyenLh}&maxaphuong=${data.maXaLh}`
              );
              if (res_xa.data.length > 0) {
                this.items[index].tenxaphuong = res_xa.data[0].tenxaphuong;
              }
              this.items[index].tothon = data.diaChiLh;
              this.items[index].benhvientinh = data.maTinh;
              // this.items[index].mabenhvien = data.NoiKhamChuaBenh;
              // đi tìm tên bệnh viện kcb
              // const maBv = `${this.matinh}${data.NoiKhamChuaBenh}`;
              // const res_bv = await this.$axios.get(
              //   `/api/nguoihuong/find-benhvien?mabenhvien=${maBv}`
              // );
              // if (res_bv.data.length > 0) {
              //   this.items[index].tenbenhvien = res_bv.data[0].tenbenhvien;
              // }
            } catch (error) {
              console.log(error.message);
            }
          } else {
            this.isLoading = false;
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
              icon: "error",
              title: "Không tìm thấy dữ liệu trong kho người hưởng",
            });
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    async findNguoihuong_cccd(cccd, index) {
      if (cccd !== "") {
        const isDuplicate = this.items.some(
          (item, idx) =>
            idx !== index &&
            (item.cccd === cccd || item.cccd === this.items[index].cccd)
        );

        if (isDuplicate) {
          Swal.fire({
            text: `Mã số ${cccd} vừa được đăng ký trong loại hình này xong, vui lòng kiểm tra lại!`,
            icon: "error",
          });

          // Xoá mã số BHXH vừa nhập
          this.items[index].cccd = "";
          return;
        }

        try {
          const res = await this.$axios.get(
            `/api/nguoihuong/find-nguoihuong-cccd-theodstg?soCmnd=${cccd}`
          );
          this.isLoading = true;
          // console.log(res.data);
          if (res.data.length > 0) {
            this.isLoading = false;
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
              title:
                "Dữ liệu chỉ mang tính chất tham khảo. Xem và sửa nếu cần thiết !",
            });
            const data = res.data[0];
            try {
              this.items[index].masobhxh = data.soBhxh;
              this.items[index].hoten = data.hoTen;
              this.items[index].ngaysinh = data.ngaySinh;
              this.items[index].gioitinh = data.gioiTinh;
              this.items[index].cccd = data.soCmnd;
              this.items[index].dienthoai = data.soDienThoai;
              this.items[index].matinh = data.maTinh;
              // đi tìm tên tỉnh
              const res_tinh = await this.$axios.get(
                `/api/nguoihuong/find-tentinh?matinh=${data.maTinh}`
              );
              if (res_tinh.data.length > 0) {
                this.items[index].tentinh = res_tinh.data[0].tentinh;
              }
              this.items[index].maquanhuyen = data.maHuyenLh;
              // đi tìm tên quận huyện
              const res_huyen = await this.$axios.get(
                `/api/nguoihuong/find-tenhuyen?matinh=${data.maTinh}&maquanhuyen=${data.maHuyenLh}`
              );
              if (res_huyen.data.length > 0) {
                this.items[index].tenquanhuyen = res_huyen.data[0].tenquanhuyen;
              }
              this.items[index].maxaphuong = data.maXaLh;
              // đi tìm tên xã
              const res_xa = await this.$axios.get(
                `/api/nguoihuong/find-tenxa?matinh=${data.maTinh}&maquanhuyen=${data.maHuyenLh}&maxaphuong=${data.maXaLh}`
              );
              if (res_xa.data.length > 0) {
                this.items[index].tenxaphuong = res_xa.data[0].tenxaphuong;
              }
              this.items[index].tothon = data.diaChiLh;
              this.items[index].benhvientinh = data.maTinh;
              // this.items[index].mabenhvien = data.NoiKhamChuaBenh;
              // đi tìm tên bệnh viện kcb
              // const maBv = `${this.matinh}${data.NoiKhamChuaBenh}`;
              // const res_bv = await this.$axios.get(
              //   `/api/nguoihuong/find-benhvien?mabenhvien=${maBv}`
              // );
              // if (res_bv.data.length > 0) {
              //   this.items[index].tenbenhvien = res_bv.data[0].tenbenhvien;
              // }
            } catch (error) {
              console.log(error.message);
            }
          } else {
            this.isLoading = false;
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
              icon: "error",
              title: "Không tìm thấy dữ liệu trong kho người hưởng",
            });
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    // phương án
    async phuonganChange(event) {
      const selectedValue = event.target.value;
      //   console.log(selectedValue);

      const selected = this.phuongan.find(
        (item) => item.maphuongan == selectedValue
      );

      //   console.log(selected);

      if (selected) {
        this.hoso.maphuongan = selected.maphuongan;
        this.hoso.tenphuongan = selected.tenphuongan;
      } else {
        this.hoso.maphuongan = "";
        this.hoso.tenphuongan = "";
      }
    },

    limitTiendong(cast) {
      let castInput = cast.toString().replace(/,/g, "");
      const minInput = this.chuanngheo;
      const maxInput = this.luongcoso * 20;

      if (castInput < minInput) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Số tiền đóng không được thấp hơn chuẩn nghèo: ${this.formatCurrency(
            minInput
          )}`,
        });
        return;
      }
      if (castInput > maxInput) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Số tiền đóng không được vượt quá 20 lần lương cơ sở: ${this.formatCurrency(
            maxInput
          )}`,
        });
        return;
      }
      // Kiểm tra xem số tiền có phải là bội số của 50,000 sau 1,500,000 không
      if ((castInput - minInput) % 50000 !== 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Số tiền đóng phải là bội số của 50.000 đ`,
        });
        return;
      }

      const mucDong = parseFloat(this.hoso.muctiendong.replace(/,/g, ""));

      let castMucdong = mucDong * (this.tyledongbhyt / 100);
      let castSubTwhotro = this.chuanngheo * (this.tyledongbhyt / 100);
      let castDiaphuonght =
        this.chuanngheo *
        (this.tyledongbhyt / 100) *
        (this.tylediaphuonghotroIs / 100);
      let castDiaphuonghtKhac =
        this.chuanngheo *
        (this.tyledongbhyt / 100) *
        (this.tylehotrokhacIs / 100);

      if (this.hoso.madoituong === "BT") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "BT") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong -
            castSubTwhotro -
            castDiaphuonght -
            castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
        // console.log(this.hoso.sotien);
      } else if (this.hoso.madoituong === "CN") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "CN") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong -
            castSubTwhotro -
            castDiaphuonght -
            castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
      } else if (this.hoso.madoituong === "N") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "N") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong -
            castSubTwhotro -
            castDiaphuonght -
            castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
      } else if (this.hoso.madoituong === "NT") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "NT") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong - castSubTwhotro - castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
      }

      // console.log(this.hoso);
    },

    // Đối tượng đóng - IS - TÍNH TIỀN LUÔN
    async doituongChange(event) {
      // console.log(this.checkDong1lanchocacnamvesauVaConthieu);

      const selectedValue = event.target.value;

      const selected = this.doituongdong.find(
        (item) => item.madoituong == selectedValue
      );

      if (selected) {
        this.hoso.madoituong = selected.madoituong;
        this.hoso.tendoituong = selected.tendoituong;
      } else {
        this.hoso.madoituong = "";
        this.hoso.tendoituong = "";
      }

      const mucDong = parseFloat(this.hoso.muctiendong.replace(/,/g, ""));

      let castMucdong = mucDong * (this.tyledongbhyt / 100);
      let castSubTwhotro = this.chuanngheo * (this.tyledongbhyt / 100);
      let castDiaphuonght =
        this.chuanngheo *
        (this.tyledongbhyt / 100) *
        (this.tylediaphuonghotroIs / 100);
      let castDiaphuonghtKhac =
        this.chuanngheo *
        (this.tyledongbhyt / 100) *
        (this.tylehotrokhacIs / 100);

      if (this.hoso.madoituong === "BT") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "BT") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong -
            castSubTwhotro -
            castDiaphuonght -
            castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
        // console.log(this.hoso.sotien);
      } else if (this.hoso.madoituong === "CN") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "CN") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong -
            castSubTwhotro -
            castDiaphuonght -
            castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
      } else if (this.hoso.madoituong === "N") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "N") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong -
            castSubTwhotro -
            castDiaphuonght -
            castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
      } else if (this.hoso.madoituong === "NT") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "NT") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong - castSubTwhotro - castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
      }
    },

    async doituongChangeDongbu(event) {
      const selectedValue = event.target.value;

      const selected = this.doituongdong.find(
        (item) => item.madoituong == selectedValue
      );

      if (selected) {
        this.hoso.madoituong = selected.madoituong;
        this.hoso.tendoituong = selected.tendoituong;
      } else {
        this.hoso.madoituong = "";
        this.hoso.tendoituong = "";
      }
      // console.log(this.hoso.madoituong);
      // console.log(this.hoso.tendoituong);
    },

    validateMonthYear(tuthang) {
      // Nếu người dùng nhập 6 ký tự mà không có dấu gạch chéo, hãy chèn vào
      if (/^\d{6}$/.test(tuthang)) {
        // Chuyển đổi từ "MMYYYY" sang "MM/YYYY"
        const formatted = `${tuthang.slice(0, 2)}/${tuthang.slice(2, 6)}`;
        tuthang = formatted; // Cập nhật giá trị với định dạng đúng
      }

      const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // Định dạng MM/YYYY
      if (!regex.test(tuthang)) {
        this.hoso.tuthang = ""; // Xóa giá trị nếu không đúng định dạng
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Nhập đúng định dạng MM/YYYY`,
        });
        return;
      } else {
        // Nếu định dạng đúng, cập nhật giá trị
        this.hoso.tuthang = tuthang;
      }
    },

    // phương thức đóng
    async phuongthucdChange(event) {
      this.hoso.sothang = 0;

      const selectedValue = event.target.value;
      const selected = this.phuongthucdong.find(
        (item) => item.maphuongthuc == selectedValue
      );

      if (selected) {
        this.hoso.tenphuongthucdong = selected.tenphuongthuc;
        this.hoso.maphuongthucdong = selected.maphuongthuc;
      } else {
        this.hoso.tenphuongthucdong = "";
        this.hoso.maphuongthucdong = "";
      }

      if (
        this.hoso.maphuongthucdong == "D1LNCT" ||
        this.hoso.maphuongthucdong == "D1LNVS"
      ) {
        this.checkDong1lanchocacnamvesauVaConthieu = true;
        if (this.hoso.maphuongthucdong == "D1LNCT") {
          this.NCT = true;
          this.NVS = false;
        }
        if (this.hoso.maphuongthucdong == "D1LNVS") {
          this.NVS = true;
          this.NCT = false;
        }
      } else {
        this.checkDong1lanchocacnamvesauVaConthieu = false;
      }

      // console.log(`NCT: ${this.NCT}`);
      // console.log(`NVS: ${this.NVS}`);

      // console.log(this.checkDong1lanchocacnamvesauVaConthieu);

      // tính số tiền phải nạp
      // console.log(this.hoso.muctiendong);
      // console.log(typeof(this.hoso.muctiendong));

      // ***  CÁC TỶ LỆ HỖ TRỢ ĐƯA VÀO DANH MỤC VÀ THAY ĐỔI THEO TỪNG ĐỊA PHƯƠNG
      // 1. this.tyledongbhyt (tỷ lệ đóng 22% .. thay đổi thì vào danh mục)
      // 2. this.chuanngeo (mức chuẩn nghèo do nhà nước quy định)
      // 3. this.tylediaphuonghotroIs (tỷ lệ này do địa phương - do tỉnh - từng nơi qy định)
      // 4. this.tylehotrokhacIs (các tỷ lệ khác đôi khi do từng huyện xin được hỗ trợ)

      // mức tiền đóng do lao động lựa chọn
      // cái này phải yêu cầu chọn chẵn tiền ví dụ 1.050.000 hoặc 1.300.000 không được lẻ như 1.020.000
      // khống chế < 20 lần lương cơ bản (<20*1.800.000)
      const mucDong = parseFloat(this.hoso.muctiendong.replace(/,/g, ""));
      // console.log(typeof mucDong);
      // console.log(mucDong);

      // công thức tính cần đưa danh mục
      // tỷ lệ đóng: 22%
      // chuẩn hộ nghèo: 1500000

      // lương cơ sở là 1800000
      // hạn chế không được nhập mức tiền đóng > luongcoso * 20 (lần)

      // công thức tính đóng hàng tháng háng
      // ((mức tiền lương chọn đóng * tỷ lệ đóng) -
      // (chuẩn hộ nghèo * tỷ lệ đóng * 10% (NSTW hỗ trợ cho đối tượng BT))) * số tháng
      // tách đối tượng đóng:

      let castMucdong = mucDong * (this.tyledongbhyt / 100);
      let castSubTwhotro = this.chuanngheo * (this.tyledongbhyt / 100);
      let castDiaphuonght =
        this.chuanngheo *
        (this.tyledongbhyt / 100) *
        (this.tylediaphuonghotroIs / 100);
      let castDiaphuonghtKhac =
        this.chuanngheo *
        (this.tyledongbhyt / 100) *
        (this.tylehotrokhacIs / 100);

      // console.log(castDiaphuonght, castDiaphuonghtKhac);

      // console.log(castMucdong);
      // console.log(castSubTwhotro);
      // console.log(castDiaphuonght);

      // Bắt đầu tính tiền khi người dùng chọn số tháng nạp
      // Ở đây với mỗi đối tượng đóng được chọn thì sẽ có công thức tính khác nhau
      // console.log(this.hoso.madoituong);
      // console.log(this.doituongdong);
      if (this.hoso.madoituong === "BT") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "BT") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong -
            castSubTwhotro -
            castDiaphuonght -
            castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
        // console.log(this.hoso.sotien);
      } else if (this.hoso.madoituong === "CN") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "CN") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong -
            castSubTwhotro -
            castDiaphuonght -
            castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
      } else if (this.hoso.madoituong === "N") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "N") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong -
            castSubTwhotro -
            castDiaphuonght -
            castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
      } else if (this.hoso.madoituong === "NT") {
        let madoituong = "";
        for (let i = 0; i < this.doituongdong.length; i++) {
          const doituong = this.doituongdong[i];
          // CHÚNG TA TÌM TỶ LỆ HỖ TRỢ TƯƠNG ỨNG TẠI ĐÂY
          if (doituong.madoituong === "NT") {
            madoituong = doituong.tylehotro;
          }
        }

        // Bắt đầu tính tiền
        castSubTwhotro = castSubTwhotro * (madoituong / 100);
        let tienPhaidong =
          (castMucdong - castSubTwhotro - castDiaphuonghtKhac) *
          parseFloat(this.hoso.maphuongthucdong);
        this.hoso.sotien = tienPhaidong;
      }

      // console.log(this.hoso);
    },

    // áp dụng cho đóng bù
    async phuongthucdChangeDongbu(event) {
      const selectedValue = event.target.value;
      const selected = this.phuongthucdongDongbu.find(
        (item) => item.maphuongthuc == selectedValue
      );

      if (selected) {
        this.hoso.tenphuongthucdong = selected.tenphuongthuc;
        this.hoso.maphuongthucdong = selected.maphuongthuc;
      } else {
        this.hoso.tenphuongthucdong = "";
        this.hoso.maphuongthucdong = "";
      }

      this.hoso.sothang = 0;

      if (
        this.hoso.maphuongthucdong == "D1LNCT" ||
        this.hoso.maphuongthucdong == "D1LNVS"
      ) {
        this.checkDong1lanchocacnamvesauVaConthieu = true;
        if (this.hoso.maphuongthucdong == "D1LNCT") {
          this.NCT = true;
          this.NVS = false;
        }
        if (this.hoso.maphuongthucdong == "D1LNVS") {
          this.NVS = true;
          this.NCT = false;
        }
      } else {
        this.checkDong1lanchocacnamvesauVaConthieu = false;
      }

      // console.log(this.hoso);
    },

    // tỉnh thành phố
    async provinceChange(event) {
      const selectedValue = event.target.value;
      //   console.log(selectedValue);
      const selected = this.dmtinhthanhpho.find(
        (t) => t.matinh === selectedValue
      );
      if (selected) {
        this.hoso.matinh = selectedValue;
        this.hoso.tentinh = selected.tentinh;
      }

      // lấy dữ liệu quận huyện từ mã tỉnh đã được chọn
      try {
        const response = await this.$axios.get(
          `/api/danhmucs/dmquanhuyenwithmatinh?matinh=${selectedValue}`
        );
        // bind dữ liệu vào dữ liệu select của items để cho từng item sử dụng
        if (response.data.length > 0) {
          this.info_huyen = response.data;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    // quận huyện
    async quanhuyenChange(event) {
      const selectedValue = event.target.value;
      // console.log(selectedValue);
      // console.log(this.dmquanhuyen);

      const selected = this.dmquanhuyen.find(
        (t) => t.maquanhuyen === selectedValue
      );
      // console.log(selected);
      if (selected) {
        this.hoso.maquanhuyen = selectedValue;
        this.hoso.tenquanhuyen = selected.tenquanhuyen;
      }

      try {
        const response = await this.$axios.get(
          `/api/danhmucs/dmxaphuongwithmahuyen?maquanhuyen=${selectedValue}`
        );
        if (response.data.length > 0) {
          this.info_xaphuong = response.data;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    // xã phường
    async xaphuongChange(event) {
      const selectedValue = event.target.value;
      // console.log(selectedValue);
      const selected = this.info_xaphuong.find(
        (t) => t.maxaphuong === selectedValue
      );
      // console.log(selected);
      if (selected) {
        this.hoso.maxaphuong = selectedValue;
        this.hoso.tenxaphuong = selected.tenxaphuong;
      }

      // console.log(this.hoso);
    },

    // tỉnh bệnh viện
    async benhvienChange(e, index) {
      const matinh = e.target.value;
      this.hoso.benhvientinh = matinh;
      try {
        const response = await this.$axios.get(
          `/api/danhmucs/dmbenhvienwithtinh?matinh=${matinh}`
        );
        if (response.data.length > 0) {
          this.hoso.info_benhvien = response.data;
          this.checkXaphuongOpen = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    // thông tin bệnh viện
    async hopChange(event) {
      const selectedValue = event.target.value;
      // console.log(selectedValue);
      const selected = this.dmbenhvien.find(
        (t) => t.mabenhvien === selectedValue
      );
      // console.log(selected);
      if (selected) {
        this.hoso.mabenhvien = selectedValue;
        this.hoso.tenbenhvien = selected.tenbenhvien;
      }
      // console.log(this.hoso);
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

    tinhDenThang(tuNgay, soThang) {
      // Chuyển đổi tuNgay từ chuỗi "mm/yyyy" sang đối tượng Date
      const [month, year] = tuNgay.split("/").map(Number);
      // console.log(month, year);

      let startDate = new Date(year, month - 1); // Month in Date is 0-based
      // console.log(startDate);

      // Cộng thêm số tháng vào ngày bắt đầu
      startDate.setMonth(startDate.getMonth() + Number(soThang - 1));

      // // Trừ một ngày để có ngày cuối cùng của tháng trước tháng kết thúc
      // startDate.setDate(startDate.getDate() - 1);

      // Lấy ngày, tháng, năm của ngày kết thúc
      let endDay = String(startDate.getDate()).padStart(2, "0");
      let endMonth = String(startDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
      let endYear = startDate.getFullYear();

      // console.log(`${endMonth}/${endYear}`);

      // Trả về ngày kết thúc dưới dạng "dd/mm/yyyy"
      return `${endMonth}/${endYear}`;
    },

    async onChangeEdit() {
      //   console.log(this.hoso);
      const result = await Swal.fire({
        title: `Xác nhận lưu và gửi lại hồ sơ kê khai ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy gửi`,
      });
      if (result.isConfirmed) {
        // const current = new Date();
        const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
        const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");

        this.isLoading = true;

        this.hoso.sotien = this.hoso.sotien.replace(/,/g, "");
        // this.hoso.tienluongcs = this.hoso.tienluongcs.replace(/,/g, "");
        this.hoso.muctiendong = this.hoso.muctiendong.replace(/,/g, "");

        // console.log(this.hoso.tungay);

        this.hoso.denthang = this.tinhDenThang(
          this.hoso.tuthang,
          this.hoso.maphuongthucdong
        );

        // console.log(this.hoso.denthang);

        this.hoso.updatedAt = formattedDate;
        this.hoso.updatedBy = this.user.username;

        try {
          const res = await this.$axios.post(
            `/api/kekhai/update-hoso-kekhai`,
            this.hoso
          );
          //   console.log(res);
          if (res.status === 200) {
            this.isLoading = false;
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
              title: "Lưu và trình lại hồ sơ kê khai",
            });

            this.closeModal();
          }
        } catch (error) {
          console.error("Error saving data:", error);
        }
      }
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";

@import "@/assets/customCss/footerTable.css";

/* Tùy chỉnh chiều cao của danh sách */
.vs__dropdown-menu {
  max-height: 50px; /* Giảm chiều cao của danh sách */
  overflow-y: auto; /* Thêm thanh cuộn */
}

/* Tùy chỉnh chiều cao item trong danh sách */
.vs__dropdown-option {
  line-height: 1.2; /* Giảm chiều cao của mỗi mục */
  padding: 4px 8px; /* Tùy chỉnh padding */
}

/* Tùy chỉnh hướng xổ lên */
.vs__dropdown-container {
  position: absolute !important;
  transform: translateY(-100%) !important;
}
</style>
