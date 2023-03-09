using System.ComponentModel.DataAnnotations;

namespace NotesAPI.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string NoteDate { get; set; } = null!;
        public string ImageFileName { get; set; } = null!;
    }
}
