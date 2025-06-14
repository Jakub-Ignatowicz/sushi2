using AutoMapper;
using SushiZume.DTOs;
using SushiZume.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDto>().ReverseMap();
        // add other mappings here
    }
}