using Quickrent.Data;
using Quickrent.Model;
using Quickrent.Repository.Interface;

namespace Quickrent.Repository.Implementation
{
    public class QueryRepository: IQueryRepository
    {
        private readonly QuickrentContext _context;

        public QueryRepository(QuickrentContext context) {
            _context = context;
        }

        public void Add(Query query)
        {
            //throw new NotImplementedException();
            _context.Query.Add(query);
            _context.SaveChanges();
        }

        public List<Query> GetAll()
        {
            //throw new NotImplementedException();
            return _context.Query.ToList();
        }
    }
}
