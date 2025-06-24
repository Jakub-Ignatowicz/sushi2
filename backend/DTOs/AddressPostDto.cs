namespace SushiZume.DTOs;

public record AddressPostDto(
    string City,
    string District,
    string Street,
    string HomeNumber,
    string ApartmentNumber,
    int? Floor
);