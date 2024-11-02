using System.ComponentModel.DataAnnotations;

namespace WordStudy.Models;

public class Card
{
    public int CardId { get; set; }

    [Required(ErrorMessage = "Введите термин")]
    public string Term { get; set; } = string.Empty;

    [Required(ErrorMessage = "Введите определение")]
    public string Definition { get; set; } = string.Empty;
}