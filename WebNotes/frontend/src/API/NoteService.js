import axios from "axios";

export default class NoteService {
  static async getAll() {
      const response = await axios.get(
        "https://localhost:7190/api/Note/getNotes"
      );
      return response.data;
  }

  static async deleteNote(id) {
    const response = await axios.delete(
      `https://localhost:7190/api/Note/deleteNote?id=${id}`
    );
    return response;
  }

  static async addNote(note) {
    const response = await axios.post(
      "https://localhost:7190/api/Note/addNote",
      note
    );
    return response;
  }

  static async updateNote(note){
    const response = await axios.put("https://localhost:7190/api/Note/updateNote",note);

    return response;
  }

  static async saveFile(formData){
    const response = await axios.post("https://localhost:7190/api/Note/saveImage",formData);

    return response;
  }
}
