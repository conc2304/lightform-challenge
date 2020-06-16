import axios, { AxiosResponse } from "axios";
import { NoteObject } from "@/types";

class DataFetcher {
  /** PUBLIC PROPERTIES------------------- */

  /** PUBLIC METHODS --------------------- */
  public async getListNotes(
    page: number,
    limit: number,
  ): Promise<AxiosResponse> {
    const path = `${this.LF_API_URL}/notes`;
    const params = {
      params: {
        page: page,
        limit: limit,
      },
    };

    return axios
      .get(path, params)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }

  public async deleteListNote(noteId: string): Promise<AxiosResponse> {
    const path = `${this.LF_API_URL}/notes/${noteId}`;

    return axios
      .delete(path)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }

  public async updateNote(note: NoteObject): Promise<AxiosResponse> {
    const path = `${this.LF_API_URL}/notes/${note.id}`;
    const data = {
      titles: note.title.toString(),
      body: note.body.toString(),
    }

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
      title: note.title.toString(),
      body: note.body.toString(),
    };

    return axios
      .post(path, data)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }

  public async retreiveNote(noteId: string): Promise<AxiosResponse> {
    const path = `${this.LF_API_URL}/notes/${noteId}`;
    const params = {
      params: {
        id: noteId,
      },
    };

    return axios
      .get(path, params)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }

  /** PRIVATE PROPERTIES ----------------- */
  protected LF_API_URL = process.env.VUE_APP_LF_API_URL;

  /** PRIVATE METHODS -------------------- */
}

export default new DataFetcher();
