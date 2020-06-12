import axios, { AxiosResponse } from "axios";
import { NoteObject } from "@/types";

class DataFetcher {
  /** PUBLIC PROPERTIES------------------- */

  /** PUBLIC METHODS --------------------- */
  public async getListNotes(page: number, limit: number): Promise<AxiosResponse> {
    const path = `${this.LF_API_URL}/notes`;
    const params = {
      params: {
        page: page,
        limit: limit,
      }
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
    const path = `${this.LF_API_URL}/notes`;
    const data = {
      "title": note.title,
      "body": note.body
    };

    const jsonData = JSON.stringify(data);

    // http://note.dev.cloud.lightform.com/notes
    console.log(data);
    return axios({
      method: 'patch',
      url: "http://note.dev.cloud.lightform.com/notes",
      data: data,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(function (response) {
      return response
    }).catch(function (error) {
      throw error;
    });

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
      "title": note.title,
      "body": note.body
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
    }
    const jsonData = JSON.stringify(data);

    return axios
      .put(path, {}, axiosConfig)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }

  public async retreiveNote(noteId: string) {
    const path = `${this.LF_API_URL}/notes/${noteId}`;
    const params = {
      params: {
        id: noteId
      }
    };

    return axios
      .get(path, params)
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
