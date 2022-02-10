import axios from "axios";

import { LearnedWithID } from "../models/Learned";

export async function getAll(): Promise<LearnedWithID[] | string> {
  try {
    const res = await axios.get<LearnedWithID[]>("/api/get");
    return res.data;
  } catch (err) {
    return "Password Incorrect";
  }
}
