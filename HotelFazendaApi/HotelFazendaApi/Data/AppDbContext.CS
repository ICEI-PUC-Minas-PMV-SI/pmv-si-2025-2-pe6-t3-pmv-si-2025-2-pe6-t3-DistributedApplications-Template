using HotelFazendaApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace HotelFazendaApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSets
        public DbSet<User> Users => Set<User>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<Produto> Produtos => Set<Produto>();
        public DbSet<Room> Rooms => Set<Room>();
        public DbSet<Reservation> Reservations => Set<Reservation>();
        public DbSet<OrderItem> OrderItems { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasDefaultSchema("public");

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            modelBuilder.Entity<Room>(e =>
            {
                e.Property(p => p.Numero)
                    .HasMaxLength(10)
                    .IsRequired();

                e.Property(p => p.Capacidade)
                    .HasDefaultValue(2);

                e.Property(p => p.Status)
                    .HasMaxLength(20)
                    .HasDefaultValue("Livre");

                e.HasIndex(p => p.Numero).IsUnique();
            });

            modelBuilder.Entity<Reservation>(e =>
            {
                e.Property(p => p.HospedeNome)
                    .HasMaxLength(120)
                    .IsRequired();

                e.Property(p => p.HospedeDocumento).HasMaxLength(40);
                e.Property(p => p.Telefone).HasMaxLength(40);

                e.Property(p => p.Status)
                    .HasMaxLength(20)
                    .HasDefaultValue("Aberta");

                e.HasOne(p => p.Quarto)
                    .WithMany()
                    .HasForeignKey(p => p.QuartoId)
                    .OnDelete(DeleteBehavior.Restrict);

                e.HasIndex(p => new { p.DataEntrada, p.DataSaida });
            });

            modelBuilder.Entity<OrderItem>()
                .HasKey(oi => new { oi.PedidoId, oi.ProdutoId });

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Pedido)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.PedidoId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Produto)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(oi => oi.ProdutoId);
        }
    }
}
