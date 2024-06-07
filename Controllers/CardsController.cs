using Microsoft.AspNetCore.Mvc;
using WordStudy.Models;


namespace WordStudy.Controllers;

public class CardsController : Controller
{
    [HttpGet]
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
    }
}