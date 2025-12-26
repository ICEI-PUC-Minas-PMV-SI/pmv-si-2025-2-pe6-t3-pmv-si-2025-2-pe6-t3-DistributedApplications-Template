using HotelFazendaApi.DTOs;
using HotelFazendaApi.Entities;
using HotelFazendaApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelFazendaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Gerente")]
        public async Task<ActionResult<IEnumerable<UserViewDto>>> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            var usersDto = users.Select(u => new UserViewDto { Id = u.Id, Name = u.Name, Email = u.Email, Role = u.Role });
            return Ok(usersDto);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Gerente")]
        public async Task<ActionResult<UserViewDto>> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var userDto = new UserViewDto { Id = user.Id, Name = user.Name, Email = user.Email, Role = user.Role };
            return Ok(userDto);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<UserViewDto>> PostUser(CreateUserDto createUserDto)
        {
            var user = new User
            {
                Name = createUserDto.Name,
                Email = createUserDto.Email,
                PasswordHash = createUserDto.Password,
                Role = createUserDto.Role
            };

            var createdUser = await _userService.CreateUserAsync(user);

            var userDto = new UserViewDto { Id = createdUser.Id, Name = createdUser.Name, Email = createdUser.Email, Role = createdUser.Role };

            return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, userDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutUser(int id, UpdateUserDto updateUserDto)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Name = updateUserDto.Name;
            user.Role = updateUserDto.Role;

            await _userService.UpdateUserAsync(user);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var success = await _userService.DeleteUserAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}