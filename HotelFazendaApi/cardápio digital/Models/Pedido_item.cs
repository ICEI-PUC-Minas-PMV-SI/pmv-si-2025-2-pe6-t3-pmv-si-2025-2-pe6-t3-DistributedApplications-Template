using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_HF_produtos.Models
{
    [Table("Pedido_itens")]
    public class Pedido_item
    {
        [Key]
        public int Id_pedido_item { get; set; }
        [Required]
        public int quantidade_item { get; set; }
        [Required]
        [Column(TypeName = "Decimal(18,2)")]
        public decimal Preço { get; set; }

        // Chave estrangeira     
        public int Id_pedido { get; set; }
        public int Id_produto { get; set; }

        // Navegação
        public Pedido Pedido { get; set; }
        public Produto Produto { get; set; }
    }
}
