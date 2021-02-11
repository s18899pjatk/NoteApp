import httpService from "./http";
import { apiEnpoint } from "../config.json";

function noteUrl(id) {
  return apiEnpoint + `noteHistories/${id}`;
}

export function getNoteHistory(id) {
  return httpService.get(noteUrl(id));
}
