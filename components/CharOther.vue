<template>
  <div class="box">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <strong class="title is-5">Other Chart</strong>
      <button class="button is-small is-light">📅 Today</button>
    </div>

    <hr class="navbar-divider" />

    <canvas id="myChart2" style="max-height: 400px"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  mounted() {
    const ctx = document.getElementById("myChart2");

    new Chart(ctx, {
      type: "line",
      // type: "polarArea",
      //   type: "doughnut",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Other Chart",
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            borderColor: "#36A2EB",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Ẩn toàn bộ phần legend
          },
        },
      },
    });
  },
};
</script>
