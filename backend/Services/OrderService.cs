using AutoMapper;
using SushiZume.DTOs;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

using SushiZume.Models;

public class OrderService(IOrderRepository orderRepo, IMapper mapper) : IOrderService
{
    public async Task<List<Order>> GetWithPaginationAsync(int page, int pageSize)
    {
        var skip = (page - 1) * pageSize;
        return await orderRepo.GetWithPaginationAsync(skip, pageSize);
    }

    public async Task<Order> AddAsync(OrderPostDto dto)
    {
        var order = mapper.Map<Order>(dto);

        await orderRepo.AddAsync(order);
        await orderRepo.SaveChangesAsync();

        return order;
    }

    public async Task<Order> GetByIdAsync(Guid id)
    {
        var order = await orderRepo.GetByIdAsync(id);
        if (order == null)
            throw new KeyNotFoundException($"Order with ID {id} not found.");
        return order;
    }

    public async Task<bool> MarkAsDoneAsync(Guid id)
    {
        var order = await GetByIdAsync(id);

        order.IsDone = true;
        orderRepo.Update(order);
        await orderRepo.SaveChangesAsync();

        return true;
    }

    public async Task<bool> MarkAsNotNewAsync(Guid id)
    {
        var order = await orderRepo.GetByIdAsync(id);
        if (order == null) return false;

        order.IsNew = false;
        orderRepo.Update(order);
        await orderRepo.SaveChangesAsync();

        return true;
    }

    public async Task<int> GetCountAsync()
    {
        return await orderRepo.GetCountAsync();
    }
}