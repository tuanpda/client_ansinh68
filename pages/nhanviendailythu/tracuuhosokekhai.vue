<template>
  <div class="column">
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #00947e" class="icon is-small is-left">
              <i class="far fa-calendar-alt"></i>
            </span>
            <span style="font-weight: bold; color: #00947e"
              >Tra cứu hồ sơ kê khai</span
            >
          </div>
        </div>
      </div>

      <div v-if="listhsloi.length > 0" class="box">
        <span style="font-weight: 600; color: red"
          >Hiện điểm thu bạn đang có {{ listhsloi.length }} hồ sơ kê khai lỗi bị
          trả lại:</span
        >
        <ul>
          <li
            style="font-weight: 500; color: #198754"
            v-for="(hoso, index) in listhsloi"
            :key="index"
          >
            {{ index + 1 }}: Nằm trong bộ hồ sơ: {{ hoso.sohoso }}, Đã nạp vào
            ngày {{ hoso.ngaykekhai }}
          </li>
        </ul>
      </div>

      <div class="box">
        <div class="columns">
          <!-- <div class="column">
            <label class="label">Điểm thu</label>
            <div class="autocomplete">
              <input
                class="input is-small is-danger"
                type="text"
                v-model="diemthu"
                @input="onInput"
                :disabled="isDiemthu"
              />
              <div class="autocomplete-items" v-if="suggestions.length">
                <div
                  class="autocomplete-item"
                  v-for="suggestion in suggestions"
                  @click="selectSuggestion(suggestion)"
                >
                  {{ suggestion }}
                </div>
              </div>
            </div>
          </div> -->
          <div class="column">
            <label class="label">Nhóm tham gia</label>
            <div class="select is-small is-fullwidth">
              <select @change="handleChange">
                <option selected disabled>- Chọn loại hình -</option>
                <option value="">Không chọn</option>
                <option value="BI">Bảo hiểm y tế</option>
                <option value="AR">Bảo hiểm y tế - HGĐ</option>
                <option value="IS">Bảo hiểm xã hội tự nguyện</option>
              </select>
            </div>
          </div>
          <div class="column">
            <label class="label">Kỳ Kê khai</label>
            <input
              v-model="kykekhai"
              @blur="validateMonthYear"
              type="text"
              placeholder="MM/YYYY"
              class="input is-small"
            />
          </div>
          <div class="column">
            <label class="label">Đợt Kê khai</label>
            <div class="input-group">
              <input
                type="number"
                min="1"
                max="12"
                class="input is-small"
                placeholder="Đợt kê khai của hồ sơ"
                v-model="dotkekhai"
              />
            </div>
          </div>
          <div class="column">
            <label class="label">Số hồ sơ</label
            ><input
              v-model="sohoso"
              type="text"
              class="input is-small"
              placeholder="Số hồ sơ đã nạp"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <label class="label">Ngày kê khai (từ)</label
            ><input v-model="ngaykekhaitu" type="date" class="input is-small" />
          </div>
          <div class="column is-3">
            <label class="label">Ngày kê khai (đến)</label
            ><input
              v-model="ngaykekhaiden"
              type="date"
              class="input is-small"
            />
          </div>
        </div>
        <hr class="navbar-divider" />
        <footer class="has-text-right">
          <button @click="filterData(1)" class="button is-success is-small">
            <span class="icon">
              <i class="fas fa-search"></i>
            </span>
            <span>Tìm kiếm hồ sơ</span>
          </button>
          <button class="button is-small is-danger">
            <span class="icon">
              <i class="fa fa-refresh"></i>
            </span>
            <span>Refresh</span>
          </button>
        </footer>
      </div>

      <div style="margin-top: 20px">
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead style="font-weight: bold">
              <tr style="font-size: small; background-color: #faf0e6">
                <td rowspan="2" style="text-align: center; width: 3%">STT</td>
                <td rowspan="2" style="text-align: center">Điểm thu</td>
                <td rowspan="2" style="text-align: center">Số hồ sơ</td>
                <td rowspan="2" style="text-align: center">Mã loại hình</td>
                <td rowspan="2" style="text-align: center">Tên loại hình</td>
                <td rowspan="2" style="text-align: center">Đợt kê khai</td>
                <td rowspan="2" style="text-align: center">Kỳ kê khai</td>
                <td rowspan="2" style="text-align: center">Ngày kê khai</td>
                <td rowspan="2" style="text-align: center">Số người</td>
                <!-- <td rowspan="2" style="text-align: center">Trạng thái</td> -->
                <td rowspan="2" style="text-align: center">Xem hồ sơ</td>
                <td colspan="2" style="text-align: center">
                  Xuất mẫu <br />
                  VT/VNPT
                </td>
              </tr>
              <tr style="font-size: small; background-color: #faf0e6">
                <td style="text-align: center">VNPT</td>
                <td style="text-align: center">VIETTEL</td>
              </tr>
            </thead>
            <tbody>
              <tr
                style="font-size: small"
                v-for="(item, index) in data_kekhai"
                :key="index"
              >
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="">{{ item.tendaily }}</td>
                <td style="text-align: center">{{ item.sohoso }}</td>
                <td style="text-align: center">{{ item.maloaihinh }}</td>
                <td style="">{{ item.tenloaihinh }}</td>
                <td style="text-align: center">{{ item.dotkekhai }}</td>
                <td style="text-align: center">{{ item.kykekhai }}</td>
                <td style="text-align: center">{{ item.ngaykekhai }}</td>
                <td style="text-align: center">{{ item.so_luong }}</td>
                <!-- <td style="text-align: center">{{ item.trangthai }}</td> -->
                <td style="text-align: center">
                  <a @click="view_details(item)"
                    ><span class="icon">
                      <i
                        style="color: #00947e"
                        class="far fa-file-pdf"
                      ></i> </span
                  ></a>
                </td>
                <td style="text-align: center">
                  <a @click="xuatmauVtVnpt(item, false)"
                    ><span class="icon">
                      <i
                        style="color: red"
                        class="far fa-file-excel"
                      ></i> </span
                  ></a>
                </td>
                <td style="text-align: center">
                  <a @click="xuatmauVtVnpt(item, true)"
                    ><span class="icon">
                      <i
                        style="color: #9370db"
                        class="far fa-file-excel"
                      ></i> </span
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Phân trang -->
        <div v-if="data_kekhai.length > 0" style="margin-top: 10px">
          <nav
            class="pagination is-centered is-rounded"
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

      <!-- modal xuất file execl -->
      <div class="">
        <div :class="{ 'is-active': isActive }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card box">
            <section class="modal-card-body">
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Chi tiết hồ sơ kê khai</span
                >
              </div>
              <div style="text-align: end">
                <button
                  @click="isActive = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>

              <div>
                <div class="titleKk">
                  <hr class="line" />
                  <div class="topleft">
                    <span style="color: red; font-weight: 700">1.</span> Danh
                    sách
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in data_xuatmau"
                        :key="index"
                        style="font-size: small"
                      >
                        <td style="text-align: center; vertical-align: middle">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center; font-weight: 500">
                          {{ item.masobhxh }}
                        </td>
                        <td style="font-weight: 500">
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
                          {{ item.tenphuongan }}
                        </td>
                        <td style="text-align: center">
                          {{ formatCurrency(item.tienluongcs) }}
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
                          {{ item.tungay }}
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
                      <div v-if="isVtVnpt == true" class="control">
                        <ExportExcel_Viettel :data_execl="data_xuatmau" />
                      </div>
                      <div v-else class="control">
                        <ExportExcel_Vnpt :data_execl="data_xuatmau" />
                      </div>
                      <div class="control">
                        <button
                          @click="isActive = false"
                          class="button is-small is-danger"
                        >
                          <span class="icon">
                            <i class="fas fa-power-off"></i>
                          </span>
                          <span>Thoát</span>
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

      <!-- modal xem hồ sơ-->
      <div class="">
        <div :class="{ 'is-active': isActive_detail }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card box">
            <section class="modal-card-body">
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Chi tiết hồ sơ kê khai</span
                >
              </div>
              <div style="text-align: end">
                <button
                  @click="isActive_detail = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>

              <div>
                <div class="titleKk">
                  <hr class="line" />
                  <div class="topleft">
                    <span style="color: red; font-weight: 700">1.</span> Danh
                    sách
                  </div>
                </div>
                <div class="table_wrapper">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #fff8dc">
                        <td style="text-align: center; width: 3%">
                          <input
                            type="checkbox"
                            v-model="selectAll"
                            @change="toggleAll"
                          />
                        </td>
                        <td style="text-align: center; width: 3%">STT</td>
                        <!-- <td style="text-align: center">Xem chi tiết</td> -->
                        <td style="text-align: center">Gửi lên cổng</td>
                        <td style="text-align: center">Trạng thái</td>
                        <td style="text-align: center">Mã xác nhận</td>
                        <td style="text-align: center">Mô tả lỗi</td>
                        <td style="text-align: center">In Biên lai</td>
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in data_kekhai_details"
                        :key="index"
                        style="font-size: small"
                      >
                        <td style="text-align: center; vertical-align: middle">
                          <input
                            class=""
                            type="checkbox"
                            v-model="selectedItems"
                            :value="item"
                            :disabled="
                              item.trangthai == 0 || item.status_hosoloi == 1
                            "
                          />
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                          {{ index + 1 }}
                        </td>
                        <!-- <td style="text-align: center">
                          <a @click="vieweditHs(item)">
                            <span
                              style="color: #0d6efd"
                              class="icon is-small is-left"
                            >
                              <i class="fas fa-file-alt"></i>
                            </span>
                          </a>
                        </td> -->
                        <td style="text-align: center">
                          <template v-if="item.trangthai == 1">
                            <button
                              @click="guiDulieuLenCongBhxhvn(item)"
                              class="button is-small is-success"
                              :disabled="
                                item.isSent ||
                                !isRoleSent ||
                                item.status_hosoloi == 1
                              "
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
                          </template>
                          <template v-else>
                            <span style="color: tomato; font-weight: 800"
                              >Đã gửi</span
                            >
                          </template>
                        </td>
                        <td style="text-align: center; font-weight: 500">
                          <span
                            style="color: red; font-weight: 700"
                            v-if="item.trangthai == 1"
                          >
                            Chưa gửi cổng
                          </span>
                          <span style="color: green; font-weight: 700" v-else>
                            Đã gửi cổng
                          </span>
                        </td>
                        <td style="text-align: center; font-weight: 500">
                          {{ item.maxacnhan }}
                        </td>
                        <td style="text-align: center; font-weight: 500">
                          <span
                            style="color: #ffc107; font-weight: 600"
                            v-if="item.status_hosoloi == 1"
                          >
                            Hồ sơ bị trả về
                          </span>
                        </td>
                        <td style="text-align: center">
                          <template v-if="item.trangthai == 0">
                            <a @click="xemBienLai(item)">
                              <span
                                style="color: #ff69b4"
                                class="icon is-small is-left"
                              >
                                <i class="fas fa-print"></i>
                              </span>
                            </a>
                          </template>
                          <template v-else>
                            <span style="font-weight: 800; color: red"></span>
                          </template>
                        </td>
                        <td style="text-align: center; font-weight: 500">
                          {{ item.masobhxh }}
                        </td>
                        <td style="font-weight: 500">
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
                          {{ item.tenphuongan }}
                        </td>
                        <td style="text-align: center">
                          {{ formatCurrency(item.tienluongcs) }}
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
                          {{ item.tungay }}
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
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr class="navbar-divider" />
                <div class="columns">
                  <div class="column" style="margin-top: 10px">
                    <div
                      class="field is-grouped is-flex is-justify-content-center"
                    >
                      <div class="control">
                        <button
                          @click="isActive_detail = false"
                          class="button is-small is-danger"
                        >
                          <span class="icon">
                            <i class="fas fa-power-off"></i>
                          </span>
                          <span>Thoát</span>
                        </button>
                        <button
                          @click="xacNhanTraHoSo"
                          class="button is-small is-success"
                        >
                          <span class="icon">
                            <i class="fab fa-stack-overflow"></i>
                          </span>
                          <span>Trả hồ sơ lỗi</span>
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

      <!-- modal fix hồ sơ -->
      <div class="">
        <div :class="{ 'is-active': isActive_fix }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card-fix-hoso box">
            <section class="modal-card-fix-hoso-body">
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Chỉnh sửa hồ sơ</span
                >
              </div>
              <div style="text-align: end">
                <button
                  @click="isActive_fix = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>

              <div>djkhgkjd</div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExportExcel_Viettel from "@/components/exportExecl/viettel";
