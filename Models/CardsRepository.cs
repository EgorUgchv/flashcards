namespace WordStudy.Models;

public class CardsRepository
{
    private static List<Card> _cards { get; set; } = new List<Card>();

    public static void AddCard(Card card)
    {
        if (_cards.Count != 0)
        {
            var maxId = _cards.Max(x => x.CardId);
            card.CardId = maxId + 1;
        }
        else
        {
            card.CardId = 1;
        }

        _cards.Add(card);
    }


    public static Deck GetCards()
    {
        var cardList = new Deck
        {
            Cards = _cards
            
        };

        return cardList;
    }

    public static Card? GetCategoryById(int cardId)
    {
        return _cards.FirstOrDefault(x => x.CardId == cardId);
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