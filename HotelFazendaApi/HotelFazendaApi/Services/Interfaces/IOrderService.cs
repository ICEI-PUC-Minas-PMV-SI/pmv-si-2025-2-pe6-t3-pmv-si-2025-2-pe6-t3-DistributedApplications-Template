using HotelFazendaApi.DTOs;

namespace HotelFazendaApi.Services.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderReadDto>> GetAllAsync();
        Task<OrderReadDto?> GetByIdAsync(int id);
        Task<OrderReadDto?> CreateAsync(OrderCreateDto dto);
        Task<bool> UpdateAsync(int id, OrderUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
