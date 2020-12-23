using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using System.Collections.Generic;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken ct)
            {
                var activities = await _context.Activities.ToListAsync(ct);
                return activities;
            }
        }
    }
}