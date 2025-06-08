<template>
  <div>
    <section class="special-layout">
      <nuxt />
      <Footer />
    </section>
  </div>
</template>

<script>
import Footer from "~/components/Footer";
export default {
  components: {
    Footer,
  },
  name: "TracuuBienLaiLayout",
  middleware: "auth",

  computed: {
    user() {
      return this.$store.state.user || {};
    },
    role() {
      return this.user.role;
    },
  },

  async created() {
    // Nếu chưa có user, gọi lại API
    if (!this.user || !this.user._id) {
      try {
        const res = await this.$axios.$get("/api/users/auth/user");
        await this.$store.dispatch("fetchUsersLogin", res.user);
      } catch (e) {
        return this.$router.push("/login");
      }
    }

    // Kiểm tra quyền
    if (this.role !== 9) {
      console.warn("🚫 Bạn không được vào trang này!");
      this.$router.push("/unauthorized");
    }
  },
};
</script>

<style scoped>
.special-layout {
  background-color: #f5f5f5;
  padding: 20px;
}
</style>
