using HotelFazendaApi.Entities.Enums;

namespace HotelFazendaApi.DTOs
{
    public class CreateUserDto
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public string? Password { get; set; }
        public Role Role { get; set; }
    }
}
