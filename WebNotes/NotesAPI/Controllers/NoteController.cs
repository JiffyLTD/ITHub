using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesAPI.Models;
using NotesAPI.Repositories.Interfaces;

namespace NotesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INote _note;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public NoteController(INote note, IWebHostEnvironment webHostEnvironment)
        {
            _note = note;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost]
        [Route("saveImage")]
        public async Task<IResult> SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var phisicalPath = _webHostEnvironment.ContentRootPath + "/Images/" + fileName;

                using(var stream = new FileStream(phisicalPath, FileMode.Create))
                {
                    await postedFile.CopyToAsync(stream);
                }

                return Results.Ok("Изображение успешно загружено");
            }
            catch (Exception)
            {
                return Results.BadRequest("Не удалось загрузить изображение.");
            }
        }

        [HttpGet]
        [Route("getNotes")]
        public async Task<IResult> Get()
        {
            var allNotes = await _note.GetAllNotes();

            return Results.Ok(allNotes);
        }

        [HttpGet]
        [Route("getNote")]
        public async Task<IResult> Get(int id)
        {
            var note = await _note.GetNoteById(id);

            if (note == null) { return Results.NotFound("Не удалось найти заметку"); }

            return Results.Ok(note);
        }

        [HttpPost]
        [Route("addNote")]
        public async Task<IResult> Post(Note note)
        {
            var result = await _note.AddNote(note);

            return result ? Results.Ok("Заметка успешно добавлена") : Results.BadRequest("Не удалось добавить заметку");
        }

        [HttpPut]
        [Route("updateNote")]
        public async Task<IResult> Put(Note note)
        {
            var result = await _note.UpdateNote(note);

            return result ? Results.Ok("Заметка успешно обновлена") : Results.BadRequest("Не удалось обновить данные заметки");
        }

        [HttpDelete]
        [Route("deleteNote")]
        public async Task<IResult> Delete(int id)
        {
            var result = await _note.DeleteNote(id);

            return result ? Results.Ok("Заметка успешно удалена") : Results.BadRequest("Не удалось удалить заметку");
        }
    }
}
