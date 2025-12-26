using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelFazendaApi.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaValorTotalEmReservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ValorTotal",
                schema: "public",
                table: "Reservations",
                type: "numeric(10,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValorTotal",
                schema: "public",
                table: "Reservations");
        }
    }
}
