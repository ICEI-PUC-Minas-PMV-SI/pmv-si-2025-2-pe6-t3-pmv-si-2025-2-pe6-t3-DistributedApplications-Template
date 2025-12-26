using HotelFazendaApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelFazendaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RoomsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public RoomsController(AppDbContext db) => _db = db;

        // ============================================================
        // Regra de "reserva ativa":
        //  - QuartoId preenchido
        //  - Status != Cancelada e != Encerrada
        //  - DataEntrada <= agora
        //  - DataSaida default/nula OU > agora
        // ============================================================

        // ============================================================
        // GET /api/Rooms
        // Lista de quartos com status AGORA (Livre / Ocupado / Manutencao)
        // ============================================================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> Listar()
        {
            var agora = DateTime.UtcNow;

            var ocupadosIds = await _db.Reservations
                .AsNoTracking()
                .Where(r =>
                    r.QuartoId != null &&
                    r.Status != "Cancelada" &&
                    r.Status != "Encerrada" &&
                    r.DataEntrada <= agora &&
                    (r.DataSaida == default || r.DataSaida > agora)
                )
                .Select(r => r.QuartoId!.Value)
                .Distinct()
                .ToListAsync();

            var ocupados = new HashSet<int>(ocupadosIds);

            var quartos = await _db.Rooms
                .AsNoTracking()
                .OrderBy(q => q.Numero)   // ex.: 402, 403, 405...
                .Select(q => new
                {
                    id = q.Id,
                    numero = q.Numero,
                    capacidade = q.Capacidade,
                    status = q.Status
                })
                .ToListAsync();

            var payload = quartos.Select(q => new
            {
                q.id,
                q.numero,
                q.capacidade,
                status = q.status == "Manutencao"
                    ? "Manutencao"
                    : ocupados.Contains(q.id)
                        ? "Ocupado"
                        : "Livre"
            });

            return Ok(payload);
        }

        // ============================================================
        // GET /api/Rooms/{id}
        // Detalhe de um quarto com status AGORA
        // ============================================================
        [HttpGet("{id:int}")]
        public async Task<ActionResult<object>> ObterPorId(int id)
        {
            var room = await _db.Rooms
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (room == null)
                return NotFound();

            var agora = DateTime.UtcNow;

            var temReservaAtiva = await _db.Reservations
                .AsNoTracking()
                .AnyAsync(r =>
                    r.QuartoId == id &&
                    r.Status != "Cancelada" &&
                    r.Status != "Encerrada" &&
                    r.DataEntrada <= agora &&
                    (r.DataSaida == default || r.DataSaida > agora)
                );

            var status =
                room.Status == "Manutencao" ? "Manutencao" :
                temReservaAtiva ? "Ocupado" :
                "Livre";

            return Ok(new
            {
                id = room.Id,
                numero = room.Numero,
                capacidade = room.Capacidade,
                status
            });
        }

        // ============================================================
        // GET /api/Rooms/available
        // Quartos disponíveis para um período (consulta de reserva)
        // ============================================================
        [HttpGet("available")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<object>>> ListarDisponiveis(
            [FromQuery] string? entrada,
            [FromQuery] string? saida,
            [FromQuery] int? hospedes)
        {
            if (!DateTime.TryParse(entrada, out var ini) ||
                !DateTime.TryParse(saida, out var fim))
            {
                return BadRequest("Datas inválidas. Use formato válido (ex.: 2025-11-20).");
            }

            if (fim <= ini)
                return BadRequest("A data de saída deve ser após a data de entrada.");

            ini = ini.ToUniversalTime();
            fim = fim.ToUniversalTime();

            var quartosElegiveis = _db.Rooms
                .AsNoTracking()
                .Where(q => q.Status != "Manutencao");

            if (hospedes.HasValue && hospedes.Value > 0)
                quartosElegiveis = quartosElegiveis.Where(q => q.Capacidade >= hospedes.Value);

            // Reservas que bloqueiam o período (overlap),
            // desconsiderando Cancelada/Encerrada
            var idsIndisponiveis = await _db.Reservations
                .AsNoTracking()
                .Where(r =>
                    r.QuartoId != null &&
                    r.Status != "Cancelada" &&
                    r.Status != "Encerrada" &&
                    !(r.DataSaida <= ini || r.DataEntrada >= fim)
                )
                .Select(r => r.QuartoId!.Value)
                .Distinct()
                .ToListAsync();

            var indisponiveis = new HashSet<int>(idsIndisponiveis);

            var disponiveis = await quartosElegiveis
                .Where(q => !indisponiveis.Contains(q.Id))
                .OrderBy(q => q.Numero)
                .Select(q => new
                {
                    id = q.Id,
                    numero = q.Numero,
                    capacidade = q.Capacidade,
                    status = "Livre"
                })
                .ToListAsync();

            return Ok(disponiveis);
        }

        // ============================================================
        // GET /api/Rooms/with-guest
        // Lista com hóspede ativo + status unificado
        // Usada na tela de Quartos (/Rooms/with-guest)
        // ============================================================
        [HttpGet("with-guest")]
        public async Task<ActionResult<IEnumerable<object>>> ListarComHospede()
        {
            var agora = DateTime.UtcNow;

            var reservasAtivas = await _db.Reservations
                .AsNoTracking()
                .Where(r =>
                    r.QuartoId != null &&
                    r.Status != "Cancelada" &&
                    r.Status != "Encerrada" &&
                    r.DataEntrada <= agora &&
                    (r.DataSaida == default || r.DataSaida > agora)
                )
                .Select(r => new
                {
                    QuartoId = r.QuartoId!.Value,
                    r.HospedeNome,
                    r.DataEntrada
                })
                .ToListAsync();

            // última reserva ativa por quarto
            var ultimaPorQuarto = reservasAtivas
                .GroupBy(x => x.QuartoId)
                .ToDictionary(
                    g => g.Key,
                    g => g.OrderByDescending(r => r.DataEntrada).First()
                );

            var quartos = await _db.Rooms
                .AsNoTracking()
                .OrderBy(q => q.Numero)
                .Select(q => new
                {
                    id = q.Id,
                    numero = q.Numero,
                    capacidade = q.Capacidade,
                    status = q.Status
                })
                .ToListAsync();

            var payload = quartos.Select(q =>
            {
                var hasActive = ultimaPorQuarto.TryGetValue(q.id, out var r);

                return new
                {
                    q.id,
                    q.numero,
                    q.capacidade,
                    status =
                        q.status == "Manutencao" ? "Manutencao" :
                        hasActive ? "Ocupado" :
                        "Livre",
                    hospede = hasActive
                        ? new { nome = r!.HospedeNome, dataEntrada = r.DataEntrada }
                        : null
                };
            });

            return Ok(payload);
        }
    }
}
