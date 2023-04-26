/**
 * 延时函数
 * @param {*} ms 毫秒
 */
async function delay(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function random(maxL: number, params?: any): number {
  params = {...{length: 1, min: 1, max: maxL}, ...params};
  let {length, min, max} = params;
  if (
    typeof length != "number" ||
    typeof min != "number" ||
    typeof max != "number" ||
    max <= min ||
    length <= 0
  ) {
    return 0;
  }
  if (max - min < length) {
    length = max - min + 1;
  }
  let arr: any[] = [];
  for (let i = 0; i < length; i++) {
    let num = Math.round(Math.random() * (max - min)) + min;
    if (!arr.includes(num)) {
      arr.push(num);
    } else {
      i -= 1
    }
  }
  return arr[0];
}

export {
  delay,
  random
}