import ExportExcel_Vnpt from "@/components/exportExecl/vnpt";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
const { DateTime } = require("luxon");
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
  name: "DanhsachKekhaiPage",

  components: {
    ExportExcel_Viettel,
    ExportExcel_Vnpt,
  },

  data() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    return {
      data_kekhai: [],
      data_xuatmau: [],
      isActive: false,
      isActive_detail: false,
      isActive_fix: false,
      isVtVnpt: false,

      // pagi
      currentPage: 1,
      totalPages: 1,

      // new code
      kykekhai: "",
      dotkekhai: "",
      ngaykekhaitu: today,
      ngaykekhaiden: today,
      sohoso: "",
      // dailyview: this.user.madaily,
      // tochuc: this.user.matochuc,
      matochuc_mst: "",

      maloaihinh: "",

      data_kekhai_details: [],
      isRoleSent: false,

      // input suggest
      suggestions: [],
      suggestions_diemthu: [],
      diemthu: "",
      madaily: "",
      isDiemthu: false,
      dtaDiemthu: [],

      res_save_info_db: false,
      res_inbienlai: false,
      res_save_res_from_bhxhvn: false,

      selectedItems: [], // mảng các dòng đã chọn
      selectAll: false,
      listhsloi: [],
    };
  },

  watch: {
    selectedItems(newVal) {
      this.selectAll = newVal.length === this.data_kekhai_details.length;
    },
  },

  mounted() {
    const user = this.user;
    // console.log(user);

    this.dailyview = user.madaily;
    this.tochuc = user.matochuc;
    if (user.role == 2) {
      this.diemthu = "Tài khoản tổng hợp";
      // console.log(this.diemthu);
      // console.log(user.role);
    } else {
      this.diemthu = user.tendaily;
    }

    this.isRoleSent = user.res_sent;
    // console.log(this.isRoleSent);

    if (user.nvcongty == 0) {
      this.madaily = user.madaily;
      this.diemthu = user.tendaily;
      this.isDiemthu = true;
    }

    this.getDateTime();
    this.getDmDiemthu();
    this.hosoLoitrave();
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },

    totalSoTien() {
      if (this.data_xuatmau && this.data_xuatmau.length > 0) {
        return this.data_xuatmau.reduce((acc, item) => {
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
    toggleAll() {
      // Chỉ chọn những mục có trangthai khác 0
      if (this.selectAll) {
        this.selectedItems = this.data_kekhai_details.filter(
          (item) => item.trangthai != 0 && item.status_hosoloi != 1
        );
      } else {
        this.selectedItems = [];
      }
    },

    async xacNhanTraHoSo() {
      // console.log(this.selectedItems);
      if (this.selectedItems.length <= 0) {
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
          title: "Không có hồ sơ nào được chọn",
        });
      } else {
        const result = await Swal.fire({
          title: `Xác nhận trả lại hồ sơ lỗi cho điểm thu ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });
        if (result.isConfirmed) {
          try {
            let dataItems = this.selectedItems.map((item) => ({
              id: item._id,
            }));
            // Gửi yêu cầu gửi tất cả các hồ sơ và cập nhật trạng thái trong một lần
            const res = await this.$axios.post(`/api/kekhai/trahosoloi`, {
              items: dataItems,
            });

            if (res.data.success) {
              Swal.fire({
                title: "Thành công!",
                text: "Tất cả hồ sơ đã được trả về điểm thu",
                icon: "success",
              });
              this.isActive_detail = false;
            } else {
              Swal.fire({
                title: "Thất bại!",
                text: "Tất cả hồ sơ chưa được trả về điểm thu",
                icon: "error",
              });
              this.isActive_detail = false;
            }
          } catch (error) {
            Swal.fire({
              title: "Có lỗi xảy ra, liên hệ quản trị hệ thống",
              text: error,
              icon: "error",
            });
            this.isActive_detail = false;
          }
        }
      }
    },

    // suggest điểm thu
    onInput() {
      if (!this.diemthu) {
        this.suggestions = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      this.suggestions = this.dtaDiemthu
        .map((c) => c.tenDiemThu)
        .filter((tenDiemThu) =>
          tenDiemThu.toLowerCase().includes(this.diemthu.toLowerCase())
        )
        .map((tenDiemThu) => tenDiemThu.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion(suggestion) {
      if (suggestion) {
        this.diemthu = suggestion.trim();
        this.suggestions = [];
      }
    },
    // end suggest điểm thu

    validateMonthYear() {
      const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // Định dạng MM/YYYY
      if (!regex.test(this.kykekhai)) {
        this.kykekhai = ""; // Xóa giá trị nếu không đúng định dạng
        alert("Định dạng không đúng. Vui lòng nhập MM/YYYY.");
      }
    },

    formatCurrency(text) {
      const number = parseFloat(text);
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },

    formatISODateToDMY(isoDateString) {
      const date = new Date(isoDateString);

      // Lấy ngày, tháng và năm từ đối tượng Date
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      // Tạo chuỗi ngày tháng dd/mm/yyyy
      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },

    async getDmDiemthu() {
      const res = await this.$axios.get(`/api/kekhai/danhmucdaily`);
      // console.log(res.data);
      this.dtaDiemthu = res.data;
    },

    getDateTime() {
      const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
      const kyKeKhai = nowInVietnam.toFormat("MM/yyyy");

      // Lấy các phần tử riêng lẻ
      const year = nowInVietnam.year; // Năm
      const month = nowInVietnam.month; // Tháng
      const day = nowInVietnam.day; // Ngày
      const hour = nowInVietnam.hour; // Giờ
      const minute = nowInVietnam.minute; // Phút
      const second = nowInVietnam.second; // Giây

      this.kykekhai = kyKeKhai;
    },

    async handleChange(event) {
      const selectedValue = event.target.value; // Lấy giá trị của option được chọn
      // console.log("Selected value:", selectedValue);
      this.maloaihinh = selectedValue;
      // console.log(this.loaihinh);
    },

    async view_details(data) {
      this.data_kekhai_details = [];

      const rs = await this.$axios.get(
        `/api/kekhai/get-all-kekhai-xuatmau?sohoso=${data.sohoso}`
      );
      // console.log(rs.data.kekhai);
      this.data_kekhai_details = rs.data.kekhai;
      this.data_kekhai_details = this.data_kekhai_details.map((item) => ({
        ...item,
        isSent: false, // Gán trạng thái gửi mặc định là chưa gửi
      }));
      this.isActive_detail = true;
      // console.log(this.data_kekhai_details);
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

    async hosoLoitrave() {
      const madaily = { madaily: this.dailyview };
      try {
        const res = await this.$axios.post(
          `/api/kekhai/hosoloitrave-diemthu`,
          madaily
        );

        // console.log(res);

        if (res.data.success == true) {
          this.listhsloi = res.data.hs;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // async guiDulieuLenCongBhxhvn(data) {
    //   const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
    //   const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");

    //   // console.log(data);
    //   let matochucDvt = "";
    //   if (data.maloaihinh == "AR") {
    //     matochucDvt = "AR0013M";
    //   } else if (data.maloaihinh == "BI") {
    //     matochucDvt = "BI0007M";
    //   } else {
    //     matochucDvt = "IS0012M";
    //   }

    //   // thông tin biên lai
    //   const currentYear = new Date().getFullYear();
    //   let curentInvoiceNumber = 0;

    //   const getCurrentSobienlai = await this.$axios.get(
    //     `/api/kekhai/sobienlai`
    //   );
    //   // console.log(getCurrentSobienlai.data.bienlai[0].sobienlai);
    //   curentInvoiceNumber = getCurrentSobienlai.data.bienlai[0].sobienlai;
    //   // console.log(curentInvoiceNumber);

    //   const dataPost = {
    //     _id_hskk: data._id,
    //     hosoIdentity: data.hosoIdentity,
    //     maSoBhxh: data.masobhxh,
    //     hoTen: data.hoten,
    //     soCccd: data.cccd,
    //     ngaySinh: data.ngaysinh,
    //     gioiTinh: data.gioitinh,
    //     soDienThoai: data.dienthoai,
    //     loaiDt: data.tenloaihinh,
    //     soTien: data.sotien,
    //     soThang: data.maphuongthucdong,
    //     maToChucDvt: matochucDvt,
    //     tenToChucDvt: data.tentochuc,
    //     maNhanVienThu: "NVT" + data.cccd,
    //     tenNhanVienThu: this.user.name,
    //     maCqBhxh: this.user.macqbhxh,
    //     tenCqBhxh: this.user.tencqbhxh,
    //     keyfrombhvn: data.key,
    //     tuNgay: data.tungay,
    //     denNgay: data.denngay,
    //     tuThang: data.tuthang,
    //     denThang: data.denthang,
    //     maDaiLy: data.madaily,
    //     tenDaiLy: data.tendaily,
    //     soHoSo: data.sohoso,
    //     dotKeKhai: data.dotkekhai,
    //     kyKeKhai: data.kykekhai,
    //     ngayKeKhai: data.ngaykekhai,
    //     createdBy: this.user.username,
    //     sobienlai: curentInvoiceNumber,
    //     ngaybienlai: formattedDate,
    //     maloaihinh: data.maloaihinh,
    //     currentYear: currentYear,
    //     tothon: data.tothon,
    //     tenquanhuyen: data.tenquanhuyen,
    //     tentinh: data.tentinh,
    //   };

    //   // console.log(dataPost);

    //   const url = `/api/kekhai/pushinfotoportbhxhvn`;

    //   // console.log("pushinfotoportbhxhvn");
    //   const response = await this.$axios.post(url, dataPost);
    //   // console.log(response);
    //   // response.data.data
    //   const resDatafromBHXHVN = {
    //     maLoi: response.data.data.maLoi,
    //     moTaLoi: response.data.data.moTaLoi,
    //     maXacNhan: response.data.data.maXacNhan,
    //     noiDung: response.data.data.noiDung,
    //   };

    //   // Kết hợp dataPost và resDatafromBHXHVN
    //   const combinedData = {
    //     ...dataPost,
    //     ...resDatafromBHXHVN,
    //   };

    //   // console.log(combinedData);

    //   // ghi dữ liệu biên lai
    //   const ghibienlai = await this.$axios.post(
    //     `/api/kekhai/ghidulieubienlai`,
    //     combinedData
    //   );

    //   // lưu biên lai vào máy chủ
    //   await this.inBienLaiDientu(combinedData);
    // },

    async guiDulieuLenCongBhxhvntest(data) {
      // thông tin biên lai
      const currentYear = new Date().getFullYear();
      // console.log(currentYear);

      const getCurrentSobienlai = await this.$axios.get(
        `/api/kekhai/sobienlai?namtaichinh=${currentYear}`
      );
      // console.log(getCurrentSobienlai.data.bienlai);
      let maxInvoiceStr = getCurrentSobienlai.data.bienlai || null;

      let nextInvoice = "";

      if (!maxInvoiceStr) {
        // Nếu chưa có biên lai năm nay → bắt đầu từ 0000001
        nextInvoice = "0000001";
      } else {
        const nextNumber = parseInt(maxInvoiceStr, 10) + 1;
        nextInvoice = String(nextNumber).padStart(7, "0");
      }

      // console.log(nextInvoice);
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
      // console.log(currentYear);

      const getCurrentSobienlai = await this.$axios.get(
        `/api/kekhai/sobienlai?namtaichinh=${currentYear}`
      );
      // console.log(getCurrentSobienlai.data.bienlai);
      let maxInvoiceStr = getCurrentSobienlai.data.bienlai || null;

      let nextInvoice = "";

      if (!maxInvoiceStr) {
        // Nếu chưa có biên lai năm nay → bắt đầu từ 0000001
        nextInvoice = "0000001";
      } else {
        const nextNumber = parseInt(maxInvoiceStr, 10) + 1;
        nextInvoice = String(nextNumber).padStart(7, "0");
      }

      const dataPost = {
        _id_hskk: data._id,
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
        sobienlai: nextInvoice,
        ngaybienlai: formattedDate,
        maloaihinh: data.maloaihinh,
        currentYear: currentYear,
        tothon: data.tothon,
        tenquanhuyen: data.tenquanhuyen,
        tentinh: data.tentinh,
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
          // console.log("pushinfotoportbhxhvn");
          const response = await this.$axios.post(url, dataPost);
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

            // lưu biên lai vào máy chủ
            await this.inBienLaiDientu(combinedData);

            // console.log("ghidulieubienlai");
            // console.log(ghibienlai);

            const result = await this.$axios.post(
              `/api/kekhai/saveresponsefrombhvntodb`,
              combinedData
            );

            // console.log("saveresponsefrombhvntodb");
            // console.log(result);
            if (result.data.success == true) {
              // Cập nhật trạng thái isSent
              data.isSent = true;

              // const Toast = Swal.mixin({
              //   toast: true,
              //   position: "top-end",
              //   showConfirmButton: false,
              //   timer: 3000,
              //   timerProgressBar: true,
              //   didOpen: (toast) => {
              //     toast.addEventListener("mouseenter", Swal.stopTimer);
              //     toast.addEventListener("mouseleave", Swal.resumeTimer);
              //   },
              // });
              // Toast.fire({
              //   icon: "success",
              //   title: "Đã gửi thông tin hồ sơ lên cổng thành công",
              // });

              Swal.fire({
                title: "Gửi thành công!",
                text: "Đã gửi thông tin hồ sơ lên cổng BHXH VN!",
                icon: "success",
              });

              // đổi trạng thái của hồ sơ trong kê khai
              let bodyRes = {};
              bodyRes = result.data.datares;
              // console.log(bodyRes);
              bodyRes._id = data._id;

              const resUpdate = await this.$axios.post(
                `/api/kekhai/updatestatushoso`,
                bodyRes
              );
              // console.log(resUpdate);

              this.view_details(data);
            }
          }
        } catch (error) {
          console.error("Error posting data:", error);
          throw error;
        }
      }
    },

    async filterData(page) {
      // console.log(this.ngaykekhaiden);

      this.data_kekhai = [];
      // console.log(this.data_kekhai);
      // console.log(this.$auth.user);
      // Tách chuỗi theo dấu gạch ngang
      // const parts = this.tochuc.split("-");
      // const mst = parts[parts.length - 1]; // 2902141757
      // this.matochuc_mst = mst;
      // Xây dựng đường dẫn API dựa trên mã số thuế

      if (this.user.role == 2) {
        try {
          const res = await this.$axios.get(
            `/api/kekhai/kykekhai-search-series-pagi-tonghop?kykekhai=${this.kykekhai}&dotkekhai=${this.dotkekhai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&sohoso=${this.sohoso}&maloaihinh=${this.maloaihinh}&page=${page}`
          );
          // console.log(res.data.results.length);
          if (res.data.results.length > 0) {
            this.data_kekhai = res.data.results;
            // console.log(this.data_kekhai);

            this.totalPages = res.data.info.pages;
            this.currentPage = page;
          } else {
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
              title: `Không tìm thấy hồ sơ`,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await this.$axios.get(
            `/api/kekhai/kykekhai-search-series-pagi?kykekhai=${this.kykekhai}&madaily=${this.dailyview}&dotkekhai=${this.dotkekhai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&sohoso=${this.sohoso}&page=${page}`
          );
          if (res.data.results.length > 0) {
            this.data_kekhai = res.data.results;
            this.totalPages = res.data.info.pages;
            this.currentPage = page;
          } else {
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
              title: `Không tìm thấy hồ sơ`,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    // pagi
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.filterData(this.currentPage - 1);
      }
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.filterData(this.currentPage + 1);
      }
    },

    goToPage(page) {
      this.filterData(page); // Di chuyển đến trang được chỉ định
    },

    async xuatmauVtVnpt(item, isIvan) {
      // viettel true; vnpt false; ban đầu là false isVtVnpt
      this.isVtVnpt = isIvan;
      this.isActive = true;
      // console.log(item);
      const res = await this.$axios.get(
        `/api/kekhai/get-all-kekhai-xuatmau?sohoso=${item.sohoso}`
      );
      // console.log(res.data.kekhai);
      // Chỉ lấy những kê khai có trạng thái = 0
      this.data_xuatmau = res.data.kekhai.filter((k) => k.trangthai === 0);
    },

    // từ A - BU
    generateColumnNamesBU() {
      const columns = [];
      let columnName = "";
      let num = 1;
      while (columnName !== "BU") {
        let tempNum = num;
        columnName = "";
        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26;
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName;
          tempNum = Math.floor((tempNum - 1) / 26);
        }
        columns.push(columnName);
        num++;
      }
      return columns;
    },

    // từ A - BU
    generateColumnNamesAB() {
      const columns = [];
      let columnName = "";
      let num = 1;
      while (columnName !== "AB") {
        let tempNum = num;
        columnName = "";
        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26;
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName;
          tempNum = Math.floor((tempNum - 1) / 26);
        }
        columns.push(columnName);
        num++;
      }
      return columns;
    },

    // từ AC - BU dành cho R7 và R8
    generateColumnNamesACtoBU() {
      const columns = [];
      let columnName = "";
      let num = 29; // Số bắt đầu cho `AC` (1 cho `A`, 2 cho `B`, ..., 28 cho `AB`)

      while (columnName !== "BU") {
        // Tạo đến khi cột là `BU`
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    // từ AD - BU dành cho R2
    generateColumnNamesADtoBUR2() {
      const columns = [];
      let columnName = "";
      let num = 30; // Số bắt đầu cho `AC` (1 cho `A`, 2 cho `B`, ..., 28 cho `AB`)

      while (columnName !== "BU") {
        // Tạo đến khi cột là `BU`
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    // mergecell từ A-AV
    generateColumnNamesMercelltoAV() {
      const columns = [];
      let columnName = "";
      let num = 1; //(1 cho `A`, 2 cho `B`, ..., 28 cho `AB`)

      while (columnName !== "AV") {
        // Tạo đến khi cột là `AV`
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    // mergecell từ AW-BU
    generateColumnNamesMercellAWtoBUR3() {
      const columns = [];
      let columnName = "";
      let num = 49;

      while (columnName !== "BU") {
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    // mergecoltừ AW-BF
    generateColumnNamesMercolsAWtoBFR45() {
      const columns = [];
      let columnName = "";
      let num = 49;

      while (columnName !== "BF") {
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    async exportExcel() {
      // gọi component
      <ExportExcel_Viettel />;
    },

    async exportExcel1() {
      // Tạo workbook mới
      const workbook = new ExcelJS.Workbook();

      // Tạo worksheet mới
      const worksheet = workbook.addWorksheet("DuLieu", {
        views: [{ state: "frozen", xSplit: 3, ySplit: 5 }],
      });

      // Tạo worksheet DM Quốc tịch
      // console.log(countries);
      const worksheetDmQt = workbook.addWorksheet("DM Quốc tịch");
      worksheetDmQt.columns = [
        { header: "Mã quốc gia", key: "code", width: 15 }, // Cột 1
        { header: "Tên Quốc gia/ Vùng lãnh thổ", key: "name", width: 30 }, // Cột 2 với chiều rộng 30
      ];
      // Tô màu cho tiêu đề
      const headerRow = worksheetDmQt.getRow(1); // Lấy hàng tiêu đề
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFADD8E6" }, // Màu xanh nước biển nhạt
        };
      });
      // Căn giữa tiêu đề
      headerRow.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      // Tạo các hàng từ dữ liệu JSON
      countries.forEach((country) => {
        const row = worksheetDmQt.addRow([country.code, country.name]); // Thêm từng hàng vào Excel
        // Chỉ căn giữa cột đầu tiên
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      worksheetDmQt.autoFilter = {
        from: "A1",
        to: "B1",
      };

      // Tạo worksheet DM dân tộc
      // console.log(dantoc);
      const worksheetDmDt = workbook.addWorksheet("Dân tộc");
      worksheetDmDt.columns = [
        { header: "Mã dân tộc", key: "id", width: 15 }, // Cột 1
        { header: "Tên dân tộc", key: "name", width: 30 }, // Cột 2 với chiều rộng 30
      ];
      // Tô màu cho tiêu đề
      const headerRowdt = worksheetDmDt.getRow(1); // Lấy hàng tiêu đề
      headerRowdt.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFADD8E6" }, // Màu xanh nước biển nhạt
        };
      });
      // Căn giữa tiêu đề
      headerRowdt.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      // Tạo các hàng từ dữ liệu JSON
      dantoc.forEach((dt) => {
        const row = worksheetDmDt.addRow([dt.id, dt.name]); // Thêm từng hàng vào Excel
        // Chỉ căn giữa cột đầu tiên
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      worksheetDmDt.autoFilter = {
        from: "A1",
        to: "B1",
      };

      // Tạo worksheet DM mối quan hệ
      const worksheetDmMqh = workbook.addWorksheet("Mối quan hệ");
      worksheetDmMqh.columns = [
        { header: "Mã mối quan hệ", key: "code", width: 20 }, // Cột 1
        { header: "Mối quan hệ", key: "name", width: 30 }, // Cột 2 với chiều rộng 30
      ];
      // Tô màu cho tiêu đề
      const headerRowmqh = worksheetDmMqh.getRow(1); // Lấy hàng tiêu đề
      headerRowmqh.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFADD8E6" }, // Màu xanh nước biển nhạt
        };
      });
      // Căn giữa tiêu đề
      headerRowmqh.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      // Tạo các hàng từ dữ liệu JSON
      reles.forEach((dt) => {
        const row = worksheetDmMqh.addRow([dt.code, dt.name]); // Thêm từng hàng vào Excel
        // Chỉ căn giữa cột đầu tiên
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      worksheetDmMqh.autoFilter = {
        from: "A1",
        to: "B1",
      };

      // Tạo worksheet DM mức hưởng bhyt
      const worksheetDmMhbhyt = workbook.addWorksheet("Mức hưởng BHYT");
      worksheetDmMhbhyt.columns = [
        { header: "Mã", key: "code", width: 15 }, // Cột 1
        { header: "Diễn giải", key: "name", width: 100 }, // Cột 2 với chiều rộng 30
      ];
      // Tô màu cho tiêu đề
      const headerRowMhbhyt = worksheetDmMhbhyt.getRow(1); // Lấy hàng tiêu đề
      headerRowMhbhyt.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFADD8E6" }, // Màu xanh nước biển nhạt
        };
      });
      // Căn giữa tiêu đề
      headerRowMhbhyt.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      // Tạo các hàng từ dữ liệu JSON
      mhbhyt.forEach((dt) => {
        const row = worksheetDmMhbhyt.addRow([dt.code, dt.name]); // Thêm từng hàng vào Excel
        // Chỉ căn giữa cột đầu tiên
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
        row.getCell(2).alignment = {
          wrapText: true, // Bọc văn bản để tránh tràn nội dung
        };
      });
      worksheetDmMhbhyt.autoFilter = {
        from: "A1",
        to: "B1",
      };

      // Tạo worksheet DM DMHC
      const worksheetDmDmhc = workbook.addWorksheet("DMHC");
      worksheetDmDmhc.getCell("A1").value = {
        text: "Tra cứu danh mục hành chính, bệnh viện",
        hyperlink:
          "http://viettel-ca.vn/download/soft/danh_muc_hanh_chinh.xlsx",
        tooltip: "Download từ trang chủ của Viettel",
      };
      worksheetDmDmhc.getCell("A1").font = {
        underline: true, // Gạch dưới
        color: { argb: "0000FF" }, // Màu xanh lam
      };
      worksheetDmDmhc.getColumn(1).width = 60;

      // style cho dòng 1 A
      const myFontsA1 = {
        Calibri: {
          name: "Calibri", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFF0000" }, // Màu đỏ (ARGB hex)
        },
      };
      worksheet.mergeCells("A1:M1");
      worksheet.getCell("A1").value =
        "Vui lòng tra cứu Danh mục hành chính Tỉnh, Huyện, Xã, Thôn, Bệnh viện trên phần mềm vBHXH trong phần 'Tra cứu mã DMHC mới' \n Lưu ý: Dữ liệu điền thông tin trên File phải là dạng TEXT";

      worksheet.getRow(1).height = 35;
      // Bật chế độ "wrap text" cho ô
      worksheet.getCell("A1").alignment = {
        wrapText: true,
        vertical: "top",
        horizontal: "left",
      };
      worksheet.getCell("A1").style.font = myFontsA1.Calibri;
      worksheet.getCell("A1:M1").protection = {
        locked: true,
        hidden: true,
      };

      // Định nghĩa dòng 2 A-AC
      const myFontsA2 = {
        Cambria: {
          name: "Cambria", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
          alignment: {
            horizontal: "left", // Căn trái văn bản
          },
        },
      };

      // Định nghĩa dòng 2 AD-BU
      const myFontsADtoBU2 = {
        Cambria: {
          name: "Cambria", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
          alignment: {
            horizontal: "left", // Căn trái văn bản
          },
        },
      };

      // style row 3 4 5
      const myFonts345 = {
        Cambria: {
          name: "Cambria", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
        },
      };

      // style row 7
      const myFontsA6 = {
        timesNewRoman: {
          name: "Times New Roman", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
        },
      };

      // style row 7
      const myFontsA7 = {
        timesNewRoman: {
          name: "Times New Roman", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          // color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
        },
      };

      // style màu nền
      const myBackground = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FF008000" }, // Màu xanh lá
      };
      const myBackgroundTitleDb = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FFFFA500" }, // Màu cam
      };
      const myBackgroundTitleAdd = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FF6699CC" }, // Màu xanh coban
      };
      const myBackgroundTitleAddACtoBU7 = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FFC4D79B" }, // Màu xanh coban
      };
      const myBackgroundTitleAddADtoBUR2 = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FFE26B0A" }, // Màu xanh coban
      };
      // Viền màu đen
      const blackBorder = {
        style: "thin", // Kiểu viền (mỏng)
        color: { argb: "FF000000" }, // Màu đen
      };

      // Tăng chiều cao của hàng 2, 3, 4, và 5
      worksheet.getRow(2).height = 20; // Chiều cao hàng 3
      worksheet.getRow(3).height = 25; // Chiều cao hàng 3
      worksheet.getRow(4).height = 30; // Chiều cao hàng 4
      worksheet.getRow(5).height = 55; // Chiều cao hàng 5
      // worksheet.getRow(5).height = 25; // Chiều cao hàng 5

      // cột định nghĩa từ A - BU
      const columnNamesABU = this.generateColumnNamesBU();
      // cột định nghĩa từ A - AB
      const columnNamesAB = this.generateColumnNamesAB();
      // cột định nghĩa từ AC - BU
      const columnNamesACtoBU = this.generateColumnNamesACtoBU();
      // cột định nghĩa từ AD - BU
      const columnNamesADtoBUR2 = this.generateColumnNamesADtoBUR2();
      // cột định nghĩa mercell từ a-av
      const columnNamesMercelltoAV = this.generateColumnNamesMercelltoAV();
      // cột định nghĩa mercell từ aw-bu
      const columnNamesMercellAWtoBU =
        this.generateColumnNamesMercellAWtoBUR3();
      // cột định nghĩa mercell từ aw-bu
      const columnNamesMerColsAWtoBF =
        this.generateColumnNamesMercolsAWtoBFR45();

      // định dạng tất cả cột từ A-BU đều dạng text
      columnNamesABU.forEach((columnName) => {
        worksheet.getColumn(columnName).numFmt = "@";
      });

      // Tô màu nền cho hàng 345 từ cột A đến cột BU
      // Gọi hàm tạo tên cột
      // Áp dụng màu nền cho từng ô trong hàng 6
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      // Tô màu nền cho hàng 3, 4 và 5 từ cột `A` đến `BU`
      const rowsToFill = [3, 4, 5]; // Các hàng cần tô màu
      // rowsToFill.forEach((rowNumber) => {
      //   columnNamesMercelltoAV.forEach((columnName) => {
      //     const cellRange = `${columnName}3:${columnName}5`; // Phạm vi cần hợp nhất
      //     worksheet.mergeCells(cellRange); // Hợp nhất ô từ hàng 3 đến 5
      //   });
      // });

      rowsToFill.forEach((rowNumber) => {
        columnNamesABU.forEach((columnName) => {
          const cell = worksheet.getCell(`${columnName}${rowNumber}`); // Truy cập ô trong hàng
          cell.fill = myBackground; // Áp dụng màu nền
          cell.style.font = myFonts345.Cambria; // Kiểu chữ
          cell.border = {
            top: blackBorder, // Viền trên màu đen
            bottom: blackBorder, // Viền dưới màu đen
            left: blackBorder, // Viền trái màu đen
            right: blackBorder, // Viền phải màu đen
          };
          cell.alignment = {
            wrapText: true,
            horizontal: "center", // Căn giữa theo chiều ngang
            vertical: "middle", // Căn giữa theo chiều dọc
          };
        });
      });

      // Tô màu nền cho hàng 6 từ cột A đến cột BU
      // Gọi hàm tạo tên cột
      const rowNumber = 6; // Số hàng
      // Áp dụng màu nền cho từng ô trong hàng 6
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesMercelltoAV.forEach((columnName) => {
        const cellRange = `${columnName}3:${columnName}5`; // Phạm vi cần hợp nhất
        worksheet.mergeCells(cellRange); // Hợp nhất ô từ hàng 3 đến 5

        const cell = worksheet.getCell(`${columnName}${rowNumber}`);
        worksheet.getCell(`${columnName}${rowNumber}`).style.font =
          myFontsA6.timesNewRoman;
        cell.fill = myBackgroundTitleDb;
        worksheet.getCell(`${columnName}${rowNumber}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumber}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      // tô màu cam toàn bộ r6 từ a - bu
      columnNamesABU.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumber}`);
        worksheet.getCell(`${columnName}${rowNumber}`).style.font =
          myFontsA6.timesNewRoman;
        cell.fill = myBackgroundTitleDb;
        worksheet.getCell(`${columnName}${rowNumber}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumber}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      // Mercell row3 từ aw to bu
      worksheet.mergeCells("AW3:BU3"); // Gộp các ô từ AW3 đến BU3
      const mergedCell = worksheet.getCell("AW3:BU3"); // Chỉ định vùng ô đã gộp
      mergedCell.value = "PHỤ LỤC - DANH SÁCH THÀNH VIÊN"; // Đặt giá trị văn bản
      mergedCell.alignment = {
        horizontal: "left",
        vertical: "middle",
      };

      // Mergrow aw to bf dòng 4 và 5
      columnNamesMerColsAWtoBF.forEach((column) => {
        worksheet.mergeCells(`${column}4:${column}5`); // Gộp dòng 4 và 5 cho mỗi cột
      });

      // Mergrow từ bg to bu dòng 4
      worksheet.mergeCells("BG4:BU4");
      const mergedCellBGtoBUR4 = worksheet.getCell("BG4:BU4");

      mergedCellBGtoBUR4.value =
        "Danh sách thành viên: Không được để trống nếu có thông tin chủ hộ";
      mergedCellBGtoBUR4.alignment = {
        horizontal: "left",
        vertical: "middle",
      };
      // Đặt chiều cao cho dòng 4
      worksheet.getRow(4).height = 15;
      mergedCellBGtoBUR4.dataValidation = {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Không được nhập những ký tự đặc biệt sau ~ ` # ^ |",
      };

      // Tô màu nền cho hàng 7 từ cột AC đến cột BU
      // Gọi hàm tạo tên cột
      const rowNumberACtoBU7 = 7; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesACtoBU.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberACtoBU7}`);
        worksheet.getCell(`${columnName}${rowNumberACtoBU7}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAddACtoBU7;
        worksheet.getCell(`${columnName}${rowNumberACtoBU7}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberACtoBU7}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      // Tô màu nền cho hàng 7 từ cột AC đến cột BU
      // Gọi hàm tạo tên cột
      const rowNumberAB7 = 7; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesAB.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberAB7}`);
        worksheet.getCell(`${columnName}${rowNumberAB7}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAdd;
        worksheet.getCell(`${columnName}${rowNumberAB7}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberAB7}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      const rowNumberAB8 = 8; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesAB.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberAB8}`);
        worksheet.getCell(`${columnName}${rowNumberAB8}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAdd;
        worksheet.getCell(`${columnName}${rowNumberAB8}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberAB8}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      const rowNumberACtoBU8 = 8; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesACtoBU.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberACtoBU8}`);
        worksheet.getCell(`${columnName}${rowNumberACtoBU8}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAddACtoBU7;
        worksheet.getCell(`${columnName}${rowNumberACtoBU8}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberACtoBU8}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      const rowNumberADtoBUR2 = 2; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesADtoBUR2.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberADtoBUR2}`);
        worksheet.getCell(`${columnName}${rowNumberADtoBUR2}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAddADtoBUR2;
        worksheet.getCell(`${columnName}${rowNumberADtoBUR2}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberADtoBUR2}`).alignment = {
          wrapText: true,
          horizontal: "left", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      worksheet.mergeCells("A2:AC2");
      worksheet.getCell("A2").value = "Phần nhập dành cho tờ khai D03";
      worksheet.getCell("A2").alignment = {
        horizontal: "left",
        vertical: "middle",
      };
      worksheet.getCell("A2:AC2").style.font = myFontsA2.Cambria;
      worksheet.getCell("A2:AC2").fill = myBackground;
      worksheet.getCell("A2:AC2").border = {
        top: blackBorder, // Viền trên màu đen
        bottom: blackBorder, // Viền dưới màu đen
        left: blackBorder, // Viền trái màu đen
        right: blackBorder, // Viền phải màu đen
      };

      worksheet.mergeCells("AD2:BU2");
      const mergedCellADBU = worksheet.getCell("AD2:BU2"); // Chỉ định vùng ô đã gộp
      mergedCellADBU.value =
        "Phần nhập dành cho tờ khai TK01 (Chỉ dành cho người chưa có mã số BHXH)";
      mergedCellADBU.alignment = {
        horizontal: "left",
        vertical: "middle",
      };
      mergedCellADBU.style.font = myFontsA2.Cambria;

      // STT
      worksheet.getCell("A3:A5").value = "STT";
      // hàng thứ 6
      worksheet.getCell("A6").value = "";
      // hàng thứ 7
      worksheet.getCell("A7").value = "I";
      // hàng thứ 8
      worksheet.getCell("A8").value = "I.1";

      // Họ tên
      // Thiết lập độ rộng cho cột B
      worksheet.getColumn("B").width = 25;
      worksheet.getCell("B3:B5").value = "Họ tên";
      // hàng thứ 6
      worksheet.getCell("B6").value = "HoTen";
      // hàng thứ 7
      worksheet.getCell("B7").value = "Tăng";
      // hàng thứ 8
      worksheet.getCell("B8").value = "Người tham gia";

      // Mã số BHXH
      worksheet.getColumn("C").width = 15;
      worksheet.getCell("C3:C5").value = "Mã số BHXH";
      // hàng thứ 6
      worksheet.getCell("C6").value = "MaSoBhxh";
      worksheet.dataValidations.add("C2:C9999", {
        type: "textLength", // Xác thực theo độ dài văn bản
        operator: "equal", // Yêu cầu phải đúng 10 ký tự
        formulae: [10], // Giá trị độ dài
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Mã số BHXH phải 10 số",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Nhập mã số BHXH phải đủ 10 số",
      });

      // Ngày sinh
      worksheet.getColumn("D").width = 15;
      worksheet.getCell("D3:D5").value = "Ngày sinh (dd/mm/yyy)";
      // hàng thứ 6
      worksheet.getCell("D6").value = "NgaySinh";
      worksheet.dataValidations.add("D2:D9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          " - Nhập đúng định dạng dd/mm/yyyy VD: 01/10/1986 - Nếu chỉ có tháng năm thì nhập ngày là 01 VD: 01/11/1993 - Nếu chỉ có năm sinh thì nhập ngay/thang là 01 VD: 01/01/1993",
      });

      // chỉ có năm sinh
      worksheet.getColumn("E").width = 20;
      worksheet.getCell("E3:E5").value =
        "Chỉ có năm sinh (0 - Đầy đủ 1 - Tháng năm 2 - Năm)";
      // hàng thứ 6
      worksheet.getCell("E6").value = "ChiCoNamSinh";
      worksheet.dataValidations.add("E2:E9999", {
        type: "list",
        formulae: ['"0,1,2"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "Nhập dữ liệu theo đúng định dạng VD: 0: Đầy đủ. 1: Tháng năm. 2: Năm",
      });

      // giới tính
      worksheet.getColumn("F").width = 15;
      worksheet.getCell("F3:F5").value = "Giới tính (0 - Nữ 1 - Nam)";
      // hàng thứ 6
      worksheet.getCell("F6").value = "GioiTinh";
      worksheet.dataValidations.add("F2:F9999", {
        type: "list",
        formulae: ['"0,1"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng 0 - Nữ; 1 - Nam",
      });

      // tỉnh khám chữa bệnh
      worksheet.getColumn("G").width = 20;
      worksheet.getCell("G3:G5").value = "Tỉnh, thành phố nơi khám chữa bệnh";
      // hàng thứ 6
      worksheet.getCell("G6").value = "BenhVienTinhId";

      // nơi đăng ký KCB ban đầu
      worksheet.getColumn("H").width = 20;
      worksheet.getCell("H3:H5").value = "Nơi đăng ký khám chữa bệnh ban đầu";
      // hàng thứ 6
      worksheet.getCell("H6").value = "BenhVienId";

      // biên lai
      worksheet.getColumn("I").width = 20;
      worksheet.getCell("I3:I5").value = "Biên lai, ngày tham gia (dd/MM/yyyy)";
      // hàng thứ 6
      worksheet.getCell("I6").value = "NgayBienLai";
      worksheet.dataValidations.add("I2:I9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng dd/mm/yyyy VD: 30/04/2024",
      });

      // số biên lai
      worksheet.getColumn("J").width = 15;
      worksheet.getCell("J3:J5").value = "Số biên lai";
      // hàng thứ 6
      worksheet.getCell("J6").value = "SoBienLai";

      // miễn giảm
      worksheet.getColumn("K").width = 30;
      worksheet.getCell("K3:K5").value =
        "Tỷ lệ % được miễn giảm (Chỉ áp dụng cho đối tượng tham gia Hộ gia đình) (Chỉ phục vụ hỗ trợ tính giá trị Tiền lương, trợ cấp hoặc số tiền đóng, Không gửi sang BHXH)";
      // hàng thứ 6
      worksheet.getCell("K6").value = "TyLeMienGiam";
      worksheet.dataValidations.add("K2:K9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Chỉ nhập cho đối tượng tham gia HGĐ",
      });

      // số tháng
      worksheet.getColumn("L").width = 15;
      worksheet.getCell("L3:L5").value = "Thời gian sử dụng thẻ";
      // hàng thứ 6
      worksheet.getCell("L6").value = "SoThang";

      // tiền đóng
      worksheet.getColumn("M").width = 25;
      worksheet.getCell("M3:M5").value =
        "Tiền lương, trợ cấp hoặc số tiền đóng";
      // hàng thứ 6
      worksheet.getCell("M6").value = "TienDong";
      worksheet.dataValidations.add("M2:M9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "- Nhập là 1: Với trường hợp được NSNN hỗ trợ 100%. - Nhập MLCS tại thời điểm mua: Với trh được NSNN hỗ trợ 1 phần. - Đối tượng tham gia HGĐ = mức lương tại thời điểm mua * (100% - tỷ lệ % được miễn giảm)",
      });

      // từ ngày
      worksheet.getColumn("N").width = 15;
      worksheet.getCell("N3:N5").value = "Từ ngày (dd/MM/yyyy)";
      // hàng thứ 6
      worksheet.getCell("N6").value = "TuNgay";
      worksheet.dataValidations.add("N2:N9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng dd/mm/yyyy VD: 30/04/2024",
      });

      // ghi chú
      worksheet.getColumn("O").width = 15;
      worksheet.getCell("O3:O5").value = "Ghi chú";
      // hàng thứ 6
      worksheet.getCell("O6").value = "GhiChu";

      // phương án id
      worksheet.getColumn("P").width = 15;
      worksheet.getCell("P3:P5").value = "Phương án điều chỉnh";
      // hàng thứ 6
      worksheet.getCell("P6").value = "PhuongAnId";
      worksheet.dataValidations.add("P2:P9999", {
        type: "list",
        formulae: ['"TM,DC,GH,ON"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "Nhập đúng định dạng TM: Tăng mới; DC: Điều chỉnh; GH: Giảm hẳn; ON: Đi làm lại",
      });

      // mức hưởng
      worksheet.getColumn("Q").width = 20;
      worksheet.getCell("Q3:Q5").value = {
        text: "Mức hưởng BHYT (nhập mã hưởng theo link)",
        hyperlink: "#'Mức hưởng BHYT'!A1",
      };
      // hàng thứ 6
      worksheet.getCell("Q6").value = "MucHuongBhyt";
      worksheet.dataValidations.add("Q2:Q9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng mức hưởng theo sheet danh mục",
      });

      // phòng ban
      worksheet.getColumn("R").width = 15;
      worksheet.getCell("R3:R5").value = "Tên phòng ban";
      // hàng thứ 6
      worksheet.getCell("R6").value = "MaPhongBan";

      // Mã vùng
      worksheet.getColumn("S").width = 20;
      worksheet.getCell("S3:S5").value = "Mã vùng sinh sống";
      // hàng thứ 6
      worksheet.getCell("S6").value = "MaVungSinhSong";
      worksheet.dataValidations.add("S2:S9999", {
        type: "list",
        formulae: ['"K1,K2,K3"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          " - Nhập đúng định dạng K1: Khu vực ;1 K2: Khu vực 2; K3: Khu vực 3",
      });

      // tỷ lệ NSDPHT
      worksheet.getColumn("T").width = 20;
      worksheet.getCell("T3:T5").value =
        "Tỷ lệ ngân sách địa phương hỗ trợ thêm ngoài hỗ trợ theo quy định tại phần thông tin chung (%)";
      // hàng thứ 6
      worksheet.getCell("T6").value = "TyLeNSDP";

      // tỷ lệ hỗ trợ khác
      worksheet.getColumn("U").width = 15;
      worksheet.getCell("U3:U5").value = "Tỷ lệ hỗ trợ khác";
      // hàng thứ 6
      worksheet.getCell("U6").value = "TyLeHoTroKhac";
      worksheet.dataValidations.add("U2:U9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "- Tỷ lệ hỗ trợ thêm của tổ chức cá nhân khác (Nếu hỗ trợ theo tỷ lệ lương cơ sở tại thời điểm mua). - Nhập tỷ lệ hỗ trợ thêm thì để trống Số tiền hỗ trợ thêm",
      });

      // tiền hỗ trợ khác
      worksheet.getColumn("V").width = 15;
      worksheet.getCell("V3:V5").value =
        "Số tiền hỗ trợ khác của các tổ chức, cá nhân";
      // hàng thứ 6
      worksheet.getCell("V6").value = "HoTroKhac";
      worksheet.dataValidations.add("V2:V9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "- Nếu hỗ trợ theo số tiền thì ghi số tiền hỗ trợ. - Nếu nhập số tiền hỗ trợ thì không nhập tỷ lệ hỗ trợ khác",
      });

      // tỉnh
      worksheet.getColumn("W").width = 15;
      worksheet.getCell("W3:W5").value = "Mã tỉnh đang sinh sống";
      // hàng thứ 6
      worksheet.getCell("W6").value = "MaTinh_DangSS";

      // huyện
      worksheet.getColumn("X").width = 20;
      worksheet.getCell("X3:X5").value = "Mã huyện đang sinh sống";
      // hàng thứ 6
      worksheet.getCell("X6").value = "MaHuyen_DangSS";

      // xã
      worksheet.getColumn("Y").width = 15;
      worksheet.getCell("Y3:Y5").value = "Mã xã đang sinh sống";
      // hàng thứ 6
      worksheet.getCell("Y6").value = "MaXa_DangSS";

      // địa chỉ
      worksheet.getColumn("Z").width = 25;
      worksheet.getCell("Z3:Z5").value =
        "Ghi cụ thể, đầy đủ địa chỉ nơi đang sinh sống (số nhà, đường/phố, thôn/xóm)";
      // hàng thứ 6
      worksheet.getCell("Z6").value = "DiaChi_DangSS";

      // ngày chết
      worksheet.getColumn("AA").width = 15;
      worksheet.getCell("AA3:AA5").value = "Ngày chết (dd/MM/yyyy)";
      // hàng thứ 6
      worksheet.getCell("AA6").value = "NgayChet";
      worksheet.dataValidations.add("AA2:AA9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng dd/mm/yyyy VD: 30/04/2024",
      });

      // giảm chết
      worksheet.getColumn("AB").width = 20;
      worksheet.getCell("AB3:AB5").value = "Có giảm chết";
      // hàng thứ 6
      worksheet.getCell("AB6").value = "CoGiamChet";
      worksheet.dataValidations.add("AB2:AB9999", {
        type: "list",
        formulae: ['"0, 1"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng 0: Không giảm; 1: Có giảm",
      });

      // xuất tk1?
      worksheet.getColumn("AC").width = 20;
      worksheet.getCell("AC3:AC5").value =
        "Xuất TK01 (Có - TRUE, Không - FALSE )";
      // hàng thứ 6
      worksheet.getCell("AC6").value = "XuatTk01";
      worksheet.dataValidations.add("AC2:AC9999", {
        type: "list",
        formulae: ['"TRUE, FALSE"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          " - Nhập đúng định dạng VD: - TRUE: Có xuất Tk1; FALSE: Không xuất TK1",
      });

      // mức tiền đóng
      worksheet.getColumn("AD").width = 15;
      worksheet.getCell("AD3:AD5").value = "Mức tiền đóng";
      // hàng thứ 6
      worksheet.getCell("AD6").value = "MucDongTk01";

      // quốc tịch
      worksheet.getColumn("AE").width = 15;
      worksheet.getCell("AE3:AE5").value = {
        text: "Quốc tịch (nhập mã quốc tịch theo link)",
        hyperlink: "#'DM Quốc tịch'!A1",
      };
      // hàng thứ 6
      worksheet.getCell("AE6").value = "QuocTichId";
      worksheet.dataValidations.add("AE2:AE9999", {
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // dân tộc
      worksheet.getColumn("AF").width = 15;
      worksheet.getCell("AF3:AF5").value = {
        text: "Dân tộc (nhập mã quốc tịch theo link)",
        hyperlink: "#'Dân tộc'!A1",
      };
      // hàng thứ 6
      worksheet.getCell("AF6").value = "DanTocId";
      worksheet.getCell("AF6").dataValidation = {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      };

      // cccd
      worksheet.getColumn("AG").width = 15;
      worksheet.getCell("AG3:AG5").value = "Số CMND";
      // hàng thứ 6
      worksheet.getCell("AG6").value = "Cmnd";

      // nơi cấp giấy khai sinh tỉnh
      worksheet.getColumn("AH").width = 20;
      worksheet.getCell("AH3:AH5").value =
        "Nơi cấp giấy khai sinh (quê quán) tỉnh thành";
      // hàng thứ 6
      worksheet.getCell("AH6").value = "KhaiSinhTinhId";

      // nơi cấp giấy khai sinh huyện
      worksheet.getColumn("AI").width = 20;
      worksheet.getCell("AI3:AI5").value =
        "Nơi cấp giấy khai sinh (quê quán) quận, huyện";
      // hàng thứ 6
      worksheet.getCell("AI6").value = "KhaiSinhHuyenId";

      // nơi cấp giấy khai sinh xã
      worksheet.getColumn("AJ").width = 20;
      worksheet.getCell("AJ3:AJ5").value =
        "Nơi cấp giấy khai sinh (quê quán) xã, phường";
      // hàng thứ 6
      worksheet.getCell("AJ6").value = "KhaiSinhXaId";

      // địa chỉ ks ak
      worksheet.getColumn("AK").width = 20;
      worksheet.getCell("AK3:AK5").value = "Địa chỉ khai sinh";
      // hàng thứ 6
      worksheet.getCell("AK6").value = "DiaChiKhaiSinh";

      // nơi nhận tỉnh al
      worksheet.getColumn("AL").width = 20;
      worksheet.getCell("AL3:AL5").value =
        "Tỉnh đăng ký địa chỉ liên hệ nơi nhận";
      // hàng thứ 6
      worksheet.getCell("AL6").value = "NoiNhanTinhId";
      worksheet.dataValidations.add("AL2:AL9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // nơi nhận huyện am
      worksheet.getColumn("AM").width = 20;
      worksheet.getCell("AM3:AM5").value =
        "Huyện đăng ký địa chỉ liên hệ nơi nhận";
      // hàng thứ 6
      worksheet.getCell("AM6").value = "NoiNhanHuyenId";
      worksheet.dataValidations.add("AM2:AM9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // nơi nhận huyện an
      worksheet.getColumn("AN").width = 20;
      worksheet.getCell("AN3:AN5").value =
        "Xã đăng ký địa chỉ liên hệ nơi nhận";
      // hàng thứ 6
      worksheet.getCell("AN6").value = "NoiNhanXaId";
      worksheet.dataValidations.add("AN2:AN9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // địa chỉ nhận hồ sơ AO
      worksheet.getColumn("AO").width = 25;
      worksheet.getCell("AO3:AO5").value = "Địa chỉ nhận hồ sơ";
      // hàng thứ 6
      worksheet.getCell("AO6").value = "NoiNhanDiaChiChiTiet";
      worksheet.dataValidations.add("AO2:AO9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // họ tên cha mẹ giám hộ AP
      worksheet.getColumn("AP").width = 20;
      worksheet.getCell("AP3:AP5").value = "Họ tên cha/ mẹ/ người giám hộ";
      // hàng thứ 6
      worksheet.getCell("AP6").value = "HoTenNguoiGiamHo";

      // dt liên hệ AQ
      worksheet.getColumn("AQ").width = 20;
      worksheet.getCell("AQ3:AQ5").value = "Số điện thoại liên hệ";
      // hàng thứ 6
      worksheet.getCell("AQ6").value = "DienThoaiLienHe";

      // ms hgđ ar
      worksheet.getColumn("AR").width = 20;
      worksheet.getCell("AR3:AR5").value = "Mã số Hộ gia đình";
      // hàng thứ 6
      worksheet.getCell("AR6").value = "MaHoGiaDinh";

      // phương thức đóng as
      worksheet.getColumn("AS").width = 25;
      worksheet.getCell("AS3:AS5").value = "Phương thức đóng";
      // hàng thứ 6
      worksheet.getCell("AS6").value = "PhuongThucTk1";
      worksheet.dataValidations.add("AS2:AS9999", {
        type: "list",
        formulae: ['"1,3,6,12,VS,TH"'],
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "- Nhập đúng định dạng 1: 1 tháng; 3: 3 tháng; 6: 6 tháng; 12: 12 tháng; VS: Về sau; TH: Còn thiếu. - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // nội dung thay đổi at
      worksheet.getColumn("AT").width = 25;
      worksheet.getCell("AT3:AT5").value = "Nội dung thay đổi";
      // hàng thứ 6
      worksheet.getCell("AT6").value = "NoiDungThayDoi";
      worksheet.dataValidations.add("AT2:AT9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // hồ sơ kèm theo au
      worksheet.getColumn("AU").width = 25;
      worksheet.getCell("AU3:AU5").value = "Hồ sơ kèm theo";
      // hàng thứ 6
      worksheet.getCell("AU6").value = "HoSoKemTheo";
      worksheet.dataValidations.add("AU2:AU9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // email liên hệ av
      worksheet.getColumn("AV").width = 25;
      worksheet.getCell("AV3:AV5").value = "Email liên hệ";
      // hàng thứ 6
      worksheet.getCell("AV6").value = "Email";
      worksheet.dataValidations.add("AV2:AV9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // phụ lục danh sách thành viên
      // họ tên chủ hộ
      worksheet.getColumn("AW").width = 20;
      worksheet.getCell("AW4:AW5").value = "Họ Tên Chủ Hộ";
      // hàng thứ 6
      worksheet.getCell("AW6").value = "HoTenChuHo";

      // số điện thoại chủ hộ ax
      worksheet.getColumn("AX").width = 20;
      worksheet.getCell("AX4:AX5").value = "Số điện thoại";
      // hàng thứ 6
      worksheet.getCell("AX6").value = "ChuHoDienThoai";
      worksheet.dataValidations.add("AX2:AX9999", {
        type: "textLength", // Xác thực theo độ dài văn bản
        operator: "equal", // Yêu cầu phải đúng 10 ký tự
        formulae: [10], // Giá trị độ dài
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Số điện thoại phải 10 số",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Nhập số điện thoại đủ 10 số",
      });

      // số giấy tờ ay
      worksheet.getColumn("AY").width = 20;
      worksheet.getCell("AY4:AY5").value = "Số giấy tờ";
      // hàng thứ 6
      worksheet.getCell("AY6").value = "ChuHoSoGiayTo";
      worksheet.dataValidations.add("AY2:AY9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // loại giấy tờ az
      worksheet.getColumn("AZ").width = 20;
      worksheet.getCell("AZ4:AZ5").value = "Loại giấy tờ";
      // hàng thứ 6
      worksheet.getCell("AZ6").value = "ChuHoLoaiGiayTo";
      worksheet.dataValidations.add("AZ2:AZ9999", {
        type: "list",
        formulae: ['"01,02,03,04,05"'],
        allowBlank: true,
        showErrorMessage: true,
        showInputMessage: true,
        errorStyle: "error",
        error: "Yêu cầu nhập đúng định dạng",
        promptTitle: "Thông báo",
        prompt:
          " - Nhập khi không có mã số BHXH. - 01: Sổ hộ khẩu; 02: Sổ tạm trú; 03: Giấy tạm trú; 04: Số UBND; 05: Khác",
      });

      // mã tỉnh ba
      worksheet.getColumn("BA").width = 20;
      worksheet.getCell("BA4:BA5").value = "Mã tỉnh";
      // hàng thứ 6
      worksheet.getCell("BA6").value = "ChuHoTinhId";
      worksheet.dataValidations.add("BA2:BA9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã huyện bb
      worksheet.getColumn("BB").width = 20;
      worksheet.getCell("BB4:BB5").value = "Mã huyện";
      // hàng thứ 6
      worksheet.getCell("BB6").value = "ChuHoHuyenId";
      worksheet.dataValidations.add("BB2:BB9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã xã bc
      worksheet.getColumn("BC").width = 20;
      worksheet.getCell("BC4:BC5").value = "Mã xã";
      // hàng thứ 6
      worksheet.getCell("BC6").value = "ChuHoXaId";
      worksheet.dataValidations.add("BC2:BC9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã thôn bd
      worksheet.getColumn("BD").width = 20;
      worksheet.getCell("BD4:BD5").value = "Mã thôn";
      // hàng thứ 6
      worksheet.getCell("BD6").value = "ChuHoThonId";
      worksheet.dataValidations.add("BD2:BD9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã số HGD be
      worksheet.getColumn("BE").width = 20;
      worksheet.getCell("BE4:BE5").value = "Mã số Hộ gia đình";
      // hàng thứ 6
      worksheet.getCell("BE6").value = "MaSoHoGiaDinh";
      worksheet.dataValidations.add("BE2:BE9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã số HGD bf
      worksheet.getColumn("BF").width = 20;
      worksheet.getCell("BF4:BF5").value = "Địa chỉ hộ khẩu";
      // hàng thứ 6
      worksheet.getCell("BF6").value = "DiaChiHoKhau";
      worksheet.dataValidations.add("BF2:BF9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // danh sách thành viên không được bỏ trống nếu có thông tin chủ hộ
      // họ và tên bg
      worksheet.getColumn("BG").width = 20;
      worksheet.getCell("BG5").value = "Họ và tên";
      // hàng thứ 6
      worksheet.getCell("BG6").value = "HoTen_TV";
      worksheet.dataValidations.add("BG2:BG9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Không được nhập những ký tự đặc biệt sau ~ ` # ^ |",
      });

      // mã số bhxh bh
      worksheet.getColumn("BH").width = 20; // Thiết lập chiều rộng cột "BH"
      worksheet.getCell("BH5").value = "Mã số BHXH";
      // Thiết lập giá trị và xác thực dữ liệu cho BH6
      worksheet.getCell("BH6").value = "MaSoBhxh_TV";
      worksheet.dataValidations.add("BH2:BH9999", {
        type: "textLength", // Xác thực theo độ dài văn bản
        operator: "equal", // Yêu cầu phải đúng 10 ký tự
        formulae: [10], // Giá trị độ dài
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Phải là 10 ký tự",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Mã số BHXH gồm 10 ký tự",
      });

      // ngày sinh bi
      worksheet.getColumn("BI").width = 20;
      worksheet.getCell("BI5").value = "Ngày sinh";
      // hàng thứ 6
      worksheet.getCell("BI6").value = "NgaySinh_TV";
      worksheet.dataValidations.add("BI2:BI9999", {
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Nhập ngày tháng theo định dạng dd/mm/yyyy (ví dụ, 30/04/2024)",
      });

      // giới tính bj
      worksheet.getColumn("BJ").width = 20;
      worksheet.getCell("BJ5").value = "Giới tính (0-Nữ, 1-Nam)";
      worksheet.dataValidations.add("BJ2:BJ9999", {
        type: "list",
        allowBlank: false,
        formulae: ['"0,1"'],
        showErrorMessage: true,
        showInputMessage: true,
        errorStyle: "error",
        error: "Yêu cầu nhập đúng định dạng",
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng 0: Nữ; 1: Nam",
      });
      // hàng thứ 6
      worksheet.getCell("BJ6").value = "GioiTinh_TV";

      // nơi cấp tỉnh gks bk
      worksheet.getColumn("BK").width = 20;
      worksheet.getCell("BK5").value = "Nơi cấp giấy khai sinh tỉnh, thành";
      // hàng thứ 6
      worksheet.getCell("BK6").value = "KhaiSinhTinhId_TV";

      // nơi cấp huyện gks bl
      worksheet.getColumn("BL").width = 20;
      worksheet.getCell("BL5").value = "Nơi cấp giấy khai sinh quận, huyện";
      // hàng thứ 6
      worksheet.getCell("BL6").value = "KhaiSinhHuyenId_TV";

      // nơi cấp xã gks bm
      worksheet.getColumn("BM").width = 20;
      worksheet.getCell("BM5").value = "Nơi cấp giấy khai sinh xã, phường";
      // hàng thứ 6
      worksheet.getCell("BM6").value = "KhaiSinhXaId_TV";

      // địa chỉ khai sinh bn
      worksheet.getColumn("BN").width = 20;
      worksheet.getCell("BN5").value = "Địa chỉ khai sinh";
      // hàng thứ 6
      worksheet.getCell("BN6").value = "DiaChiKhaiSinh_TV";

      // quốc tịch BO
      worksheet.getColumn("BO").width = 20;
      worksheet.getCell("BO5").value = "Quốc tịch";
      // hàng thứ 6
      worksheet.getCell("BO6").value = "QuocTich_TV";

      // dân tộc BP
      worksheet.getColumn("BP").width = 20;
      worksheet.getCell("BP5").value = "Dân tộc";
      // hàng thứ 6
      worksheet.getCell("BP6").value = "DanToc_TV";

      // mối quan hệ bq
      worksheet.getColumn("BQ").width = 20;
      worksheet.getCell("BQ5").value = {
        text: "Mối quan hệ (nhập mối quan hệ theo link)",
        hyperlink: "#'Mối quan hệ'!A1",
      };
      // hàng thứ 6
      worksheet.getCell("BQ6").value = "MoiQuanHe_TV";
      worksheet.dataValidations.add("BQ2:BQ9999", {
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Nhập đúng mã mối quan hệ theo sheet danh mục",
      });

      // số cmnd br
      worksheet.getColumn("BR").width = 20;
      worksheet.getCell("BR5").value = "Số CMND";
      // hàng thứ 6
      worksheet.getCell("BR6").value = "Cmnd_TV";

      // ghi chú bs
      worksheet.getColumn("BS").width = 25;
      worksheet.getCell("BS5").value = "Ghi chú";
      // hàng thứ 6
      worksheet.getCell("BS6").value = "DanToc_TV";

      // ghi chú bs
      worksheet.getColumn("BS").width = 25;
      worksheet.getCell("BS5").value = "Ghi chú";
      // hàng thứ 6
      worksheet.getCell("BS6").value = "GhiChu_TV";

      // chỉ có năm sinh bt
      worksheet.getColumn("BT").width = 25;
      worksheet.getCell("BT5").value =
        "Chỉ có năm sinh (0 - Đầy đủ, 1 - Tháng năm,2 - Năm)";
      // hàng thứ 6
      worksheet.getCell("BT6").value = "ChiCoNamSinh_TV";
      worksheet.dataValidations.add("BT2:BT9999", {
        type: "list",
        allowBlank: false,
        formulae: ['"0,1,2"'],
        showErrorMessage: true,
        showInputMessage: true,
        errorStyle: "error",
        error: "Yêu cầu nhập đúng định dạng",
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng 0: Đầy đủ; 1: Tháng năm; 2: Năm",
      });

      // người tham gia
      worksheet.getColumn("BU").width = 25;
      worksheet.getCell("BU5").value = "Người tham gia";
      // hàng thứ 6
      worksheet.getCell("BU6").value = "LaNguoiThamGia_TV";
      worksheet.dataValidations.add("BU2:BU9999", {
        type: "list",
        allowBlank: false,
        formulae: ['"FALSE, TRUE"'],
        showErrorMessage: true,
        showInputMessage: true,
        errorStyle: "error",
        error: "Yêu cầu nhập đúng định dạng",
        promptTitle: "Thông báo",
        prompt:
          " - Nhập đúng định dạng FALSE: Không tham gia; TRUE: Có tham gia",
      });

      // xử lý dữ liệu
      // console.log(this.data_xuatmau);
      // Bắt đầu từ dòng 9
      const startRow = 9;

      // Ghi dữ liệu vào worksheet
      this.data_xuatmau.forEach((item, index) => {
        const rowNumber = startRow + index; // Dòng hiện tại

        // Thêm hàng dữ liệu vào worksheet
        const row = worksheet.getRow(rowNumber);

        // Gán giá trị cột A với định dạng I.1.1, I.1.2, v.v.
        row.getCell(1).value = `I.1.${index + 1}`; // Cột A
        row.getCell(1).style.font = myFontsA7.timesNewRoman;
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };

        // Gán các trường dữ liệu khác vào các cột tương ứng
        row.getCell(2).value = item.hoten; // Cột B
        row.getCell(3).value = item.masobhxh; // Cột C
        row.getCell(4).value = item.ngaysinh; // Cột D

        if (item.gioitinh == "Nam") {
          row.getCell(6).value = "1"; // Cột F
        } else {
          row.getCell(6).value = "0"; // Cột F
        }
        row.getCell(7).value = item.benhvientinh; // Cột G
        row.getCell(8).value = item.mabenhvien; // Cột H

        row.getCell(12).value = item.maphuongthucdong; // Cột L
        row.getCell(13).value = item.tienluongcs; // Cột M
        row.getCell(14).value = item.tungay; // Cột N

        row.getCell(16).value = item.maphuongan; // Cột P

        row.getCell(23).value = item.matinh; // Cột W
        row.getCell(24).value = item.maquanhuyen; // Cột X
        row.getCell(25).value = item.maxaphuong; // Cột Y

        row.commit(); // Xác nhận thay đổi cho hàng
      });

      // Xuất workbook thành tệp Excel
      const buffer = await workbook.xlsx.writeBuffer();
      // Tạo blob để tải xuống
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Tạo URL để tải xuống
      const url = window.URL.createObjectURL(blob);

      // Tạo thẻ <a> để kích hoạt tải xuống
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    async xemBienLai(item) {
      try {
        const res = await this.$axios.get(
          `/api/kekhai/view-item-bienlai?hosoIdentity=${item.hosoIdentity}`
        );

        const hs = res.data.hs;
        if (hs && hs.sobienlai && hs.hoten) {
          const fileName = `${hs.sobienlai}_${encodeURIComponent(
            hs.hoten
          )}.pdf`;
          const pdfUrl = `http://27.73.37.94:4042/bienlaidientu/${fileName}`;
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

      // add the font to jsPDF
      doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
      doc.setFont("OpenSans-Bold", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#04368c");
      doc.text(`BẢO HIỂM XÃ HỘI LIÊN HUYỆN DIỄN CHÂU - NGHI LỘC`, 60, 10, {
        align: "center",
        fontWeight: "bold",
      });

      doc.setFontSize(12);
      doc.setTextColor("ff0000");
      doc.text(`CÔNG TY TNHH ASXH PHỦ DIỄN`, 60, 17, {
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
        `Do ASXH Phủ Diễn tổ chức được Bảo hiểm xã hội uỷ quyền thu phát hành. `,
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
      tienHoa += "đồng./.";

      // console.log(tienHoa);

      doc.text(`(Viết bằng chữ: ${tienHoa}) `, toadoXInfo, toadoYInfo + 32, {
        fontWeight: "bold",
      });
      // doc.text(`${tienHoa}`, toadoXInfo + 35, toadoYInfo + 32, {
      //   fontWeight: "bold",
      // });

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

      doc.addFont(
        "OpenSans-Regular-normal.ttf",
        "OpenSans-Regular-normal",
        "bold"
      );
      doc.setFont("OpenSans-Regular-normal", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#dc143c");
      // doc.text(
      //   `Ký bởi: CÔNG TY TNHH ASXH PHỦ DIỄN`,
      //   toadoXInfo + 100,
      //   toadoYInfo + 53,
      //   {
      //     fontWeight: "bold",
      //   }
      // );
      // doc.text(
      //   `Ngày ký: 18/12/2024 15:15:09`,
      //   toadoXInfo + 110,
      //   toadoYInfo + 58,
      //   {
      //     fontWeight: "bold",
      //   }
      // );

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#04368c");
      doc.text(
        `Nhân viên thu: ${this.user.name}`,
        toadoXInfo + 107,
        toadoYInfo + 70,
        {
          fontWeight: "bold",
        }
      );

      doc.addFont(
        "OpenSans_SemiCondensed-Italic-normal.ttf",
        "OpenSans_SemiCondensed-Italic-normal",
        "italic"
      );
      doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      doc.setFontSize(10);
      doc.setTextColor("#04368c");
      doc.text(`Mã xác nhận: `, toadoXInfo - 8, toadoYInfo + 58, {
        fontWeight: "bold",
      });

      // console.log(data.maXacNhan);

      doc.setFontSize(11);
      doc.setTextColor("#dc143c");
      doc.text(`${data.maXacNhan} `, toadoXInfo + 14, toadoYInfo + 58, {
        fontWeight: "bold",
      });

      doc.setFontSize(10);
      doc.setTextColor("#04368c");
      doc.text(
        `Sử dụng để tra cứu thông tin ghi nhận đóng trên Cổng thông tin điện tử`,
        toadoXInfo - 8,
        toadoYInfo + 62,
        {
          fontWeight: "bold",
        }
      );

      doc.text(
        `Người tham gia có thể sử dụng ứng dụng VSSID của Bảo hiểm Xã hội`,
        toadoXInfo - 8,
        toadoYInfo + 70,
        {
          fontWeight: "bold",
        }
      );
      doc.text(
        `Việt Nam để theo dõi quá trính đóng BHXH, sử dụng thay thế thẻ BHYT`,
        toadoXInfo - 8,
        toadoYInfo + 75,
        {
          fontWeight: "bold",
        }
      );
      doc.text(
        `https://baohiemxahoi.gov.vn/gioithieu/pages/tai-ung-dung-vssid.aspx`,
        toadoXInfo - 8,
        toadoYInfo + 80,
        {
          fontWeight: "bold",
        }
      );

      // Lưu file PDF trên một tab mới
      const tenbienlai = `${data.sobienlai}_${data.hoTen}`;
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

    vieweditHs(data) {
      this.isActive_fix = true;
      // console.log(data);
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";
@import "@/assets/customCss/footerTable.css";

.pagination {
  margin-top: 1em;
}
</style>
