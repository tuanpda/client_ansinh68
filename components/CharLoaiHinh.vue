<template>
  <div class="box">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <strong class="title is-5">Loại hình Kê khai</strong>
      <button class="button is-small is-light">📅 Năm {{ currentYear }}</button>
    </div>

    <hr class="navbar-divider" />

    <canvas
      ref="chartThang"
      style="max-height: 400px; max-width: 400px; margin: auto"
    ></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      chartInstance: null,
      chartData: [],
      currentYear: new Date().getFullYear(), // lấy năm hiện tại
      month: new Date().getMonth() + 1,
    };
  },

  mounted() {
    this.report();
  },

  methods: {
    async report() {
      try {
        const res = await this.$axios.get(
          `/api/kekhai/baocao-loaihinh-kekhai-theo-thang-nam?nam=${this.currentYear}&thang=${this.month}`
        );
        // console.log(res);
        if (res.status === 200) {
          this.chartData = res.data.data;
          this.renderChart();
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu biểu đồ:", err);
      }
    },

    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = this.$refs.chartThang.getContext("2d");

      // Tính tổng số lượng theo loại hình
      const tongTheoLoai = {};
      this.chartData.forEach((item) => {
        if (!tongTheoLoai[item.maloaihinh]) {
          tongTheoLoai[item.maloaihinh] = 0;
        }
        tongTheoLoai[item.maloaihinh] += item.soLuong;
      });

      const labels = Object.keys(tongTheoLoai); // ['AR', 'BI', 'IS', ...]
      const data = Object.values(tongTheoLoai); // [50, 100, 30, ...]

      const backgroundColors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#2ecc71",
      ];

      this.chartInstance = new Chart(ctx, {
        type: "doughnut", // hoặc "pie"
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: labels.map(
                (_, i) => backgroundColors[i % backgroundColors.length]
              ),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.parsed || 0;
                  return `${label}: ${value} hồ sơ`;
                },
              },
            },
          },
        },
      });
    },
  },
};
</script>
