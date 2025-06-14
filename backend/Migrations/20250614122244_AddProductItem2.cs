using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SushiZume.Migrations
{
    /// <inheritdoc />
    public partial class AddProductItem2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "Product");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Product",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
