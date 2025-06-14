using SushiZume.Models;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepo;

    public OrderService(IOrderRepository orderRepo)
    {
        _orderRepo = orderRepo;
    }

    public Task<List<Order>> GetAllOrdersAsync()
    {
        return _orderRepo.GetAllAsync();
    }

    public Task<List<Order>> GetAllNewOrdersAsync()
    {
        return _orderRepo.GetNewOrdersAsync();
    }

    public Task<Order?> GetOrderByIdAsync(string id)
    {
        return _orderRepo.GetByIdAsync(id);
    }

    public async Task CreateOrderAsync(Order order)
    {
        await _orderRepo.AddAsync(order);
        await _orderRepo.SaveChangesAsync();
    }

    public async Task<bool> MarkAsDoneAsync(string id)
    {
        var order = await _orderRepo.GetByIdAsync(id);
        if (order == null) return false;

        order.IsDone = true;
        _orderRepo.Update(order);
        await _orderRepo.SaveChangesAsync();
        
        return true;
    }
    
    public async Task<bool> MarkAsNotNewAsync(string id)
    {
        var order = await _orderRepo.GetByIdAsync(id);
        if (order == null) return false;
        
        order.IsNew = false;
        _orderRepo.Update(order);
        await _orderRepo.SaveChangesAsync();
        
        return true;
    }
}

