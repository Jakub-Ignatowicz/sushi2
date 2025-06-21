using AutoMapper;
using SushiZume.DTOs;
using SushiZume.Enums;
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
        CreateMap<ProductPostDto, Product>()
            .ForMember(dest => dest.Categories, opt => opt.Ignore())
            .ForMember(dest => dest.Items, opt => opt.Ignore())
            .AfterMap((src, dest, context) =>
            {
                var categories = src.CategoryIds.Select(id => new ProductCategory
                {
                    CategoryId = id,
                    ProductId = dest.Id
                }).ToList();
                dest.Categories.AddRange(categories);

                var items = context.Mapper.Map<List<ProductItem>>(src.ProductItems);
                foreach (var item in items)
                    item.ProductId = dest.Id;

                dest.Items.AddRange(items);
            });
        CreateMap<ProductItemPostDto, ProductItem>();
        CreateMap<OrderPostDto, Order>();
        CreateMap<OrderProductPostDto, OrderProduct>();
        CreateMap<UserPostDto_Guest, User>();
        CreateMap<UserPostDto_Normal, User>();
        CreateMap<UserPostDto, User>()
            .ConvertUsing((src, _, context) =>
            {
                if (src.Normal is not null)
                {
                    var user = context.Mapper.Map<User>(src.Normal);
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(src.Normal.Password);
                    user.Role = UserRole.Normal;
                    return user;
                }

                if (src.Guest is not null)
                {
                    var guest = context.Mapper.Map<User>(src.Guest);
                    guest.Role = UserRole.Guest;
                    return guest;
                }

                throw new ArgumentException("Invalid UserPostDto type");
            });
    }
}