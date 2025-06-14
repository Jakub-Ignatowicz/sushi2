using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SushiZume.Models;

[Table("Category")]
public class Category
{
    [Column("id")] public Guid Id { get; init; } = Guid.NewGuid();

    [Column("name")]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Nazwa kategorii jest wymagana.")]
    public string Name { get; set; } = string.Empty;

    public List<ProductCategory> Products { get; set; } = [];
}

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(c => c.Id);

        builder.HasMany(c => c.Products)
            .WithOne(pc => pc.Category)
            .HasForeignKey(pc => pc.CategoryId);
    }
}