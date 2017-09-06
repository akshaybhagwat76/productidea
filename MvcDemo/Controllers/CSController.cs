using MvcDemo.EmployeeDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcDemo.Controllers
{
    public class CSController : Controller
    {
		// GET: CS
		EmployeeDbEntities1 Db = new EmployeeDbEntities1();

		public ActionResult Index()
		{

			List<Country> list = Db.Countries.ToList();
			ViewData["CountryList"] = list;
            return View();
		}
		
		[HttpPost]
		public JsonResult getdata(int id)
		{
			Db.Configuration.ProxyCreationEnabled = false;
			return Json(Db.States.Where(x => x.CountryId == id).ToList(), JsonRequestBehavior.DenyGet);
		}
	}
}