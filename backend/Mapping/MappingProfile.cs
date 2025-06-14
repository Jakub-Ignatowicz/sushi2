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
        CreateMap<ProductItem, ProductItemPostDto>().ReverseMap();

        CreateMap<Order, OrderPostDto>().ReverseMap();
        CreateMap<Order, OrderDto>().ReverseMap();

        CreateMap<OrderProduct, OrderProductPostDto>().ReverseMap();
        CreateMap<OrderProduct, OrderDtoOrderProductDto>().ReverseMap();

        CreateMap<Address, AddressPostDto>().ReverseMap();
        CreateMap<Address, AddressDto>().ReverseMap();
    }
}