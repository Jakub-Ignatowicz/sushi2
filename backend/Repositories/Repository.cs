using SushiZume.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SushiZume.Data;

namespace SushiZume.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly SushiContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(SushiContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public Task<List<T>> GetAllAsync() => _dbSet.ToListAsync();

    public Task<T?> GetByIdAsync(Guid id) => _dbSet.FindAsync(id).AsTask();

    public async Task AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public void Update(T entity)
    {
        _dbSet.Update(entity);
    }

    public void Delete(T entity)
    {
        _dbSet.Remove(entity);
    }

    public Task SaveChangesAsync() => _context.SaveChangesAsync();
}