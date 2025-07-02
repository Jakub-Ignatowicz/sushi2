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

    public Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default) =>
        DefaultQuery.ToListAsync(cancellationToken);

    public Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        DefaultQuery.FirstOrDefaultAsync(e => EF.Property<Guid>(e, "Id") == id, cancellationToken);

    public async Task AddAsync(T entity, CancellationToken cancellationToken = default) =>
        await _dbSet.AddAsync(entity, cancellationToken);

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

    public Task<int> GetCountAsync(CancellationToken cancellationToken = default) =>
        DefaultQuery.CountAsync(cancellationToken);
}