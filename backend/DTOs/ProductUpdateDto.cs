using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using NuGet.Packaging;
using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductUpdateDto(
    string? Name,
    string? ImageName,
    string? AmountUnit,
    decimal? Price,
    double? Amount,
    bool? Available,
    bool? Visible,
    List<ProductItemPostDto>? Items
);