namespace HotelFazendaApi.Entities
{
    public class OrderItem
    {
        public int PedidoId { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
        public virtual Order Pedido { get; set; } = default!;
        public virtual Produto Produto { get; set; } = default!;
    }
}