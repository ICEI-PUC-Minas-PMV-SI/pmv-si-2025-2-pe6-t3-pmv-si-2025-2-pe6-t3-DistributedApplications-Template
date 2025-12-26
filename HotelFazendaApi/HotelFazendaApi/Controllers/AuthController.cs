using HotelFazendaApi.DTOs;
using HotelFazendaApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HotelFazendaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var token = await _authService.LoginAsync(loginDto);

            if (token == null)
            {
                return Unauthorized("Email ou senha inválidos.");
            }

            return Ok(new { token });
        }
    }
}