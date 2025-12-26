
namespace HotelFazendaApi.DTOs
{
    public class CheckoutDto
    {
        public int ReservationId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public decimal TotalHospedagem { get; set; }
        public decimal TotalConsumoRestaurante { get; set; }
        public decimal ValorFinalDaConta { get; set; }
        public List<OrderReadDto> DetalhesDosPedidos { get; set; } = new List<OrderReadDto>();
    }
}