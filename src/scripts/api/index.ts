import axios from "axios";
import type { PutPillDto } from "../dto/PutPillDto";

axios.defaults.baseURL = "http://1.15.154.241:3456/";

export async function createPill(putPillDto: PutPillDto) {
  try {
    const res = await axios.post('pills', putPillDto);
    return res.data.key;
  } catch (err) {
    // console.log(`添加胶囊失败: ${err}`);
    return undefined;
  }
}

export async function findOnePill(key: string) {
  try {
    const res = await axios.get(`pills/${key}`);
    return res.data;
  } catch (err) {
    // console.log(`打开胶囊失败: ${err}`);
    return undefined;
  }
}
