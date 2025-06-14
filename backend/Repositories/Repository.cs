using System.ComponentModel.DataAnnotations;
using SushiZume.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
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

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = _context.ChangeTracker.Entries()
            .Where(e => e.State is EntityState.Added or EntityState.Modified);

        foreach (var entry in entries)
        {
            var entity = entry.Entity;
            var validationContext = new ValidationContext(entity);
            Validator.ValidateObject(entity, validationContext, validateAllProperties: true);
        }

        return await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<int> GetCountAsync() => DefaultQuery.CountAsync();
}