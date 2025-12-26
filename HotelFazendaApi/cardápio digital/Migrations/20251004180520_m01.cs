using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api_HF_produtos.Migrations
{
    /// <inheritdoc />
    public partial class m01 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Clientes_ClienteId_cliente",
                table: "Pedidos");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Produtos_ProdutoId_produto",
                table: "Pedidos");

            migrationBuilder.DropIndex(
                name: "IX_Pedidos_ProdutoId_produto",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Preço",
                table: "Quartos");

            migrationBuilder.DropColumn(
                name: "ProdutoId_produto",
                table: "Pedidos");

            migrationBuilder.RenameColumn(
                name: "Quantidade",
                table: "Pedidos",
                newName: "HospedagemId_hospedagem");

            migrationBuilder.RenameColumn(
                name: "Data_pedido",
                table: "Pedidos",
                newName: "Data");

            migrationBuilder.AddColumn<int>(
                name: "quantidade",
                table: "Produtos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ClienteId_cliente",
                table: "Pedidos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "PedidoId_pedido",
                table: "Pedidos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Pedido_itens",
                columns: table => new
                {
                    Id_pedido_item = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    quantidade_item = table.Column<int>(type: "int", nullable: false),
                    Preço = table.Column<decimal>(type: "Decimal(18,2)", nullable: false),
                    Id_pedido = table.Column<int>(type: "int", nullable: false),
                    Id_produto = table.Column<int>(type: "int", nullable: false),
                    PedidoId_pedido = table.Column<int>(type: "int", nullable: true),
                    ProdutoId_produto = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedido_itens", x => x.Id_pedido_item);
                    table.ForeignKey(
                        name: "FK_Pedido_itens_Pedidos_PedidoId_pedido",
                        column: x => x.PedidoId_pedido,
                        principalTable: "Pedidos",
                        principalColumn: "Id_pedido");
                    table.ForeignKey(
                        name: "FK_Pedido_itens_Produtos_ProdutoId_produto",
                        column: x => x.ProdutoId_produto,
                        principalTable: "Produtos",
                        principalColumn: "Id_produto");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_HospedagemId_hospedagem",
                table: "Pedidos",
                column: "HospedagemId_hospedagem");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_PedidoId_pedido",
                table: "Pedidos",
                column: "PedidoId_pedido");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_itens_PedidoId_pedido",
                table: "Pedido_itens",
                column: "PedidoId_pedido");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_itens_ProdutoId_produto",
                table: "Pedido_itens",
                column: "ProdutoId_produto");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Clientes_ClienteId_cliente",
                table: "Pedidos",
                column: "ClienteId_cliente",
                principalTable: "Clientes",
                principalColumn: "Id_cliente");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Hospedagens_HospedagemId_hospedagem",
                table: "Pedidos",
                column: "HospedagemId_hospedagem",
                principalTable: "Hospedagens",
                principalColumn: "Id_hospedagem",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Pedidos_PedidoId_pedido",
                table: "Pedidos",
                column: "PedidoId_pedido",
                principalTable: "Pedidos",
                principalColumn: "Id_pedido");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Clientes_ClienteId_cliente",
                table: "Pedidos");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Hospedagens_HospedagemId_hospedagem",
                table: "Pedidos");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Pedidos_PedidoId_pedido",
                table: "Pedidos");

            migrationBuilder.DropTable(
                name: "Pedido_itens");

            migrationBuilder.DropIndex(
                name: "IX_Pedidos_HospedagemId_hospedagem",
                table: "Pedidos");

            migrationBuilder.DropIndex(
                name: "IX_Pedidos_PedidoId_pedido",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "quantidade",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "PedidoId_pedido",
                table: "Pedidos");

            migrationBuilder.RenameColumn(
                name: "HospedagemId_hospedagem",
                table: "Pedidos",
                newName: "Quantidade");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Pedidos",
                newName: "Data_pedido");

            migrationBuilder.AddColumn<decimal>(
                name: "Preço",
                table: "Quartos",
                type: "Decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<int>(
                name: "ClienteId_cliente",
                table: "Pedidos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProdutoId_produto",
                table: "Pedidos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_ProdutoId_produto",
                table: "Pedidos",
                column: "ProdutoId_produto",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Clientes_ClienteId_cliente",
                table: "Pedidos",
                column: "ClienteId_cliente",
                principalTable: "Clientes",
                principalColumn: "Id_cliente",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Produtos_ProdutoId_produto",
                table: "Pedidos",
                column: "ProdutoId_produto",
                principalTable: "Produtos",
                principalColumn: "Id_produto",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
