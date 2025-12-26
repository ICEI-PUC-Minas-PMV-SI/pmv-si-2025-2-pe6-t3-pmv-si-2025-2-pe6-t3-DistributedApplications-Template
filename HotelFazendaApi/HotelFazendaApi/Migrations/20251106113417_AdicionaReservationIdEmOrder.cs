using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelFazendaApi.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaReservationIdEmOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheckInDate",
                schema: "public",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CheckOutDate",
                schema: "public",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "RoomId",
                schema: "public",
                table: "Orders",
                newName: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ReservationId",
                schema: "public",
                table: "Orders",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Reservations_ReservationId",
                schema: "public",
                table: "Orders",
                column: "ReservationId",
                principalSchema: "public",
                principalTable: "Reservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Reservations_ReservationId",
                schema: "public",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ReservationId",
                schema: "public",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "ReservationId",
                schema: "public",
                table: "Orders",
                newName: "RoomId");

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckInDate",
                schema: "public",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckOutDate",
                schema: "public",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
