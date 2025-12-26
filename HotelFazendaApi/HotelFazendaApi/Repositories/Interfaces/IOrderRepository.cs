using System.Collections.Generic;
using System.Threading.Tasks;
using HotelFazendaApi.Entities;

namespace HotelFazendaApi.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllAsync();
        Task<Order?> GetByIdAsync(int id);
        Task<Order> AddAsync(Order order);
        Task UpdateAsync(Order order);
        Task DeleteAsync(Order order);
        Task<bool> ExistsAsync(int id);
        Task<bool> SaveChangesAsync();
    }
}
