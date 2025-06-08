<template>
  <div>
    <button @click="exportExcel" class="button is-small is-info">
      <span class="icon">
        <i class="fas fa-file-download"></i>
      </span>
      <span>Xuất File Viettel</span>
    </button>
  </div>
</template>
<script>
const countries = require("../../data/countries");
const dantoc = require("../../data/dantoc");
const reles = require("../../data/moiquanhe");
const mhbhyt = require("../../data/muchuongbhyt");
import ExcelJS from "exceljs";
const { DateTime } = require("luxon");
export default {
  components: {},
  props: {
    // Prop để nhận dữ liệu từ bên ngoài
    data_execl: [],
  },
  data() {
    return {};
  },

  methods: {
    // từ A - BU
    generateColumnNamesBU() {
      const columns = [];
      let columnName = "";
      let num = 1;
      while (columnName !== "BU") {
        let tempNum = num;
        columnName = "";
        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26;
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName;
          tempNum = Math.floor((tempNum - 1) / 26);
        }
        columns.push(columnName);
        num++;
      }
      return columns;
    },

    // từ A - BU
    generateColumnNamesAB() {
      const columns = [];
      let columnName = "";
      let num = 1;
      while (columnName !== "AB") {
        let tempNum = num;
        columnName = "";
        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26;
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName;
          tempNum = Math.floor((tempNum - 1) / 26);
        }
        columns.push(columnName);
        num++;
      }
      return columns;
    },

    // từ AC - BU dành cho R7 và R8
    generateColumnNamesACtoBU() {
      const columns = [];
      let columnName = "";
      let num = 29; // Số bắt đầu cho `AC` (1 cho `A`, 2 cho `B`, ..., 28 cho `AB`)

      while (columnName !== "BU") {
        // Tạo đến khi cột là `BU`
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    // từ AD - BU dành cho R2
    generateColumnNamesADtoBUR2() {
      const columns = [];
      let columnName = "";
      let num = 30; // Số bắt đầu cho `AC` (1 cho `A`, 2 cho `B`, ..., 28 cho `AB`)

      while (columnName !== "BU") {
        // Tạo đến khi cột là `BU`
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    // mergecell từ A-AV
    generateColumnNamesMercelltoAV() {
      const columns = [];
      let columnName = "";
      let num = 1; //(1 cho `A`, 2 cho `B`, ..., 28 cho `AB`)

      while (columnName !== "AV") {
        // Tạo đến khi cột là `AV`
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    // mergecell từ AW-BU
    generateColumnNamesMercellAWtoBUR3() {
      const columns = [];
      let columnName = "";
      let num = 49;

      while (columnName !== "BU") {
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    // mergecoltừ AW-BF
    generateColumnNamesMercolsAWtoBFR45() {
      const columns = [];
      let columnName = "";
      let num = 49;

      while (columnName !== "BF") {
        columnName = "";
        let tempNum = num;

        while (tempNum > 0) {
          let remainder = (tempNum - 1) % 26; // Hệ 26
          columnName =
            String.fromCharCode("A".charCodeAt(0) + remainder) + columnName; // Tạo tên cột
          tempNum = Math.floor((tempNum - 1) / 26); // Tiếp tục chia
        }

        columns.push(columnName); // Thêm vào mảng
        num++; // Chuyển sang cột tiếp theo
      }

      return columns; // Trả về mảng tên cột từ `AC` đến `BU`
    },

    async exportExcel() {
      // Tạo workbook mới
      const workbook = new ExcelJS.Workbook();

      // Tạo worksheet mới
      const worksheet = workbook.addWorksheet("DuLieu", {
        views: [{ state: "frozen", xSplit: 3, ySplit: 5 }],
      });

      // Tạo worksheet DM Quốc tịch
      // console.log(countries);
      const worksheetDmQt = workbook.addWorksheet("DM Quốc tịch");
      worksheetDmQt.columns = [
        { header: "Mã quốc gia", key: "code", width: 15 }, // Cột 1
        { header: "Tên Quốc gia/ Vùng lãnh thổ", key: "name", width: 30 }, // Cột 2 với chiều rộng 30
      ];
      // Tô màu cho tiêu đề
      const headerRow = worksheetDmQt.getRow(1); // Lấy hàng tiêu đề
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFADD8E6" }, // Màu xanh nước biển nhạt
        };
      });
      // Căn giữa tiêu đề
      headerRow.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      // Tạo các hàng từ dữ liệu JSON
      countries.forEach((country) => {
        const row = worksheetDmQt.addRow([country.code, country.name]); // Thêm từng hàng vào Excel
        // Chỉ căn giữa cột đầu tiên
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      worksheetDmQt.autoFilter = {
        from: "A1",
        to: "B1",
      };

      // Tạo worksheet DM dân tộc
      // console.log(dantoc);
      const worksheetDmDt = workbook.addWorksheet("Dân tộc");
      worksheetDmDt.columns = [
        { header: "Mã dân tộc", key: "id", width: 15 }, // Cột 1
        { header: "Tên dân tộc", key: "name", width: 30 }, // Cột 2 với chiều rộng 30
      ];
      // Tô màu cho tiêu đề
      const headerRowdt = worksheetDmDt.getRow(1); // Lấy hàng tiêu đề
      headerRowdt.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFADD8E6" }, // Màu xanh nước biển nhạt
        };
      });
      // Căn giữa tiêu đề
      headerRowdt.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      // Tạo các hàng từ dữ liệu JSON
      dantoc.forEach((dt) => {
        const row = worksheetDmDt.addRow([dt.id, dt.name]); // Thêm từng hàng vào Excel
        // Chỉ căn giữa cột đầu tiên
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      worksheetDmDt.autoFilter = {
        from: "A1",
        to: "B1",
      };

      // Tạo worksheet DM mối quan hệ
      const worksheetDmMqh = workbook.addWorksheet("Mối quan hệ");
      worksheetDmMqh.columns = [
        { header: "Mã mối quan hệ", key: "code", width: 20 }, // Cột 1
        { header: "Mối quan hệ", key: "name", width: 30 }, // Cột 2 với chiều rộng 30
      ];
      // Tô màu cho tiêu đề
      const headerRowmqh = worksheetDmMqh.getRow(1); // Lấy hàng tiêu đề
      headerRowmqh.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFADD8E6" }, // Màu xanh nước biển nhạt
        };
      });
      // Căn giữa tiêu đề
      headerRowmqh.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      // Tạo các hàng từ dữ liệu JSON
      reles.forEach((dt) => {
        const row = worksheetDmMqh.addRow([dt.code, dt.name]); // Thêm từng hàng vào Excel
        // Chỉ căn giữa cột đầu tiên
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      worksheetDmMqh.autoFilter = {
        from: "A1",
        to: "B1",
      };

      // Tạo worksheet DM mức hưởng bhyt
      const worksheetDmMhbhyt = workbook.addWorksheet("Mức hưởng BHYT");
      worksheetDmMhbhyt.columns = [
        { header: "Mã", key: "code", width: 15 }, // Cột 1
        { header: "Diễn giải", key: "name", width: 100 }, // Cột 2 với chiều rộng 30
      ];
      // Tô màu cho tiêu đề
      const headerRowMhbhyt = worksheetDmMhbhyt.getRow(1); // Lấy hàng tiêu đề
      headerRowMhbhyt.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFADD8E6" }, // Màu xanh nước biển nhạt
        };
      });
      // Căn giữa tiêu đề
      headerRowMhbhyt.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
      });
      // Tạo các hàng từ dữ liệu JSON
      mhbhyt.forEach((dt) => {
        const row = worksheetDmMhbhyt.addRow([dt.code, dt.name]); // Thêm từng hàng vào Excel
        // Chỉ căn giữa cột đầu tiên
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };
        row.getCell(2).alignment = {
          wrapText: true, // Bọc văn bản để tránh tràn nội dung
        };
      });
      worksheetDmMhbhyt.autoFilter = {
        from: "A1",
        to: "B1",
      };

      // Tạo worksheet DM DMHC
      const worksheetDmDmhc = workbook.addWorksheet("DMHC");
      worksheetDmDmhc.getCell("A1").value = {
        text: "Tra cứu danh mục hành chính, bệnh viện",
        hyperlink:
          "http://viettel-ca.vn/download/soft/danh_muc_hanh_chinh.xlsx",
        tooltip: "Download từ trang chủ của Viettel",
      };
      worksheetDmDmhc.getCell("A1").font = {
        underline: true, // Gạch dưới
        color: { argb: "0000FF" }, // Màu xanh lam
      };
      worksheetDmDmhc.getColumn(1).width = 60;

      // style cho dòng 1 A
      const myFontsA1 = {
        Calibri: {
          name: "Calibri", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFF0000" }, // Màu đỏ (ARGB hex)
        },
      };
      worksheet.mergeCells("A1:M1");
      worksheet.getCell("A1").value =
        "Vui lòng tra cứu Danh mục hành chính Tỉnh, Huyện, Xã, Thôn, Bệnh viện trên phần mềm vBHXH trong phần 'Tra cứu mã DMHC mới' \n Lưu ý: Dữ liệu điền thông tin trên File phải là dạng TEXT";

      worksheet.getRow(1).height = 35;
      // Bật chế độ "wrap text" cho ô
      worksheet.getCell("A1").alignment = {
        wrapText: true,
        vertical: "top",
        horizontal: "left",
      };
      worksheet.getCell("A1").style.font = myFontsA1.Calibri;
      worksheet.getCell("A1:M1").protection = {
        locked: true,
        hidden: true,
      };

      // Định nghĩa dòng 2 A-AC
      const myFontsA2 = {
        Cambria: {
          name: "Cambria", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
          alignment: {
            horizontal: "left", // Căn trái văn bản
          },
        },
      };

      // Định nghĩa dòng 2 AD-BU
      const myFontsADtoBU2 = {
        Cambria: {
          name: "Cambria", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
          alignment: {
            horizontal: "left", // Căn trái văn bản
          },
        },
      };

      // style row 3 4 5
      const myFonts345 = {
        Cambria: {
          name: "Cambria", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
        },
      };

      // style row 7
      const myFontsA6 = {
        timesNewRoman: {
          name: "Times New Roman", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
        },
      };

      // style row 7
      const myFontsA7 = {
        timesNewRoman: {
          name: "Times New Roman", // Tên kiểu chữ
          size: 10, // Kích thước chữ
          bold: true, // Không in đậm
          italic: false, // Không in nghiêng
          underline: false, // Không gạch chân
          // color: { argb: "FFFFFFFF" }, // Màu trắng (ARGB hex)
        },
      };

      // style màu nền
      const myBackground = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FF008000" }, // Màu xanh lá
      };
      const myBackgroundTitleDb = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FFFFA500" }, // Màu cam
      };
      const myBackgroundTitleAdd = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FF6699CC" }, // Màu xanh coban
      };
      const myBackgroundTitleAddACtoBU7 = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FFC4D79B" }, // Màu xanh coban
      };
      const myBackgroundTitleAddADtoBUR2 = {
        type: "pattern",
        pattern: "solid", // Kiểu nền đặc
        fgColor: { argb: "FFE26B0A" }, // Màu xanh coban
      };
      // Viền màu đen
      const blackBorder = {
        style: "thin", // Kiểu viền (mỏng)
        color: { argb: "FF000000" }, // Màu đen
      };

      // Tăng chiều cao của hàng 2, 3, 4, và 5
      worksheet.getRow(2).height = 20; // Chiều cao hàng 3
      worksheet.getRow(3).height = 25; // Chiều cao hàng 3
      worksheet.getRow(4).height = 30; // Chiều cao hàng 4
      worksheet.getRow(5).height = 55; // Chiều cao hàng 5
      // worksheet.getRow(5).height = 25; // Chiều cao hàng 5

      // cột định nghĩa từ A - BU
      const columnNamesABU = this.generateColumnNamesBU();
      // cột định nghĩa từ A - AB
      const columnNamesAB = this.generateColumnNamesAB();
      // cột định nghĩa từ AC - BU
      const columnNamesACtoBU = this.generateColumnNamesACtoBU();
      // cột định nghĩa từ AD - BU
      const columnNamesADtoBUR2 = this.generateColumnNamesADtoBUR2();
      // cột định nghĩa mercell từ a-av
      const columnNamesMercelltoAV = this.generateColumnNamesMercelltoAV();
      // cột định nghĩa mercell từ aw-bu
      const columnNamesMercellAWtoBU =
        this.generateColumnNamesMercellAWtoBUR3();
      // cột định nghĩa mercell từ aw-bu
      const columnNamesMerColsAWtoBF =
        this.generateColumnNamesMercolsAWtoBFR45();

      // định dạng tất cả cột từ A-BU đều dạng text
      columnNamesABU.forEach((columnName) => {
        worksheet.getColumn(columnName).numFmt = "@";
      });

      // Tô màu nền cho hàng 345 từ cột A đến cột BU
      // Gọi hàm tạo tên cột
      // Áp dụng màu nền cho từng ô trong hàng 6
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      // Tô màu nền cho hàng 3, 4 và 5 từ cột `A` đến `BU`
      const rowsToFill = [3, 4, 5]; // Các hàng cần tô màu
      // rowsToFill.forEach((rowNumber) => {
      //   columnNamesMercelltoAV.forEach((columnName) => {
      //     const cellRange = `${columnName}3:${columnName}5`; // Phạm vi cần hợp nhất
      //     worksheet.mergeCells(cellRange); // Hợp nhất ô từ hàng 3 đến 5
      //   });
      // });

      rowsToFill.forEach((rowNumber) => {
        columnNamesABU.forEach((columnName) => {
          const cell = worksheet.getCell(`${columnName}${rowNumber}`); // Truy cập ô trong hàng
          cell.fill = myBackground; // Áp dụng màu nền
          cell.style.font = myFonts345.Cambria; // Kiểu chữ
          cell.border = {
            top: blackBorder, // Viền trên màu đen
            bottom: blackBorder, // Viền dưới màu đen
            left: blackBorder, // Viền trái màu đen
            right: blackBorder, // Viền phải màu đen
          };
          cell.alignment = {
            wrapText: true,
            horizontal: "center", // Căn giữa theo chiều ngang
            vertical: "middle", // Căn giữa theo chiều dọc
          };
        });
      });

      // Tô màu nền cho hàng 6 từ cột A đến cột BU
      // Gọi hàm tạo tên cột
      const rowNumber = 6; // Số hàng
      // Áp dụng màu nền cho từng ô trong hàng 6
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesMercelltoAV.forEach((columnName) => {
        const cellRange = `${columnName}3:${columnName}5`; // Phạm vi cần hợp nhất
        worksheet.mergeCells(cellRange); // Hợp nhất ô từ hàng 3 đến 5

        const cell = worksheet.getCell(`${columnName}${rowNumber}`);
        worksheet.getCell(`${columnName}${rowNumber}`).style.font =
          myFontsA6.timesNewRoman;
        cell.fill = myBackgroundTitleDb;
        worksheet.getCell(`${columnName}${rowNumber}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumber}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      // tô màu cam toàn bộ r6 từ a - bu
      columnNamesABU.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumber}`);
        worksheet.getCell(`${columnName}${rowNumber}`).style.font =
          myFontsA6.timesNewRoman;
        cell.fill = myBackgroundTitleDb;
        worksheet.getCell(`${columnName}${rowNumber}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumber}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      // Mercell row3 từ aw to bu
      worksheet.mergeCells("AW3:BU3"); // Gộp các ô từ AW3 đến BU3
      const mergedCell = worksheet.getCell("AW3:BU3"); // Chỉ định vùng ô đã gộp
      mergedCell.value = "PHỤ LỤC - DANH SÁCH THÀNH VIÊN"; // Đặt giá trị văn bản
      mergedCell.alignment = {
        horizontal: "left",
        vertical: "middle",
      };

      // Mergrow aw to bf dòng 4 và 5
      columnNamesMerColsAWtoBF.forEach((column) => {
        worksheet.mergeCells(`${column}4:${column}5`); // Gộp dòng 4 và 5 cho mỗi cột
      });

      // Mergrow từ bg to bu dòng 4
      worksheet.mergeCells("BG4:BU4");
      const mergedCellBGtoBUR4 = worksheet.getCell("BG4:BU4");

      mergedCellBGtoBUR4.value =
        "Danh sách thành viên: Không được để trống nếu có thông tin chủ hộ";
      mergedCellBGtoBUR4.alignment = {
        horizontal: "left",
        vertical: "middle",
      };
      // Đặt chiều cao cho dòng 4
      worksheet.getRow(4).height = 15;
      mergedCellBGtoBUR4.dataValidation = {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Không được nhập những ký tự đặc biệt sau ~ ` # ^ |",
      };

      // Tô màu nền cho hàng 7 từ cột AC đến cột BU
      // Gọi hàm tạo tên cột
      const rowNumberACtoBU7 = 7; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesACtoBU.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberACtoBU7}`);
        worksheet.getCell(`${columnName}${rowNumberACtoBU7}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAddACtoBU7;
        worksheet.getCell(`${columnName}${rowNumberACtoBU7}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberACtoBU7}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      // Tô màu nền cho hàng 7 từ cột AC đến cột BU
      // Gọi hàm tạo tên cột
      const rowNumberAB7 = 7; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesAB.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberAB7}`);
        worksheet.getCell(`${columnName}${rowNumberAB7}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAdd;
        worksheet.getCell(`${columnName}${rowNumberAB7}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberAB7}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      const rowNumberAB8 = 8; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesAB.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberAB8}`);
        worksheet.getCell(`${columnName}${rowNumberAB8}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAdd;
        worksheet.getCell(`${columnName}${rowNumberAB8}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberAB8}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      const rowNumberACtoBU8 = 8; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesACtoBU.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberACtoBU8}`);
        worksheet.getCell(`${columnName}${rowNumberACtoBU8}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAddACtoBU7;
        worksheet.getCell(`${columnName}${rowNumberACtoBU8}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberACtoBU8}`).alignment = {
          wrapText: true,
          horizontal: "center", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      const rowNumberADtoBUR2 = 2; // Số hàng
      // Tô màu nền cho hàng 6 từ cột `A` đến `BU`
      columnNamesADtoBUR2.forEach((columnName) => {
        const cell = worksheet.getCell(`${columnName}${rowNumberADtoBUR2}`);
        worksheet.getCell(`${columnName}${rowNumberADtoBUR2}`).style.font =
          myFontsA7.timesNewRoman;
        cell.fill = myBackgroundTitleAddADtoBUR2;
        worksheet.getCell(`${columnName}${rowNumberADtoBUR2}`).border = {
          top: blackBorder, // Viền trên màu đen
          bottom: blackBorder, // Viền dưới màu đen
          left: blackBorder, // Viền trái màu đen
          right: blackBorder, // Viền phải màu đen
        };
        worksheet.getCell(`${columnName}${rowNumberADtoBUR2}`).alignment = {
          wrapText: true,
          horizontal: "left", // Căn giữa theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc
        };
      });

      worksheet.mergeCells("A2:AC2");
      worksheet.getCell("A2").value = "Phần nhập dành cho tờ khai D03";
      worksheet.getCell("A2").alignment = {
        horizontal: "left",
        vertical: "middle",
      };
      worksheet.getCell("A2:AC2").style.font = myFontsA2.Cambria;
      worksheet.getCell("A2:AC2").fill = myBackground;
      worksheet.getCell("A2:AC2").border = {
        top: blackBorder, // Viền trên màu đen
        bottom: blackBorder, // Viền dưới màu đen
        left: blackBorder, // Viền trái màu đen
        right: blackBorder, // Viền phải màu đen
      };

      worksheet.mergeCells("AD2:BU2");
      const mergedCellADBU = worksheet.getCell("AD2:BU2"); // Chỉ định vùng ô đã gộp
      mergedCellADBU.value =
        "Phần nhập dành cho tờ khai TK01 (Chỉ dành cho người chưa có mã số BHXH)";
      mergedCellADBU.alignment = {
        horizontal: "left",
        vertical: "middle",
      };
      mergedCellADBU.style.font = myFontsA2.Cambria;

      // STT
      worksheet.getCell("A3:A5").value = "STT";
      // hàng thứ 6
      worksheet.getCell("A6").value = "";
      // hàng thứ 7
      worksheet.getCell("A7").value = "I";
      // hàng thứ 8
      worksheet.getCell("A8").value = "I.1";

      // Họ tên
      // Thiết lập độ rộng cho cột B
      worksheet.getColumn("B").width = 25;
      worksheet.getCell("B3:B5").value = "Họ tên";
      // hàng thứ 6
      worksheet.getCell("B6").value = "HoTen";
      // hàng thứ 7
      worksheet.getCell("B7").value = "Tăng";
      // hàng thứ 8
      worksheet.getCell("B8").value = "Người tham gia";

      // Mã số BHXH
      worksheet.getColumn("C").width = 15;
      worksheet.getCell("C3:C5").value = "Mã số BHXH";
      // hàng thứ 6
      worksheet.getCell("C6").value = "MaSoBhxh";
      worksheet.dataValidations.add("C2:C9999", {
        type: "textLength", // Xác thực theo độ dài văn bản
        operator: "equal", // Yêu cầu phải đúng 10 ký tự
        formulae: [10], // Giá trị độ dài
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Mã số BHXH phải 10 số",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Nhập mã số BHXH phải đủ 10 số",
      });

      // Ngày sinh
      worksheet.getColumn("D").width = 15;
      worksheet.getCell("D3:D5").value = "Ngày sinh (dd/mm/yyy)";
      // hàng thứ 6
      worksheet.getCell("D6").value = "NgaySinh";
      worksheet.dataValidations.add("D2:D9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          " - Nhập đúng định dạng dd/mm/yyyy VD: 01/10/1986 - Nếu chỉ có tháng năm thì nhập ngày là 01 VD: 01/11/1993 - Nếu chỉ có năm sinh thì nhập ngay/thang là 01 VD: 01/01/1993",
      });

      // chỉ có năm sinh
      worksheet.getColumn("E").width = 20;
      worksheet.getCell("E3:E5").value =
        "Chỉ có năm sinh (0 - Đầy đủ 1 - Tháng năm 2 - Năm)";
      // hàng thứ 6
      worksheet.getCell("E6").value = "ChiCoNamSinh";
      worksheet.dataValidations.add("E2:E9999", {
        type: "list",
        formulae: ['"0,1,2"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "Nhập dữ liệu theo đúng định dạng VD: 0: Đầy đủ. 1: Tháng năm. 2: Năm",
      });

      // giới tính
      worksheet.getColumn("F").width = 15;
      worksheet.getCell("F3:F5").value = "Giới tính (0 - Nữ 1 - Nam)";
      // hàng thứ 6
      worksheet.getCell("F6").value = "GioiTinh";
      worksheet.dataValidations.add("F2:F9999", {
        type: "list",
        formulae: ['"0,1"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng 0 - Nữ; 1 - Nam",
      });

      // tỉnh khám chữa bệnh
      worksheet.getColumn("G").width = 20;
      worksheet.getCell("G3:G5").value = "Tỉnh, thành phố nơi khám chữa bệnh";
      // hàng thứ 6
      worksheet.getCell("G6").value = "BenhVienTinhId";

      // nơi đăng ký KCB ban đầu
      worksheet.getColumn("H").width = 20;
      worksheet.getCell("H3:H5").value = "Nơi đăng ký khám chữa bệnh ban đầu";
      // hàng thứ 6
      worksheet.getCell("H6").value = "BenhVienId";

      // biên lai
      worksheet.getColumn("I").width = 20;
      worksheet.getCell("I3:I5").value = "Biên lai, ngày tham gia (dd/MM/yyyy)";
      // hàng thứ 6
      worksheet.getCell("I6").value = "NgayBienLai";
      worksheet.dataValidations.add("I2:I9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng dd/mm/yyyy VD: 30/04/2024",
      });

      // số biên lai
      worksheet.getColumn("J").width = 15;
      worksheet.getCell("J3:J5").value = "Số biên lai";
      // hàng thứ 6
      worksheet.getCell("J6").value = "SoBienLai";

      // miễn giảm
      worksheet.getColumn("K").width = 30;
      worksheet.getCell("K3:K5").value =
        "Tỷ lệ % được miễn giảm (Chỉ áp dụng cho đối tượng tham gia Hộ gia đình) (Chỉ phục vụ hỗ trợ tính giá trị Tiền lương, trợ cấp hoặc số tiền đóng, Không gửi sang BHXH)";
      // hàng thứ 6
      worksheet.getCell("K6").value = "TyLeMienGiam";
      worksheet.dataValidations.add("K2:K9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Chỉ nhập cho đối tượng tham gia HGĐ",
      });

      // số tháng
      worksheet.getColumn("L").width = 15;
      worksheet.getCell("L3:L5").value = "Thời gian sử dụng thẻ";
      // hàng thứ 6
      worksheet.getCell("L6").value = "SoThang";

      // tiền đóng
      worksheet.getColumn("M").width = 25;
      worksheet.getCell("M3:M5").value =
        "Tiền lương, trợ cấp hoặc số tiền đóng";
      // hàng thứ 6
      worksheet.getCell("M6").value = "TienDong";
      worksheet.dataValidations.add("M2:M9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "- Nhập là 1: Với trường hợp được NSNN hỗ trợ 100%. - Nhập MLCS tại thời điểm mua: Với trh được NSNN hỗ trợ 1 phần. - Đối tượng tham gia HGĐ = mức lương tại thời điểm mua * (100% - tỷ lệ % được miễn giảm)",
      });

      // từ ngày
      worksheet.getColumn("N").width = 15;
      worksheet.getCell("N3:N5").value = "Từ ngày (dd/MM/yyyy)";
      // hàng thứ 6
      worksheet.getCell("N6").value = "TuNgay";
      worksheet.dataValidations.add("N2:N9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng dd/mm/yyyy VD: 30/04/2024",
      });

      // ghi chú
      worksheet.getColumn("O").width = 15;
      worksheet.getCell("O3:O5").value = "Ghi chú";
      // hàng thứ 6
      worksheet.getCell("O6").value = "GhiChu";

      // phương án id
      worksheet.getColumn("P").width = 15;
      worksheet.getCell("P3:P5").value = "Phương án điều chỉnh";
      // hàng thứ 6
      worksheet.getCell("P6").value = "PhuongAnId";
      worksheet.dataValidations.add("P2:P9999", {
        type: "list",
        formulae: ['"TM,DC,GH,ON"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "Nhập đúng định dạng TM: Tăng mới; DC: Điều chỉnh; GH: Giảm hẳn; ON: Đi làm lại",
      });

      // mức hưởng
      worksheet.getColumn("Q").width = 20;
      worksheet.getCell("Q3:Q5").value = {
        text: "Mức hưởng BHYT (nhập mã hưởng theo link)",
        hyperlink: "#'Mức hưởng BHYT'!A1",
      };
      // hàng thứ 6
      worksheet.getCell("Q6").value = "MucHuongBhyt";
      worksheet.dataValidations.add("Q2:Q9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng mức hưởng theo sheet danh mục",
      });

      // phòng ban
      worksheet.getColumn("R").width = 15;
      worksheet.getCell("R3:R5").value = "Tên phòng ban";
      // hàng thứ 6
      worksheet.getCell("R6").value = "MaPhongBan";

      // Mã vùng
      worksheet.getColumn("S").width = 20;
      worksheet.getCell("S3:S5").value = "Mã vùng sinh sống";
      // hàng thứ 6
      worksheet.getCell("S6").value = "MaVungSinhSong";
      worksheet.dataValidations.add("S2:S9999", {
        type: "list",
        formulae: ['"K1,K2,K3"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          " - Nhập đúng định dạng K1: Khu vực ;1 K2: Khu vực 2; K3: Khu vực 3",
      });

      // tỷ lệ NSDPHT
      worksheet.getColumn("T").width = 20;
      worksheet.getCell("T3:T5").value =
        "Tỷ lệ ngân sách địa phương hỗ trợ thêm ngoài hỗ trợ theo quy định tại phần thông tin chung (%)";
      // hàng thứ 6
      worksheet.getCell("T6").value = "TyLeNSDP";

      // tỷ lệ hỗ trợ khác
      worksheet.getColumn("U").width = 15;
      worksheet.getCell("U3:U5").value = "Tỷ lệ hỗ trợ khác";
      // hàng thứ 6
      worksheet.getCell("U6").value = "TyLeHoTroKhac";
      worksheet.dataValidations.add("U2:U9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "- Tỷ lệ hỗ trợ thêm của tổ chức cá nhân khác (Nếu hỗ trợ theo tỷ lệ lương cơ sở tại thời điểm mua). - Nhập tỷ lệ hỗ trợ thêm thì để trống Số tiền hỗ trợ thêm",
      });

      // tiền hỗ trợ khác
      worksheet.getColumn("V").width = 15;
      worksheet.getCell("V3:V5").value =
        "Số tiền hỗ trợ khác của các tổ chức, cá nhân";
      // hàng thứ 6
      worksheet.getCell("V6").value = "HoTroKhac";
      worksheet.dataValidations.add("V2:V9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "- Nếu hỗ trợ theo số tiền thì ghi số tiền hỗ trợ. - Nếu nhập số tiền hỗ trợ thì không nhập tỷ lệ hỗ trợ khác",
      });

      // tỉnh
      worksheet.getColumn("W").width = 15;
      worksheet.getCell("W3:W5").value = "Mã tỉnh đang sinh sống";
      // hàng thứ 6
      worksheet.getCell("W6").value = "MaTinh_DangSS";

      // huyện
      worksheet.getColumn("X").width = 20;
      worksheet.getCell("X3:X5").value = "Mã huyện đang sinh sống";
      // hàng thứ 6
      worksheet.getCell("X6").value = "MaHuyen_DangSS";

      // xã
      worksheet.getColumn("Y").width = 15;
      worksheet.getCell("Y3:Y5").value = "Mã xã đang sinh sống";
      // hàng thứ 6
      worksheet.getCell("Y6").value = "MaXa_DangSS";

      // địa chỉ
      worksheet.getColumn("Z").width = 25;
      worksheet.getCell("Z3:Z5").value =
        "Ghi cụ thể, đầy đủ địa chỉ nơi đang sinh sống (số nhà, đường/phố, thôn/xóm)";
      // hàng thứ 6
      worksheet.getCell("Z6").value = "DiaChi_DangSS";

      // ngày chết
      worksheet.getColumn("AA").width = 15;
      worksheet.getCell("AA3:AA5").value = "Ngày chết (dd/MM/yyyy)";
      // hàng thứ 6
      worksheet.getCell("AA6").value = "NgayChet";
      worksheet.dataValidations.add("AA2:AA9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng dd/mm/yyyy VD: 30/04/2024",
      });

      // giảm chết
      worksheet.getColumn("AB").width = 20;
      worksheet.getCell("AB3:AB5").value = "Có giảm chết";
      // hàng thứ 6
      worksheet.getCell("AB6").value = "CoGiamChet";
      worksheet.dataValidations.add("AB2:AB9999", {
        type: "list",
        formulae: ['"0, 1"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng 0: Không giảm; 1: Có giảm",
      });

      // xuất tk1?
      worksheet.getColumn("AC").width = 20;
      worksheet.getCell("AC3:AC5").value =
        "Xuất TK01 (Có - TRUE, Không - FALSE )";
      // hàng thứ 6
      worksheet.getCell("AC6").value = "XuatTk01";
      worksheet.dataValidations.add("AC2:AC9999", {
        type: "list",
        formulae: ['"TRUE, FALSE"'],
        allowBlank: true,
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          " - Nhập đúng định dạng VD: - TRUE: Có xuất Tk1; FALSE: Không xuất TK1",
      });

      // mức tiền đóng
      worksheet.getColumn("AD").width = 15;
      worksheet.getCell("AD3:AD5").value = "Mức tiền đóng";
      // hàng thứ 6
      worksheet.getCell("AD6").value = "MucDongTk01";

      // quốc tịch
      worksheet.getColumn("AE").width = 15;
      worksheet.getCell("AE3:AE5").value = {
        text: "Quốc tịch (nhập mã quốc tịch theo link)",
        hyperlink: "#'DM Quốc tịch'!A1",
      };
      // hàng thứ 6
      worksheet.getCell("AE6").value = "QuocTichId";
      worksheet.dataValidations.add("AE2:AE9999", {
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // dân tộc
      worksheet.getColumn("AF").width = 15;
      worksheet.getCell("AF3:AF5").value = {
        text: "Dân tộc (nhập mã quốc tịch theo link)",
        hyperlink: "#'Dân tộc'!A1",
      };
      // hàng thứ 6
      worksheet.getCell("AF6").value = "DanTocId";
      worksheet.getCell("AF6").dataValidation = {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      };

      // cccd
      worksheet.getColumn("AG").width = 15;
      worksheet.getCell("AG3:AG5").value = "Số CMND";
      // hàng thứ 6
      worksheet.getCell("AG6").value = "Cmnd";

      // nơi cấp giấy khai sinh tỉnh
      worksheet.getColumn("AH").width = 20;
      worksheet.getCell("AH3:AH5").value =
        "Nơi cấp giấy khai sinh (quê quán) tỉnh thành";
      // hàng thứ 6
      worksheet.getCell("AH6").value = "KhaiSinhTinhId";

      // nơi cấp giấy khai sinh huyện
      worksheet.getColumn("AI").width = 20;
      worksheet.getCell("AI3:AI5").value =
        "Nơi cấp giấy khai sinh (quê quán) quận, huyện";
      // hàng thứ 6
      worksheet.getCell("AI6").value = "KhaiSinhHuyenId";

      // nơi cấp giấy khai sinh xã
      worksheet.getColumn("AJ").width = 20;
      worksheet.getCell("AJ3:AJ5").value =
        "Nơi cấp giấy khai sinh (quê quán) xã, phường";
      // hàng thứ 6
      worksheet.getCell("AJ6").value = "KhaiSinhXaId";

      // địa chỉ ks ak
      worksheet.getColumn("AK").width = 20;
      worksheet.getCell("AK3:AK5").value = "Địa chỉ khai sinh";
      // hàng thứ 6
      worksheet.getCell("AK6").value = "DiaChiKhaiSinh";

      // nơi nhận tỉnh al
      worksheet.getColumn("AL").width = 20;
      worksheet.getCell("AL3:AL5").value =
        "Tỉnh đăng ký địa chỉ liên hệ nơi nhận";
      // hàng thứ 6
      worksheet.getCell("AL6").value = "NoiNhanTinhId";
      worksheet.dataValidations.add("AL2:AL9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // nơi nhận huyện am
      worksheet.getColumn("AM").width = 20;
      worksheet.getCell("AM3:AM5").value =
        "Huyện đăng ký địa chỉ liên hệ nơi nhận";
      // hàng thứ 6
      worksheet.getCell("AM6").value = "NoiNhanHuyenId";
      worksheet.dataValidations.add("AM2:AM9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // nơi nhận huyện an
      worksheet.getColumn("AN").width = 20;
      worksheet.getCell("AN3:AN5").value =
        "Xã đăng ký địa chỉ liên hệ nơi nhận";
      // hàng thứ 6
      worksheet.getCell("AN6").value = "NoiNhanXaId";
      worksheet.dataValidations.add("AN2:AN9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // địa chỉ nhận hồ sơ AO
      worksheet.getColumn("AO").width = 25;
      worksheet.getCell("AO3:AO5").value = "Địa chỉ nhận hồ sơ";
      // hàng thứ 6
      worksheet.getCell("AO6").value = "NoiNhanDiaChiChiTiet";
      worksheet.dataValidations.add("AO2:AO9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // họ tên cha mẹ giám hộ AP
      worksheet.getColumn("AP").width = 20;
      worksheet.getCell("AP3:AP5").value = "Họ tên cha/ mẹ/ người giám hộ";
      // hàng thứ 6
      worksheet.getCell("AP6").value = "HoTenNguoiGiamHo";

      // dt liên hệ AQ
      worksheet.getColumn("AQ").width = 20;
      worksheet.getCell("AQ3:AQ5").value = "Số điện thoại liên hệ";
      // hàng thứ 6
      worksheet.getCell("AQ6").value = "DienThoaiLienHe";

      // ms hgđ ar
      worksheet.getColumn("AR").width = 20;
      worksheet.getCell("AR3:AR5").value = "Mã số Hộ gia đình";
      // hàng thứ 6
      worksheet.getCell("AR6").value = "MaHoGiaDinh";

      // phương thức đóng as
      worksheet.getColumn("AS").width = 25;
      worksheet.getCell("AS3:AS5").value = "Phương thức đóng";
      // hàng thứ 6
      worksheet.getCell("AS6").value = "PhuongThucTk1";
      worksheet.dataValidations.add("AS2:AS9999", {
        type: "list",
        formulae: ['"1,3,6,12,VS,TH"'],
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Yêu cầu nhập đúng định dạng",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt:
          "- Nhập đúng định dạng 1: 1 tháng; 3: 3 tháng; 6: 6 tháng; 12: 12 tháng; VS: Về sau; TH: Còn thiếu. - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // nội dung thay đổi at
      worksheet.getColumn("AT").width = 25;
      worksheet.getCell("AT3:AT5").value = "Nội dung thay đổi";
      // hàng thứ 6
      worksheet.getCell("AT6").value = "NoiDungThayDoi";
      worksheet.dataValidations.add("AT2:AT9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // hồ sơ kèm theo au
      worksheet.getColumn("AU").width = 25;
      worksheet.getCell("AU3:AU5").value = "Hồ sơ kèm theo";
      // hàng thứ 6
      worksheet.getCell("AU6").value = "HoSoKemTheo";
      worksheet.dataValidations.add("AU2:AU9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // email liên hệ av
      worksheet.getColumn("AV").width = 25;
      worksheet.getCell("AV3:AV5").value = "Email liên hệ";
      // hàng thứ 6
      worksheet.getCell("AV6").value = "Email";
      worksheet.dataValidations.add("AV2:AV9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nếu không nhập TK01 thì không cần nhập cột này",
      });

      // phụ lục danh sách thành viên
      // họ tên chủ hộ
      worksheet.getColumn("AW").width = 20;
      worksheet.getCell("AW4:AW5").value = "Họ Tên Chủ Hộ";
      // hàng thứ 6
      worksheet.getCell("AW6").value = "HoTenChuHo";

      // số điện thoại chủ hộ ax
      worksheet.getColumn("AX").width = 20;
      worksheet.getCell("AX4:AX5").value = "Số điện thoại";
      // hàng thứ 6
      worksheet.getCell("AX6").value = "ChuHoDienThoai";
      worksheet.dataValidations.add("AX2:AX9999", {
        type: "textLength", // Xác thực theo độ dài văn bản
        operator: "equal", // Yêu cầu phải đúng 10 ký tự
        formulae: [10], // Giá trị độ dài
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Số điện thoại phải 10 số",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Nhập số điện thoại đủ 10 số",
      });

      // số giấy tờ ay
      worksheet.getColumn("AY").width = 20;
      worksheet.getCell("AY4:AY5").value = "Số giấy tờ";
      // hàng thứ 6
      worksheet.getCell("AY6").value = "ChuHoSoGiayTo";
      worksheet.dataValidations.add("AY2:AY9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // loại giấy tờ az
      worksheet.getColumn("AZ").width = 20;
      worksheet.getCell("AZ4:AZ5").value = "Loại giấy tờ";
      // hàng thứ 6
      worksheet.getCell("AZ6").value = "ChuHoLoaiGiayTo";
      worksheet.dataValidations.add("AZ2:AZ9999", {
        type: "list",
        formulae: ['"01,02,03,04,05"'],
        allowBlank: true,
        showErrorMessage: true,
        showInputMessage: true,
        errorStyle: "error",
        error: "Yêu cầu nhập đúng định dạng",
        promptTitle: "Thông báo",
        prompt:
          " - Nhập khi không có mã số BHXH. - 01: Sổ hộ khẩu; 02: Sổ tạm trú; 03: Giấy tạm trú; 04: Số UBND; 05: Khác",
      });

      // mã tỉnh ba
      worksheet.getColumn("BA").width = 20;
      worksheet.getCell("BA4:BA5").value = "Mã tỉnh";
      // hàng thứ 6
      worksheet.getCell("BA6").value = "ChuHoTinhId";
      worksheet.dataValidations.add("BA2:BA9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã huyện bb
      worksheet.getColumn("BB").width = 20;
      worksheet.getCell("BB4:BB5").value = "Mã huyện";
      // hàng thứ 6
      worksheet.getCell("BB6").value = "ChuHoHuyenId";
      worksheet.dataValidations.add("BB2:BB9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã xã bc
      worksheet.getColumn("BC").width = 20;
      worksheet.getCell("BC4:BC5").value = "Mã xã";
      // hàng thứ 6
      worksheet.getCell("BC6").value = "ChuHoXaId";
      worksheet.dataValidations.add("BC2:BC9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã thôn bd
      worksheet.getColumn("BD").width = 20;
      worksheet.getCell("BD4:BD5").value = "Mã thôn";
      // hàng thứ 6
      worksheet.getCell("BD6").value = "ChuHoThonId";
      worksheet.dataValidations.add("BD2:BD9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã số HGD be
      worksheet.getColumn("BE").width = 20;
      worksheet.getCell("BE4:BE5").value = "Mã số Hộ gia đình";
      // hàng thứ 6
      worksheet.getCell("BE6").value = "MaSoHoGiaDinh";
      worksheet.dataValidations.add("BE2:BE9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // mã số HGD bf
      worksheet.getColumn("BF").width = 20;
      worksheet.getCell("BF4:BF5").value = "Địa chỉ hộ khẩu";
      // hàng thứ 6
      worksheet.getCell("BF6").value = "DiaChiHoKhau";
      worksheet.dataValidations.add("BF2:BF9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: " - Nhập khi không có mã số BHXH",
      });

      // danh sách thành viên không được bỏ trống nếu có thông tin chủ hộ
      // họ và tên bg
      worksheet.getColumn("BG").width = 20;
      worksheet.getCell("BG5").value = "Họ và tên";
      // hàng thứ 6
      worksheet.getCell("BG6").value = "HoTen_TV";
      worksheet.dataValidations.add("BG2:BG9999", {
        allowBlank: true,
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Không được nhập những ký tự đặc biệt sau ~ ` # ^ |",
      });

      // mã số bhxh bh
      worksheet.getColumn("BH").width = 20; // Thiết lập chiều rộng cột "BH"
      worksheet.getCell("BH5").value = "Mã số BHXH";
      // Thiết lập giá trị và xác thực dữ liệu cho BH6
      worksheet.getCell("BH6").value = "MaSoBhxh_TV";
      worksheet.dataValidations.add("BH2:BH9999", {
        type: "textLength", // Xác thực theo độ dài văn bản
        operator: "equal", // Yêu cầu phải đúng 10 ký tự
        formulae: [10], // Giá trị độ dài
        showErrorMessage: true, // Hiển thị thông báo lỗi
        errorTitle: "Lỗi",
        error: "Phải là 10 ký tự",
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Mã số BHXH gồm 10 ký tự",
      });

      // ngày sinh bi
      worksheet.getColumn("BI").width = 20;
      worksheet.getCell("BI5").value = "Ngày sinh";
      // hàng thứ 6
      worksheet.getCell("BI6").value = "NgaySinh_TV";
      worksheet.dataValidations.add("BI2:BI9999", {
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Nhập ngày tháng theo định dạng dd/mm/yyyy (ví dụ, 30/04/2024)",
      });

      // giới tính bj
      worksheet.getColumn("BJ").width = 20;
      worksheet.getCell("BJ5").value = "Giới tính (0-Nữ, 1-Nam)";
      worksheet.dataValidations.add("BJ2:BJ9999", {
        type: "list",
        allowBlank: false,
        formulae: ['"0,1"'],
        showErrorMessage: true,
        showInputMessage: true,
        errorStyle: "error",
        error: "Yêu cầu nhập đúng định dạng",
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng 0: Nữ; 1: Nam",
      });
      // hàng thứ 6
      worksheet.getCell("BJ6").value = "GioiTinh_TV";

      // nơi cấp tỉnh gks bk
      worksheet.getColumn("BK").width = 20;
      worksheet.getCell("BK5").value = "Nơi cấp giấy khai sinh tỉnh, thành";
      // hàng thứ 6
      worksheet.getCell("BK6").value = "KhaiSinhTinhId_TV";

      // nơi cấp huyện gks bl
      worksheet.getColumn("BL").width = 20;
      worksheet.getCell("BL5").value = "Nơi cấp giấy khai sinh quận, huyện";
      // hàng thứ 6
      worksheet.getCell("BL6").value = "KhaiSinhHuyenId_TV";

      // nơi cấp xã gks bm
      worksheet.getColumn("BM").width = 20;
      worksheet.getCell("BM5").value = "Nơi cấp giấy khai sinh xã, phường";
      // hàng thứ 6
      worksheet.getCell("BM6").value = "KhaiSinhXaId_TV";

      // địa chỉ khai sinh bn
      worksheet.getColumn("BN").width = 20;
      worksheet.getCell("BN5").value = "Địa chỉ khai sinh";
      // hàng thứ 6
      worksheet.getCell("BN6").value = "DiaChiKhaiSinh_TV";

      // quốc tịch BO
      worksheet.getColumn("BO").width = 20;
      worksheet.getCell("BO5").value = "Quốc tịch";
      // hàng thứ 6
      worksheet.getCell("BO6").value = "QuocTich_TV";

      // dân tộc BP
      worksheet.getColumn("BP").width = 20;
      worksheet.getCell("BP5").value = "Dân tộc";
      // hàng thứ 6
      worksheet.getCell("BP6").value = "DanToc_TV";

      // mối quan hệ bq
      worksheet.getColumn("BQ").width = 20;
      worksheet.getCell("BQ5").value = {
        text: "Mối quan hệ (nhập mối quan hệ theo link)",
        hyperlink: "#'Mối quan hệ'!A1",
      };
      // hàng thứ 6
      worksheet.getCell("BQ6").value = "MoiQuanHe_TV";
      worksheet.dataValidations.add("BQ2:BQ9999", {
        showInputMessage: true,
        promptTitle: "Thông báo",
        prompt: "Nhập đúng mã mối quan hệ theo sheet danh mục",
      });

      // số cmnd br
      worksheet.getColumn("BR").width = 20;
      worksheet.getCell("BR5").value = "Số CMND";
      // hàng thứ 6
      worksheet.getCell("BR6").value = "Cmnd_TV";

      // ghi chú bs
      worksheet.getColumn("BS").width = 25;
      worksheet.getCell("BS5").value = "Ghi chú";
      // hàng thứ 6
      worksheet.getCell("BS6").value = "DanToc_TV";

      // ghi chú bs
      worksheet.getColumn("BS").width = 25;
      worksheet.getCell("BS5").value = "Ghi chú";
      // hàng thứ 6
      worksheet.getCell("BS6").value = "GhiChu_TV";

      // chỉ có năm sinh bt
      worksheet.getColumn("BT").width = 25;
      worksheet.getCell("BT5").value =
        "Chỉ có năm sinh (0 - Đầy đủ, 1 - Tháng năm,2 - Năm)";
      // hàng thứ 6
      worksheet.getCell("BT6").value = "ChiCoNamSinh_TV";
      worksheet.dataValidations.add("BT2:BT9999", {
        type: "list",
        allowBlank: false,
        formulae: ['"0,1,2"'],
        showErrorMessage: true,
        showInputMessage: true,
        errorStyle: "error",
        error: "Yêu cầu nhập đúng định dạng",
        promptTitle: "Thông báo",
        prompt: " - Nhập đúng định dạng 0: Đầy đủ; 1: Tháng năm; 2: Năm",
      });

      // người tham gia
      worksheet.getColumn("BU").width = 25;
      worksheet.getCell("BU5").value = "Người tham gia";
      // hàng thứ 6
      worksheet.getCell("BU6").value = "LaNguoiThamGia_TV";
      worksheet.dataValidations.add("BU2:BU9999", {
        type: "list",
        allowBlank: false,
        formulae: ['"FALSE, TRUE"'],
        showErrorMessage: true,
        showInputMessage: true,
        errorStyle: "error",
        error: "Yêu cầu nhập đúng định dạng",
        promptTitle: "Thông báo",
        prompt:
          " - Nhập đúng định dạng FALSE: Không tham gia; TRUE: Có tham gia",
      });

      // xử lý dữ liệu
      // console.log(this.data_xuatmau);
      // Bắt đầu từ dòng 9
      const startRow = 9;

      // Ghi dữ liệu vào worksheet
      this.data_execl.forEach((item, index) => {
        const rowNumber = startRow + index; // Dòng hiện tại

        // Thêm hàng dữ liệu vào worksheet
        const row = worksheet.getRow(rowNumber);

        // Gán giá trị cột A với định dạng I.1.1, I.1.2, v.v.
        row.getCell(1).value = `I.1.${index + 1}`; // Cột A
        row.getCell(1).style.font = myFontsA7.timesNewRoman;
        row.getCell(1).alignment = {
          horizontal: "center", // Căn giữa dữ liệu theo chiều ngang
          vertical: "middle", // Căn giữa theo chiều dọc (tùy chọn)
        };

        // Gán các trường dữ liệu khác vào các cột tương ứng
        row.getCell(2).value = item.hoten; // Cột B
        row.getCell(3).value = item.masobhxh; // Cột C
        row.getCell(4).value = item.ngaysinh; // Cột D

        if (item.gioitinh == "Nam") {
          row.getCell(6).value = "1"; // Cột F
        } else {
          row.getCell(6).value = "0"; // Cột F
        }
        row.getCell(7).value = item.benhvientinh; // Cột G
        row.getCell(8).value = item.mabenhvien; // Cột H

        row.getCell(12).value = item.maphuongthucdong; // Cột L
        row.getCell(13).value = item.tienluongcs; // Cột M
        row.getCell(14).value = item.tungay; // Cột N
        row.getCell(15).value = `${item.madaily} - ${item.tennguoitao}`; // Cột O
        row.getCell(16).value = item.maphuongan; // Cột P

        row.getCell(23).value = item.matinh; // Cột W
        row.getCell(24).value = item.maquanhuyen; // Cột X
        row.getCell(25).value = item.maxaphuong; // Cột Y

        row.commit(); // Xác nhận thay đổi cho hàng
      });

      const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
      const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");

      // Xuất workbook thành tệp Excel
      const buffer = await workbook.xlsx.writeBuffer();
      // Tạo blob để tải xuống
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Tạo URL để tải xuống
      const url = window.URL.createObjectURL(blob);

      // Tạo thẻ <a> để kích hoạt tải xuống
      const a = document.createElement("a");
      a.href = url;
      a.download = `FileMau-D03TS_TK01_595_HGD_${formattedDate}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";
@import "@/assets/customCss/footerTable.css";

.pagination {
  margin-top: 1em;
}
</style>
