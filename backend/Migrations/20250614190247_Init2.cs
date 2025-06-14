using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SushiZume.Migrations
{
    /// <inheritdoc />
    public partial class Init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "categoryId",
                table: "ProductCategory");

            migrationBuilder.DropForeignKey(
                name: "productId",
                table: "ProductCategory");

            migrationBuilder.DropForeignKey(
                name: "productId",
                table: "ProductItem");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "ProductItem",
                newName: "productId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductItem_ProductId",
                table: "ProductItem",
                newName: "IX_ProductItem_productId");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "ProductCategory",
                newName: "categoryId");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "ProductCategory",
                newName: "productId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategory_CategoryId",
                table: "ProductCategory",
                newName: "IX_ProductCategory_categoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategory_Category_categoryId",
                table: "ProductCategory",
                column: "categoryId",
                principalTable: "Category",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategory_Product_productId",
                table: "ProductCategory",
                column: "productId",
                principalTable: "Product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductItem_Product_productId",
                table: "ProductItem",
                column: "productId",
                principalTable: "Product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategory_Category_categoryId",
                table: "ProductCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategory_Product_productId",
                table: "ProductCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductItem_Product_productId",
                table: "ProductItem");

            migrationBuilder.RenameColumn(
                name: "productId",
                table: "ProductItem",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductItem_productId",
                table: "ProductItem",
                newName: "IX_ProductItem_ProductId");

            migrationBuilder.RenameColumn(
                name: "categoryId",
                table: "ProductCategory",
                newName: "CategoryId");

            migrationBuilder.RenameColumn(
                name: "productId",
                table: "ProductCategory",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategory_categoryId",
                table: "ProductCategory",
                newName: "IX_ProductCategory_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "categoryId",
                table: "ProductCategory",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "productId",
                table: "ProductCategory",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "productId",
                table: "ProductItem",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
