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
          <label class="labelFix">Người thứ</label>
        </div>
        <div>
          <div class="select is-fullwidth is-small">
            <select
              @change="nguoithuChange"
              ref="nguoithuSelect"
              v-model="hoso.nguoithu"
            >
              <option selected disabled>- Chọn người thứ ? -</option>
              <option
                v-for="(item, index) in nguoithu"
                :key="index"
                :value="item.nguoithu"
              >
                {{ item.nguoithu }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Lương CS</label>
        </div>
        <div>
          <input
            v-model="hoso.tienluongcs"
            class="input is-small"
            type="text"
            v-mask="mask"
            disabled
          />
        </div>
      </div>
      <div class="column">
        <div style="margin-bottom: 5px">
          <label class="labelFix">Từ ngày</label>
        </div>
        <date-picker
          v-model="hoso.tungay"
          valueType="format"
          format="DD/MM/YYYY"
          type="date"
          placeholder="Chọn ngày"
          :editable="false"
        />
      </div>
    </div>

    <div class="columns">
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
          <label class="labelFix">Bệnh viện</label>
        </div>
        <div class="select is-fullwidth is-small">
          <select v-model="hoso.mabenhvien" @change="hopChange">
            <option selected disabled>- Chọn cơ sở khám chữa bệnh -</option>
            <option
              v-for="(item, index) in dmbenhvien"
              :key="index"
              :value="item.mabenhvien"
            >
              {{ item.tenbenhvien }}
            </option>
          </select>
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
      ],

      matinh: "",
      tentinh: "",
      dmquanhuyen: [],
      dmbenhvien: [],
      info_huyen: [],
      info_xaphuong: [],
      checkXaphuongOpen: false,

      isLoading: false,
    };
  },

  async created() {
    this.$on("danhmucs-loaded", () => {
      if (this.dmluongcs.length > 0) {
        this.luongcoso = this.dmluongcs[0].luongcs;
      }
      if (this.dmtylehotro.length > 0) {
        this.tylengansachtw = this.dmtylehotro[0].tylengansachtw;
        this.tylenngansachdp = this.dmtylehotro[0].tylenngansachdp;
        this.hotrokhac = this.dmtylehotro[0].tylehotrokhac;
        // console.log(this.tylengansachtw, this.tylenngansachdp);
      }
      if (this.phuongthucdong.length > 0) {
        this.phuongthucdong = this.phuongthucdong.filter(
          (item) => item.maloaihinh !== "IS"
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
    closeModal() {
      this.$emit("close");
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

    // người thứ ?
    async nguoithuChange(event) {
      let manguoithu = 0;
      const selectedValue = event.target.value;
      // console.log(selectedValue);
      const selected = this.nguoithu.find(
        (item) => item.nguoithu == selectedValue
      );
      // console.log(selected);
      if (selected) {
        this.hoso.nguoithu = selected.nguoithu;
        manguoithu = selected.manguoithu;
      }

      const cast =
        this.luongcoso * 0.045 * parseInt(this.hoso.maphuongthucdong);
      if (manguoithu === 1) {
        this.hoso.sotien = cast;
      } else if (manguoithu === 2) {
        this.hoso.sotien = cast * 0.7;
      } else if (manguoithu === 3) {
        this.hoso.sotien = cast * 0.6;
      } else if (manguoithu === 4) {
        this.hoso.sotien = cast * 0.5;
      } else {
        this.hoso.sotien = cast * 0.4;
      }

      // console.log(this.hoso.nguoithu);
      // console.log(this.hoso.sotien);
    },

    // phương thức đóng
    async phuongthucdChange(event) {
      let manguoithu = 0;
      const nguoithu = this.nguoithu.find(
        (item) => item.nguoithu == this.hoso.nguoithu
      );
      if (nguoithu) {
        manguoithu = nguoithu.manguoithu;
      }

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

      const cast =
        this.luongcoso * 0.045 * parseInt(this.hoso.maphuongthucdong);
      if (manguoithu === 1) {
        this.hoso.sotien = cast;
      } else if (manguoithu === 2) {
        this.hoso.sotien = cast * 0.7;
      } else if (manguoithu === 3) {
        this.hoso.sotien = cast * 0.6;
      } else if (manguoithu === 4) {
        this.hoso.sotien = cast * 0.5;
      } else {
        this.hoso.sotien = cast * 0.4;
      }

      // console.log(this.hoso.maphuongthucdong);
      // console.log(this.hoso.tenphuongthucdong);
      // console.log(this.hoso.nguoithu);
      // console.log(this.hoso.sotien);
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
    // async benhvienChange(e, index) {
    //   const matinh = e.target.value;
    //   this.items[index].benhvientinh = matinh;
    //   try {
    //     const response = await this.$axios.get(
    //       `/api/danhmucs/dmbenhvienwithtinh?matinh=${matinh}`
    //     );
    //     if (response.data.length > 0) {
    //       this.items[index].info_benhvien = response.data;
    //       this.checkXaphuongOpen = true;
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },

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
        this.hoso.tienluongcs = this.hoso.tienluongcs.replace(/,/g, "");

        // console.log(this.hoso.tungay);

        this.hoso.denngay = this.calculateEndDate(
          this.hoso.tungay,
          this.hoso.maphuongthucdong
        );

        // console.log(this.hoso.denngay);

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
