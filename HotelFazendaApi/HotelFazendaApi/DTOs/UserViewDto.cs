using HotelFazendaApi.Entities.Enums;

namespace HotelFazendaApi.DTOs
{
    public class UserViewDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public Role Role { get; set; }
    }
}
