<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! Trang bạn đang tìm kiếm không tồn tại.</p>
    <nuxt-link to="/">Quay lại trang chủ</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "Pagenotfound",
  layout: "none", // có thể tạo layout cho riêng trang active
  auth: "guest",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 100px;
  color: #cb4b10;
  margin-bottom: 10px;
}

p {
  font-size: 24px;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
