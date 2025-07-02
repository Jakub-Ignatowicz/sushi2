using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.DTOs;
using SushiZume.Enums;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

using SushiZume.Models;

public class OrderService(IOrderRepository orderRepo, IMapper mapper, SushiContext context) : IOrderService
{
    public async Task<List<Order>> GetWithPaginationAsync(int page, int pageSize, CancellationToken cancellationToken)
    {
        var skip = (page - 1) * pageSize;
        return await orderRepo.GetWithPaginationAsync(skip, pageSize, cancellationToken);
    }

    public async Task<Order> AddAsync(OrderPostDto dto, CancellationToken cancellationToken)
    {
        var order = mapper.Map<Order>(dto);

        await orderRepo.AddAsync(order, cancellationToken);
        await orderRepo.SaveChangesAsync(cancellationToken);
        return order;
    }

    public async Task<Order> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var order = await orderRepo.GetByIdAsync(id, cancellationToken);
        if (order == null)
            throw new KeyNotFoundException($"Order with ID {id} not found.");
        return order;
    }

    public async Task<bool> ChangeStatusAsync(Guid id, OrderStatus status, CancellationToken cancellationToken)
    {
        await context.Orders
            .Where(o => o.Id == id)
            .ExecuteUpdateAsync(o =>
                o.SetProperty(x => x.Status, status), cancellationToken);

        // await context.SaveChangesAsync();
        return true;
    }

    public async Task<int> GetCountAsync(CancellationToken cancellationToken)
    {
        return await orderRepo.GetCountAsync(cancellationToken);
    }
}