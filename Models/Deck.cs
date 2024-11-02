namespace WordStudy.Models;

public class Deck
{
    public Deck()
    {
        Cards = new List<Card>();
    }

    public List<Card> Cards { get; set; }
}