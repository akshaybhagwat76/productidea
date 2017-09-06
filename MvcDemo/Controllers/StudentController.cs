using MvcDemo.Db;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcDemo.Controllers
{
    public class StudentController : Controller
    {
		// GET: Student
		ProfilurMainEntities Db = new ProfilurMainEntities();

		public ActionResult Index()
        {
            return View(Db.Students.ToList());
        }
		[HttpPost]
		public JsonResult InsertStudent(Student std)
		{
				Db.Students.Add(std);
				Db.SaveChanges();
			
			return Json(std,JsonRequestBehavior.AllowGet);
		}
		[HttpPost]
		public JsonResult UpdateStudent(int id)
		{
			Student std = Db.Students.Find(id);
			Db.Entry(std).State = System.Data.Entity.EntityState.Modified;
			Db.SaveChanges();

			return Json(std,JsonRequestBehavior.AllowGet);
		}
		[HttpPost]
		public JsonResult DeleteStudent(int Studentid)
		{
			Student p = Db.Students.Find(Studentid);
			Db.Students.Remove(p);
			Db.SaveChanges();
			return Json(p, JsonRequestBehavior.AllowGet);
		}
		//public ActionResult Manage(int id=0)
	 //   {

		//	return View(Db.Students.Find(id));
		//}
		//public ActionResult Save(Student std)
		//{
		//	if (std.StudentId != 0)
		//	{
		//		Db.Entry(std).State = System.Data.Entity.EntityState.Modified;
		//		Db.SaveChanges();
		//	}
		//	else
		//	{
		//		Db.Students.Add(std);
		//		Db.SaveChanges();
 	//		}

	 //     	return 	RedirectToAction("Index");
		//}
		
    }
}