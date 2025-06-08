import Vue from "vue";
import moment from "moment";
import VueMask from "v-mask";
import numeral from "numeral";

Vue.use(VueMask);


Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});

Vue.filter('myDate', function (value) {
  if (value) {
      return moment(String(value)).format('dd/mm/yyyy')
  }
});

Vue.filter("shortenText", function(text, maxLength = 300) {
  if (text && typeof text === "string") {
    const finalChar = text.length > maxLength ? "..." : "";
    return text.substr(0, maxLength) + finalChar;
  }

  return "";
});

Vue.filter("formatDate", function(date, dateFormat = "DD/MM/YYYY") {
  if (!date) return "";

  return moment(date).format(dateFormat);
});

Vue.filter("formatDate1", function(date, dateFormat = "LLLL") {
  if (!date) return "";

  return moment(date).format(dateFormat);
});

