using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using NuGet.Packaging;
using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductUpdateDto(
    string? Name,
    string? ImageUrl,
    string? AmountUnit,
    decimal? Price,
    string? Description,
    double? Amount,
    bool? Available,
    bool? Visible,
    List<ProductItemPostDto>? Items
);