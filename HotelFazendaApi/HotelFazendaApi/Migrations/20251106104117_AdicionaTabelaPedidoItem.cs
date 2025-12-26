using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelFazendaApi.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaTabelaPedidoItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderItems",
                schema: "public",
                columns: table => new
                {
                    PedidoId = table.Column<int>(type: "integer", nullable: false),
                    ProdutoId = table.Column<int>(type: "integer", nullable: false),
                    Quantidade = table.Column<int>(type: "integer", nullable: false),
                    PrecoUnitario = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => new { x.PedidoId, x.ProdutoId });
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_PedidoId",
                        column: x => x.PedidoId,
                        principalSchema: "public",
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Produtos_ProdutoId",
                        column: x => x.ProdutoId,
                        principalSchema: "public",
                        principalTable: "Produtos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProdutoId",
                schema: "public",
                table: "OrderItems",
                column: "ProdutoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems",
                schema: "public");
        }
    }
}
