using Microsoft.EntityFrameworkCore;
using NotesAPI.Data;
using NotesAPI.Models;
using NotesAPI.Repositories.Interfaces;

namespace NotesAPI.Repositories
{
    public class NoteRepository : INote
    {
        private readonly AppDbContext _context;

        public NoteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddNote(Note note)
        {
            try
            {
                await _context.Notes.AddAsync(note);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }   
        }

        public async Task<bool> DeleteNote(int id)
        {
            try
            {
                var note = await GetNoteById(id);

                if (note == null) { return false; }

                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }

        public async Task<List<Note>> GetAllNotes()
        {
            return await _context.Notes.ToListAsync();
        }

        public Task<Note> GetNoteById(int id)
        {
            var note = _context.Notes.FirstOrDefaultAsync(x => x.Id == id);

            if(note == null) { throw new NullReferenceException(); }

            return note;
        }

        public async void Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateNote(Note note)
        {
            try
            {
                var oldNote = await GetNoteById(note.Id);

                if (oldNote == null) { return false; }

                oldNote.Title = note.Title;
                oldNote.Description = note.Description;
                oldNote.NoteDate = note.NoteDate;
                oldNote.ImageFileName = note.ImageFileName;

                await _context.SaveChangesAsync();

                return true;
            }
            catch(Exception ex) 
            { 
                Console.WriteLine(ex.ToString());
                return false;
            }
        }
    }
}
