using Quickrent.Model;

namespace Quickrent.Repository.Interface
{
    public interface IQueryRepository
    {
        void Add(Query query);
        List<Query> GetAll();
    }
}
