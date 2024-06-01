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
    public IActionResult Create(Card card)
    {
        if (ModelState.IsValid)
        {
            CardsRepository.AddCard(card);
            return RedirectToAction(nameof(Learning));
        }

        return View(card);
    }
    

    
}