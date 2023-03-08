using NotesAPI.Models;

namespace NotesAPI.Repositories.Interfaces
{
    public interface INote
    {
        public Task<List<Note>> GetAllNotes();
        public Task<Note> GetNoteById(int id);
        public Task<bool> UpdateNote(Note note);
        public Task<bool> DeleteNote(int id);
        public Task<bool> AddNote(Note note);
        public void Save();
    }
}
