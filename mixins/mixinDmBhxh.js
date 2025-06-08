
export const mixinDmBhxh = {
  data() {
    return {
      loaihinhtg: [],
      nguoithu: [],
      phuongthucdong: [],
      doituongdong: [],
      doituongdongil: [],
      dmluongcs: [],
      dmtinhthanhpho: [],
      dmquanhuyen: [],
      dmxaphuong: [],
      dmtylehotro: [],
      dmtyledongbhtn: [],
      dmchuanngheo: [],
      dmtylehotrodiaphuongis: [],
    };
  },

  // Trong mixin
  async created() {
    try {
      // Load các danh mục
      const promises = [
        this.loadDanhmuc("/api/danhmucs/dmloaihinhtg", "loaihinhtg"),
        this.loadDanhmuc("/api/danhmucs/dmluongcs", "dmluongcs"),
        this.loadDanhmuc("/api/danhmucs/dmnguoithu", "nguoithu"),
        this.loadDanhmuc("/api/danhmucs/dmptdong", "phuongthucdong"),
        this.loadDanhmuc("/api/danhmucs/dmdtdong", "doituongdong"),
        this.loadDanhmuc("/api/danhmucs/dmdtdongil", "doituongdongil"),
        this.loadDanhmuc("/api/danhmucs/dmtinh", "dmtinhthanhpho"),
        this.loadDanhmuc("/api/danhmucs/dmquanhuyen", "dmquanhuyen"),
        this.loadDanhmuc("/api/danhmucs/dmxaphuong", "dmxaphuong"),
        this.loadDanhmuc("/api/danhmucs/tylehotro", "dmtylehotro"),
        this.loadDanhmuc("/api/danhmucs/tyledongbhtn", "dmtyledongbhtn"),
        this.loadDanhmuc("/api/danhmucs/mucchuanngheo", "dmchuanngheo"),
        this.loadDanhmuc("/api/danhmucs/diaphuonghtis", "dmtylehotrodiaphuongis"),
      ];
      // Chờ tất cả các promise hoàn thành
      await Promise.all(promises);
      // Khi tất cả các danh mục đã được tải, gửi sự kiện thông báo
      this.$emit("danhmucs-loaded");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async loadDanhmuc(url, propertyName) {
      try {
        const response = await this.$axios.get(url);
        this[propertyName] = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
