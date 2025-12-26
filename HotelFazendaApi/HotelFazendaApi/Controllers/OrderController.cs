using HotelFazendaApi.DTOs;
using HotelFazendaApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelFazendaApi.Controllers
{
    [ApiController]
    [Route("api/order")]
    [Produces("application/json")]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrderController(IOrderService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(IEnumerable<OrderReadDto>), 200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public async Task<ActionResult<IEnumerable<OrderReadDto>>> GetAll()
        {
            var autorizado =
                User.IsInRole("Admin") ||
                User.IsInRole("Gerente") ||
                User.IsInRole("Recepcao") ||
                User.IsInRole("Garcom");

            if (!autorizado)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new
                {
                    status = 403,
                    message = "Acesso negado. O seu perfil não possui permissão para listar pedidos."
                });
            }

            var orders = await _service.GetAllAsync();
            return Ok(orders);
        }

        [HttpGet("{id:int}", Name = "GetOrderById")]
        [ProducesResponseType(typeof(OrderReadDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<OrderReadDto>> GetById(int id)
        {
            var data = await _service.GetByIdAsync(id);
            return data is null ? NotFound() : Ok(data);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Gerente,Garcom")]
        [Consumes("application/json")]
        [ProducesResponseType(typeof(OrderReadDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<OrderReadDto>> Create([FromBody] OrderCreateDto dto)
        {
            var created = await _service.CreateAsync(dto);

            if (created is null)
                return BadRequest("Não foi possível criar o pedido. Verifique o ID da Reserva ou os IDs dos Produtos.");

            return CreatedAtRoute("GetOrderById", new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin,Gerente,Garcom")]
        [Consumes("application/json")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Update(int id, [FromBody] OrderUpdateDto dto)
        {
            var ok = await _service.UpdateAsync(id, dto);
            return ok ? NoContent() : NotFound();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            return ok ? NoContent() : NotFound();
        }
    }
}