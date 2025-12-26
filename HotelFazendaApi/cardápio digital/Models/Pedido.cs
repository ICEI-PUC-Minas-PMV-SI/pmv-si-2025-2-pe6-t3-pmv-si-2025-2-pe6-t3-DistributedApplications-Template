using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_HF_produtos.Models
{
    [Table ("Pedidos")]
    public class Pedido
    {
        [Key]
        public int Id_pedido { get; set; }
        
        [Required]
        public DateTime Data { get; set; }
        [Required]
        public string Status { get; set; }

        public ICollection<Pedido> Pedidos_item { get; set; }


        // Chave estrangeira para cliente (1:N)
        public int HospedagemId_hospedagem { get; set; }

        // Navegação
        public Hospedagem Hospedagem { get; set; }

        

       
    }
}
