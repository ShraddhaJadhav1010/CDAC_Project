using AutoMapper;
using Quickrent.DTO;
using Quickrent.Model;
using Quickrent.Repository.Interface;
using Quickrent.Service.Interface;

namespace Quickrent.Service.Implementation
{
    public class QueryService: IQueryService
    {
        //private static List<ContactQueryDto> _queries = new List<ContactQueryDto>();
        private readonly IMapper _mapper;
        private readonly IQueryRepository _repository;

        public QueryService(IMapper mapper, IQueryRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public void AddQuery(ContactQueryDto dto)
        {
            Query query = _mapper.Map<Query>(dto);
            _repository.Add(query);
        }

        public List<Query> GetAllQueries()
        {
            return _repository.GetAll();
        }
    }
}
