using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_HF_produtos.Models
{
    [Table("Quartos")]
    public class Quarto
    {
        [Key]
        public int Id_quarto { get; set; }
        [Required]
        public Tipoquarto Tipo_quarto { get; set; }
        [Required]
        public int Numero { get; set; }
        
        // Relacionamento 1 para N com Hospedagem

        public ICollection <Hospedagem> hospedagems{ get; set; }
    }

    public enum Tipoquarto
    {
        Standart,
        Luxo,
        Super
    }
    }
