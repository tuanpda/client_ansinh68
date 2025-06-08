<template>
  <div class="box">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <strong class="title is-5">Tổng tiền theo Đại lý</strong>
      <button class="button is-small is-light">
        📅 {{ month }}/{{ currentYear }}
      </button>
    </div>

    <hr class="navbar-divider" />

    <canvas
      ref="chartTongTien"
      style="max-height: 400px; max-width: 600px; margin: auto"
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
      currentYear: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    };
  },

  mounted() {
    this.reportTongTien();
  },

  methods: {
    async reportTongTien() {
      try {
        const res = await this.$axios.get(
          `/api/kekhai/baocao-tongtien-theo-daily-thang-nam?nam=${this.currentYear}&thang=${this.month}`
        );

        if (res.status === 200) {
          this.chartData = res.data.data;
          this.$nextTick(() => this.renderChartTongTien());
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu tổng tiền:", err);
      }
    },

    renderChartTongTien() {
      if (!this.$refs.chartTongTien) {
        console.warn("Canvas chưa sẵn sàng.");
        return;
      }

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = this.$refs.chartTongTien.getContext("2d");

      const labels = this.chartData.map((item) => item.madaily);
      const data = this.chartData.map((item) => item.tongtien);

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
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Tổng tiền (VNĐ)",
              data,
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.formattedValue.toLocaleString()} VNĐ`;
                },
              },
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
