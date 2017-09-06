using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcDemo.EmployeeDB
{
	public class employeeVM
	{
		public int EmployeeId { get; set; }
		public string Name { get; set; }
		public Nullable<decimal> Age { get; set; }
		public int CityName { get; set; }
		public int StateName { get; set; }
		public int CountryName { get; set; }
		public string Image { get; set; }
	}
}