using System.Collections.Generic;
using System.Threading.Tasks;
using HotelFazendaApi.Data;
using HotelFazendaApi.Entities;
using HotelFazendaApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HotelFazendaApi.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _ctx;
        public OrderRepository(AppDbContext ctx) => _ctx = ctx;

        public async Task<IEnumerable<Order>> GetAllAsync() =>
            await _ctx.Orders.AsNoTracking().ToListAsync();

        public async Task<Order?> GetByIdAsync(int id) =>
            await _ctx.Orders.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id);

        public async Task<Order> AddAsync(Order order)
        {
            _ctx.Orders.Add(order);
            await _ctx.SaveChangesAsync();
            return order;
        }

        public async Task UpdateAsync(Order order)
        {
            _ctx.Orders.Update(order);
            await _ctx.SaveChangesAsync();
        }

        public async Task DeleteAsync(Order order)
        {
            _ctx.Orders.Remove(order);
            await _ctx.SaveChangesAsync();
        }

        public Task<bool> ExistsAsync(int id) =>
            _ctx.Orders.AnyAsync(o => o.Id == id);

        public async Task<bool> SaveChangesAsync() =>
            (await _ctx.SaveChangesAsync()) > 0;
    }
}
