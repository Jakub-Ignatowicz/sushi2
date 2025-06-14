using SushiZume.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SushiZume.Data;

namespace SushiZume.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly SushiContext _context;
    private readonly DbSet<T> _dbSet;

    protected virtual IQueryable<T> DefaultQuery => _dbSet.AsQueryable();

    public Repository(SushiContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public Task<List<T>> GetAllAsync() => DefaultQuery.ToListAsync();

    public Task<T?> GetByIdAsync(Guid id) =>
        DefaultQuery.FirstOrDefaultAsync(e => EF.Property<Guid>(e, "Id") == id);

    public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);

    public void Update(T entity) => _dbSet.Update(entity);

    public void Delete(T entity) => _dbSet.Remove(entity);

    public Task SaveChangesAsync() => _context.SaveChangesAsync();

    public Task<int> GetCountAsync() => DefaultQuery.CountAsync();
}