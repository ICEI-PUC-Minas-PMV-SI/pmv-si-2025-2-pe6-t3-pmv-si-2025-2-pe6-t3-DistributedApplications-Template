namespace HotelFazendaApi.DTOs
{
    public sealed class RoomCreateDto
    {
        public int Numero { get; set; }
        public int Capacidade { get; set; } = 2;
        /// <summary>"Livre" | "Manutencao" (se nulo, tratamos como "Livre")</summary>
        public string? Status { get; set; }
    }

    public sealed class RoomUpdateDto
    {
        public int? Numero { get; set; }
        public int? Capacidade { get; set; }
        /// <summary>"Livre" | "Manutencao"</summary>
        public string? Status { get; set; }
    }

    public sealed class RoomViewDto
    {
        public int Id { get; set; }
        public int Numero { get; set; }
        public int Capacidade { get; set; }
        public string Status { get; set; } = "Livre";
        // Campos de leitura adicionais (se quiser): hóspede atual, etc.
        public string? HospedeNome { get; set; }
        public DateTime? HospedeDataEntrada { get; set; }
    }
}
