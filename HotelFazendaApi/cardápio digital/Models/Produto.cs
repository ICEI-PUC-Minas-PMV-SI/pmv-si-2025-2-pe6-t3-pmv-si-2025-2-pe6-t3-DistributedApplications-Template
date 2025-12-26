using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_HF_produtos.Models
{
    [Table("Produtos")]
    public class Produto
    {
        [Key]
        public int Id_produto { get; set; }
        [Required]
        public string Nome_produto { get; set; }
        [Required]
        public string Tipo_produto  { get; set; }
        [Required]
        [Column(TypeName = "Decimal(18,2)")]
        public decimal Preço { get; set; }
        [Required]
        public int quantidade { get; set; }

        // Relacionamento 1:N com Pedido_item

        public ICollection<Pedido_item> Pedidos_item { get; set; }

        

    }
}
