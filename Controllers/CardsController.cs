using Microsoft.AspNetCore.Mvc;
using WordStudy.Models;

namespace WordStudy.Controllers;

public class CardsController : Controller
{
    public IActionResult Learning()
    {
        var cards = CardsRepository.GetCards();
        return View(cards);
    }

    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [Route("Cards/Create/")]
    public IActionResult Create([FromBody] Deck deck)

    {
        if (ModelState.IsValid)
        {
            foreach (var card in deck.Cards)
                if (!string.IsNullOrWhiteSpace(card.Term) && !string.IsNullOrWhiteSpace(card.Definition))
                    CardsRepository.AddCard(card);

            return Json(new { success = true, message = "Card saved successfully " });
        }

        return Json(new
        {
            success = false, message = "Invalid data provided"
        });
    }

    public IActionResult DeleteCard(int cardId)
    {
        CardsRepository.DeleteCard(cardId);
        return RedirectToAction(nameof(Create));
    }
}