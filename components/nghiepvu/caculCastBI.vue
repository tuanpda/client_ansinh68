<template>
  <div>
    <div style="margin-top: 20px">
      <div class="columns">
        <div class="column">
          <div
            class="field is-grouped is-grouped-multiline is-justify-content-flex-end"
          >
            <!-- <p class="control">
              <button @click="addHosokekhai" class="button is-small is-success">
                <span class="icon">
                  <i class="fas fa-pen-nib"></i>
                </span>
                <span>Nhập dữ liệu kê khai</span>
              </button>
            </p> -->
            <p class="control">
              <button class="button is-small is-info">
                <span class="icon">
                  <i class="fas fa-file-import"></i>
                </span>
                <span>Import tờ khai</span>
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
              <td style="text-align: center">Người thứ ?</td>
              <td style="text-align: center">Lương cơ sở</td>
              <td style="text-align: center">Hạn thẻ cũ</td>
              <td style="text-align: center">Số tháng</td>
              <td style="text-align: center">Số tiền phải đóng</td>
              <td style="text-align: center">Tỉnh / Thành phố</td>
              <td style="text-align: center">Quận / Huyện</td>
              <td style="text-align: center">Xã phường</td>
              <td style="text-align: center">Tổ thôn</td>
              <!--<td style="text-align: center">Bệnh viện tỉnh</td> -->
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
                <a @click="checkItem(item)">
                  <span class="icon is-small">
                    <i style="color: #198754" class="fab fa-angellist"></i>
                  </span>
                </a>
                &nbsp;
                <a @click="checkHgd(item)" title="Thông tin HGĐ">
                  <span class="icon is-small">
                    <i style="color: #0d6efd" class="fab fa-audible"></i>
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
                <div class="select is-fullwidth is-small">
                  <select
                    v-model="item.manguoithu"
                    @change="nguoithuChange($event, index)"
                    ref="nguoithuSelect"
                  >
                    <option disabled value="">- Chọn người thứ ? -</option>
                    <option
                      v-for="(nt, idx) in item.info_nguoithu"
                      :key="idx"
                      :value="nt.manguoithu"
                    >
                      {{ nt.nguoithu }}
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

              <!-- <td style="text-align: center">
                <input
                  v-model="item.tungay"
                  class="input is-small"
                  type="date"
                  ref="tungayInput"
                />
              </td> -->
              <td style="text-align: center">
                <input v-model="hanthecu" type="text" class="input is-small" />
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
                    v-model="item.info_tinh.matinh"
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
              <td style="text-align: center">
                <input
                  v-model="item.tothon"
                  class="input is-small"
                  type="text"
                  ref="tothonInput"
                />
              </td>
              <!-- tỉnh bệnh viện -->
              <!-- <td style="text-align: center">
                <div class="select is-fullwidth is-small">
                  <select
                    @change="benhvienChange($event, index)"
                    v-model="item.info_tinh.matinh"
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
              <td>
                <div class="select is-fullwidth is-small">
                  <select
                    @change="hinhthucNap($event, addedIndex)"
                    v-model="item.hinhthucnap"
                    ref="hinhthucnapInput"
                  >
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
                  kê khai
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div v-if="form_response_sucess.length > 0">
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
                <div class="column">
                  <div style="margin-bottom: 5px">
                    <label class="labelFix">Phương án</label>
                  </div>
                  <div class="select is-fullwidth is-small">
                    <select
                      @change="phuonganChange($event, addedIndex)"
                      ref="phuonganSelect"
                      v-model="selectedOptionpa"
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
                    <label class="labelFix">Người thứ</label>
                  </div>
                  <div>
                    <div class="select is-fullwidth is-small">
                      <select
                        @change="nguoithuChange($event, addedIndex)"
                        ref="nguoithuSelect"
                        v-model="selectedOptionnt"
                      >
                        <option selected disabled>- Chọn người thứ ? -</option>
                        <option
                          v-for="(
                            item, index
                          ) in datanhaphosomodal.info_nguoithu"
                          :key="index"
                          :value="item.manguoithu"
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
                      v-model="datanhaphosomodal.tienluongcs"
                      class="input is-small"
                      type="text"
                      v-mask="mask"
                      disabled
                    />
                  </div>
                </div>
                <div class="column">
                  <div style="margin-bottom: 5px">
                    <label class="labelFix">Hạn thẻ cũ</label>
                  </div>
                  <td style="text-align: center">
                    <input
                      v-model="hanthecu"
                      type="text"
                      class="input is-small"
                    />
                  </td>
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
                        v-model="datanhaphosomodal.hinhthucnap"
                        ref="hinhthucnapInput"
                      >
                        <option value="0">Tiền mặt</option>
                        <option value="1">Chuyển khoản</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- <div class="column">
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
                </div> -->
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
                    <template>
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
                            v-for="(
                              dt, index
                            ) in datanhaphosomodal.info_xaphuong"
                            :key="index"
                            :value="dt.maxaphuong"
                          >
                            {{ dt.tenxaphuong }}
                          </option>
                        </select>
                      </div>
                    </template>
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
                    <label class="labelFix">Bệnh viện</label>
                  </div>
                  <!-- <div>
                    <input
                      autoComplete="on"
                      list="hopSuggestions"
                      class="custom-input"
                      @change="hopChange($event, addedIndex)"
                      ref="hopInput"
                      style="min-width: 220px; height: 30px"
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
                      placeholder="..."
                      append-to-body
                      class="custom-vselect"
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
              <!-- <hr class="navbar-divider" /> -->
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
                <span style="font-weight: 800; font-size: 15px; color: red"
                  >Xác nhận và xem biên lai (Bắt buộc bấm xác nhận để lưu trữ
                  biên lai điện tử vào dữ liệu)</span
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
                      <td style="text-align: center">Biên lai</td>
                      <td style="text-align: center">Số biên lai</td>
                      <td style="text-align: center">Mã số BHXH</td>
                      <td style="text-align: center">Họ tên</td>
                      <td style="text-align: center">Ngày sinh</td>
                      <td style="text-align: center">Giới tính</td>
                      <td style="text-align: center">CCCD</td>
                      <td style="text-align: center">Điện thoại</td>
                      <td style="text-align: center">Loại hình</td>
                      <td style="text-align: center">Số tiền</td>
                      <td style="text-align: center">Số tháng đóng</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in dulieuTravedeinbienlai"
                      :key="index"
                      style="font-size: small"
                    >
                      <td style="text-align: center; vertical-align: middle">
                        {{ index + 1 }}
                      </td>
                      <td style="text-align: center">
                        <a @click="xemBienLai(item)">
                          <span
                            style="color: #ff69b4"
                            class="icon is-small is-left"
                          >
                            <i class="fas fa-print"></i>
                          </span>
                        </a>
                      </td>
                      <td style="text-align: center; font-weight: 500">
                        {{ item.sobienlai }}
                      </td>
                      <td style="text-align: center; font-weight: 500">
                        {{ item.masobhxh }}
                      </td>
                      <td style="text-align: left; font-weight: 500">
                        {{ item.hoten }}
                      </td>
                      <td style="text-align: center">
                        {{ item.ngaysinh }}
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
                        {{ item.maloaihinh }}
                      </td>
                      <td style="text-align: center">
                        {{ item.sotien }}
                      </td>
                      <td style="text-align: center">
                        {{ item.tenphuongthucdong }}
                      </td>
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
                        :disabled="lockButtonXacnhaninbldt"
                      >
                        Xác nhận biên lai
                      </button>
                    </div>
                    <div class="control">
                      <button
                        @click="hoanTatDongHs"
                        :disabled="!lockButtonXacnhaninbldt"
                        class="button is-warning is-light is-small"
                      >
                        Đóng
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import jsPDF from "jspdf";
import "~/assets/font/OpenSans-Light-normal";
import "~/assets/font/OpenSans-SemiBold-normal";
import "~/assets/font/OpenSans-Bold-normal";
import "~/assets/font/OpenSans_SemiCondensed-Italic-normal";
import "~/assets/font/OpenSans-ExtraBold-normal";
import "~/assets/font/OpenSans_Condensed-Bold-normal";
import "~/assets/font/OpenSans-Regular-normal";
import "~/assets/font/font-times-new-roman-normal";
import "~/assets/font/Times New Roman Bold-normal";
import backgroundImage from "~/assets/images/bhxh.png";
import qrcode from "~/assets/images/QR-BHXH.png";

