using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using NotesAPI.Data;
using NotesAPI.Repositories;
using NotesAPI.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add database postgreSql
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services
builder.Services.AddScoped<INote, NoteRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Add CORS
app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

// use static files for images
app.UseStaticFiles(new StaticFileOptions
{ FileProvider = new PhysicalFileProvider(
    Path.Combine(Directory.GetCurrentDirectory(), "Images")),
  RequestPath =  "/Images"  
});

app.Run();
