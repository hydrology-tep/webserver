using Terradue.Tep.WebServer.Services;
using ServiceStack.ServiceHost;
using System;
using Terradue.Portal;
using Terradue.Tep.WebServer;
using ServiceStack.Common.Web;
using Terradue.OpenSearch.Engine;
using Terradue.OpenSearch;
using System.Collections.Specialized;
using System.Web;
using System.Net;
using System.IO;
using System.Text;

namespace Terradue.Tep.Hydrology.WebServer.Services
{
    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------

    [Route("/nigerhype/click", "GET", Summary = "do nigerhype request", Notes = "")]
    public class ProxyUrlGetRequestTepHydro {
        [ApiMember(Name="n", Description = "", ParameterType = "query", DataType = "string", IsRequired = true)]
        public string n { get; set; }

        [ApiMember(Name="e", Description = "", ParameterType = "query", DataType = "string", IsRequired = true)]
        public string e { get; set; }
    }

    [Api("Tep Hydrology Terradue webserver")]
    [Restrict(EndpointAttributes.InSecure | EndpointAttributes.InternalNetworkAccess | EndpointAttributes.Json,
              EndpointAttributes.Secure   | EndpointAttributes.External | EndpointAttributes.Json)]
    public class ProxyServiceTepHydrology : ProxyServiceTep {

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger
            (System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public object Get(ProxyUrlGetRequestTepHydro request){
            
            var uri = new UriBuilder(string.Format("http://hypeweb.smhi.se/nigerhype/time-series/click?n={0}&e={1}",request.n, request.e));
           
            log.InfoFormat("Do SHMI request: {0}", uri.Uri.AbsoluteUri);

            HttpWebRequest httprequest = (HttpWebRequest)WebRequest.Create(uri.Uri.AbsoluteUri);
            httprequest.Method = "GET";
            httprequest.ContentType = "application/json";
            httprequest.Accept = "application/json";

            string result;
            using (var httpResponse = (HttpWebResponse)httprequest.GetResponse()){
                using (StreamReader reader = new StreamReader (httpResponse.GetResponseStream (), Encoding.UTF8)) {
                    result = reader.ReadToEnd ();
                }
            }
            return result;
        }


    }
}

