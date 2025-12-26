namespace HotelFazendaApi.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public string Numero { get; set; } = default!;   // "101"
        public int Capacidade { get; set; } = 2;         // nº de hóspedes
        public string Status { get; set; } = "Livre";    // Livre | Ocupado | Manutencao
    }
}
