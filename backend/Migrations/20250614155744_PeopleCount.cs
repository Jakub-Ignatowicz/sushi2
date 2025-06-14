using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SushiZume.Migrations
{
    /// <inheritdoc />
    public partial class PeopleCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "peopleNumber",
                table: "Order",
                newName: "peopleCount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "peopleCount",
                table: "Order",
                newName: "peopleNumber");
        }
    }
}
