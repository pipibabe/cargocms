import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "brand-font": {
        "fontFamily": "Bell MT"
    },
    "header logo img": {
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 15,
        "marginLeft": 0,
        "height": 20,
        "opacity": 0.8
    },
    "header topbar ulloginbar > li > a": {
        "fontSize": 13
    },
    "header topbar ulloginbar > li > a:hover": {
        "fontSize": 13
    },
    "header navbar-nav > li > a:hover": {
        "borderBottomWidth": 8
    },
    "header navbar-nav > active > a": {
        "borderBottomWidth": 8
    },
    "header navbar-nav > li > a": {
        "textTransform": "none"
    },
    "body": {
        "overflowX": "hidden"
    },
    "dont-break-out": {
        "overflowWrap": "break-word",
        "wordWrap": "break-word",
        "MsWordBreak": "break-all",
        "wordBreak": "break-word",
        "MsHyphens": "auto",
        "MozHyphens": "auto",
        "WebkitHyphens": "auto",
        "hyphens": "auto"
    },
    "fb-comments": {
        "width": "100% !important"
    },
    "fb-comments iframe[style]": {
        "width": "100% !important"
    },
    "fb-like-box": {
        "width": "100% !important"
    },
    "fb-like-box iframe[style]": {
        "width": "100% !important"
    },
    "fb-comments span": {
        "width": "100% !important"
    },
    "fb-comments iframe span[style]": {
        "width": "100% !important"
    },
    "fb-like-box span": {
        "width": "100% !important"
    },
    "fb-like-box iframe span[style]": {
        "width": "100% !important"
    },
    "blog-title": {
        "fontFamily": "'Noto Sans TC', sans-serif",
        "fontWeight": "500"
    },
    "blog-content": {
        "fontFamily": "'Noto Sans TC', sans-serif",
        "fontWeight": "300",
        "fontSize": 15,
        "lineHeight": "150%",
        "textRendering": "optimizeLegibility"
    }
});
