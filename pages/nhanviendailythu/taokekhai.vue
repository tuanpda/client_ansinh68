<template>
  <div class="column">
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #ff0000" class="icon is-small is-left">
              <i class="fas fa-file-signature"></i>
            </span>
            <span style="font-weight: bold; color: #ff8c00"
              >Kê khai BHXH BHYT</span
            >
          </div>
        </div>
      </div>

      <div style="margin-top: 20px">
        <div v-if="user">
          <div>
            <div class="titleKk">
              <hr class="line" />
              <div class="topleft">
                <span style="color: red; font-weight: 700">1.</span> Thông tin
                điểm Thu
              </div>
            </div>
            <div class="columns">
              <div
                class="column"
                style="font-size: 15px; font-weight: bold; color: #2e8b57"
              >
                {{ user.tendaily }}
              </div>
              <div class="column">
                <div class="control has-icons-left">
                  <div class="select is-small is-fullwidth">
                    <select @change="loaihinhChange($event)">
                      <option selected disabled>
                        -- CHỌN LOẠI HÌNH THAM GIA --
                      </option>
                      <option
                        v-for="(item, index) in loaihinhtg"
                        :key="index"
                        :value="item.maloaihinh"
                      >
                        {{ item.maloaihinh }} - {{ item.tenloaihinh }}
                      </option>
                    </select>
                  </div>
                  <div class="icon is-small is-left">
                    <i style="color: #fed604" class="far fa-bookmark"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top: 30px">
            <div class="titleKk">
              <hr class="line" />
              <div class="topleft">
                <span style="color: red; font-weight: 700">2.</span> Thông tin
                người nạp hồ sơ
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div style="display: flex; align-items: center">
                  <div style="margin-right: 10px">
                    <label class="labelFix">Họ tên người nạp tiền</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.name"
                      type="text"
                      class="input is-small"
                      disabled
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Tỉnh LH</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.tentinh"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Địa chỉ liên hệ</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.diachi"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
              </div>
              <div class="column">
                <div style="display: flex; align-items: center">
                  <div style="margin-right: 10px">
                    <label class="labelFix">Số CCCD</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.cccd"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Huyện LH</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.tenhuyen"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Email</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.email"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
              </div>
              <div class="column">
                <div style="display: flex; align-items: center">
                  <div style="margin-right: 10px">
                    <label class="labelFix">Số điện thoại</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.sodienthoai"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Xã LH</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.tenxa"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Mã số BHXH</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.masobhxh"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 50px">
          <div class="titleKk">
            <hr class="line" />
            <div class="topleft">
              <span style="color: red; font-weight: 700">3.</span> Nghiệp vụ
            </div>
          </div>
          <div class="columns">
            <div class="column is-4">
              <div style="display: flex; align-items: center">
                <div style="margin-right: 10px">
                  <label class="labelFix">Loại hình tham gia</label>
                </div>
                <div style="flex-grow: 1">
                  <input
                    disabled
                    v-model="loaihinh"
                    type="text"
                    class="input is-small"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div style="display: flex; align-items: center">
                <div style="margin-right: 10px">
                  <label class="labelFix">Lương cơ sở</label>
                </div>
                <div style="flex-grow: 1">
                  <input
                    type="text"
                    class="input is-small"
                    v-model="luongcoso"
                    disabled
                    v-mask="mask"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sử dụng v-bind để truyền props vào component con -->
        <div v-if="maloaihinh == 'AR'">
          <ArTable
            ref="ArTable"
            v-if="maloaihinh === 'AR'"
            :maloaihinh="maloaihinh"
            :loaihinh="loaihinh"
          />
        </div>
        <div v-if="maloaihinh == 'BI'">
          <BiTable
            ref="BiTable"
            v-if="maloaihinh === 'BI'"
            :maloaihinh="maloaihinh"
            :loaihinh="loaihinh"
          />
        </div>
        <div v-if="maloaihinh == 'IS'">
          <ISTable
            ref="ISTable"
            v-if="maloaihinh === 'IS'"
            :maloaihinh="maloaihinh"
            :loaihinh="loaihinh"
          />
        </div>
        <div v-if="maloaihinh == 'IL'">
          <ILTable
            ref="ILTable"
            v-if="maloaihinh === 'IL'"
            :maloaihinh="maloaihinh"
            :loaihinh="loaihinh"
          />
        </div>
        <div v-if="maloaihinh == 'WI'">
          <WITable
            ref="WITable"
            v-if="maloaihinh === 'WI'"
            :maloaihinh="maloaihinh"
            :loaihinh="loaihinh"
          />
        </div>
        <div v-if="maloaihinh == 'IT'">
          <ITTable
            ref="ITTable"
            v-if="maloaihinh === 'IT'"
            :maloaihinh="maloaihinh"
            :loaihinh="loaihinh"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArTable from "@/components/nghiepvu/caculCastAR";
