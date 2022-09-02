//十六进制颜色转换为rgba
const hexToRgba = (hex, opacity = 0.5) => {
    let r = parseInt(`0x${hex.slice(1, 3)}`),
        g = parseInt(`0x${hex.slice(3, 5)}`),
        b = parseInt(`0x${hex.slice(5, 7)}`);
    return `rgba(${r},${g},${b},${opacity})`;
}

export { hexToRgba };