using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using NuGet.Packaging;
using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductUpdateDto(
    string Name,
    decimal Price,
    string? ImageName,
    double? Amount,
    string? AmountUnit,
    string? Description,
    List<ProductItemPostDto>? Items
);