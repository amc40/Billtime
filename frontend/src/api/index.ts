import { validateRequiredEnvVariablePresent } from "@/config/env";
import axios from "axios";

validateRequiredEnvVariablePresent("SERVER_URL", process.env.SERVER_URL);
const baseURL = process.env.SERVER_URL;

export const apiAxios = axios.create({
  baseURL,
});
