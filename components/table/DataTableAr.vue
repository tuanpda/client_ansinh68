<template>
  <div>
    <div>
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
          <td style="text-align: center">Tổ thôn</td>
          <td style="text-align: center">Bệnh viện tỉnh</td>
          <td style="text-align: center">Mã Bệnh viện</td>
          <td style="text-align: center">Bệnh viện</td>
          <td style="text-align: center">Ghi chú</td>
        </tr>
      </thead>
      <tbody>
        <tr style="font-size: small" v-for="(item, index) in data" :key="index">
          <td style="text-align: center; vertical-align: middle">
            {{ index + 1 }}
          </td>
          <td style="text-align: center">
            {{ item.masobhxh }}
          </td>
          <td>
            {{ item.hoten }}
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
          <td style="text-align: center">{{ item.tenphuongan }}</td>
          <td style="text-align: center">
            {{ formatCurrency(item.tienluongcs) }}
          </td>
          <td style="text-align: center">{{ item.tylensnnht }}</td>
          <td style="text-align: center">{{ item.tylensdp }}</td>
          <td style="text-align: center">{{ item.hotrokhac }}</td>
          <td style="text-align: center">
            {{ item.tungay }}
          </td>
          <td style="text-align: center">{{ item.tenphuongthucdong }}</td>
          <td style="text-align: center">{{ formatCurrency(item.sotien) }}</td>
          <td style="text-align: center">{{ item.tentinh }}</td>
          <td style="text-align: center">{{ item.tenquanhuyen }}</td>
          <td style="text-align: center">{{ item.tenxaphuong }}</td>
          <td style="text-align: center">{{ item.tothon }}</td>
          <td style="text-align: center">{{ item.benhvientinh }}</td>
          <td style="text-align: center">{{ item.mabenhvien }}</td>
          <td>{{ item.tenbenhvien }}</td>
          <td>{{ item.ghichu }}</td>
        </tr>
      </tbody>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: [],
  },

  computed: {

  },

  methods: {
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

    formatCurrency(text) {
      const number = parseFloat(text);
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
</style>
