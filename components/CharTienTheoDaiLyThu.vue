<template>
  <div class="box">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <strong class="title is-5">Thu nhập theo từng tháng</strong>
      <button class="button is-small is-light">📅 Năm {{ currentYear }}</button>
    </div>

    <hr class="navbar-divider" />

    <canvas
      ref="thuNhapChart"
      style="max-height: 400px; max-width: 600px; margin: auto"
    ></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: {
    madaily: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      chartInstance: null,
      chartData: [],
      currentYear: new Date().getFullYear(),
    };
  },

  mounted() {
    if (this.madaily) {
      this.report();
    }
  },

  watch: {
    madaily(newVal) {
      if (newVal) {
        this.report();
      }
    },
  },

  methods: {
    async report() {
      try {
        const url = `/api/kekhai/baocao-tongtien-daily-theo-thang-nam?madaily=${this.madaily}&nam=${this.currentYear}`;
        const res = await this.$axios.get(url);

        if (res.status === 200) {
          this.chartData = res.data.data;
          this.renderChart();
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu thu nhập theo tháng:", err);
      }
    },

    renderChart() {
      if (!this.$refs.thuNhapChart) return;

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = this.$refs.thuNhapChart.getContext("2d");

      // Chuẩn hóa dữ liệu đủ 12 tháng
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const dataMap = Object.fromEntries(
        this.chartData.map((item) => [item.thang, item.tongtien])
      );
      const values = allMonths.map((month) => dataMap[month] || 0);

      this.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: allMonths.map((m) => `Tháng ${m}`),
          datasets: [
            {
              label: "Tổng thu nhập (VNĐ)",
              data: values,
              backgroundColor: "#36A2EB",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.formattedValue.toLocaleString() + " đ";
                },
              },
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => value.toLocaleString() + " đ",
              },
            },
          },
        },
      });
    },
  },
};
</script>
