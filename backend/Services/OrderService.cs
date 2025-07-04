using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.DTOs;
using SushiZume.Enums;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

using SushiZume.Models;

public class OrderService(
    IOrderRepository orderRepository,
    IMapper mapper,
    IValidator<Address> addressValidator,
    IValidator<Order> orderValidator,
    IProductRepository productRepository) : IOrderService
{
    public async Task<List<Order>> GetWithPaginationAsync(int page, int pageSize, CancellationToken cancellationToken)
    {
        var skip = (page - 1) * pageSize;
        return await orderRepository.GetWithPaginationAsync(skip, pageSize, cancellationToken);
    }

    public async Task<Order> AddAsync(OrderPostDto dto, CancellationToken cancellationToken)
    {
        var productsRange = dto.OrderProducts.Select(op => op.ProductId).ToList();
        var products = await productRepository.GetRangeAsync(productsRange, cancellationToken);
        if (products.Count != dto.OrderProducts.Count)
            throw new KeyNotFoundException("Produkty z zamówienia nie zostały znalezione.");

        var order = mapper.Map<Order>(dto);

        await orderValidator.ValidateAndThrowAsync(order, cancellationToken);
        await addressValidator.ValidateAndThrowAsync(order.Address, cancellationToken);

        order.TotalCost = order.CalculateTotalCost(products);

        await orderRepository.AddAsync(order, cancellationToken);
        await orderRepository.SaveChangesAsync(cancellationToken);
        return order;
    }

    public async Task<Order> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var order = await orderRepository.GetByIdAsync(id, cancellationToken);
        if (order == null)
            throw new KeyNotFoundException($"Order with ID {id} not found.");
        return order;
    }

    public async Task ChangeStatusAsync(Guid id, OrderStatus status, CancellationToken cancellationToken)
    {
        var order = await GetByIdAsync(id, cancellationToken);
        order.Status = status;

        orderRepository.Update(order);
        await orderRepository.SaveChangesAsync(cancellationToken);
    }

    public async Task<int> GetCountAsync(CancellationToken cancellationToken)
    {
        return await orderRepository.GetCountAsync(cancellationToken);
    }
}