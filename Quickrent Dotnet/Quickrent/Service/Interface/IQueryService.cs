using Quickrent.DTO;
using Quickrent.Model;

namespace Quickrent.Service.Interface
{
    public interface IQueryService
    {
        void AddQuery(ContactQueryDto query);
        List<Query> GetAllQueries();
    }
}
