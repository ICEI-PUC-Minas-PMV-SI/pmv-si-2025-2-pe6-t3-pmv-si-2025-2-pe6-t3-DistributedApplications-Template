using HotelFazendaApi.Entities.Enums;

namespace HotelFazendaApi.DTOs
{
    public class UpdateUserDto
    {
        public string? Name { get; set; }
        public Role Role { get; set; }
    }
}
