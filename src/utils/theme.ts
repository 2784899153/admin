export const generateNewStyle = (primaryColor: string) => {
  const colors = {
    menuBg: primaryColor,
    menuHover: colorUtils.darken(primaryColor, 0.1),
    subMenuBg: colorUtils.darken(primaryColor, 0.2),
    subMenuHover: colorUtils.darken(primaryColor, 0.3)
  }
  return colors
}

const colorUtils = {
  //hex颜色转rgb颜色
  HexToRgb(str: string) {
    str = str.replace('#', '')
    var hxs: any = str.match(/../g)
    for (var i = 0; i < 3; i++) {
      hxs[i] = parseInt(hxs[i], 16)
    }
    return hxs
  },
  //rgb颜色转hex颜色
  RgbToHex(a: number, b: number, c: number) {
    var hexs = [a.toString(16), b.toString(16), c.toString(16)]
    for (var i = 0; i < 3; i++) {
      if (hexs[i].length == 1) hexs[i] = '0' + hexs[i]
    }
    return '#' + hexs.join('')
  },
  //加深
  darken(color: string, level: number) {
    var rgbc = this.HexToRgb(color)
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
  },
  //变淡
  lighten(color: string, level: number) {
    var rgbc = this.HexToRgb(color)
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
  }
}

export default colorUtils
