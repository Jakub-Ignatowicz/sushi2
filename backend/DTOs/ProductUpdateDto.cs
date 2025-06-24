using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductUpdateDto(
    string? Name,
    string? ImagePath,
    string? AmountUnit,
    decimal? Price,
    double? Amount,
    bool? Available,
    bool? Visible,
    List<ProductItemPostDto> Items
)
{
    public Product ToProduct(Product src, IMapper mapper)
    {
        src.Name = Name ?? src.Name;
        src.ImagePath = ImagePath ?? src.ImagePath;
        src.AmountUnit = AmountUnit ?? src.AmountUnit;
        src.Price = Price ?? src.Price;
        src.Amount = Amount ?? src.Amount;
        src.IsAvailable = Available ?? src.IsAvailable;
        src.IsVisible = Visible ?? src.IsVisible;
        src.Items = mapper.Map<List<ProductItem>>(Items);

        return src;
    }
};