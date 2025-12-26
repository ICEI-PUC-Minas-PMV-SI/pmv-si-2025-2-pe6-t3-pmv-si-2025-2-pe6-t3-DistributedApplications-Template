using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_HF_produtos.Models
{
    [Table("Clientes")]
    public class Cliente
    {
        [Key]
        public int Id_cliente { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public int CPF { get; set; }
        [Required]
        public string Password { get; set; }

        [Required]
        public ICollection <Pedido> Pedidos { get; set; }
        [Required]
        public ICollection <Hospedagem> Hospedagens { get; set; }
    }

}
