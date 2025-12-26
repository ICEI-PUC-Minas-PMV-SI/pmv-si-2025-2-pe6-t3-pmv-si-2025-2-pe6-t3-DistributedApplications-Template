using System.ComponentModel.DataAnnotations;
using HotelFazendaApi.Entities;

namespace HotelFazendaApi.DTOs
{
    public class OrderItemCreateDto
    {
        [Required]
        public int ProdutoId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantidade { get; set; }
    }

    public class OrderCreateDto
    {
        [Required]
        public int ReservationId { get; set; }

        [MaxLength(120)]
        public string? CustomerName { get; set; }

        [Required]
        public List<OrderItemCreateDto> Items { get; set; } = new List<OrderItemCreateDto>();

    }

    public class OrderUpdateDto
    {
        [Required]
        public int ReservationId { get; set; }

        [MaxLength(120)]
        public string? CustomerName { get; set; }

        [Required]
        public OrderStatus Status { get; set; }
    }

    public class OrderItemReadDto
    {
        public int ProdutoId { get; set; }
        public string NomeProduto { get; set; } = default!;
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
        public decimal Subtotal { get; set; }
    }

    public class OrderReadDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public int ReservationId { get; set; }
        public string Status { get; set; } = default!;
        public decimal Total { get; set; }
        public List<OrderItemReadDto> Items { get; set; } = new List<OrderItemReadDto>();
    }
}