using System.ComponentModel.DataAnnotations;

namespace HotelFazendaApi.DTOs
{
    public class ReservationCreateDto
    {
        public string HospedeNome { get; set; } = default!;
        public string? HospedeDocumento { get; set; }
        public string? Telefone { get; set; }
        public int QtdeHospedes { get; set; }
        public DateTime DataEntrada { get; set; }
        public DateTime DataSaida { get; set; }
        public int? QuartoId { get; set; }

        [Required]
        public decimal ValorTotal { get; set; }
    }

    public class ReservationDto
    {
        public int Id { get; set; }
        public string HospedeNome { get; set; } = default!;
        public string? Quarto { get; set; }   // label
        public string Status { get; set; } = default!;
        public DateTime DataEntrada { get; set; }
        public DateTime DataSaida { get; set; }
    }
}
