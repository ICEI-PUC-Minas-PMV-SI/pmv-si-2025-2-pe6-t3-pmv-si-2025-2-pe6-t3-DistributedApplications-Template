using Microsoft.EntityFrameworkCore;

namespace api_HF_produtos.Models
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) 
        {
            
        }
        public DbSet <Produto> Produtos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Hospedagem> Hospedagens { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Quarto> Quartos { get; set; }
        public DbSet<Pedido_item> Pedido_itens { get; set; }


    }
}
