using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelFazendaApi.Entities
{
    public enum OrderStatus { Pending = 0, Preparing = 1, Ready = 2, Delivered = 3, Billed = 4 }

    public class Order
    {
        [Key] public int Id { get; set; }
        [Required, MaxLength(120)] public string CustomerName { get; set; } = string.Empty;

        [Required] public int ReservationId { get; set; }
        public virtual Reservation Reservation { get; set; } = default!;

        [Required] public OrderStatus Status { get; set; } = OrderStatus.Pending;
        [Column(TypeName = "decimal(10,2)")] public decimal Total { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}