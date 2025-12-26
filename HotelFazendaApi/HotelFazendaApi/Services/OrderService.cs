using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using HotelFazendaApi.DTOs;
using HotelFazendaApi.Entities;
using HotelFazendaApi.Services.Interfaces;
using HotelFazendaApi.Data;
using Microsoft.EntityFrameworkCore;

namespace HotelFazendaApi.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _db;

        public OrderService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<OrderReadDto>> GetAllAsync()
        {
            var list = await _db.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Produto)
                .ToListAsync();
            return list.Select(MapToRead);
        }

        public async Task<OrderReadDto?> GetByIdAsync(int id)
        {
            var o = await _db.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Produto)
                .FirstOrDefaultAsync(o => o.Id == id);

            return o is null ? null : MapToRead(o);
        }

        public async Task<OrderReadDto?> CreateAsync(OrderCreateDto dto)
        {
            var orderItems = new List<OrderItem>();
            decimal totalOrder = 0M;

            foreach (var itemDto in dto.Items)
            {
                var produto = await _db.Produtos.FindAsync(itemDto.ProdutoId);

                if (produto == null)
                {
                    return null;
                }

                decimal precoAtual = produto.Preco;
                decimal subtotal = precoAtual * itemDto.Quantidade;
                totalOrder += subtotal;

                orderItems.Add(new OrderItem
                {
                    ProdutoId = itemDto.ProdutoId,
                    Quantidade = itemDto.Quantidade,
                    PrecoUnitario = precoAtual
                });
            }

            if (!orderItems.Any()) return null;

            var entity = new Order
            {
                ReservationId = dto.ReservationId,
                CustomerName = dto.CustomerName ?? $"Reserva {dto.ReservationId}",
                Total = totalOrder,
                Status = OrderStatus.Pending,
                OrderItems = orderItems
            };

            _db.Orders.Add(entity);
            await _db.SaveChangesAsync();

            var createdDto = MapToRead(entity);
            return createdDto;
        }

        public async Task<bool> UpdateAsync(int id, OrderUpdateDto dto)
        {
            var current = await _db.Orders.FindAsync(id);
            if (current is null) return false;

            current.ReservationId = dto.ReservationId;
            current.CustomerName = dto.CustomerName ?? current.CustomerName;
            current.Status = dto.Status;

            _db.Orders.Update(current);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var current = await _db.Orders.FindAsync(id);
            if (current is null) return false;

            _db.Orders.Remove(current);
            await _db.SaveChangesAsync();
            return true;
        }

        private static OrderReadDto MapToRead(Order o) => new()
        {
            Id = o.Id,
            CustomerName = o.CustomerName,
            ReservationId = o.ReservationId,
            Status = o.Status.ToString(),
            Total = o.Total,
            Items = o.OrderItems.Select(oi => new OrderItemReadDto
            {
                ProdutoId = oi.ProdutoId,
                NomeProduto = oi.Produto?.Nome ?? "Produto Não Encontrado",
                Quantidade = oi.Quantidade,
                PrecoUnitario = oi.PrecoUnitario,
                Subtotal = oi.PrecoUnitario * oi.Quantidade
            }).ToList()
        };
    }
}