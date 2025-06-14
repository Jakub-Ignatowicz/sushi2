namespace SushiZume.DTOs;

public record AddressDto(
    Guid Id,
    string City,
    string District,
    string Street,
    string HomeNumber,
    string ApartmentNumber,
    int? Floor
);