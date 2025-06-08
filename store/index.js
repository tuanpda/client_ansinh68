// import Vue from "vue";
// import Vuex from "vuex";
// import {
//   state as state1,
//   mutations as mutations1,
//   actions as actions1,
// } from "./modules/users";

// import {
//   state as state2,
//   mutations as mutations2,
//   actions as actions2,
// } from "./modules/danhmucs";

// Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {
//     // ...
//   },
//   mutations: {
//     // ...
//   },
//   actions: {},
//   modules: {
//     users: {
//       namespaced: true, // Enable namespace for authentic store
//       state: state1,
//       mutations: mutations1,
//       actions: actions1,
//     },
//     danhmucs: {
//       namespaced: true, // Enable namespace for authentic store
//       state: state2,
//       mutations: mutations2,
//       actions: actions2,
//     },
//   },
// });

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default () =>
  new Vuex.Store({
    state: {
      users: [],
      user: {},
    },

    getters: {
      getUsers: (state) => state.users,
      getUser: (state) => state.user,
    },

    mutations: {
      setUsers(state, users) {
        state.users = users;
      },
      setUser(state, user) {
        state.user = user;
      },
    },

    actions: {
      async nuxtServerInit({ commit }, { app }) {
        try {
          const res = await app.$axios.$get("http://localhost:1552/api/users/auth/user");
          // console.log("✅ nuxtServerInit - user lấy được từ API:", res.user);
          commit("setUser", res.user); // hoặc res nếu không có .user
        } catch (error) {
          console.error("nuxtServerInit: Không thể lấy user từ token:", error);
        }
      },

      // Lấy tất cả người dùng
      async getUsers({ commit }) {
        try {
          const response = await this.$axios.get("/api/users/");
          commit("setUsers", response.data);
        } catch (error) {
          console.error(error);
        }
      },

      // Lấy user hiện tại đã đăng nhập
      async fetchUsersLogin({ commit }) {
        try {
          const response = await this.$axios.get("/api/users/auth/user");
          // console.log(response.data.user);
          
          commit("setUser", response.data.user);
          return {
            success: true,
            message: "Fetched user success!",
          };
        } catch (error) {
          console.error(error);
          return {
            success: false,
            message: "Fetch user failed!",
          };
        }
      },

      // Tạo người dùng mới
      async createUser({ commit }, data) {
        try {
          const response = await this.$axios.post("/api/users/account", data);
          if (response.status === 200) {
            const reload = await this.$axios.get("/api/users/");
            commit("setUsers", reload.data);
            return {
              success: true,
              message: "Created success!",
            };
          } else {
            return {
              success: false,
              message: "Create failed!",
            };
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      },

      // Cập nhật người dùng
      async updateUser({ commit }, data) {
        try {
          const response = await this.$axios.post(`/api/users/user/fix`, data);
          if (response.data.success === true) {
            const reload = await this.$axios.get("/api/users/");
            commit("setUsers", reload.data);
            return {
              success: true,
              message: "Update success!",
            };
          } else {
            return {
              success: false,
              message: "Update failed!",
            };
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
  });

