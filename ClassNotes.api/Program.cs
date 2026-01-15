using ClassNotes.Api.Data;
using ClassNotes.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// SQLite DB
builder.Services.AddDbContext<NotesDbContext>(options =>
    options.UseSqlite("Data Source=./Data/notes.db"));

// CORS konfigurieren
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173");
        policy.WithOrigins("https://JohannesEllmer.github.io")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Swagger / OpenAPI über Swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger nur in Development (empfohlen)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection();
}

// CORS aktivieren
app.UseCors("AllowReactApp");

// Alle Notizen
app.MapGet("/notes", async (NotesDbContext db) =>
{
    return await db.Notes.OrderBy(n => n.Id).ToListAsync();
});

app.MapGet("/notes1", GetAllNotes);

List<Note> GetAllNotes(NotesDbContext db)
{
    return db.Notes.ToList();
}

// Eine Notiz nach ID
app.MapGet("/notes/{id}", async (int id, NotesDbContext db) =>
{
    return await db.Notes.FindAsync(id) is Note note
        ? Results.Ok(note)
        : Results.NotFound();
});

// Neue Notiz
app.MapPost("/notes", async (Note note, NotesDbContext db) =>
{
    db.Notes.Add(note);
    await db.SaveChangesAsync();
    return Results.Created($"/notes/{note.Id}", note);
});

// Notiz löschen
app.MapDelete("/notes/{id}", async (int id, NotesDbContext db) =>
{
    var note = await db.Notes.FindAsync(id);
    if (note is null) return Results.NotFound();
    db.Notes.Remove(note);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
