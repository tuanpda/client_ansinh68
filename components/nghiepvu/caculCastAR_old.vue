<template>
  <div>
    <div style="margin-top: 20px">
      <div class="columns">
        <div class="column">
          <div
            class="field is-grouped is-grouped-multiline is-justify-content-flex-end"
          >
            <p class="control">
              <button @click="addHosokekhai" class="button is-small is-success">
                <span class="icon">
                  <i class="fas fa-pen-nib"></i>
                </span>
                <span>Nhập dữ liệu kê khai</span>
              </button>
            </p>
            <p class="control">
              <button @click="importKekhai" class="button is-small is-info">
                <span class="icon">
                  <i class="fas fa-file-import"></i>
                </span>
                <span>Import kê khai</span>
              </button>
            </p>
            <p class="control">
              <button class="button is-small is-warning">
                <span class="icon">
                  <i class="fas fa-file-download"></i>
                </span>
                <span>Tải về mẫu Import</span>
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="table_wrapper">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead style="font-weight: bold">
            <tr style="font-size: small; background-color: #fff8dc">
              <td style="text-align: center">Chức năng</td>
              <td style="text-align: center; width: 3%">STT</td>
              <td style="text-align: center">Mã số BHXH</td>
              <td style="text-align: center">Họ tên</td>
              <td style="text-align: center">Ngày sinh</td>
              <td style="text-align: center">Giới tính</td>
              <td style="text-align: center">CCCD</td>
              <td style="text-align: center">Điện thoại</td>
              <td style="text-align: center">Phương án</td>
              <td style="text-align: center">Lương cơ sở</td>
              <td style="text-align: center">Tỷ lệ NSTW %</td>
              <td style="text-align: center">Tỷ lệ NSĐP %</td>
              <td style="text-align: center">Tỷ lệ HT khác</td>
              <td style="text-align: center">Từ ngày</td>
              <td style="text-align: center">Số tháng</td>
              <td style="text-align: center">Số tiền phải đóng</td>
              <td style="text-align: center">Tỉnh / Thành phố</td>
              <td style="text-align: center">Quận / Huyện</td>
              <td style="text-align: center">Xã phường</td>
              <!-- <td style="text-align: center">Tổ thôn</td>
              <td style="text-align: center">Bệnh viện tỉnh</td> -->
              <td style="text-align: center">Bệnh viện</td>
              <td style="text-align: center">Hình thức nạp</td>
              <td style="text-align: center">Ghi chú</td>
              <!-- <td style="text-align: center">Số biên lai</td>
              <td style="text-align: center">Ngày biên lai</td> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td style="text-align: center; vertical-align: middle">
                <!-- <a @click="copyRow()">
                  <span class="icon is-small">
                    <i
                      style="color: hsl(153deg, 53%, 53%)"
                      class="fas fa-check-circle"
                    ></i>
                  </span>
                </a> -->
                &nbsp;
                <a @click="deleteRow(index)">
                  <span class="icon is-small">
                    <i style="color: red" class="far fa-trash-alt"></i>
                  </span>
                </a>
                &nbsp;
                <a @click="refreshItem(item)">
                  <span class="icon is-small">
                    <i style="color: #ffd863" class="fas fa-circle-notch"></i>
                  </span>
                </a>
              </td>
              <td style="text-align: center; vertical-align: middle">
                {{ index + 1 }}
              </td>
              <td style="text-align: center">
                <input
                  v-model="item.masobhxh"
                  class="input is-small"
                  type="number"
                  ref="masobhxhInput"
                  @blur="findNguoihuong(item.masobhxh, index)"
                />
              </td>
              <td style="text-align: center">
                <input
                  v-model="item.hoten"
                  class="input is-small"
                  type="text"
                  ref="nameInput"
                />
              </td>
              <td style="text-align: center">
                <template v-if="item.ngaysinh !== ''">
                  <input
                    v-model="item.ngaysinh"
                    class="input is-small"
                    ref="ngaysinhInput"
                  />
                </template>
                <template v-else>
                  <input
                    v-model="item.ngaysinh"
                    class="input is-small"
                    type="date"
                    ref="ngaysinhInput"
                  />
                </template>
              </td>
              <td style="text-align: center">
                <div class="select is-fullwidth is-small">
                  <select v-model="item.gioitinh">
                    <!-- Bind v-model để liên kết giá trị -->
                    <option value="" selected>- Chọn giới tính -</option>
                    <!-- Tùy chọn mặc định -->
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </td>
              <td style="text-align: center">
                <input
                  v-model="item.cccd"
                  class="input is-small"
                  type="number"
                  ref="cccdInput"
                  @blur="findNguoihuong_cccd(item.cccd, index)"
                />
              </td>
              <td style="text-align: center">
                <input
                  v-model="item.dienthoai"
                  class="input is-small"
                  type="number"
                  ref="dienthoaiInput"
                />
              </td>
              <td style="text-align: center">
                <div class="select is-fullwidth is-small">
                  <select
                    v-model="item.maphuongan"
                    @change="phuonganChange($event, index)"
                    ref="phuonganSelect"
                  >
                    <option selected disabled>- Chọn phương án -</option>
                    <option
                      v-for="(pa, index) in item.info_phuongan"
                      :key="index"
                      :value="pa.maphuongan"
                    >
                      {{ pa.tenphuongan }}
                    </option>
                  </select>
                </div>
              </td>

              <td style="text-align: center">
                <input
                  v-model="item.tienluongcs"
                  class="input is-small"
                  type="text"
                  v-mask="mask"
                  disabled
                />
              </td>
              <td style="text-align: center">
                <input
                  v-model="item.tylensnnht"
                  class="input is-small"
                  type="number"
                />
              </td>
              <td style="text-align: center">
                <input
                  v-model="item.tylensdp"
                  class="input is-small"
                  type="number"
                />
              </td>
              <td style="text-align: center">
                <input
                  v-model="item.hotrokhac"
                  class="input is-small"
                  type="number"
                />
              </td>
              <td style="text-align: center">
                <input
                  v-model="item.tungay"
                  class="input is-small"
                  type="date"
                  ref="tungayInput"
                />
              </td>
              <td style="text-align: center">
                <div class="select is-fullwidth is-small">
                  <select
                    v-model="item.maphuongthucdong"
                    @change="phuongthucdChange($event, index)"
                    ref="phuongthucdongSelect"
                  >
                    <option selected disabled>- Chọn phương thức đóng -</option>
                    <option
                      v-for="(ptd, index) in item.phuongthucdong"
                      :key="index"
                      :value="ptd.maphuongthuc"
                    >
                      {{ ptd.tenphuongthuc }}
                    </option>
                  </select>
                </div>
              </td>
              <td style="text-align: center">
                <input
                  v-mask="mask"
                  v-model="item.sotien"
                  class="input is-small"
                  style="font-weight: 800; color: red"
                  disabled
                />
              </td>
              <!-- tỉnh-->
              <td style="text-align: center">
                <div class="select is-fullwidth is-small">
                  <select
                    v-model="item.matinh"
                    @change="provinceChange($event, index)"
                  >
                    <option
                      v-for="(dt, index) in dmtinhthanhpho"
                      :key="index"
                      :value="dt.matinh"
                    >
                      {{ dt.tentinh }}
                    </option>
                  </select>
                </div>
              </td>
              <!-- quận huyện -->
              <td style="text-align: center">
                <div class="select is-fullwidth is-small">
                  <select
                    @change="quanhuyenChange($event, index)"
                    ref="quanhuyenSelect"
                  >
                    <option selected disabled>
                      {{ item.maquanhuyen }} -
                      {{ item.tenquanhuyen }}
                    </option>
                    <option
                      v-for="(dt, index) in item.info_huyen"
                      :key="index"
                      :value="dt.maquanhuyen"
                    >
                      {{ dt.tenquanhuyen }}
                    </option>
                  </select>
                </div>
              </td>
              <!-- xã phường -->
              <td style="text-align: center">
                <div class="select is-fullwidth is-small">
                  <select
                    @change="xaphuongChange($event, index)"
                    :disabled="isDisabled_Xaphuong"
                    ref="xaphuongSelect"
                  >
                    <option selected disabled>
                      {{ item.maxaphuong }} -
                      {{ item.tenxaphuong }}
                    </option>
                    <option
                      v-for="(dt, index) in item.info_xaphuong"
                      :key="index"
                      :value="dt.maxaphuong"
                    >
                      {{ dt.tenxaphuong }}
                    </option>
                  </select>
                </div>
              </td>
              <!-- tổ thôn -->
              <!-- <td style="text-align: center">
                <input
                  v-model="item.tothon"
                  class="input is-small"
                  type="text"
                  ref="tothonInput"
                />
              </td> -->

              <!-- tỉnh bệnh viện -->
              <!-- <td style="text-align: center">
                <div class="select is-fullwidth is-small">
                  <select
                    @change="benhvienChange($event, index)"
                    v-model="item.matinh"
                  >
                    <option
                      v-for="(dt, index) in dmtinhthanhpho"
                      :key="index"
                      :value="dt.matinh"
                    >
                      {{ dt.tentinh }}
                    </option>
                  </select>
                </div>
              </td> -->
              <!-- bệnh viện -->
              <!-- <td style="text-align: center">
                <input
                  autoComplete="on"
                  list="hopSuggestions"
                  class="custom-input"
                  @change="hopChange($event, index)"
                  ref="hopInput"
                  style="min-width: 200px; height: 30px"
                  v-model="item.tenbenhvien"
                />
                <datalist id="hopSuggestions">
                  <option
                    v-for="(item, index) in item.info_benhvien"
                    :key="index"
                  >
                    {{ item.mabenhvien }} - {{ item.tenbenhvien }}
                  </option>
                </datalist>
              </td> -->

              <td style="text-align: center">
                <div class="select is-fullwidth is-small">
                  <select
                    v-model="item.mabenhvien"
                    @change="hopChangeReset($event, index)"
                  >
                    <option
                      v-for="(nt, idx) in item.info_benhvien"
                      :key="idx"
                      :value="nt.mabenhvien"
                    >
                      {{ nt.tenbenhvien }}
                    </option>
                  </select>
                </div>
              </td>

              <td>
                <div class="select is-fullwidth is-small">
                  <select
                    v-model="item.hinhthucnap"
                    @change="hinhthucNap($event, index)"
                    ref="hinhthucnapInput"
                  >
                    <option disabled value="">
                      - Chọn hình thức nạp tiền -
                    </option>
                    <option value="0">Tiền mặt</option>
                    <option value="1">Chuyển khoản</option>
                  </select>
                </div>
              </td>

              <!-- ghi chú -->
              <td style="text-align: center">
                <input
                  v-model="item.ghichu"
                  class="input is-small"
                  type="text"
                />
              </td>

              <!-- biên lai -->
              <!-- <td style="text-align: center">
                <input
                  @blur="checkSobienlai(item.sobienlai)"
                  v-model="item.sobienlai"
                  class="input is-small"
                  type="number"
                  ref="sobienlaiInput"
                  maxlength="7"
                  minlength="7"
                />
              </td>
              <td style="text-align: center">
                <input
                  @blur="checkNowDateNgaybienlai(item.ngaybienlai)"
                  v-model="item.ngaybienlai"
                  class="input is-small"
                  type="date"
                  ref="ngaybienlaiInput"
                />
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
      <div class="button-container">
        <!-- Các nút thêm dòng và gửi kê khai -->
        <button @click="addRow" class="button is-info is-small">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Thêm dòng</span>
        </button>
        &nbsp;
        <button @click="guiKekhai" class="button is-danger is-small">
          <span class="icon is-small">
            <i class="fas fa-envelope-open-text"></i>
          </span>
          <span>Lưu hồ sơ</span>
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

    <!-- Biểu tượng loading -->
    <div v-if="isLoading" class="loading-overlay">
      <!-- Biểu tượng loading -->
      <div class="loading-spinner"></div>
      <span>waitting some minute ...</span>
    </div>

    <!-- modal nạp hồ sơ thành công -->
    <div class="">
      <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-kekhai box">
          <section class="modal-card-kekhai-body">
            <div>
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Nạp hồ sơ thành công</span
                >
              </div>
              <div style="text-align: end">
                <button @click="xacnhanThoat" class="button is-small is-info">
                  Thoát
                </button>
              </div>
            </div>
            <div>
              <div class="titleKk">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">1.</span> Thông tin
                  lưu hồ sơ kê khai
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div style="display: flex; align-items: center">
                    <div style="margin-right: 10px">
                      <span style="font-size: 8; font-weight: bold"
                        >Số hồ sơ:
                      </span>
                    </div>
                    <div style="flex-grow: 1">
                      <span style="color: red; font-weight: 600">{{
                        formKekhai.sohoso
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div style="display: flex; align-items: center">
                    <div style="margin-right: 10px">
                      <span style="font-size: 8; font-weight: bold"
                        >Đợt Kê khai:
                      </span>
                    </div>
                    <div style="flex-grow: 1">
                      <span style="color: red; font-weight: 600">{{
                        formKekhai.dotkekhai
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div style="display: flex; align-items: center">
                    <div style="margin-right: 10px">
                      <span style="font-size: 8; font-weight: bold"
                        >Kỳ kê khai:
                      </span>
                    </div>
                    <div style="flex-grow: 1">
                      <span style="color: red; font-weight: 600">{{
                        formKekhai.kykekhai
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div style="display: flex; align-items: center">
                    <div style="margin-right: 10px">
                      <span style="font-size: 8; font-weight: bold"
                        >Ngày Kê khai:
                      </span>
                    </div>
                    <div style="flex-grow: 1">
                      <span style="color: red; font-weight: 600">{{
                        formKekhai.ngaykekhai
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="titleKk" style="margin-top: 10px">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">2.</span> Danh sách
                  kê khai thành công
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div v-if="form_response_sucess.length > 0">
                    <table
                      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                    >
                      <thead>
                        <tr style="background-color: #fff0f5; font-size: small">
                          <td style="text-align: center; font-weight: bold">
                            STT
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Họ tên
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Mã số BHXH
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Ngày sinh
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Giới tính
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            CCCD
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Số điện thoại
                          </td>
                          <!-- <td style="text-align: center; font-weight: bold">
                            Gửi lên cổng BHXHVN
                          </td> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in form_response_sucess"
                          :key="index"
                          style="font-size: small"
                        >
                          <td style="text-align: center">{{ index + 1 }}</td>
                          <td>
                            {{ item.hoten }}
                          </td>
                          <td style="text-align: center">
                            {{ item.masobhxh }}
                          </td>
                          <td style="text-align: center">
                            {{ item.ngaysinh }}
                          </td>
                          <td style="text-align: center">
                            {{ item.gioitinh }}
                          </td>
                          <td style="text-align: center">
                            {{ item.cccd }}
                          </td>
                          <td style="text-align: center">
                            {{ item.dienthoai }}
                          </td>
                          <!-- <td style="text-align: center">
                            <button
                              @click="guiDulieuLenCongBhxhvn(item)"
                              class="button is-small is-success"
                              :disabled="item.isSent || !isRoleSent"
                            >
                              <span class="icon is-small" v-if="!item.isSent">
                                <i
                                  class="fas fa-spell-check"
                                  style="color: #ffd863"
                                ></i>
                              </span>
                              <span v-if="!item.isSent">Gửi</span>
                              <span v-else>Đã gửi</span>
                            </button>
                          </td> -->
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="titleKk" style="margin-top: 10px">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">3.</span> Danh sách
                  kê khai lỗi
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div v-if="form_response_failed.length > 0">
                    <table
                      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                    >
                      <thead>
                        <tr style="background-color: #85e89d; font-size: small">
                          <td style="text-align: center; font-weight: bold">
                            STT
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Họ tên
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Mã số BHXH
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Ngày sinh
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Giới tính
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            CCCD
                          </td>
                          <td style="text-align: center; font-weight: bold">
                            Số điện thoại
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in form_response_failed"
                          :key="index"
                          style="font-size: small"
                        >
                          <td style="text-align: center">{{ index + 1 }}</td>
                          <td>
                            {{ item.hoten }}
                          </td>
                          <td style="text-align: center">
                            {{ item.masobhxh }}
                          </td>
                          <td style="text-align: center">
                            {{ item.ngaysinh }}
                          </td>
                          <td style="text-align: center">
                            {{ item.gioitinh }}
                          </td>
                          <td style="text-align: center">
                            {{ item.cccd }}
                          </td>
                          <td style="text-align: center">
                            {{ item.dienthoai }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-else>
                    <div>
                      <span
                        style="font-size: 12; font-weight: bold; color: #3cb371"
                        >Không có hồ sơ lỗi !</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- modal nhập hồ sơ kê khai -->
    <div class="">
      <div :class="{ 'is-active': isActive_nhaphoso }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-kekhai box">
          <section class="modal-card-kekhai-body">
            <div>
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Nhập hồ sơ</span
                >
              </div>
              <div style="text-align: end">
                <button
                  @click="cancelNhaphoso()"
                  class="button is-small is-danger"
                >
                  Hủy nhập hồ sơ kê khai này
                </button>
              </div>
            </div>
            <div v-if="items.length > 0">
              <div class="titleKk">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">1.</span> Thông tin
                  người kê khai
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
                          @blur="
                            findNguoihuong(
                              datanhaphosomodal.masobhxh,
                              addedIndex
                            )
                          "
                          v-model="datanhaphosomodal.masobhxh"
                          class="input is-small"
                          type="text"
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
                        ><input
                          v-model="datanhaphosomodal.hoten"
                          class="input is-small"
                          type="text"
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
                      <template v-if="datanhaphosomodal.ngaysinh !== ''">
                        <input
                          v-model="datanhaphosomodal.ngaysinh"
                          class="input is-small"
                          ref="ngaysinhInput"
                        />
                      </template>
                      <template v-else>
                        <!-- <input
                          v-model="datanhaphosomodal.ngaysinh"
                          class="input is-small"
                          type="date"
                          ref="ngaysinhInput"
                        /> -->
                        <date-picker
                          v-model="datanhaphosomodal.ngaysinh"
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
                        <select v-model="datanhaphosomodal.gioitinh">
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
                        @blur="
                          findNguoihuong_cccd(
                            datanhaphosomodal.cccd,
                            addedIndex
                          )
                        "
                        v-model="datanhaphosomodal.cccd"
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
                        v-model="datanhaphosomodal.dienthoai"
                        class="input is-small"
                        type="number"
                        ref="dienthoaiInput"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="titleKk" style="margin-top: 10px">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">2.</span> Thông tin
                  biên lai nạp tiền
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div style="display: flex; align-items: center">
                    <div style="margin-right: 10px">
                      <label class="labelFix">Số biên lai</label>
                    </div>
                    <div style="flex-grow: 1">
                      <input
                        @blur="checkSobienlai(datanhaphosomodal.sobienlai)"
                        v-model="datanhaphosomodal.sobienlai"
                        class="input is-small"
                        type="number"
                        ref="sobienlaiInput"
                        maxlength="7"
                        minlength="7"
                      />
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div style="display: flex; align-items: center">
                    <div style="margin-right: 10px">
                      <label class="labelFix">Ngày biên lai</label>
                    </div>
                    <div style="flex-grow: 1">
                      <input
                        @blur="
                          checkNowDateNgaybienlai(datanhaphosomodal.ngaybienlai)
                        "
                        v-model="datanhaphosomodal.ngaybienlai"
                        class="input is-small"
                        type="date"
                        ref="ngaybienlaiInput"
                      />
                    </div>
                  </div>
                </div>
              </div> -->

              <div class="titleKk" style="margin-top: 10px">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">2.</span> Thủ tục
                  kê khai
                </div>
              </div>
              <div class="columns">
                <div class="column is-2">
                  <div style="margin-bottom: 5px">
                    <label class="labelFix">Lương CS</label>
                  </div>
                  <div>
                    <input
                      v-model="datanhaphosomodal.tienluongcs"
                      class="input is-small"
                      type="text"
                      v-mask="mask"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div style="margin-bottom: 5px">
                    <label class="labelFix">Phương án</label>
                  </div>
                  <div class="select is-fullwidth is-small">
                    <select
                      @change="phuonganChange($event, addedIndex)"
                      ref="phuonganSelect"
                      v-model="selectedOption"
                    >
                      <option selected disabled>- Chọn phương án -</option>
                      <option
                        v-for="(item, index) in datanhaphosomodal.info_phuongan"
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
                    <label class="labelFix">Tỷ lệ NSTW %</label>
                  </div>
                  <div>
                    <input
                      v-model="datanhaphosomodal.tylensnnht"
                      class="input is-small"
                      type="number"
                    />
                  </div>
                </div>
                <div class="column">
                  <div style="margin-bottom: 5px">
                    <label class="labelFix">Tỷ lệ NSĐP %</label>
                  </div>
                  <div>
                    <input
                      v-model="datanhaphosomodal.tylensdp"
                      class="input is-small"
                      type="number"
                    />
                  </div>
                </div>
                <div class="column">
                  <div style="margin-bottom: 5px">
                    <label class="labelFix">Hỗ trợ khác</label>
                  </div>
                  <div>
                    <input
                      v-model="datanhaphosomodal.hotrokhac"
                      class="input is-small"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <div style="margin-bottom: 5px">
                    <label class="labelFix">Từ ngày</label>
                  </div>
                  <div>
                    <!-- <input
                      v-model="datanhaphosomodal.tungay"
                      class="input is-small"
                      type="date"
                      ref="tungayInput"
                    /> -->
                    <date-picker
                      v-model="datanhaphosomodal.tungay"
                      valueType="format"
                    ></date-picker>
                  </div>
                </div>
                <div class="column">
                  <div style="margin-bottom: 5px">
                    <label class="labelFix">Số tháng</label>
                  </div>
                  <div>
                    <div class="select is-fullwidth is-small">
                      <select
                        @change="phuongthucdChange($event, addedIndex)"
                        ref="phuongthucdongSelect"
                        v-model="selectedOptionptd"
                      >
                        <option selected disabled>
                          - Chọn phương thức đóng -
                        </option>
                        <option
                          v-for="(
                            item, index
                          ) in datanhaphosomodal.phuongthucdong"
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
                      v-model="datanhaphosomodal.sotien"
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
                      <select
                        @change="hinhthucNap($event, addedIndex)"
                        v-model="selectedOptionHtnt"
                        ref="hinhthucnapInput"
                      >
                        <option disabled selected>
                          - Chọn hình thức nạp tiền -
                        </option>
                        <option value="0">Tiền mặt</option>
                        <option value="1">Chuyển khoản</option>
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
                      <select
                        v-model="datanhaphosomodal.matinh"
                        @change="provinceChange($event, addedIndex)"
                      >
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
                    <select
                      @change="quanhuyenChange($event, addedIndex)"
                      ref="quanhuyenSelect"
                    >
                      <option selected disabled>
                        {{ datanhaphosomodal.maquanhuyen }} -
                        {{ datanhaphosomodal.tenquanhuyen }}
                      </option>
                      <option
                        v-for="(dt, index) in datanhaphosomodal.info_huyen"
                        :key="index"
                        :value="dt.maquanhuyen"
                      >
                        {{ dt.maquanhuyen }} - {{ dt.tenquanhuyen }}
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
                      <select
                        @change="xaphuongChange($event, addedIndex)"
                        :disabled="isDisabled_Xaphuong"
                        ref="xaphuongSelect"
                      >
                        <option selected disabled>
                          {{ datanhaphosomodal.maxaphuong }} -
                          {{ datanhaphosomodal.tenxaphuong }}
                        </option>
                        <option
                          v-for="(dt, index) in datanhaphosomodal.info_xaphuong"
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
                      v-model="datanhaphosomodal.tothon"
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
                    <label class="labelFix">Bệnh viện tỉnh</label>
                  </div>
                  <div>
                    <div class="select is-fullwidth is-small">
                      <select
                        @change="benhvienChange($event, addedIndex)"
                        v-model="datanhaphosomodal.matinh"
                      >
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
                    <label class="labelFix">Bệnh viện</label>
                  </div>
                  <!-- <div>
                    <input
                      autoComplete="on"
                      list="hopSuggestions"
                      class="custom-input"
                      @change="hopChange($event, addedIndex)"
                      ref="hopInput"
                      style="min-width: 300px; height: 30px"
                      :value="datanhaphosomodal.tenbenhvien"
                    />
                    <datalist id="hopSuggestions">
                      <option
                        v-for="(item, index) in datanhaphosomodal.info_benhvien"
                        :key="index"
                      >
                        {{ item.mabenhvien }} - {{ item.tenbenhvien }}
                      </option>
                    </datalist>
                  </div> -->
                  <!-- <div>
                    <v-select
                      :options="datanhaphosomodal.info_benhvien"
                      v-model="benhvienInfo"
                      label="tenbenhvien"
                      placeholder="Tìm kiếm..."
                      append-to-body
                      direction="top"
                      :styles="customStyles"
                    ></v-select>
                  </div> -->
                  <div class="select is-fullwidth is-small">
                    <select
                      v-model="selectedOptionBenhvien"
                      @change="hopChange($event, addedIndex)"
                    >
                      <option selected disabled>
                        - Chọn cơ sở khám chữa bệnh -
                      </option>
                      <option
                        v-for="(item, index) in datanhaphosomodal.info_benhvien"
                        :key="index"
                        :value="item.mabenhvien"
                      >
                        {{ item.mabenhvien }} - {{ item.tenbenhvien }}
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
                    <input
                      v-model="datanhaphosomodal.ghichu"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <hr class="navbar-divider" />
              <div class="columns">
                <div class="column" style="margin-top: 10px">
                  <div
                    class="field is-grouped is-flex is-justify-content-center"
                  >
                    <div class="control">
                      <button
                        @click="xacnhanGhihoso"
                        class="button is-success is-small"
                      >
                        Xác nhận
                      </button>
                    </div>
                    <div class="control">
                      <button
                        @click="cancelNhaphoso"
                        class="button is-warning is-light is-small"
                      >
                        Hủy bỏ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- modal nhập xem trước khi xác nhận gửi hồ sơ đi -->
    <div class="">
      <div :class="{ 'is-active': isActive_xacnhan }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-kekhai box">
          <section class="modal-card-kekhai-body">
            <div>
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Xem lại và xác nhận gửi bộ hồ sơ kê khai</span
                >
              </div>
              <div style="text-align: end"></div>
            </div>
            <div v-if="items.length > 0">
              <div class="titleKk">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">1.</span> Thông tin
                  hồ sơ kê khai đã nhập
                </div>
              </div>

              <div class="table_wrapper">
                <table
                  class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                >
                  <thead style="font-weight: bold">
                    <tr style="font-size: small; background-color: #fff8dc">
                      <td style="text-align: center; width: 3%">STT</td>
                      <td style="text-align: center">Mã số BHXH</td>
                      <td style="text-align: center">Họ tên</td>
                      <td style="text-align: center">Ngày sinh</td>
                      <td style="text-align: center">Giới tính</td>
                      <td style="text-align: center">CCCD</td>
                      <td style="text-align: center">Điện thoại</td>
                      <td style="text-align: center">Phương án</td>
                      <td style="text-align: center">Lương cơ sở</td>
                      <td style="text-align: center">Tỷ lệ NSTW %</td>
                      <td style="text-align: center">Tỷ lệ NSĐP %</td>
                      <td style="text-align: center">Tỷ lệ HT khác</td>
                      <td style="text-align: center">Từ ngày</td>
                      <td style="text-align: center">Số tháng</td>
                      <td style="text-align: center">Số tiền phải đóng</td>
                      <td style="text-align: center">Tỉnh / Thành phố</td>
                      <td style="text-align: center">Quận / Huyện</td>
                      <td style="text-align: center">Xã phường</td>
                      <!-- <td style="text-align: center">Tổ thôn</td>
                      <td style="text-align: center">Bệnh viện tỉnh</td> -->
                      <td style="text-align: center">Bệnh viện</td>
                      <td style="text-align: center">Ghi chú</td>
                      <!-- <td style="text-align: center">Số biên lai</td>
                      <td style="text-align: center">Ngày biên lai</td> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in items"
                      :key="index"
                      style="font-size: small"
                    >
                      <td style="text-align: center; vertical-align: middle">
                        {{ index + 1 }}
                      </td>
                      <td style="text-align: center; font-weight: 500">
                        {{ item.masobhxh }}
                      </td>
                      <td style="text-align: left; font-weight: 500">
                        {{ item.hoten }}
                      </td>
                      <td style="text-align: center">
                        {{ formatISODateToDMY(item.ngaysinh) }}
                      </td>
                      <td style="text-align: center">
                        <template v-if="item.gioitinh == 0">
                          <span>Nữ</span>
                        </template>
                        <template v-else>
                          <span>Nam</span>
                        </template>
                      </td>
                      <td style="text-align: center; font-weight: 500">
                        {{ item.cccd }}
                      </td>
                      <td style="text-align: center; font-weight: 500">
                        {{ item.dienthoai }}
                      </td>
                      <td style="text-align: center">
                        {{ item.tenphuongan }}
                      </td>
                      <td style="text-align: center">
                        {{ item.tienluongcs }}
                      </td>
                      <td style="text-align: center">
                        {{ item.tylensnnht }}
                      </td>
                      <td style="text-align: center">
                        {{ item.tylensdp }}
                      </td>
                      <td style="text-align: center">
                        {{ item.hotrokhac }}
                      </td>
                      <td style="text-align: center">
                        {{ formatISODateToDMY(item.tungay) }}
                      </td>
                      <td style="text-align: center">
                        {{ item.tenphuongthucdong }}
                      </td>
                      <td
                        style="text-align: center; font-weight: 500; color: red"
                      >
                        {{ formatCurrency(item.sotien) }}
                      </td>
                      <!-- tỉnh-->
                      <td style="text-align: center">
                        {{ item.tentinh }}
                      </td>
                      <!-- quận huyện -->
                      <td style="text-align: center">
                        {{ item.tenquanhuyen }}
                      </td>
                      <!-- xã phường -->
                      <td>
                        {{ item.tenxaphuong }}
                      </td>
                      <!-- tổ thôn -->
                      <!-- <td>
                        {{ item.tothon }}
                      </td> -->
                      <!-- tỉnh bệnh viện -->
                      <!-- <td style="text-align: center">
                        {{ item.benhvientinh }}
                      </td> -->
                      <!-- bệnh viện -->
                      <td>
                        {{ item.tenbenhvien }}
                      </td>
                      <!-- ghi chú -->
                      <td>
                        {{ item.ghichu }}
                      </td>
                      <!-- biên lai -->
                      <!-- <td style="text-align: center">
                        {{ item.sobienlai }}
                      </td>
                      <td style="text-align: center">
                        {{ formatISODateToDMY(item.ngaybienlai) }}
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="titleKk">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">2.</span> Tổng số
                  tiền phải nạp:
                  <span style="color: red; font-weight: 700">{{
                    formatCurrency(totalSoTien)
                  }}</span>
                </div>
              </div>
              <hr class="navbar-divider" />
              <div class="columns">
                <div class="column" style="margin-top: 10px">
                  <div
                    class="field is-grouped is-flex is-justify-content-center"
                  >
                    <div class="control">
                      <button
                        @click="onSave"
                        class="button is-success is-small"
                      >
                        Xác nhận nạp hồ sơ
                      </button>
                    </div>
                    <div class="control">
                      <button
                        @click="isActive_xacnhan = false"
                        class="button is-warning is-light is-small"
                      >
                        Hủy xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- modal import dữ liệu kê khai -->
    <div class="">
      <div :class="{ 'is-active': isActive_import }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-kekhai box">
          <section class="modal-card-kekhai-body">
            <div>
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Import dữ liệu kê khai</span
                >
              </div>
              <div style="text-align: end">
                <button
                  @click="isActive_import = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>
            </div>
            <div>
              <div class="titleKk">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">1.</span> Chọn file
                  dữ liệu
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div>
                    <div class="file is-info has-name is-small">
                      <label class="file-label">
                        <input
                          @change="onFileChange"
                          class="file-input"
                          type="file"
                          name="resume"
                        />
                        <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label"> Chọn file dữ liệu </span>
                        </span>
                        <span class="file-name">
                          {{ fileName }}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="titleKk" style="margin-top: 10px">
                <hr class="line" />
                <div class="topleft">
                  <span style="color: red; font-weight: 700">2.</span> Danh sách
                  kê khai
                </div>
              </div>
              <div class="columns table_wrapper">
                <div class="column">
                  <div v-if="items.length > 0">
                    <table
                      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                    >
                      <thead>
                        <tr style="font-size: small; background-color: #fff8dc">
                          <td style="text-align: center; width: 3%">STT</td>
                          <td style="text-align: center">Mã số BHXH</td>
                          <td style="text-align: center">Họ tên</td>
                          <td style="text-align: center">Ngày sinh</td>
                          <td style="text-align: center">Giới tính</td>
                          <td style="text-align: center">CCCD</td>
                          <td style="text-align: center">Điện thoại</td>
                          <td style="text-align: center">Phương án</td>
                          <td style="text-align: center">Lương cơ sở</td>
                          <td style="text-align: center">Tỷ lệ NSTW %</td>
                          <td style="text-align: center">Tỷ lệ NSĐP %</td>
                          <td style="text-align: center">Tỷ lệ HT khác</td>
                          <td style="text-align: center">Từ ngày</td>
                          <td style="text-align: center">Số tháng</td>
                          <td style="text-align: center">Số tiền phải đóng</td>
                          <td style="text-align: center">Tỉnh / Thành phố</td>
                          <td style="text-align: center">Quận / Huyện</td>
                          <td style="text-align: center">Xã phường</td>
                          <td style="text-align: center">Tổ thôn</td>
                          <td style="text-align: center">Bệnh viện tỉnh</td>
                          <td style="text-align: center">Bệnh viện</td>
                          <td style="text-align: center">Ghi chú</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in items"
                          :key="index"
                          style="font-size: small"
                        >
                          <td
                            style="text-align: center; vertical-align: middle"
                          >
                            {{ index + 1 }}
                          </td>
                          <td style="text-align: center; font-weight: 500">
                            {{ item.masobhxh }}
                          </td>
                          <td style="text-align: center; font-weight: 500">
                            {{ item.hoten }}
                          </td>
                          <td style="text-align: center">
                            {{ formatISODateToDMY(item.ngaysinh) }}
                          </td>
                          <td style="text-align: center">
                            {{ item.gioitinh }}
                          </td>
                          <td style="text-align: center; font-weight: 500">
                            {{ item.cccd }}
                          </td>
                          <td style="text-align: center; font-weight: 500">
                            {{ item.dienthoai }}
                          </td>
                          <td style="text-align: center">
                            {{ item.tenphuongan }}
                          </td>
                          <td style="text-align: center">
                            {{ item.tienluongcs }}
                          </td>
                          <td style="text-align: center">
                            {{ item.tylensnnht }}
                          </td>
                          <td style="text-align: center">
                            {{ item.tylensdp }}
                          </td>
                          <td style="text-align: center">
                            {{ item.hotrokhac }}
                          </td>
                          <td style="text-align: center">
                            {{ formatISODateToDMY(item.tungay) }}
                          </td>
                          <td style="text-align: center">
                            {{ item.tenphuongthucdong }}
                          </td>
                          <td
                            style="
                              text-align: center;
                              font-weight: 500;
                              color: red;
                            "
                          >
                            {{ formatCurrency(item.sotien) }}
                          </td>
                          <!-- tỉnh-->
                          <td style="text-align: center">
                            {{ item.tentinh }}
                          </td>
                          <!-- quận huyện -->
                          <td style="text-align: center">
                            {{ item.tenquanhuyen }}
                          </td>
                          <!-- xã phường -->
                          <td>
                            {{ item.tenxaphuong }}
                          </td>
                          <!-- tổ thôn -->
                          <td>
                            {{ item.tothon }}
                          </td>
                          <!-- tỉnh bệnh viện -->
                          <td style="text-align: center">
                            {{ item.benhvientinh }}
                          </td>
                          <!-- bệnh viện -->
                          <td>
                            {{ item.tenbenhvien }}
                          </td>
                          <!-- ghi chú -->
                          <td>
                            {{ item.ghichu }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <hr class="navbar-divider" />
              <div class="columns">
                <div class="column" style="margin-top: 10px">
                  <div
                    class="field is-grouped is-flex is-justify-content-center"
                  >
                    <div class="control">
                      <button
                        @click="onSave"
                        class="button is-success is-small"
                      >
                        Xác nhận nạp hồ sơ
                      </button>
                    </div>
                    <div class="control">
                      <button
                        @click="cancelImport"
                        class="button is-warning is-light is-small"
                      >
                        Hủy xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
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
  name: "calCastAR",
  mixins: [mixinDmBhxh],

  // nhận mã loại hình và tên loại hình từ page kekhai
  props: {
    maloaihinh: String,
    loaihinh: String,
  },
  components: { DatePicker, vSelect },
  data() {
    return {
      isActive: false,
      isActive_nhaphoso: false,
      isActive_xacnhan: false,
      isActive_import: false,
      mask: currencyMask,
      items: [],
      template_items: [],
      selectedOption: "- Chọn phương án -",
      selectedOptionptd: "- Chọn phương thức đóng -",
      selectedOptionHtnt: "- Chọn hình thức nạp tiền -",
      selectedOptionBenhvien: "- Chọn cơ sở khám chữa bệnh -",
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
      luongcoso: 0,
      tylengansachtw: 0,
      tylenngansachdp: 0,
      hotrokhac: 0,
      matinh: "",
      tentinh: "",
      dmquanhuyen: [],
      dmbenhvien: [],
      checkXaphuongOpen: false, // khóa xã phường khi load form
      form_response_sucess: [],
      form_response_failed: [],
      isLoading: false,

      formKekhai: {
        sohoso: "",
        dotkekhai: "",
        kykekhai: "",
        ngaykekhai: "",
      },

      // phục vụ việc nhập item từ modal
      addedIndex: 0,
      datanhaphosomodal: {},

      // thêm cho việc import dữ liệu kê khai từ file execl
      fileName: "",
      selectedFile: null,
      isRoleSent: false,

      benhvienInfo: null,
    };
  },

  mounted() {
    this.isRoleSent = this.user.res_sent;
    // console.log(this.isRoleSent);
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

    isDisabled_Xaphuong() {
      return this.checkXaphuongOpen == false;
    },

    totalSoTien() {
      if (this.items && this.items.length > 0) {
        return this.items.reduce((acc, item) => {
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

    customStyles() {
      return {
        dropdown: (base) => ({
          ...base,
          maxHeight: "50px", // Giảm chiều cao tối đa của danh sách
          overflowY: "auto", // Thêm thanh cuộn
        }),
        dropdownMenu: (base) => ({
          ...base,
          direction: "top", // Hướng xổ lên
        }),
      };
    },
  },

  methods: {
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

    addHosokekhai() {
      this.addedIndex = 0; // là chỉ mục index của item hiện tại đang được nhập tại modal
      // Mở trạng thái nhập hồ sơ
      this.selectedOption = "- Chọn phương án -";
      this.selectedOptionBenhvien = "- Chọn cơ sở khám chữa bệnh -";
      this.selectedOptionptd = "- Chọn phương thức đóng -";
      (this.selectedOptionHtnt = "- Chọn hình thức nạp tiền -"),
        (this.isActive_nhaphoso = true);
      // Số lượng phần tử trước khi thêm
      const previousLength = this.items.length;
      // Thêm dòng mới vào mảng
      this.addRow();
      // Số lượng phần tử sau khi thêm
      const currentLength = this.items.length;
      // Nếu số lượng phần tử tăng lên, lấy chỉ số dòng vừa thêm
      this.addedIndex = -1;
      if (currentLength > previousLength) {
        this.addedIndex = currentLength - 1; // Chỉ số dòng mới là phần tử cuối cùng
      }
      // console.log(
      //   "Index của dòng vừa thêm đang được nhập tại modal:",
      //   this.addedIndex
      // );
      this.datanhaphosomodal = this.items[this.addedIndex];
      // console.log(this.datanhaphosomodal);
    },

    // ghi thông tin bệnh viện vào.
    // onBenhVienSelected(selected, index) {
    //   console.log("Selected:", selected);
    //   console.log("Index:", index);

    //   if (selected) {
    //     this.items[index].mabenhvien = selected.mabenhvien;
    //     this.items[index].tenbenhvien = selected.tenbenhvien;
    //     this.items[index].benhvienInfo = selected; // Nếu cần lưu thêm info
    //   }
    // },

    async xacnhanGhihoso() {
      const result = await Swal.fire({
        title: `Xác nhận thêm vào bộ hồ sơ kê khai ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Không`,
      });
      if (result.isConfirmed) {
        // check toàn bộ ô để valid form
        const fieldNames = {
          masobhxh: "Mã số BHXH",
          hoten: "Họ tên",
          ngaysinh: "Ngày sinh",
          cccd: "Căn cước công dân",
          maphuongan: "Phương án",
          tungay: "Từ ngày",
          tenphuongthucdong: "Phương thức đóng",
          hinhthucnap: "Hình thức nạp",
          tentinh: "Tỉnh",
          mabenhvien: "Bệnh viện",
        };

        const fieldsToValidate = [
          "masobhxh",
          "hoten",
          "ngaysinh",
          "cccd",
          "maphuongan",
          "tungay",
          "tenphuongthucdong",
          "hinhthucnap",
          "tentinh",
          "mabenhvien",
        ];

        for (const key of fieldsToValidate) {
          if (
            !this.datanhaphosomodal[key] ||
            this.datanhaphosomodal[key] === ""
          ) {
            const fieldName = fieldNames[key] || key;
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
              title: `Vui lòng nhập ${fieldName}!`,
            });
            return;
          }
        }

        this.items[this.addedIndex] = this.datanhaphosomodal;
        this.datanhaphosomodal = {};
        this.isActive_nhaphoso = false;
        // console.log(this.items);
        // console.log(this.benhvienInfo.mabenhvien);
      }
    },

    async cancelNhaphoso() {
      const result = await Swal.fire({
        title: `Xác nhận hủy kê khai hồ sơ ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Không`,
      });
      if (result.isConfirmed) {
        this.items.splice(this.addedIndex, 1);
        this.isActive_nhaphoso = false;
      }
    },

    async guiKekhai() {
      if (this.items.length > 0) {
        // console.log(this.items);
        this.isActive_xacnhan = true;
      } else {
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
          title: "Không có hồ sơ nào để xác nhận",
        });
      }
    },

    addRow() {
      try {
        this.items.push({
          matochuc: this.user.matochuc,
          tentochuc: this.user.tentochuc,
          madaily: this.user.madaily,
          tendaily: this.user.tendaily,
          // loại hình nhận từ props kekhai
          maloaihinh: this.maloaihinh,
          tenloaihinh: this.loaihinh,
          // info human
          masobhxh: "",
          hoten: "",
          ngaysinh: "",
          gioitinh: "",
          cccd: "",
          dienthoai: "",
          // ke khai tham gia
          info_phuongan: this.phuongan,
          maphuongan: "",
          tenphuongan: "",
          tienluongcs: this.luongcoso,
          tylensnnht: this.tylengansachtw,
          tylensdp: this.tylenngansachdp,
          hotrokhac: this.hotrokhac,
          tungay: "",
          phuongthucdong: this.phuongthucdong,
          maphuongthucdong: "",
          tenphuongthucdong: "",
          sotien: 0, // tiền phải đóng
          info_tinh: { matinh: this.matinh, tentinh: this.tentinh }, // tỉnh mặc định sẽ load theo tên người dùng login
          matinh: this.matinh,
          tentinh: this.tentinh,
          info_huyen: this.dmquanhuyen,
          maquanhuyen: "",
          tenquanhuyen: "",
          info_xaphuong: [],
          maxaphuong: "",
          tenxaphuong: "",
          tothon: "",
          info_benhvien: this.dmbenhvien,
          benhvientinh: this.matinh,
          mabenhvien: "",
          tenbenhvien: "",
          ghichu: "",
          // phải kê vào để lưu CSDL những cái này không có trong loại hình này
          madoituong: "",
          tendoituong: "",
          tuthang: "",
          denthang: "",
          nguoithu: "",
          manguoithu: 0,
          tylengansachdiaphuong: 0,
          tyledong: 0,
          muctiendong: 0,
          tientunguyendong: 0,
          tienlai: 0,
          tiennsnnht: 0,
          tiennsdp: 0,

          // hồ sơ kê khai
          dotkekhai: "",
          kykekhai: "",
          ngaykekhai: "",
          ngaybienlai: "",
          sobienlai: "",
          trangthai: 1,

          status_hosoloi: 0,
          status_naptien: 0,
        });

        // console.log(this.items)
      } catch (error) {
        console.log(error);
      }
    },

    deleteRow(index) {
      this.items.splice(index, 1);
    },

    copyRow() {
      try {
        let newRow = {}; // Tạo một đối tượng mới để lưu trữ dòng mới

        // Nếu có ít nhất một dòng trong items
        if (this.items.length > 0) {
          // Sao chép dữ liệu của dòng trước đó
          const previousRow = this.items[this.items.length - 1];
          Object.assign(newRow, previousRow);
        }

        // Thêm dòng mới vào mảng items
        this.items.push(newRow);
      } catch (error) {
        console.error("Error adding row:", error);
      }
    },

    formatCurrency(number) {
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },

    formatISODateToDMY(isoDateString) {
      const dateFormat = this.identifyDateFormat(isoDateString);
      if (dateFormat == "YYYY-MM-DD") {
        const date = new Date(isoDateString);

        // Lấy ngày, tháng và năm từ đối tượng Date
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        // Tạo chuỗi ngày tháng dd/mm/yyyy
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
      } else {
        return isoDateString;
      }
    },

    // phương án
    async phuonganChange(e, index) {
      const maphuongan = e.target.value;
      const tenphuongan = e.target.options[e.target.selectedIndex].text;
      this.items[index].maphuongan = maphuongan;
      this.items[index].tenphuongan = tenphuongan;
    },

    // phương thức đóng
    async phuongthucdChange(e, index) {
      const maphuongthucdong = e.target.value;
      const tenphuongthucdong = e.target.options[e.target.selectedIndex].text;
      this.items[index].maphuongthucdong = maphuongthucdong;
      this.items[index].tenphuongthucdong = tenphuongthucdong;

      // tính số tiền phải nạp
      // console.log(typeof(this.luongcoso));
      const cast =
        this.luongcoso * 0.045 * parseInt(this.items[index].maphuongthucdong);

      const twHotro =
        this.luongcoso *
        0.045 *
        parseInt(this.items[index].maphuongthucdong) *
        (this.tylengansachtw / 100);

      const dpHotro =
        this.luongcoso *
        0.045 *
        parseInt(this.items[index].maphuongthucdong) *
        (this.tylenngansachdp / 100);

      const hotroKhac =
        this.luongcoso *
        0.045 *
        parseInt(this.items[index].maphuongthucdong) *
        parseInt(this.items[index].hotrokhac);

      const sotienPhaidong = cast - (twHotro + dpHotro + hotroKhac);
      this.items[index].sotien = sotienPhaidong;
      // console.log(this.items[index]);
    },

    // tỉnh thành phố
    async provinceChange(e, index) {
      // lấy thông tin thay đổi từ người dùng select
      const matinh = e.target.value;
      const tentinh = e.target.options[e.target.selectedIndex].text;
      // lấy dữ liệu quận huyện từ mã tỉnh đã được chọn
      try {
        const response = await this.$axios.get(
          `/api/danhmucs/dmquanhuyenwithmatinh?matinh=${matinh}`
        );
        // bind dữ liệu vào dữ liệu select của items để cho từng item sử dụng
        this.items[index].info_huyen = response.data;
        this.items[index].matinh = matinh;
        this.items[index].tentinh = tentinh;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    // quận huyện
    async quanhuyenChange(e, index) {
      const maquanhuyen = e.target.value;
      const tenquanhuyen = e.target.options[e.target.selectedIndex].text;
      this.items[index].maquanhuyen = maquanhuyen;
      this.items[index].tenquanhuyen = tenquanhuyen;
      try {
        const response = await this.$axios.get(
          `/api/danhmucs/dmxaphuongwithmahuyen?maquanhuyen=${maquanhuyen}`
        );
        if (response.data.length > 0) {
          this.items[index].info_xaphuong = response.data;
          this.checkXaphuongOpen = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    // xã phường
    async xaphuongChange(e, index) {
      const maxaphuong = e.target.value;
      const tenxaphuong = e.target.options[e.target.selectedIndex].text;
      this.items[index].maxaphuong = maxaphuong;
      this.items[index].tenxaphuong = tenxaphuong;
    },

    // tỉnh bệnh viện
    async benhvienChange(e, index) {
      const matinh = e.target.value;
      this.items[index].benhvientinh = matinh;
      try {
        const response = await this.$axios.get(
          `/api/danhmucs/dmbenhvienwithtinh?matinh=${matinh}`
        );
        if (response.data.length > 0) {
          this.items[index].info_benhvien = response.data;
          this.checkXaphuongOpen = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    // thông tin bệnh viện
    async hopChange(e, index) {
      const mabenhvien = e.target.value;
      const text = e.target.options[e.target.selectedIndex].text;

      // Tách ra
      const parts = text.split(" - ");
      const tenbenhvien = parts[1] ? parts[1].trim() : "";

      this.items[index].mabenhvien = mabenhvien;
      this.items[index].tenbenhvien = tenbenhvien;
      // console.log(this.items[index]);
    },

    async hopChangeReset(e, index) {
      const mabenhvien = e.target.value;
      const text = e.target.options[e.target.selectedIndex].text;
      // console.log(mabenhvien);
      // console.log(text);

      this.items[index].mabenhvien = mabenhvien;
      this.items[index].tenbenhvien = text;
      // console.log(this.items[index]);
    },

    hinhthucNap(event, index) {
      const selectedOption = event.target.value;
      // console.log(selectedOption);
      if (selectedOption) {
        this.items[index].hinhthucnap = selectedOption;
        this.datanhaphosomodal.hinhthucnap = selectedOption;
      }
    },

    // check mã số bhxh
    isValidMasoBHXH(masobhxh) {
      // Loại bỏ tất cả các ký tự không phải số
      const cleanedCCCD = masobhxh.replace(/\D/g, "");
      // Kiểm tra độ dài của CCCD và số đầu tiên
      return cleanedCCCD.length === 10;
    },

    // check phone number
    // isValidPhoneNumber(phoneNumber) {
    //   const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    //   return cleanedPhoneNumber.length === 10;
    // },

    // check số cccd
    isValidCCCD(cccd) {
      // Loại bỏ tất cả các ký tự không phải số
      const cleanedCCCD = cccd.replace(/\D/g, "");
      // Kiểm tra độ dài của CCCD và số đầu tiên
      return cleanedCCCD.length === 12 && cleanedCCCD.charAt(0) === "0";
    },

    // design at 20h30 03/05/2024
    // check số biên lai
    isValidSobienlai(sobienlai) {
      // Loại bỏ tất cả các ký tự không phải số
      const cleanedSobienlai = sobienlai.replace(/\D/g, "");
      // Kiểm tra độ dài của số biên lai
      return cleanedSobienlai.length === 7;
    },

    checkSobienlai(sobienlai) {
      if (sobienlai !== "") {
        // console.log(sobienlai.length);
        if (sobienlai.length !== 7) {
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
            title: "Số biên lai phải có đúng 7 chữ số !",
          });
        }
      }
    },

    checkNowDateNgaybienlai(ngaybienlai) {
      const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
      const dateNow = nowInVietnam.toFormat("yyyy-MM-dd");
      // console.log(dateNow);
      const month = nowInVietnam.month; // Tháng hiện tại
      const year = nowInVietnam.year; // năm hiện tại
      const monthYearNow = month + year;
      // check tháng ngày năm của ngày biên lại nhập vào
      const dateNgaybienlai = new Date(ngaybienlai);
      // Lấy giá trị tháng (tháng bắt đầu từ 0, cần cộng 1)
      const monthBienlai = dateNgaybienlai.getMonth() + 1;
      const yearBienlai = dateNgaybienlai.getFullYear();
      const monthYearBienlai = monthBienlai + yearBienlai;
      // console.log(monthBienlai);
      // console.log(month);
      if (monthYearBienlai !== monthYearNow) {
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
          title:
            "Tháng năm biên lai bạn nhập có tháng năm không phải tháng năm tại thời điểm hiện tại",
        });
      }
    },

    checkAlertCccd(cccd) {
      if (cccd !== "") {
        const cleanedCCCD = cccd.replace(/\D/g, "");
        if (cleanedCCCD.length !== 12) {
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
            title: "CCCD phải có đúng 12 chữ số !",
          });
        }
      }
    },

    // checkAlertSodienthoai(dienthoai) {
    //   if (dienthoai !== "") {
    //     const cleanedPhone = dienthoai.replace(/\D/g, "");
    //     if (cleanedPhone.length !== 10) {
    //       const Toast = Swal.mixin({
    //         toast: true,
    //         position: "top-end",
    //         showConfirmButton: false,
    //         timer: 3000,
    //         timerProgressBar: true,
    //         didOpen: (toast) => {
    //           toast.addEventListener("mouseenter", Swal.stopTimer);
    //           toast.addEventListener("mouseleave", Swal.resumeTimer);
    //         },
    //       });
    //       Toast.fire({
    //         icon: "error",
    //         title: "Số điện thoại phải có đúng 10 chữ số !",
    //       });
    //     }
    //   }
    // },

    async checkFormData() {
      for (let i = 0; i < this.items.length; i++) {
        if (!this.items[i].masobhxh) {
          this.$toasted.show("Thiếu mã số BHXH", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.masobhxhInput[i]) {
            this.$refs.masobhxhInput[i].focus();
          }
          return false;
        }

        if (!this.isValidMasoBHXH(this.items[i].masobhxh)) {
          this.$toasted.show("Mã số BHXH không hợp lệ", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.masobhxhInput[i]) {
            this.$refs.masobhxhInput[i].focus();
          }
          return false;
        }

        if (!this.items[i].hoten) {
          this.$toasted.show("Thiếu họ tên", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.nameInput[i]) {
            this.$refs.nameInput[i].focus();
          }
          return false;
        }

        if (this.items[i].ngaysinh == "") {
          this.$toasted.show("Thiếu ngày sinh", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.ngaysinhInput[i]) {
            this.$refs.ngaysinhInput[i].focus();
          }
          return false;
        }

        if (!this.items[i].gioitinh) {
          this.$toasted.show("Chọn giới tính", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.gioitinhSelect[i]) {
            this.$refs.gioitinhSelect[i].focus();
          }
          return false;
        }

        if (!this.items[i].cccd) {
          this.$toasted.show("Thiếu CCCD", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.cccdInput[i]) {
            this.$refs.cccdInput[i].focus();
          }
          return false;
        }

        if (!this.isValidCCCD(this.items[i].cccd)) {
          this.$toasted.show("CCD không hợp lệ", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.cccdInput[i]) {
            this.$refs.cccdInput[i].focus();
          }
          return false;
        }

        // if (!this.items[i].dienthoai) {
        //   this.$toasted.show("Thiếu điện thoại", {
        //     duration: 3000,
        //     theme: "bubble",
        //   });
        //   if (this.$refs.dienthoaiInput[i]) {
        //     this.$refs.dienthoaiInput[i].focus();
        //   }
        //   return false;
        // }

        // if (!this.isValidPhoneNumber(this.items[i].dienthoai)) {
        //   this.$toasted.show("Số điện thoại không hợp lệ", {
        //     duration: 3000,
        //     theme: "bubble",
        //   });
        //   if (this.$refs.dienthoaiInput[i]) {
        //     this.$refs.dienthoaiInput[i].focus();
        //   }
        //   return false;
        // }

        if (!this.items[i].maphuongan || !this.items[i].tenphuongan) {
          this.$toasted.show("Chọn một phương án", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.phuonganSelect[i]) {
            this.$refs.phuonganSelect[i].focus();
          }
          return false;
        }

        if (!this.items[i].tungay) {
          this.$toasted.show("Thiếu từ ngày", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.tungayInput[i]) {
            this.$refs.tungayInput[i].focus();
          }
          return false;
        }

        if (
          !this.items[i].maphuongthucdong ||
          !this.items[i].tenphuongthucdong
        ) {
          this.$toasted.show("Thiếu phương thức đóng", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.phuongthucdongSelect[i]) {
            this.$refs.phuongthucdongSelect[i].focus();
          }
          return false;
        }

        if (!this.items[i].maquanhuyen || !this.items[i].tenquanhuyen) {
          this.$toasted.show("Thiếu quận huyện", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.quanhuyenSelect[i]) {
            this.$refs.quanhuyenSelect[i].focus();
          }
          return false;
        }

        if (!this.items[i].maxaphuong || !this.items[i].tenxaphuong) {
          this.$toasted.show("Thiếu xã phường", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.xaphuongSelect[i]) {
            this.$refs.xaphuongSelect[i].focus();
          }
          return false;
        }

        // if (!this.items[i].tothon) {
        //   this.$toasted.show("Thiếu tổ thôn", {
        //     duration: 3000,
        //     theme: "bubble",
        //   });
        //   if (this.$refs.tothonInput[i]) {
        //     this.$refs.tothonInput[i].focus();
        //   }
        //   return false;
        // }

        // if (!this.items[i].mabenhvien || !this.items[i].tenbenhvien) {
        //   this.$toasted.show("Chọn bệnh viện", {
        //     duration: 3000,
        //     theme: "bubble",
        //   });
        //   if (this.$refs.hopInput[i]) {
        //     this.$refs.hopInput[i].focus();
        //   }
        //   return false;
        // }

        if (!this.items[i].hinhthucnap) {
          this.$toasted.show("Chọn hình thức nạp tiền", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.hinhthucnapInput[i]) {
            this.$refs.hinhthucnapInput[i].focus();
          }
          return false;
        }

        // biên lai
        // if (!this.isValidSobienlai(this.items[i].sobienlai)) {
        //   this.$toasted.show("Số biên lai phải 7 số", {
        //     duration: 3000,
        //     theme: "bubble",
        //   });
        //   if (this.$refs.sobienlaiInput[i]) {
        //     this.$refs.sobienlaiInput[i].focus();
        //   }
        //   return false;
        // }

        // if (!this.items[i].sobienlai) {
        //   this.$toasted.show("Chưa nhập số biên lai", {
        //     duration: 3000,
        //     theme: "bubble",
        //   });
        //   if (this.$refs.sobienlaiInput[i]) {
        //     this.$refs.sobienlaiInput[i].focus();
        //   }
        //   return false;
        // }

        // if (!this.items[i].ngaybienlai) {
        //   this.$toasted.show("Chưa nhập ngày biên lai", {
        //     duration: 3000,
        //     theme: "bubble",
        //   });
        //   if (this.$refs.ngaybienlaiInput[i]) {
        //     this.$refs.ngaybienlaiInput[i].focus();
        //   }
        //   return false;
        // }
      }
      // Nếu tất cả thông tin đều hợp lệ, trả về true để cho phép quá trình lưu dữ liệu
      return true;
    },

    // chuyển đổi định dạng ngày tháng
    convertDate(inputDate) {
      const [year, month, day] = inputDate.split("-");
      return `${day}/${month}/${year}`;
    },

    identifyDateFormat(dateString) {
      // Biểu thức chính quy cho định dạng YYYY-MM-DD
      const regexYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;

      // Biểu thức chính quy cho định dạng DD/MM/YYYY
      const regexDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;

      // Kiểm tra xem chuỗi ngày tháng thuộc định dạng nào
      if (regexYYYYMMDD.test(dateString)) {
        return "YYYY-MM-DD";
      } else if (regexDDMMYYYY.test(dateString)) {
        return "DD/MM/YYYY";
      } else {
        return "UNKNOWN";
      }
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

    generateUniqueString() {
      return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    },

    async xacnhanThoat() {
      const result = await Swal.fire({
        title: `Xác nhận thoát?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy thoát`,
      });
      if (result.isConfirmed) {
        this.isActive = false;
      }
    },

    async guiDulieuLenCongBhxhvn(data) {
      const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
      const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");

      // console.log(data);
      let matochucDvt = "";
      if (data.maloaihinh == "AR") {
        matochucDvt = "AR0013M";
      } else if (data.maloaihinh == "BI") {
        matochucDvt = "BI0007M";
      } else {
        matochucDvt = "IS0012M";
      }

      // thông tin biên lai
      const currentYear = new Date().getFullYear();
      let curentInvoiceNumber = 0;

      const getCurrentSobienlai = await this.$axios.get(
        `/api/kekhai/sobienlai`
      );
      // console.log(getCurrentSobienlai.data.bienlai[0].sobienlai);
      curentInvoiceNumber = getCurrentSobienlai.data.bienlai[0].sobienlai;
      // console.log(curentInvoiceNumber);

      const dataPost = {
        hosoIdentity: data.hosoIdentity,
        maSoBhxh: data.masobhxh,
        hoTen: data.hoten,
        soCccd: data.cccd,
        ngaySinh: data.ngaysinh,
        gioiTinh: data.gioitinh,
        soDienThoai: data.dienthoai,
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
        denNgay: data.denngay,
        tuThang: data.tuthang,
        denThang: data.denthang,
        maDaiLy: data.madaily,
        tenDaiLy: data.tendaily,
        soHoSo: data.sohoso,
        dotKeKhai: data.dotkekhai,
        kyKeKhai: data.kykekhai,
        ngayKeKhai: data.ngaykekhai,
        createdBy: this.user.username,
        sobienlai: curentInvoiceNumber,
        ngaybienlai: formattedDate,
        maloaihinh: data.maloaihinh,
        currentYear: currentYear,
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
            // ghi dữ liệu biên lai
            const ghibienlai = await this.$axios.post(
              `/api/kekhai/ghidulieubienlai`,
              combinedData
            );

            // console.log(ghibienlai);

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

              const resUpdate = await this.$axios.patch(
                `/api/kekhai/capnhatkekhai`,
                bodyRes
              );
              // console.log(resUpdate);
            }
          }
        } catch (error) {
          console.error("Error posting data:", error);
          throw error;
        }
      }
    },

    async onSave() {
      const matochuc = this.user.matochuc;

      if (this.items.length <= 0) {
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
          title: "Chưa có bản ghi nào !",
        });
        return;
      } else {
        // Kiểm tra dữ liệu trước khi ghi
        const isDataValid = await this.checkFormData();
        if (!isDataValid) {
          // Dừng quá trình lưu dữ liệu nếu dữ liệu không hợp lệ
          return;
        }

        const result = await Swal.fire({
          title: `Xác nhận gửi hồ sơ kê khai ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy gửi`,
        });
        if (result.isConfirmed) {
          // const current = new Date();
          const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
          const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");
          const kyKeKhaiFrm = nowInVietnam.toFormat("MM/yyyy");
          // Bắt đầu hiển thị biểu tượng loading
          this.isLoading = true;
          let dataKekhai = [];
          try {
            for (let i = 0; i < this.items.length; i++) {
              this.items[i].sotien = this.items[i].sotien.replace(/,/g, "");
              this.items[i].tienluongcs = this.items[i].tienluongcs.replace(
                /,/g,
                ""
              );
              // this.items[
              //   i
              // ].mabenhvien = `${this.items[i].matinh}${this.items[i].mabenhvien}`;
              // this.items[i].tenbenhvien = this.items[i].tenbenhvien.trim();

              // this.items[i].mabenhvien = this.benhvienInfo.mabenhvien;
              // this.items[i].tenbenhvien = this.benhvienInfo.tenbenhvien;
              // console.log(this.benhvienInfo.tenbenhvien);
              // console.log(this.benhvienInfo.mabenhvien);

              // Nếu ngày sinh từ db người hưởng sẽ có dạng text không cần chuyển đổi
              // Nếu từ input dạng yyyy-mm-dd thì phải đổi thành text
              // thay bằng datetime piker nên tạm bỏ cái này.
              // const dateFormat = this.identifyDateFormat(
              //   this.items[i].ngaysinh
              // );
              // if (dateFormat == "YYYY-MM-DD") {
              //   const ngaysinhTranform = this.convertDate(
              //     this.items[i].ngaysinh
              //   );
              //   this.items[i].ngaysinh = ngaysinhTranform;
              // }

              const tungayTranform = this.convertDate(this.items[i].tungay);
              this.items[i].tungay = tungayTranform;

              this.items[i].denngay = this.calculateEndDate(
                this.items[i].tungay,
                this.items[i].maphuongthucdong
              );

              this.items[i].tennguoitao = this.user.name;
              // ngày biên lai
              // const ngaybienlaiTranform = this.convertDate(
              //   this.items[i].ngaybienlai
              // );
              // this.items[i].ngaybienlai = ngaybienlaiTranform;

              // info add db
              this.items[i].createdAt = formattedDate;
              this.items[i].createdBy = this.user.username;
              this.items[i].updatedAt = "";
              this.items[i].updatedBy = "";

              // thông tin bộ hồ sơ nạp
              this.items[i].nvt_masobhxh = this.user.masobhxh;
              this.items[i].nvt_cccd = this.user.cccd;
              this.items[i].kykekhai = kyKeKhaiFrm;
              this.items[i].ngaykekhai = formattedDate;

              const uniqueString = this.generateUniqueString();
              this.items[i].hosoIdentity =
                uniqueString +
                this.items[i].masobhxh +
                this.items[i].cccd +
                this.user.username;

              // **** thêm các thông tin để gửi dữ liệu lên cổng tiếp nhận BHXH VN
              // số tiền, số tháng kiểu float và kiểu int cho từng loại
              // mã tổ chức dịch vụ thu cho công ty an sinh hưng nguyên
              // IS0104S: BHXH tự nguyện
              // IL0001S: Lực lượng tham gia bảo vệ ANTT ở cơ sở
              // BI0099S: BHYT Hộ gia đình
              // AR0099S: BHYT HGĐ làm nông lâm ngư Nghiệp
              // Vậy đối với AR thì mã TCDV thu là: AR0099S

              // mã tổ chức dịch vụ thu cho công ty An sinh 159
              // BI0214M	Tổ chức dịch vụ thu BHYT HGĐ - Công ty TNHH An Sinh 159
              // AR0212M	Tổ chức dịch vụ thu BHYT HGĐ có MSTB - Công ty TNHH An Sinh 159
              // IS0212M	Tổ chức dịch vụ thu BHXH TN - Công ty TNHH An Sinh 159

              let maToChucDvt = "AR0212M";
              let soTien = this.items[i].sotien;
              let soThang = this.items[i].maphuongthucdong;
              let maNhanVienThu = "NVT" + this.items[i].nvt_cccd;
              let tenNhanVienThu = this.user.name;
              let maCqBhxh = this.user.macqbhxh;
              let tenCqBhxh = this.user.tencqbhxh;
              let key = "0123"; // do bhxh vn cung cấp
              let tuNgay = tungayTranform;
              let denNgay = this.calculateEndDate(tuNgay, soThang);

              // Loại bỏ dữ liệu không cần thiết bằng destructuring
              const {
                info_benhvien,
                info_huyen,
                info_phuongan,
                info_tinh,
                info_xaphuong,
                phuongthucdong,
                ...filteredItem
              } = this.items[i];

              // Thêm vào mảng mới
              // Tạo một đối tượng chứa các phần khai báo mới
              const additionalData = {
                maToChucDvt,
                soTien,
                soThang,
                maNhanVienThu,
                tenNhanVienThu,
                maCqBhxh,
                tenCqBhxh,
                key,
                tuNgay,
                denNgay,
              };

              // Thêm cả filteredItem và additionalData vào mảng dataKekhai
              dataKekhai.push({
                ...filteredItem,
                ...additionalData,
              });
            }

            // console.log(dataKekhai);

            const result = await this.$axios.post(
              `/api/kekhai/add-kekhai-series`,
              dataKekhai
            );

            // console.log(result);

            if (result.status === 200) {
              this.form_response_sucess = [];
              this.formKekhai = {};
              // console.log(result.data.data);
              this.form_response_sucess = result.data.listSuccess;
              this.form_response_sucess = this.form_response_sucess.map(
                (item) => ({
                  ...item,
                  isSent: false, // Gán trạng thái gửi mặc định là chưa gửi
                })
              );
              // console.log(this.form_response_sucess);

              this.form_response_failed = result.data.listFailed;
              const ttHoso = result.data.listSuccess[0];
              this.formKekhai = {
                sohoso: ttHoso.sohoso,
                dotkekhai: ttHoso.dotkekhai,
                kykekhai: ttHoso.kykekhai,
                ngaykekhai: ttHoso.ngaykekhai,
              };
              // console.log(this.formKekhai);

              this.isLoading = false;
              this.isActive_xacnhan = false;
              this.isActive = true;
              this.items = [];
            }
          } catch (error) {
            // console.log(error);
            this.isLoading = false;
          }
        }
      }
    },

    async onFileChange(e) {
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
      const files = e.target.files;

      const fileReader = new FileReader(); // construction function that can read the file content
      fileReader.onload = (ev) => {
        const data = ev.target.result;
        const workbook = XLSX.read(data, {
          type: "binary", // binary
        });
        const wsname = workbook.SheetNames[0]; //take the first sheet
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
        this.items = ws;
        // ws.forEach((template) => {
        //   this.items.forEach((item) => {
        //     // Duyệt qua các trường của template
        //     for (const key in template) {
        //       if (item.hasOwnProperty(key)) {
        //         // Nếu item có trường giống với template, ghi đè giá trị
        //         item[key] = template[key];
        //       }
        //     }
        //   });
        // });
      };

      fileReader.readAsBinaryString(files[0]); // read file, trigger onload
    },

    async importKekhai() {
      // thêm các thứ sau. 1. import XLSX from "xlsx"
      // 2. thêm isActive_import (vào data); 3. thêm fileName: "", và selectedFile: null, vào data
      // thêm @click="importKekhai" cho button trên cùng
      this.isActive_import = true;
    },

    cancelImport() {
      this.isActive_import = false;
      this.items = [];
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
