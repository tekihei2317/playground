import { Zodios } from "@zodios/core";
// TODO: モジュールの配置場所を変える
import { apiDefinition } from "../../../backend/src/index";

const baseUrl = "http://localhost:3000";

export const apiClient = new Zodios(baseUrl, apiDefinition);
