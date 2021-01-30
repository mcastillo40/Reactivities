using System.Threading;
using System.Threading.Tasks;
using MediatR;
using System.Collections.Generic;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> { }

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken ct)
            {
                var activities = await _context.Activities.ToListAsync(ct);

                return _mapper.Map<List<Activity>, List<ActivityDto>>(activities);
            }
        }
    }
}