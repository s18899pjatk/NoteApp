import httpService from "./http";
import { apiEnpoint } from "../config.json";

function noteUrl(id) {
  return apiEnpoint + `notes/${id}`;
}

export function getNotes() {
  return httpService.get(apiEnpoint + "notes");
}

export function getNote(id) {
  return httpService.get(noteUrl(id));
}

export function saveNote(note) {
  if (note._id) {
    const body = { ...note };
    delete body._id;
    return httpService.put(noteUrl(note._id), body);
  }

  return httpService.post(apiEnpoint + "notes", note);
}

export function updateNote(note) {
  if (note._id) {
    const body = { ...note };
    delete body._id;
    return httpService.put(noteUrl(note._id), body);
  }
}

export function deleteNote(id) {
  return httpService.delete(noteUrl(id));
}
