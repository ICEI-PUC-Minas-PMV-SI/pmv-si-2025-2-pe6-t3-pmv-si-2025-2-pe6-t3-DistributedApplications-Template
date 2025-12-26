using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelFazendaApi.Migrations
{
    /// <inheritdoc />
    public partial class InitPg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "Users",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "Rooms",
                newName: "Rooms",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "Reservations",
                newName: "Reservations",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "Produtos",
                newName: "Produtos",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "Orders",
                newSchema: "public");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Users",
                schema: "public",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Rooms",
                schema: "public",
                newName: "Rooms");

            migrationBuilder.RenameTable(
                name: "Reservations",
                schema: "public",
                newName: "Reservations");

            migrationBuilder.RenameTable(
                name: "Produtos",
                schema: "public",
                newName: "Produtos");

            migrationBuilder.RenameTable(
                name: "Orders",
                schema: "public",
                newName: "Orders");
        }
    }
}
