export const state = () => ({
    // danh mục tỉnh / thành phố
    dm_Tinhs: [],
    dm_Tinh: {},

    // danh quận huyện
    dm_Quanhuyens: [],
    dm_Quanhuyen: {},
  });
  
  export const getters = {
    // danh mục tỉnh / thành phố
    getdmTinhs: (state) => {
      return state.dm_Tinhs;
    },
    getdmTinh: (state) => {
      return state.dm_Tinh;
    },

    // danh mục quận huyện
    getdmQuanhuyens: (state) => {
      return state.dm_Quanhuyens;
    },
    getdmQuanhuyen: (state) => {
      return state.dm_Quanhuyen;
    },
  };
  
  export const mutations = {
    // danh mục tỉnh / thành phố
    setdmTinhs(state, dm_Tinhs) {
      state.dm_Tinhs = dm_Tinhs;
    },
    setdmTinh(state, dm_Tinh) {
      state.dm_Tinh = dm_Tinh;
    },

    // danh mục quận huyện
    setdmQuanhuyens(state, dm_Quanhuyens) {
      state.dm_Quanhuyens = dm_Quanhuyens;
    },
    setdmQuanhuyen(state, dm_Quanhuyen) {
      state.dm_Quanhuyen = dm_Quanhuyen;
    },
  };
  
  export const actions = {
    // Get all data tỉnh
    async getdmTinhs({ commit }) {
      try {
        // Gọi API để lấy danh sách người dùng
        const response = await this.$axios.get("/api/danhmucs/dmtinh");
        // console.log(response.data);
        // Lưu trữ vào store
        commit("setdmTinhs", response.data);
      } catch (error) {
        console.error(error);
      }
    },

    // Get all data quận huyện
    async getdmQuanhuyens({ commit }) {
      try {
        // Gọi API để lấy danh sách người dùng
        const response = await this.$axios.get("/api/danhmucs/dmquanhuyen");
        // console.log(response.data);
        // Lưu trữ vào store
        commit("setdmQuanhuyens", response.data);
      } catch (error) {
        console.error(error);
      }
    },
  
    
  };
  