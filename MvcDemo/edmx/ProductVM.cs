using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcDemo.edmx
{
    public class ProductVM
    {
        public int stid { get; set; }
        public Nullable<int> rate { get; set; }
        public Nullable<int> qty { get; set; }
        public Nullable<int> total { get; set; }
        public int cid { get; set; }
        public int pid { get; set; }
        public string pname { get; set; }
        public string cname { get; set; }
        public string address { get; set; }
    }
}