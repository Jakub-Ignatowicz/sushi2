using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class ProductItemRepository(SushiContext context) : Repository<ProductItem>(context), IProductItemRepository
{
}