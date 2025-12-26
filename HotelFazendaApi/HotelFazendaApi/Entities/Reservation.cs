using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelFazendaApi.Entities
{
    public class Reservation
    {
        public int Id { get; set; }

        [MaxLength(120)]
        public string HospedeNome { get; set; } = default!;

        [MaxLength(40)]
        public string? HospedeDocumento { get; set; }

        [MaxLength(40)]
        public string? Telefone { get; set; }

        public int QtdeHospedes { get; set; } = 1;

        public DateTime DataEntrada { get; set; }
        public DateTime DataSaida { get; set; }

        // Quarto pode ser escolhido na criação, ou só no check-in
        public int? QuartoId { get; set; }
        [ForeignKey(nameof(QuartoId))]
        public Room? Quarto { get; set; }

        // Aberta (pré-reserva), Confirmada, Cancelada
        [MaxLength(20)]
        public string Status { get; set; } = "Aberta";

        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;

        [Column(TypeName = "decimal(10,2)")]
        public decimal ValorTotal { get; set; } = 0M;
    }
}
