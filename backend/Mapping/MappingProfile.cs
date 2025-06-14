using AutoMapper;
using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDto>().ReverseMap();
        CreateMap<Product, ProductPostDto>().ReverseMap();
        CreateMap<ProductItem, ProductItemDto>().ReverseMap();
    }
}