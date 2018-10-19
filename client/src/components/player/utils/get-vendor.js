import HTML5 from "../vendors/HTML5";

export default function getVendor(src, vendor) {
    src = src || "";
    const isAudio = vendor === "audio" || /\.(mp3|wav|m4a)($|\?)/i.test(src);
    return {
        vendor: isAudio ? "audio" : "video",
        component: HTML5
    };
  
}