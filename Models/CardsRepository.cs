namespace WordStudy.Models;

public class CardsRepository
{
    private static List<Card> _cards = new List<Card>()
    {
        new Card{CardId = 1, Term = "Motor", Definition = "Мотор"}
    };

    public static void AddCard(Card card)
    {
        var maxId = _cards.Max(x => x.CardId);
        card.CardId = maxId + 1;
        _cards.Add(card);
    }

    public static List<Card> GetCards() => _cards;

    public static Card? GetCategoryById(int cardId)
    {
        var card = _cards.FirstOrDefault(x => x.CardId == cardId);

        if (card != null)
        {
            return new Card
            {
                CardId = card.CardId,
                Term = card.Term,
                Definition = card.Definition
            };
        }

        return null;
    }

    public static void UpdateCard(int cardId, Card card)
    {
        if (cardId != card.CardId) return;
        var cardToUpdate = _cards.FirstOrDefault(x => x.CardId == cardId);

        if (cardToUpdate != null)
        {
            cardToUpdate.Term = card.Term;
            cardToUpdate.Definition = card.Definition;
        }
    }

    public static void DeleteCard(int cardId)
    {
        var card = _cards.FirstOrDefault(x => x.CardId == cardId);
        if (card != null)
        {
            _cards.Remove(card);
        }
    }
}