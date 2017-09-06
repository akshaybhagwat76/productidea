using MvcDemo.edmx;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.IO;

namespace MvcDemo.Controllers
{
	public class EmployeeController : Controller
	{
		// GET: Employee
        demoEntities dc = new demoEntities();

		[HttpGet]
		public ActionResult Index()
		{
            ViewData["drp"] = dc.custs.ToList();
            ViewData["drp2"] = dc.products.ToList();
            
			return View();
		}
        [HttpGet]
        public JsonResult GetName(string name)
        
        {
            dc.Configuration.ProxyCreationEnabled = false;
            var p = (from n in dc.custs where name == n.cname select new { n.address, n.cid }).ToList();
            return Json(p, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetRate(string cname)
        {

            var rate = (from query in dc.products where cname == query.pname select new { query.mrp ,query.pid}).ToList();
            return Json(rate, JsonRequestBehavior.AllowGet);

        }

        [HttpGet]
        public JsonResult ListAll()
        {
            dc.Configuration.ProxyCreationEnabled = false;
            var p = (from det in dc.saletrans
                     from customer in dc.custs
                     from pro in dc.products
                     where det.pid == pro.pid && customer.cid == det.cid
                     select new
                     {

                        pro.pname,
                        det

                     }).ToList();
                   
                    
            return Json(p, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public string InsertEmp(saletran emp)
        {
            dc.Configuration.ProxyCreationEnabled = false;
           
            ViewData["drp"] = dc.custs.ToList();
            ViewData["drp2"] = dc.products.ToList();
            
            dc.saletrans.Add(emp);
            dc.SaveChanges();

            return "Product added successfully...";
        }
        [HttpGet]
        public JsonResult GetbyID(int ID)
        {
            saletran model = dc.saletrans.Where(x => x.stid == ID).SingleOrDefault();
            string value = string.Empty;
            value = JsonConvert.SerializeObject(model, Formatting.Indented, new JsonSerializerSettings
            {

                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(ProductVM emp)
        {
            dc.Configuration.ProxyCreationEnabled = false;
            saletran p = dc.saletrans.Where(x => x.stid == emp.stid).FirstOrDefault();
            p.rate = emp.rate;
            p.qty = emp.qty;
            p.total = emp.total;
            p.pid = emp.pid;
            p.cid = emp.cid;
            dc.SaveChanges();
            return Json(p, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteEmp(int id)
        {
            saletran emp = dc.saletrans.Find(id);
            dc.saletrans.Remove(emp);
            dc.SaveChanges();
            return Json(emp, JsonRequestBehavior.AllowGet);
        }

	}
}