using System.ComponentModel.DataAnnotations;

namespace WordStudy.Models;

public class Card
{
    public int CardId { get; set; }
    [Required]
    public string Term { get; set; } = string.Empty;
    public string Definition { get; set; } = string.Empty;
}

public class CardList
{
    public List<Card> Cards { get; set; }
}