import BiTable from "@/components/nghiepvu/caculCastBI";
import ISTable from "@/components/nghiepvu/caculCastIS";
import ILTable from "@/components/nghiepvu/caculCastIL";
import WITable from "@/components/nghiepvu/caculCastWI";
import ITTable from "@/components/nghiepvu/caculCastIT";

import Swal from "sweetalert2";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
export default {
  name: "KekhaiPage",
  components: {
    ArTable,
    BiTable,
    ISTable,
    ILTable,
    WITable,
    ITTable,
  },

  data() {
    return {
      mask: currencyMask,
      loaihinhtg: [],
      maloaihinh: "",
      loaihinh: "",
      luongcoso: 0,
    };
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },
  },

  mounted() {
    this.loadLoaihinhtg();
  },

  methods: {
    async loadLoaihinhtg() {
      const res = await this.$axios.get(`/api/danhmucs/dmloaihinhtg`);
      this.loaihinhtg = res.data;
      const res_lcs = await this.$axios.get(`/api/danhmucs/dmluongcs`);
      // console.log(res_lcs);

      if (res_lcs.data.length > 0) {
        this.luongcoso = res_lcs.data[0].luongcs;
      }
    },

    // async loaihinhChange(e, index) {
    //   const loaihinhtg = e.target.value;
    //   const tenloaihinhtg = e.target.options[e.target.selectedIndex].text;
    //   let position = tenloaihinhtg.split("-");
    //   this.maloaihinh = loaihinhtg;
    //   if (loaihinhtg) {
    //     this.loaihinh = position[1].trim();
    //   }
    //   // console.log(this.maloaihinh);
    //   // console.log(this.loaihinh);
    // },

    async loaihinhChange(e) {
      const newLoaihinh = e.target.value;
      const tenloaihinhtg = e.target.options[e.target.selectedIndex].text;
      const label = tenloaihinhtg.split("-")[1].trim();

      let currentItems = [];

      // Kiểm tra component con đang hiện tại và lấy items
      if (this.maloaihinh === "AR" && this.$refs.ArTable) {
        currentItems = this.$refs.ArTable.items || [];
      } else if (this.maloaihinh === "BI" && this.$refs.BiTable) {
        currentItems = this.$refs.BiTable.items || [];
      } else if (this.maloaihinh === "IS" && this.$refs.ISTable) {
        currentItems = this.$refs.ISTable.items || [];
      } else if (this.maloaihinh === "IL" && this.$refs.ILTable) {
        currentItems = this.$refs.ILTable.items || [];
      }

      if (currentItems.length > 0) {
        const result = await Swal.fire({
          title: `Bạn đang có hồ sơ phát sinh. Chuyển loại hình sẽ mất dữ liệu. Bạn có chắc chắn muốn tiếp tục?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Không`,
        });
        if (!result.isConfirmed) {
          e.target.value = this.maloaihinh; // Khôi phục lại chọn cũ
          return;
        }
      }

      // Nếu không có hồ sơ hoặc người dùng đồng ý
      this.maloaihinh = newLoaihinh;
      this.loaihinh = label;
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";
</style>
