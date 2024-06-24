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

    /*
    [HttpPost]
    public IActionResult Create(CardList model)
    {
        if (ModelState.IsValid)
        {
            foreach (var card in model.Cards)
            {
                CardsRepository.AddCard(card);
            }

            return RedirectToAction(nameof(Learning));
        }

        return View(model);
    }*/

    [HttpPost]
    [Route("Cards/Learning/")]
    public IActionResult Create([FromForm] CardList list)
    {
        if (list != null)
        {
            /*foreach (var card in cards)
            {
                if (!string.IsNullOrWhiteSpace(card.Term) && !string.IsNullOrWhiteSpace(card.Definition))
                {
                    CardsRepository.AddCard(card);
                }
            }*/

            return Json(new { success = true, message = "Card saved successfully " });
        }

        var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
        return Json(new { success = false, message = "Validation error", errors = errors });
    }
}