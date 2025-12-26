using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_HF_produtos.Models
{
    [Table("Hospedagens")]
    public class Hospedagem
    {
        [Key]
        public int Id_hospedagem { get; set; }
        [Required]
        public DateTime Data_in{ get; set; }
        [Required]
        public DateTime Data_out { get; set; }
        [Required]
        [Column(TypeName ="Decimal(18,2)")]
        public decimal Valor_hospedagem { get; set; }

        // Chave estrangeira para cliente (1:N)
        public int ClienteId_cliente { get; set; }
        public Cliente Cliente { get; set; }

        // Chave estrangeira para quarto 
        public int QuartoId_quarto { get; set; }
        public Quarto Quarto { get; set; }

        public ICollection<Pedido> Pedidos { get; set; }


    }
}
