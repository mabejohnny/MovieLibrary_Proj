using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {
            var allMovies = _context.Movies.ToList();
            // Retrieve all movies from db logic
            return Ok(allMovies);
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var movieToGet = _context.Movies.Where(c => c.MovieId == id).FirstOrDefault();
            // Retrieve movie by id from db logic
            // return Ok(movie);
            return Ok(movieToGet);
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {
            _context.Movies.Add(value);
            _context.SaveChanges();

            // Create movie in db logic
            return Ok(value);
        }

        // PUT api/movie
        [HttpPut]
        public IActionResult Put([FromBody] Movie movie)
        {
            _context.Movies.Update(movie);
            _context.SaveChanges();
            // Update movie in db logic
            return Ok(movie);
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var movieToDelete = _context.Movies.Where(m => m.MovieId == id).FirstOrDefault();
            _context.Movies.Remove(movieToDelete);
            _context.SaveChanges();
            // Delete movie from db logic
            return Ok(movieToDelete);
        }
    }
}