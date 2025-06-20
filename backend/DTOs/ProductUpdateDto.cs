using System.Diagnostics.CodeAnalysis;
using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductUpdateDto(
    string? Name,
    string? ImagePath,
    string? AmountUnit,
    decimal? Price,
    double? Amount
)
{
    public Product ToProduct(Product src)
    {
        src.Name = Name ?? src.Name;
        src.ImagePath = ImagePath ?? src.ImagePath;
        src.AmountUnit = AmountUnit ?? src.AmountUnit;
        src.Price = Price ?? src.Price;
        src.Amount = Amount ?? src.Amount;

        return src;
    }
};