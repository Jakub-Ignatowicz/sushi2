using AutoMapper;
using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ProductCategory, CategoryDto>()
            .ConstructUsing(pc => new CategoryDto(pc.Category.Id, pc.Category.Name));
        CreateMap<Product, ProductDto>().ReverseMap();

        CreateMap<ProductItem, ProductItemDto>().ReverseMap();

        CreateMap<Order, OrderDto>().ReverseMap();

        CreateMap<OrderProduct, OrderDto_OrderProductDto>().ReverseMap();

        CreateMap<Address, AddressDto>().ReverseMap();

        CreateMap<Category, CategoryDto>().ReverseMap();

        // Post
        CreateMap<AddressPostDto, Address>();
        CreateMap<ProductPostDto, Product>();
        CreateMap<ProductItemPostDto, ProductItem>();
        CreateMap<OrderPostDto, Order>();
        CreateMap<OrderProductPostDto, OrderProduct>();
    }
}