using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using NuGet.Packaging;
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
    List<ProductItemPostDto>? Items
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

        if (Items != null)
        {
            src.Items.Clear();

            var newItems = mapper.Map<List<ProductItem>>(Items);

            foreach (var item in newItems)
                item.ProductId = src.Id;
            foreach (var item in newItems)
            {
                Console.WriteLine(item.Id);
                Console.WriteLine(item.ProductId);
                Console.WriteLine(item.Description);
                Console.WriteLine(item.Number);
                Console.WriteLine(item.NumberSuffix);
                Console.WriteLine("-----");
            }

            src.Items.AddRange(newItems);
        }

        return src;
    }
};