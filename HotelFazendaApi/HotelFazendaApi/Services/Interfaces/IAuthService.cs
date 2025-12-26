using HotelFazendaApi.DTOs;

namespace HotelFazendaApi.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string?> LoginAsync(LoginDto loginDto);
    }
}
