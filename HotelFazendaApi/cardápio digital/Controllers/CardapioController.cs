using api_HF_produtos.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api_HF_produtos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardapioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CardapioController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.Produtos.ToListAsync();

            return Ok(model);
        }
        [HttpPost]
        public async Task<ActionResult> Create(Produto model)
        {
            _context.Produtos.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetById", new {id = model.Id_produto, model});
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Produtos
                .FirstOrDefaultAsync(c=> c.Id_produto == id);

            if (model == null) return NotFound();
            return Ok(model);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Produto model)
        {
            if (id!= model.Id_produto) return BadRequest();
            var modelDb = await _context.Produtos.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id_produto == id);
            if (modelDb == null) return NotFound();   
            
            _context.Produtos.Update(model);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
           var model = await _context.Produtos.FindAsync(id);
            if (model == null) return NotFound();

            _context.Produtos.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
