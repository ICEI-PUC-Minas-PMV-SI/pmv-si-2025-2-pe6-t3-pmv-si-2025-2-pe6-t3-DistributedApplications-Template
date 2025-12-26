using HotelFazendaApi.Entities.Enums;

namespace HotelFazendaApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public required string Email { get; set; }
        public string? PasswordHash { get; set; }
        public Role Role { get; set; }
    }
}
