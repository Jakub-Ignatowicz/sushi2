using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SushiZume.Migrations
{
    /// <inheritdoc />
    public partial class Required22 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "numberPostfix",
                table: "ProductItem",
                newName: "numberSuffix");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "numberSuffix",
                table: "ProductItem",
                newName: "numberPostfix");
        }
    }
}
