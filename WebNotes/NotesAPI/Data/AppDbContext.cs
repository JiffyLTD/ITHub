using Microsoft.EntityFrameworkCore;
using NotesAPI.Models;

namespace NotesAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();

            // Default note if db is empty
            if (Notes.ToList().Count <= 0)
            {
                Note defaultNote = new() 
                {
                    Title = "НЕ ЗАБЫТЬ",
                    Description = "Сделать тестовое задание :)",
                    NoteDate = DateTime.Now.ToString(),
                    ImageFileName = "default.png"
                };
                Notes.Add(defaultNote);
                SaveChanges();
            }
        }

        public DbSet<Note> Notes { get; set; }
    }
}