import num2words from "vn-num2words";

export default {
  name: "caculCastBI",
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
      mask: currencyMask,
      items: [],
      selectedOptionpa: "- Chọn phương án -",
      selectedOptionptd: "- Chọn phương thức đóng -",
      selectedOptionnt: "- Chọn người thứ ? -",
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
      isLoading: false,
      form_response_sucess: [],
      form_response_failed: [],
      formKekhai: {
        sohoso: "",
        dotkekhai: "",
        kykekhai: "",
        ngaykekhai: "",
      },

      // phục vụ việc nhập item từ modal
      addedIndex: 0,
      datanhaphosomodal: {},
      isRoleSent: false,
      benhvienInfo: null,

      hanthecu: "",
      dulieuInbienlai: [],
      dulieuTravedeinbienlai: [],
      lockButtonXacnhaninbldt: false, // khóa nút xác nhận biên lai khi đã gửi
    };
  },

  mounted() {
    this.isRoleSent = this.user.res_sent;
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
      }
      if (this.phuongthucdong.length > 0) {
        this.phuongthucdong = this.phuongthucdong.filter(
          (item) => item.maloaihinh == "ARBI"
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
  },

  methods: {
    async findNguoihuong(masobhxh, index) {
      if (masobhxh !== "") {
        const isDuplicate = this.items.some(
          (item, idx) => idx !== index && item.masobhxh === masobhxh
        );
        if (isDuplicate) {
          Swal.fire({
            text: `Mã số ${masobhxh} vừa được đăng ký trong loại hình này xong, vui lòng kiểm tra lại!`,
            icon: "error",
          });
          this.items[index].masobhxh = "";
          return;
        }

        try {
          this.isLoading = true;
          // 1. Trường họp đầu tiên nếu có trong dữ liệu thẻ
          // Đầu tiên AR và BI sẽ tìm trong dữ liệu thẻ -- db dulieuthe.
          // Chạy API dưới đây để tìm trong dlt
          const res = await this.$axios.get(
            `/api/nguoihuong/find-nguoihuong-masobhxh-theodstg-timhanthe?soSoBhxh=${masobhxh}`
          );

          // console.log(res.data);
          if (res.data.length > 0) {
            // Tìm bản ghi có denNgay lớn nhất
            const latestRecord = res.data.reduce((max, curr) => {
              const currDate = new Date(
                curr.denNgay.split("/").reverse().join("/")
              );
              const maxDate = new Date(
                max.denNgay.split("/").reverse().join("/")
              );
              return currDate > maxDate ? curr : max;
            });

            // Tìm căn cước công dân trong dữ liệu HGD
            const resHGD = await this.$axios.get(
              `/api/nguoihuong/tim-kiem-thong-tin-hgd?soBhxh=${masobhxh}&SO_DDCN_CCCD_BCA=''`
            );
            let soCmnd_hgd = "";
            // console.log(resHGD.data.canhan.SO_DDCN_CCCD_BCA);
            if (resHGD.data.canhan !== null) {
              soCmnd_hgd = resHGD.data.canhan.SO_DDCN_CCCD_BCA;
              // console.log(resHGD);
            }

            this.isLoading = false;

            // Gán bản ghi có denNgay lớn nhất
            const data = latestRecord;
            // console.log(data);

            try {
              this.items[index].hoten = data.hoTen;
              this.items[index].ngaysinh = data.ngaySinh;
              // console.log(typeof data.gioiTinh);
              this.items[index].cccd = soCmnd_hgd;
              if (data.gioiTinh == "1") {
                this.items[index].gioitinh = "Nam";
              } else {
                this.items[index].gioitinh = "Nữ";
              }

              // this.items[index].cccd = data.soCmnd;
              this.items[index].dienthoai = data.soDienThoai;

              // CODE TÌM HẠN THẺ TỪ 05/06/2025
              // gán hạn thẻ cũ lên form
              this.hanthecu = data.denNgay;
              const denNgayStr = data.denNgay; // vd: "10/10/2024"
              // const denNgayStr = "15/03/2025";

              // Hàm parse định dạng dd/mm/yyyy thành Date
              const parseDate = (str) => {
                const [day, month, year] = str.split("/").map(Number);
                return new Date(year, month - 1, day);
              };

              // Hàm format Date về dd/mm/yyyy
              const formatDate = (date) => {
                const d = String(date.getDate()).padStart(2, "0");
                const m = String(date.getMonth() + 1).padStart(2, "0");
                const y = date.getFullYear();
                return `${d}/${m}/${y}`;
              };

              const today = new Date();
              const denNgay = parseDate(denNgayStr);
              const bienLai = today;

              let tuNgay;

              if (denNgay >= today) {
                // Chưa hết hạn → ngày kế tiếp
                const nextDay = new Date(denNgay);
                nextDay.setDate(nextDay.getDate() + 1);
                tuNgay = nextDay;
              } else {
                const daysDiff = (today - denNgay) / (1000 * 60 * 60 * 24);
                if (daysDiff > 90) {
                  // Hết hạn > 3 tháng → sau hôm nay 30 ngày
                  const next30 = new Date();
                  next30.setDate(next30.getDate() + 30);
                  tuNgay = next30;
                } else {
                  // Hết hạn < 3 tháng → dùng ngày biên lai
                  tuNgay = bienLai;
                }
              }

              this.items[index].tungay = formatDate(tuNgay);
              // console.log("🎯 Hạn thẻ từ (tungay):", this.items[index].tungay);

              this.items[index].matinh = data.maTinhLh;
              // đi tìm tên tỉnh
              const res_tinh = await this.$axios.get(
                `/api/nguoihuong/find-tentinh?matinh=${data.maTinhLh}`
              );
              if (res_tinh.data.length > 0) {
                this.items[index].tentinh = res_tinh.data[0].tentinh;
                // console.log(this.items[index].tentinh);
              }
              this.items[index].maquanhuyen = data.maHuyenLh;
              // đi tìm tên quận huyện
              const res_huyen = await this.$axios.get(
                `/api/nguoihuong/find-tenhuyen?matinh=${data.maTinhLh}&maquanhuyen=${data.maHuyenLh}`
              );
              if (res_huyen.data.length > 0) {
                this.items[index].tenquanhuyen = res_huyen.data[0].tenquanhuyen;
                // console.log(this.items[index].tenquanhuyen);
              }
              this.items[index].maxaphuong = data.maXaLh;
              // đi tìm tên xã
              const res_xa = await this.$axios.get(
                `/api/nguoihuong/find-tenxa?matinh=${data.maTinhLh}&maquanhuyen=${data.maHuyenLh}&maxaphuong=${data.maXaLh}`
              );
              // console.log(res_xa);

              if (res_xa.data.length > 0) {
                this.items[index].tenxaphuong = res_xa.data[0].tenxaphuong;
                // console.log(this.items[index].tenxaphuong);
              }
              this.items[index].tothon = data.diaChi;
              this.items[index].benhvientinh = data.maTinhLh;
            } catch (error) {
              console.log(error.message);
            }
          } else {
            // 2. Trường hợp không có trong dữ liệu thẻ thì đi tìm trong DL HGD
            const resHGD = await this.$axios.get(
              `/api/nguoihuong/tim-kiem-thong-tin-hgd?soBhxh=${masobhxh}&SO_DDCN_CCCD_BCA=''`
            );
            // console.log(resHGD);
            if (resHGD.data.canhan !== null) {
              // console.log(resHGD);
              this.isLoading = false;
              const data = resHGD.data.canhan;
              try {
                this.items[index].hoten = data.hoTen;
                this.items[index].ngaysinh = data.ngaySinh;
                // console.log(typeof data.gioiTinh);
                this.items[index].cccd = data.SO_DDCN_CCCD_BCA;
                this.items[index].gioitinh = data.gioiTinh;
                this.items[index].dienthoai = data.soDienThoai;

                if (data.hanThe !== "") {
                  this.hanthecu = data.hanThe.split("-")[1]; // Kết quả: "31/12/2025"

                  // this.hanthecu = "31/04/2025"; -- dùng để test
                  // console.log(this.hanthecu);
                  // Hàm parse định dạng dd/mm/yyyy thành Date
                  const parseDate = (str) => {
                    const [day, month, year] = str.split("/").map(Number);
                    return new Date(year, month - 1, day);
                  };

                  // Hàm format Date về dd/mm/yyyy
                  const formatDate = (date) => {
                    const d = String(date.getDate()).padStart(2, "0");
                    const m = String(date.getMonth() + 1).padStart(2, "0");
                    const y = date.getFullYear();
                    return `${d}/${m}/${y}`;
                  };

                  const today = new Date();
                  const denNgay = parseDate(this.hanthecu);
                  const bienLai = today;

                  // console.log(denNgay);

                  let tuNgay;

                  if (denNgay >= today) {
                    // Chưa hết hạn → ngày kế tiếp
                    const nextDay = new Date(denNgay);
                    nextDay.setDate(nextDay.getDate() + 1);
                    tuNgay = nextDay;
                  } else {
                    const daysDiff = (today - denNgay) / (1000 * 60 * 60 * 24);
                    if (daysDiff > 90) {
                      // Hết hạn > 3 tháng → sau hôm nay 30 ngày
                      const next30 = new Date();
                      next30.setDate(next30.getDate() + 30);
                      tuNgay = next30;
                    } else {
                      // Hết hạn < 3 tháng → dùng ngày biên lai
                      tuNgay = bienLai;
                    }
                  }

                  this.items[index].tungay = formatDate(tuNgay);
                  // console.log("🎯 Hạn thẻ từ (tungay):", this.items[index].tungay);
                } else {
                  this.hanthecu = "Không tìm thấy hạn thẻ cũ";
                  // Gán ngày hiện tại + 30 ngày
                  const today = new Date();
                  const next30 = new Date();
                  next30.setDate(today.getDate() + 30);

                  const formatDate = (date) => {
                    const d = String(date.getDate()).padStart(2, "0");
                    const m = String(date.getMonth() + 1).padStart(2, "0");
                    const y = date.getFullYear();
                    return `${d}/${m}/${y}`;
                  };

                  this.items[index].tungay = formatDate(next30);
                  // console.log(
                  //   "⚠️ Không có hạn thẻ → gán tungay:",
                  //   this.items[index].tungay
                  // );
                }

                const filename = data.tenFile;
                const parts = filename.split("_");

                const maTinh = parts[4].replace("TTT", "");
                const maHuyen = parts[5].replace("HH", "");
                const maXa = parts[6];

                // console.log("Mã tỉnh:", maTinh); // "42"
                // console.log("Mã huyện:", maHuyen); // "449"
                // console.log("Mã xã:", maXa); // "18754"

                this.items[index].matinh = maTinh;
                // đi tìm tên tỉnh
                const res_tinh = await this.$axios.get(
                  `/api/nguoihuong/find-tentinh?matinh=42`
                );
                if (res_tinh.data.length > 0) {
                  this.items[index].tentinh = res_tinh.data[0].tentinh;
                  // console.log(this.items[index].tentinh);
                }
                this.items[index].maquanhuyen = maHuyen;
                // đi tìm tên quận huyện
                const res_huyen = await this.$axios.get(
                  `/api/nguoihuong/find-tenhuyen?matinh=${maTinh}&maquanhuyen=${maHuyen}`
                );
                if (res_huyen.data.length > 0) {
                  this.items[index].tenquanhuyen =
                    res_huyen.data[0].tenquanhuyen;
                  // console.log(this.items[index].tenquanhuyen);
                }
                this.items[index].maxaphuong = maXa;
                // đi tìm tên xã
                const res_xa = await this.$axios.get(
                  `/api/nguoihuong/find-tenxa?matinh=${maTinh}&maquanhuyen=${maHuyen}&maxaphuong=${maXa}`
                );
                // console.log(res_xa);

                if (res_xa.data.length > 0) {
                  this.items[index].tenxaphuong = res_xa.data[0].tenxaphuong;
                  // console.log(this.items[index].tenxaphuong);
                }
                this.items[index].tothon = data.diaChi;
                this.items[index].benhvientinh = maTinh;
              } catch (error) {
                console.log(error.message);
              }
            }
          }
          this.isLoading = false;
        } catch (error) {
          console.log(error);
          this.isLoading = false;
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

    async checkItemData(item, index) {
      if (!item.masobhxh) {
        this.$toasted.show("Thiếu mã số BHXH", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.masobhxhInput[index]?.focus();
        return false;
      }

      if (!this.isValidMasoBHXH(item.masobhxh)) {
        this.$toasted.show("Mã số BHXH không hợp lệ", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.masobhxhInput[index]?.focus();
        return false;
      }

      if (!item.hoten) {
        this.$toasted.show("Thiếu họ tên", { duration: 3000, theme: "bubble" });
        this.$refs.nameInput[index]?.focus();
        return false;
      }

      if (!item.ngaysinh) {
        this.$toasted.show("Thiếu ngày sinh", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.ngaysinhInput[index]?.focus();
        return false;
      }

      if (!item.gioitinh) {
        this.$toasted.show("Chọn giới tính", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.gioitinhSelect[index]?.focus();
        return false;
      }

      if (!item.cccd) {
        this.$toasted.show("Thiếu CCCD", { duration: 3000, theme: "bubble" });
        this.$refs.cccdInput[index]?.focus();
        return false;
      }

      if (!this.isValidCCCD(item.cccd)) {
        this.$toasted.show("CCCD không hợp lệ", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.cccdInput[index]?.focus();
        return false;
      }

      if (!item.maphuongan || !item.tenphuongan) {
        this.$toasted.show("Chọn một phương án", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.phuonganSelect[index]?.focus();
        return false;
      }

      if (!item.tungay) {
        this.$toasted.show("Thiếu từ ngày", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.tungayInput[index]?.focus();
        return false;
      }

      if (!item.maphuongthucdong || !item.tenphuongthucdong) {
        this.$toasted.show("Thiếu phương thức đóng", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.phuongthucdongSelect[index]?.focus();
        return false;
      }

      if (!item.maquanhuyen || !item.tenquanhuyen) {
        this.$toasted.show("Thiếu quận huyện", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.quanhuyenSelect[index]?.focus();
        return false;
      }

      if (!item.maxaphuong || !item.tenxaphuong) {
        this.$toasted.show("Thiếu xã phường", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.xaphuongSelect[index]?.focus();
        return false;
      }

      if (!item.mabenhvien || !item.tenbenhvien) {
        this.$toasted.show("Chọn bệnh viện", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.hopInput[index]?.focus();
        return false;
      }

      if (!item.hinhthucnap) {
        this.$toasted.show("Chọn hình thức nạp tiền", {
          duration: 3000,
          theme: "bubble",
        });
        this.$refs.hinhthucnapInput[index]?.focus();
        return false;
      }

      return true;
    },

    async checkItem(item) {
      const index = this.items.findIndex((x) => x === item);
      const isDataValid = await this.checkItemData(item, index);

      if (!isDataValid) return;

      Swal.fire({
        toast: true,
        icon: "success",
        title: "Bản ghi đã đầy đủ dữ liệu!",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    },

    async checkHgd(item) {
      if (item.masobhxh === "") {
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
          title: `Chưa nhập vào Mã số BHXH`,
        });
      } else {
        try {
          const res = await this.$axios.get(
            `/api/nguoihuong/tim-kiem-thong-tin-hgd?soBhxh=${item.masobhxh}&SO_DDCN_CCCD_BCA=${item.cccd}`
          );

          const ttHgd = res.data.thongtinHgd;
          // console.log(ttHgd);

          Swal.fire({
            html: `
              <div>
                <p><strong style="color: #0d6efd">Thông tin Hộ gia đình</strong></p>
                <p style="font-weight: 800; color: #dc3545; font-size: 15px">
                  Mã hộ: ${ttHgd[0].maHoGiaDinh || ""} | Chủ hộ: ${
              ttHgd[0].chuHo || ""
            }
                </p>
              </div>

              <div style="margin-top: 5px; max-height: 400px; overflow-y: auto;">
                <table border="1" style="border-collapse: collapse; width: 100%; font-size: 13px;">
                  <thead style="background-color: #cfe2ff; font-weight: bold; text-align: center;">
                    <tr>
                      <th>STT HO</th>
                      <th>Họ tên</th>
                      <th>Mã số BHXH</th>
                      <th>Ngày sinh</th>
                      <th>Giới tính</th>
                      <th>Địa chỉ</th>
                      <th>Mối quan hệ với chủ hộ</th>
                      <th>Số CCCD</th>
                      <th>Mã đối tượng</th>
                      <th>Hạn thẻ</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ttHgd
                      .map(
                        (item) => `
                      <tr style="text-align: center;">
                        <td>${item.stt_ho || ""}</td>
                        <td style="text-align: left;">${item.hoTen || ""}</td>
                        <td>${item.soBhxh || ""}</td>
                        <td>${item.ngaySinh || ""}</td>
                        <td>${item.gioiTinh || ""}</td>
                        <td style="text-align: left;">${item.diaChi || ""}</td>
                        <td>${item.quanHeChuHo || ""}</td>
                        <td>${item.SO_DDCN_CCCD_BCA || ""}</td>
                        <td>${item.maDoiTuongDangTg || ""}</td>
                        <td style="text-align: center;">${
                          item.hanThe || ""
                        }</td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            `,
            width: "90%",
            confirmButtonText: "Đóng",
            customClass: {
              popup: "swal-wide",
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    },

    hoanTatDongHs() {
      // console.log("hoantatdong");
      this.items = [];
      this.dulieuTravedeinbienlai = [];
      this.dulieuInbienlai = [];
      this.isActive_xacnhan = false;
    },

    addHosokekhai() {
      // đoạn này check luôn xem có mã số bhxh và ccd trong items chưa
      // console.log(this.items);

      this.addedIndex = 0; // là chỉ mục index của item hiện tại đang được nhập tại modal
      // Mở trạng thái nhập hồ sơ
      this.selectedOptionBenhvien = "- Chọn cơ sở khám chữa bệnh -";
      this.selectedOptionpa = "- Chọn phương án -";
      this.selectedOptionptd = "- Chọn phương thức đóng -";
      this.selectedOptionnt = "- Chọn người thứ ? -";
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

    async xacnhanGhihoso() {
      const result = await Swal.fire({
        title: `Xác nhận thêm vào bộ hồ sơ kê khai ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Không`,
      });
      if (result.isConfirmed) {
        if (result.isConfirmed) {
          // check toàn bộ ô để valid form
          const fieldNames = {
            masobhxh: "Mã số BHXH",
            hoten: "Họ tên",
            ngaysinh: "Ngày sinh",
            cccd: "Căn cước công dân",
            maphuongan: "Phương án",
            nguoithu: "Người thứ mấy",
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
            "nguoithu",
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

          // // check riêng benhvienInfo
          // if (
          //   !this.benhvienInfo ||
          //   Object.keys(this.benhvienInfo).length === 0
          // ) {
          //   const Toast = Swal.mixin({
          //     toast: true,
          //     position: "top-end",
          //     showConfirmButton: false,
          //     timer: 3000,
          //     timerProgressBar: true,
          //     didOpen: (toast) => {
          //       toast.addEventListener("mouseenter", Swal.stopTimer);
          //       toast.addEventListener("mouseleave", Swal.resumeTimer);
          //     },
          //   });
          //   Toast.fire({
          //     icon: "error",
          //     title: `Vui lòng cung cấp thông tin ${fieldNames.benhvienInfo}`,
          //   });
          //   return;
          // }

          this.items[this.addedIndex] = this.datanhaphosomodal;
          this.datanhaphosomodal = {};
          this.isActive_nhaphoso = false;
          // console.log(this.items);
          // console.log(this.benhvienInfo.mabenhvien);
        }
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
      // trên data tạo ra 1 mảng dữ liệu để lưu thông tin sau gọi in biên lai
      this.dulieuInbienlai = [];
      if (this.items.length > 0) {
        // console.log(this.items);
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
            // console.log(this.items);

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
                this.items[i].ngaybienlai = formattedDate;

                // đánh dấu hồ sơ đã nạp luôn
                this.items[i].trangthai = 0;

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

                let maToChucDvt = "BI0212M";
                let soTien = this.items[i].sotien;
                let soThang = this.items[i].maphuongthucdong;
                let maNhanVienThu = "NVT" + this.items[i].nvt_cccd;
                let tenNhanVienThu = this.user.name;
                let maCqBhxh = this.user.macqbhxh;
                let tenCqBhxh = this.user.tencqbhxh;
                let key = "0123"; // do bhxh vn cung cấp
                let tuNgay = this.items[i].tungay;
                let denNgay = this.calculateEndDate(tuNgay, soThang);

                // thông tin biên lai
                const currentYear = new Date().getFullYear();

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
                  currentYear, // thêm năm hiện tại vào
                };

                // Thêm cả filteredItem và additionalData vào mảng dataKekhai
                dataKekhai.push({
                  ...filteredItem,
                  ...additionalData,
                });

                const tiendong = parseInt(
                  this.items[i].sotien.replace(/,/g, ""),
                  10
                );

                // lấy tên biên lai để lưu
                const formattedForFilename = formattedDate.replace(
                  /[-: ]/g,
                  "_"
                );
                const urlNameInvoice = `${this.items[i].hosoIdentity}_${formattedForFilename}_${this.items[i].hoten}`;

                // console.log(urlNameInvoice);

                const dataPost = {
                  hosoIdentity: this.items[i].hosoIdentity,
                  maSoBhxh: this.items[i].masobhxh,
                  hoTen: this.items[i].hoten,
                  soCccd: this.items[i].cccd,
                  ngaySinh: this.items[i].ngaysinh,
                  gioiTinh: this.items[i].gioitinh,
                  soDienThoai: this.items[i].dienthoai,
                  nguoithutien: this.items[i].tennguoitao,
                  loaiDt: this.items[i].tenloaihinh,
                  soTien: tiendong,
                  soThang: this.items[i].maphuongthucdong,
                  tuNgay: this.items[i].tungay,
                  denNgay: this.items[i].denngay,
                  tuThang: this.items[i].tuthang,
                  denThang: this.items[i].denthang,
                  maDaiLy: this.items[i].madaily,
                  tenDaiLy: this.items[i].tendaily,
                  createdBy: this.user.username,
                  sobienlai: "",
                  ngaybienlai: formattedDate,
                  maloaihinh: this.items[i].maloaihinh,
                  tothon: this.items[i].tothon,
                  tenquanhuyen: this.items[i].tenquanhuyen,
                  tentinh: this.items[i].tentinh,
                  currentYear: currentYear,
                  urlNameInvoice: urlNameInvoice,
                };

                this.dulieuInbienlai.push(dataPost);
              }

              // console.log(dataKekhai);

              const result = await this.$axios.post(
                `/api/kekhai/add-kekhai-series`,
                dataKekhai
              );

              if (result.status === 200) {
                this.isLoading = false;
                // Đợi 300ms trước khi gọi tiếp (đảm bảo DB đã xử lý xong)
                await new Promise((resolve) => setTimeout(resolve, 300));

                const hosoIds = this.dulieuInbienlai.map(
                  (item) => item.hosoIdentity
                );

                const rsIdtity = await this.$axios.post(
                  `/api/kekhai/getdskekhaiwithhsidentity`,
                  hosoIds
                );

                // console.log(rsIdtity.data);
                this.dulieuTravedeinbienlai = rsIdtity.data;
                this.isActive_xacnhan = true;
              }
            } catch (error) {
              // console.log(error);
              this.isLoading = false;
            }
          }
        }
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

    async xemBienLai(item) {
      // console.log(item.hosoIdentity);

      try {
        const res = await this.$axios.get(
          `/api/kekhai/view-item-bienlai?hosoIdentity=${item.hosoIdentity}`
        );

        // console.log(res);

        const hs = res.data.hs;
        if (hs && hs.urlNameInvoice) {
          const fileName = `${hs.sobienlai}_${encodeURIComponent(
            hs.hoten
          )}.pdf`;
          const pdfUrl = `http://14.224.129.177:1970/bienlaidientu/${hs.urlNameInvoice}.pdf`;
          // const pdfUrl = `http://localhost:1970/bienlaidientu/${hs.urlNameInvoice}.pdf`;
          // console.log(pdfUrl);

          window.open(pdfUrl, "_blank");
        } else {
          console.warn("Thiếu thông tin số biên lai hoặc họ tên!");
          this.$swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không lấy được thông tin biên lai.",
          });
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        this.$swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể kết nối đến máy chủ.",
        });
      }
    },

    addRow() {
      this.lockButtonXacnhaninbldt = false;
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
          info_nguoithu: this.nguoithu,
          nguoithu: "",
          manguoithu: 0,
          tienluongcs: this.luongcoso,
          tylensnnht: 0,
          tylensdp: 0,
          hotrokhac: 0,
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
          muchuongbhyt: "",
          madoituong: "",
          tendoituong: "",
          tuthang: "",
          denthang: "",
          tylengansachdiaphuong: 0,
          tyledong: 0,
          muctiendong: 0,
          tientunguyendong: 0,
          tienlai: 0,
          tylensnnht: 0,
          tiennsnnht: 0,
          tylensdp: 0,
          tiennsdp: 0,

          // hồ sơ kê khai
          dotkekhai: "",
          kykekhai: "",
          ngaykekhai: "",
          ngaybienlai: "",
          sobienlai: "",
          trangthai: 0,

          status_hosoloi: 0,
          status_naptien: 0,
          hinhthucnap: 1,
        });

        // console.log(this.items);
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

    // Tính số tiền phải nạp cho một dòng (index)
    tinhSoTien(index) {
      const item = this.items[index];
      const heSo = {
        1: 1,
        2: 0.7,
        3: 0.6,
        4: 0.5,
        default: 0.4,
      };

      const soThang = parseInt(item.maphuongthucdong) || 0;
      const nguoiThu = parseInt(item.manguoithu) || 0;

      const cast = this.luongcoso * 0.045 * soThang;
      const tyLe = heSo[nguoiThu] ?? heSo.default;

      item.sotien = Math.round(cast * tyLe); // làm tròn nếu muốn
    },

    // Khi thay đổi người thứ
    async nguoithuChange(e, index) {
      const manguoithu = e.target.value;
      const nguoithu = e.target.options[e.target.selectedIndex].text;

      const item = this.items[index];
      item.manguoithu = manguoithu;
      item.nguoithu = nguoithu;

      this.tinhSoTien(index);
    },

    // Khi thay đổi phương thức đóng
    async phuongthucdChange(e, index) {
      const maphuongthucdong = e.target.value;
      const tenphuongthucdong = e.target.options[e.target.selectedIndex].text;

      const item = this.items[index];
      item.maphuongthucdong = maphuongthucdong;
      item.tenphuongthucdong = tenphuongthucdong;

      this.tinhSoTien(index);
    },

    // // người thứ ?
    // async nguoithuChange(e, index) {
    //   const manguoithu = e.target.value;
    //   const nguoithu = e.target.options[e.target.selectedIndex].text;
    //   // console.log(this.items[index]);

    //   this.items[index].manguoithu = manguoithu; // lưu manguoithu ví dụ 1, 2
    //   // console.log("người thứ tại box chọn người: ", nguoithu);

    //   this.items[index].nguoithu = nguoithu; // lưu nguoithu ví dụ là Người thứ 1

    //   const cast =
    //     this.luongcoso * 0.045 * parseInt(this.items[index].maphuongthucdong);
    //   if (manguoithu === "1") {
    //     this.items[index].sotien = cast;
    //   } else if (manguoithu === "2") {
    //     this.items[index].sotien = cast * 0.7;
    //   } else if (manguoithu === "3") {
    //     this.items[index].sotien = cast * 0.6;
    //   } else if (manguoithu === "4") {
    //     this.items[index].sotien = cast * 0.5;
    //   } else {
    //     this.items[index].sotien = cast * 0.4;
    //   }
    //   // console.log(this.items[index].sotien);
    // },

    // // phương thức đóng
    // async phuongthucdChange(e, index) {
    //   const maphuongthucdong = e.target.value;
    //   const tenphuongthucdong = e.target.options[e.target.selectedIndex].text;
    //   this.items[index].maphuongthucdong = maphuongthucdong;
    //   this.items[index].tenphuongthucdong = tenphuongthucdong;

    //   // tính số tiền phải nạp
    //   // console.log(typeof this.luongcoso);
    //   // console.log(typeof this.items[index].nguoithu);
    //   // console.log(this.items[index].maphuongthucdong);

    //   // console.log(
    //   //   this.luongcoso * 0.045 * parseInt(this.items[index].maphuongthucdong)
    //   // );

    //   const cast =
    //     this.luongcoso * 0.045 * parseInt(this.items[index].maphuongthucdong);
    //   if (this.items[index].manguoithu === "1") {
    //     this.items[index].sotien = cast;
    //   } else if (this.items[index].manguoithu === "2") {
    //     this.items[index].sotien = cast * 0.7;
    //   } else if (this.items[index].manguoithu === "3") {
    //     this.items[index].sotien = cast * 0.6;
    //   } else if (this.items[index].manguoithu === "4") {
    //     this.items[index].sotien = cast * 0.5;
    //   } else {
    //     this.items[index].sotien = cast * 0.4;
    //   }

    //   // console.log(this.items[index]);
    // },

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

        if (!this.items[i].nguoithu) {
          this.$toasted.show("Chọn người thứ ?", {
            duration: 3000,
            theme: "bubble",
          });
          if (this.$refs.nguoithuSelect[i]) {
            this.$refs.nguoithuSelect[i].focus();
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

        if (!this.items[i].maphuongthucdong || !this.items[i].phuongthucdong) {
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
        title: `Xác nhận thoát ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy thoát`,
      });
      if (result.isConfirmed) {
        this.isActive = false;
      }
    },

    async onSave() {
      // đoạn này theo code mới là sẽ bấm để lưu dữ liệu biên lai
      // Kiểm tra dữ liệu trước khi ghi
      // console.log(this.dulieuTravedeinbienlai);
      const isDataValid = await this.checkFormData();
      if (!isDataValid) {
        // Dừng quá trình lưu dữ liệu nếu dữ liệu không hợp lệ
        return;
      }

      const result = await Swal.fire({
        title: `Xác nhận biên lai điện tử?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy gửi`,
      });
      if (result.isConfirmed) {
        // console.log(this.items);

        // const current = new Date();
        const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
        const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");
        try {
          // Bắt đầu hiển thị biểu tượng loading
          this.isLoading = true;
          // thông tin biên lai
          const currentYear = new Date().getFullYear();

          // lấy tên biên lai để lưu
          for (let i = 0; i < this.dulieuTravedeinbienlai.length; i++) {
            const item = this.dulieuTravedeinbienlai[i];

            const formattedForFilename = formattedDate.replace(/[-: ]/g, "_");
            const urlNameInvoice = `${item.hosoIdentity}_${formattedForFilename}_${item.sobienlai}_${item.hoten}`;

            const dataPost = {
              hosoIdentity: item.hosoIdentity,
              maSoBhxh: item.masobhxh,
              hoTen: item.hoten,
              soCccd: item.cccd,
              ngaySinh: item.ngaysinh,
              gioiTinh: item.gioitinh,
              soDienThoai: item.dienthoai,
              nguoithutien: item.tennguoitao,
              loaiDt: item.tenloaihinh,
              soTien: item.sotien,
              soThang: item.maphuongthucdong,
              tuNgay: item.tungay,
              denNgay: item.denngay,
              tuThang: item.tuthang,
              denThang: item.denthang,
              maDaiLy: item.madaily,
              tenDaiLy: item.tendaily,
              createdBy: this.user.username,
              sobienlai: item.sobienlai,
              ngaybienlai: formattedDate,
              maloaihinh: item.maloaihinh,
              tothon: item.tothon,
              tenquanhuyen: item.tenquanhuyen,
              tentinh: item.tentinh,
              currentYear: currentYear,
              urlNameInvoice: urlNameInvoice,
            };

            const ghibienlai = await this.$axios.post(
              `/api/kekhai/ghidulieubienlai`,
              dataPost
            );

            // lưu biên lai vào máy chủ
            await this.inBienLaiDientu(dataPost);
            // console.log("xongbienlai");
          }

          const hosoIds = this.dulieuTravedeinbienlai.map(
            (item) => item.hosoIdentity
          );

          const rsIdtity = await this.$axios.post(
            `/api/kekhai/getdskekhaiwithhsidentity`,
            hosoIds
          );
          this.dulieuTravedeinbienlai = rsIdtity.data;
          this.isLoading = false;
          this.lockButtonXacnhaninbldt = true; // khoá nút xác nhận biên lai điện tử

          Swal.fire({
            title: "Hoàn tất xác nhận toàn bộ hồ sơ!",
            icon: "success",
          });
          // console.log("check hàm xem biên lai:", this.xemBienLai);
        } catch (error) {
          // console.log(error);
          this.isLoading = false;
        }
      }
    },

    async onSave1() {
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
          // console.log(this.items);

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

              // ĐỐI VỚI AN SINH 159 VÀ 68 THÌ TẠM SỬA CÁI NÀY TÝ
              // const tungayTranform = this.convertDate(this.items[i].tungay);
              // this.items[i].tungay = tungayTranform;

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

              // đánh dấu hồ sơ đã nạp luôn
              this.items[i].trangthai = 0;

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
              let tuNgay = this.items[i].tungay;
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

              // tạo biên lai trước khi lưu hồ sơ kê khai
              // console.log(dataKekhai);
              // in biên lai
              const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
              // const formattedDate = nowInVietnam.toFormat(
              //   "dd-MM-yyyy HH:mm:ss"
              // );

              // thông tin biên lai
              const currentYear = new Date().getFullYear();
              // console.log(currentYear);

              // lấy tên biên lai để lưu
              const formattedForFilename = formattedDate.replace(/[-: ]/g, "_");
              const urlNameInvoice = `${this.items[i].hosoIdentity}_${formattedForFilename}_${this.items[i].hoten}`;

              // console.log(this.items[i].sotien);
              const tiendong = parseInt(
                this.items[i].sotien.replace(/,/g, ""),
                10
              );

              const dataPost = {
                hosoIdentity: this.items[i].hosoIdentity,
                maSoBhxh: this.items[i].masobhxh,
                hoTen: this.items[i].hoten,
                soCccd: this.items[i].cccd,
                ngaySinh: this.items[i].ngaysinh,
                gioiTinh: this.items[i].gioitinh,
                soDienThoai: this.items[i].dienthoai,
                nguoithutien: this.items[i].tennguoitao,
                loaiDt: this.items[i].tenloaihinh,
                soTien: tiendong,
                soThang: this.items[i].maphuongthucdong,
                tuNgay: this.items[i].tungay,
                denNgay: this.items[i].denngay,
                tuThang: this.items[i].tuthang,
                denThang: this.items[i].denthang,
                maDaiLy: this.items[i].madaily,
                tenDaiLy: this.items[i].tendaily,
                createdBy: this.user.username,
                sobienlai: "",
                ngaybienlai: formattedDate,
                maloaihinh: this.items[i].maloaihinh,
                tothon: this.items[i].tothon,
                tenquanhuyen: this.items[i].tenquanhuyen,
                tentinh: this.items[i].tentinh,
                currentYear: currentYear,
                urlNameInvoice: urlNameInvoice,
              };

              console.log(dataPost);

              const ghibienlai = await this.$axios.post(
                `/api/kekhai/ghidulieubienlai`,
                dataPost
              );

              // console.log(ghibienlai);

              // lưu biên lai vào máy chủ
              // console.log("checking", this.inBienLaiDientu);
              await this.inBienLaiDientu(dataPost);
              // console.log("xongbienlai");
            }

            // console.log(dataKekhai);

            const result = await this.$axios.post(
              `/api/kekhai/add-kekhai-series`,
              dataKekhai
            );

            // console.log(result);

            if (result.status === 200) {
              Swal.fire({
                title: "Kê khai thành công hồ sơ!",
                // text: "Đã gửi thông tin hồ sơ lên cổng BHXH VN!",
                icon: "success",
              });

              this.isLoading = false;
              this.isActive_xacnhan = false;
              this.items = [];
            }
          } catch (error) {
            // console.log(error);
            this.isLoading = false;
          }
        }
      }
    },

    async inBienLaiDientu(data) {
      // console.log(data);

      // const res = await this.$axios(
      //   `/api/kekhai/bienlaidientu?_id_hskk=${item._id}&hosoIdentity=${item.hosoIdentity}`
      // );
      // // console.log(res.data[0]);
      // let data = res.data[0];
      // bỏ đoạn này do in biên lai khi gửi lên cổng code ngày 08/5/2025

      const doc = new jsPDF({
        orientation: "l",
        format: "a5",
      });

      // Kích thước trang PDF
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Kích thước ảnh bạn muốn (ví dụ: 100mm x 70mm)
      const imageWidth = 100; // Chiều rộng của ảnh
      const imageHeight = 70; // Chiều cao của ảnh

      // Tính tọa độ để ảnh nằm chính giữa trang
      const x = (pageWidth - imageWidth) / 2; // Căn giữa theo chiều ngang
      const y = (pageHeight - imageHeight) / 2; // Căn giữa theo chiều dọc

      // Thêm ảnh vào PDF
      doc.addImage(backgroundImage, "PNG", x, y, imageWidth, imageHeight);
      const img = new Image();
      img.src = backgroundImage; // hoặc base64 string

      // img.onload = () => {
      //   console.log("✅ Ảnh đã load xong");
      //   doc.addImage(img, "PNG", x, y, imageWidth, imageHeight);
      //   console.log("➡️ Đã add image");
      // };

      // img.onerror = (err) => {
      //   console.error("❌ Lỗi load ảnh:", err);
      // };

      // add the font to jsPDF
      doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
      doc.setFont("OpenSans-Bold", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#04368c");
      doc.text(`BẢO HIỂM XÃ HỘI THỊ XÃ KỲ ANH`, 60, 10, {
        align: "center",
        fontWeight: "bold",
      });

      doc.setFontSize(12);
      doc.setTextColor("ff0000");
      doc.text(`CÔNG TY TNHH AN SINH 159`, 60, 17, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
      doc.setFont("OpenSans-Bold", "bold");
      doc.setFontSize(10);
      doc.setTextColor("#04368c");
      doc.text(`Mẫu số: C45-BB `, 173, 11, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans_SemiCondensed-Italic-normal.ttf",
        "OpenSans_SemiCondensed-Italic-normal",
        "italic"
      );
      doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      doc.setFontSize(9);
      doc.setTextColor("#04368c");
      doc.text(`(Ban hành kèm theo Thông tư số 107/2017/TT-BTC `, 175, 15, {
        align: "center",
        fontWeight: "bold",
      });
      doc.text(`ngày 10/10/2017 của Bộ Tài chính) `, 175, 19, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(20);
      doc.setTextColor("#dc143c");
      doc.text(`BIÊN LAI THU TIỀN `, 105, 35, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans_SemiCondensed-Italic-normal.ttf",
        "OpenSans_SemiCondensed-Italic-normal",
        "italic"
      );
      doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      doc.setFontSize(9);
      doc.setTextColor("#00008b");
      doc.text(
        `Do Công ty TNHH 159, tổ chức được Bảo hiểm xã hội uỷ quyền thu phát hành. `,
        105,
        41,
        {
          align: "center",
          fontWeight: "bold",
        }
      );

      doc.setFontSize(9);
      doc.setTextColor("#00008b");
      doc.text(`Ngày: `, 155, 50, {
        fontWeight: "bold",
      });
      doc.text(`${data.ngaybienlai}`, 165, 50, {
        fontWeight: "bold",
      });

      // const dateTimeString = data.ngaybienlai;
      // // Tách chuỗi ngày tháng theo định dạng
      // const parts = dateTimeString.split(" ")[0].split("-"); // Lấy phần ngày và tách theo dấu "-"
      // // Lấy giá trị năm
      // const year = parts[2];

      const year = data.ngaybienlai.split("-")[2].split(" ")[0];

      doc.text(`Ký hiệu: `, 155, 55, {
        fontWeight: "bold",
      });
      doc.text(`${data.maloaihinh}-${data.maDaiLy}-${year}`, 165, 55, {
        fontWeight: "bold",
      });

      doc.text(`Số: `, 155, 60, {
        fontWeight: "bold",
      });
      doc.text(`${data.sobienlai}`, 165, 60, {
        fontWeight: "bold",
      });

      doc.addImage(qrcode, "PNG", 165, 25, 15, 15);
      //font-times-new-roman-normal
      const toadoXInfo = 10;
      const toadoYInfo = 60;
      doc.addFont(
        "Times New Roman Bold-normal.ttf",
        "Times New Roman Bold-normal",
        "bold"
      );
      doc.setFont("Times New Roman Bold-normal", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#04368c");
      doc.text(`Họ và tên người nộp:`, toadoXInfo, toadoYInfo, {
        fontWeight: "bold",
      });
      doc.text(
        `${data.hoTen} - Mã số BHXH: ${data.maSoBhxh}`,
        toadoXInfo + 43,
        toadoYInfo,
        {
          fontWeight: "bold",
        }
      );

      const diachi = data.tenquanhuyen + "; " + data.tentinh;
      // data.tothon + "; " +

      doc.text(`Địa chỉ: `, toadoXInfo, toadoYInfo + 8, {
        fontWeight: "bold",
      });
      doc.text(`${diachi}`, toadoXInfo + 16, toadoYInfo + 8, {
        fontWeight: "bold",
      });

      var noidungText = "";

      if (data.maloaihinh == "AR" || data.maloaihinh == "BI") {
        noidungText = `Tiền đóng BHYT, phương thức đóng ${data.soThang} tháng, từ ngày ${data.tuNgay} đến ngày ${data.denNgay}`;
      } else {
        noidungText = `Đóng tiền tham gia BHXH Tự nguyện`;
      }

      doc.text(`Nội dung: `, toadoXInfo, toadoYInfo + 16, {
        fontWeight: "bold",
      });
      doc.text(`${noidungText}`, toadoXInfo + 20, toadoYInfo + 16, {
        fontWeight: "bold",
      });

      const formattedMoney = Number(data.soTien).toLocaleString("vi-VN");
      // console.log(formattedMoney);

      doc.text(`Số tiền thu: `, toadoXInfo, toadoYInfo + 24, {
        fontWeight: "bold",
      });
      doc.text(`${formattedMoney}`, toadoXInfo + 24, toadoYInfo + 24, {
        fontWeight: "bold",
      });

      doc.text(`(Loại tiền): VNĐ `, toadoXInfo + 100, toadoYInfo + 24, {
        fontWeight: "bold",
      });

      // console.log(data.soTien);

      let tienbangchuText = num2words(data.soTien);
      let tienHoa = this.capitalizeFirstLetter(tienbangchuText);
      tienHoa += " đồng./.";

      // console.log(tienHoa);

      doc.text(`(Viết bằng chữ: ${tienHoa}) `, toadoXInfo, toadoYInfo + 32, {
        fontWeight: "bold",
      });
      // doc.text(`${tienHoa}`, toadoXInfo + 35, toadoYInfo + 32, {
      //   fontWeight: "bold",
      // });
      // console.log("check");
      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(13);
      doc.setTextColor("#04368c");
      doc.text(`NGƯỜI NỘP TIỀN`, toadoXInfo + 20, toadoYInfo + 43, {
        fontWeight: "bold",
      });

      doc.text(`NGƯỜI THU TIỀN`, toadoXInfo + 120, toadoYInfo + 43, {
        fontWeight: "bold",
      });

      // doc.addFont(
      //   "OpenSans-Regular-normal.ttf",
      //   "OpenSans-Regular-normal",
      //   "bold"
      // );
      // doc.setFont("OpenSans-Regular-normal", "bold");
      // doc.setFontSize(12);
      // doc.setTextColor("#dc143c");

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#04368c");
      doc.text(`${data.hoTen}`, toadoXInfo + 40, toadoYInfo + 75, {
        fontWeight: "bold",
        align: "center",
      });

      doc.setFontSize(10);
      doc.setTextColor("#dc3545");
      doc.text(
        `Đã được ký bởi: CÔNG TY TNHH AN SINH 159`,
        toadoXInfo + 100,
        toadoYInfo + 53,
        {
          fontWeight: "bold",
        }
      );
      doc.text(
        `Ngày ký: ${data.ngaybienlai}`,
        toadoXInfo + 110,
        toadoYInfo + 58,
        {
          fontWeight: "bold",
        }
      );

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#04368c");

      // Tâm mong muốn theo trục X
      const centerX = toadoXInfo + 128;
      doc.text(`${this.user.name}`, centerX + 11, toadoYInfo + 75, {
        align: "center",
      });

      // doc.addFont(
      //   "OpenSans_SemiCondensed-Italic-normal.ttf",
      //   "OpenSans_SemiCondensed-Italic-normal",
      //   "italic"
      // );
      // doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      // doc.setFontSize(10);
      // doc.setTextColor("#04368c");
      // doc.text(`Mã xác nhận: `, toadoXInfo - 8, toadoYInfo + 58, {
      //   fontWeight: "bold",
      // });

      // // console.log(data.maXacNhan);

      // doc.setFontSize(11);
      // doc.setTextColor("#dc143c");
      // doc.text(`${data.maXacNhan} `, toadoXInfo + 14, toadoYInfo + 58, {
      //   fontWeight: "bold",
      // });

      // doc.setFontSize(10);
      // doc.setTextColor("#04368c");
      // doc.text(
      //   `Sử dụng để tra cứu thông tin ghi nhận đóng trên Cổng thông tin điện tử`,
      //   toadoXInfo - 8,
      //   toadoYInfo + 62,
      //   {
      //     fontWeight: "bold",
      //   }
      // );

      // doc.text(
      //   `Người tham gia có thể sử dụng ứng dụng VSSID của Bảo hiểm Xã hội`,
      //   toadoXInfo - 8,
      //   toadoYInfo + 70,
      //   {
      //     fontWeight: "bold",
      //   }
      // );
      // doc.text(
      //   `Việt Nam để theo dõi quá trính đóng BHXH, sử dụng thay thế thẻ BHYT`,
      //   toadoXInfo - 8,
      //   toadoYInfo + 75,
      //   {
      //     fontWeight: "bold",
      //   }
      // );
      // doc.text(
      //   `https://baohiemxahoi.gov.vn/gioithieu/pages/tai-ung-dung-vssid.aspx`,
      //   toadoXInfo - 8,
      //   toadoYInfo + 80,
      //   {
      //     fontWeight: "bold",
      //   }
      // );

      // Lưu file PDF trên một tab mới

      const tenbienlai = data.urlNameInvoice;
      // console.log(tenbienlai);

      // doc.output("dataurlnewwindow");
      // window.open(pdfURL, tenbienlai);
      // doc.save("a4.pdf");

      const pdfBlob = doc.output("blob");

      const formData = new FormData();
      formData.append("pdf", pdfBlob, `${tenbienlai}.pdf`);

      // Gửi về backend
      await this.$axios.post("/api/kekhai/upload-bienlai", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    capitalizeFirstLetter(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";

@import "@/assets/customCss/footerTable.css";

/* Nhỏ gọn, đẹp */
.custom-vselect {
  font-size: 12px; /* chữ nhỏ */
  min-height: 30px; /* chiều cao select nhỏ */
}

/* chỉnh thêm trong dropdown */
.custom-vselect .vs__dropdown-toggle {
  padding: 4px 8px;
}

/* chỉnh từng item trong dropdown */
.custom-vselect .vs__dropdown-menu li {
  font-size: 12px;
  padding: 4px 8px;
}
</style>
