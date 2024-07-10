using System.ComponentModel.DataAnnotations;

namespace WordStudy.Models;

public class Card
{
    public int CardId { get; set; }
    [Required]
    public string Term { get; set; } = string.Empty;
    [Required]
    public string Definition { get; set; } = string.Empty;
}

