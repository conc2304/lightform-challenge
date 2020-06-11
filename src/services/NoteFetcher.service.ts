import axios, { AxiosResponse } from "axios";
import { NoteObject } from "@/types";

class DataFetcher {
  /** PUBLIC PROPERTIES------------------- */

  /** PUBLIC METHODS --------------------- */
  public async getListNotes(page: number, limit: number): Promise<AxiosResponse> {
    const path = `${this.LF_API_URL}/notes`;
    const config = {
      params: {
        page: page,
        limit: limit,
      }
    };

    return axios
      .get(path, config)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }

  public async deleteListNote(noteId: number): Promise<AxiosResponse> {
    const path = `${this.LF_API_URL}/notes/${noteId}`;

    return axios
      .delete(path)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }

  public async updateNote(note: NoteObject): Promise<AxiosResponse> {
    const path = `${this.LF_API_URL}/notes`;
    const data = {
      title: note.title,
      body: note.body,
    };
    return axios
      .patch(path, data)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }

  public async saveNote(note: NoteObject): Promise<AxiosResponse> {
    const path = `${this.LF_API_URL}/notes`;
    const data = {
      title: note.title,
      body: note.body,
    };
    return axios
      .put(path, data)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }

  /** PRIVATE PROPERTIES ----------------- */
  protected LF_API_URL = "http://note.dev.cloud.lightform.com";

  /** PRIVATE METHODS -------------------- */
}

export default new DataFetcher();
