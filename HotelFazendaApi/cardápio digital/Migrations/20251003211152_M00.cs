using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api_HF_produtos.Migrations
{
    /// <inheritdoc />
    public partial class M00 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Id_cliente = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CPF = table.Column<int>(type: "int", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Id_cliente);
                });

            migrationBuilder.CreateTable(
                name: "Produtos",
                columns: table => new
                {
                    Id_produto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome_produto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tipo_produto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Preço = table.Column<decimal>(type: "Decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produtos", x => x.Id_produto);
                });

            migrationBuilder.CreateTable(
                name: "Quartos",
                columns: table => new
                {
                    Id_quarto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tipo_quarto = table.Column<int>(type: "int", nullable: false),
                    Numero = table.Column<int>(type: "int", nullable: false),
                    Preço = table.Column<decimal>(type: "Decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quartos", x => x.Id_quarto);
                });

            migrationBuilder.CreateTable(
                name: "Pedidos",
                columns: table => new
                {
                    Id_pedido = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantidade = table.Column<int>(type: "int", nullable: false),
                    Data_pedido = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClienteId_cliente = table.Column<int>(type: "int", nullable: false),
                    ProdutoId_produto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedidos", x => x.Id_pedido);
                    table.ForeignKey(
                        name: "FK_Pedidos_Clientes_ClienteId_cliente",
                        column: x => x.ClienteId_cliente,
                        principalTable: "Clientes",
                        principalColumn: "Id_cliente",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pedidos_Produtos_ProdutoId_produto",
                        column: x => x.ProdutoId_produto,
                        principalTable: "Produtos",
                        principalColumn: "Id_produto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Hospedagens",
                columns: table => new
                {
                    Id_hospedagem = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data_in = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Data_out = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Valor_hospedagem = table.Column<decimal>(type: "Decimal(18,2)", nullable: false),
                    ClienteId_cliente = table.Column<int>(type: "int", nullable: false),
                    QuartoId_quarto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hospedagens", x => x.Id_hospedagem);
                    table.ForeignKey(
                        name: "FK_Hospedagens_Clientes_ClienteId_cliente",
                        column: x => x.ClienteId_cliente,
                        principalTable: "Clientes",
                        principalColumn: "Id_cliente",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Hospedagens_Quartos_QuartoId_quarto",
                        column: x => x.QuartoId_quarto,
                        principalTable: "Quartos",
                        principalColumn: "Id_quarto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hospedagens_ClienteId_cliente",
                table: "Hospedagens",
                column: "ClienteId_cliente");

            migrationBuilder.CreateIndex(
                name: "IX_Hospedagens_QuartoId_quarto",
                table: "Hospedagens",
                column: "QuartoId_quarto");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_ClienteId_cliente",
                table: "Pedidos",
                column: "ClienteId_cliente");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_ProdutoId_produto",
                table: "Pedidos",
                column: "ProdutoId_produto",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hospedagens");

            migrationBuilder.DropTable(
                name: "Pedidos");

            migrationBuilder.DropTable(
                name: "Quartos");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Produtos");
        }
    }
}
