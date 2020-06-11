import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        colorBrandWhiteBase: "#ffffff",
        colorBrandTextGray: "#babfd1",
        colorBrandTextGrayDark: "#575c6d",
        colorBrandGrayLight: "#3c3e47",
        colorBrandGrayBase: "#2b2b30",
        colorBrandGrayDark: "#232326",
        colorBrandUiBlackLight: "#1a1a1c",
        colorBrandUiBlack: "#161618",
        colorBrandCanvasBlack: "#0e0e0e",
        colorBrandBlackBase: "#000000",
        colorBrandBlueLight: "#5885ff",
        colorBrandBlueBase: "#2c65ff",
        colorBrandBlueDark: "#2352d0",
        colorBrandPurpleBase: "#7c2cff",
        colorBrandPurpleDark: "#690efd",
        colorBrandYellowBase: "#f2c94c",
        colorBrandYellowDark: "#dcb745",
        colorBrandGreenBright: "#17e8b0",
        colorBrandGreenLight: "#15c595",
        colorBrandGreenBase: "#15c595",
        colorBrandRedBase: "#d43333",
        colorBrandRedDark: "#c23030",
        colorBrandRedMask: "#ff0000",
      },
    },
  },
});
