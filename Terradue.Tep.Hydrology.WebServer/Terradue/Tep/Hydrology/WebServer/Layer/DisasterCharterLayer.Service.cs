using System;
using ServiceStack.ServiceHost;
using System.Collections.Generic;
using Terradue.WebService.Model;
using Terradue.Portal;
using System.Net;
using ServiceStack.Common.Web;
using System.IO;
using Terradue.Util;
using System.Text.RegularExpressions;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;
using System.Runtime.Caching;

namespace Terradue.Tep.WebServer {

	[Route("/disastercharter", "GET", Summary = "GET disaster charter activations")]
	public class DisasterActivationsRequestTepHydrology {

	}

	[Api("Tep Geohazards Terradue webserver")]
	[Restrict(EndpointAttributes.InSecure | EndpointAttributes.InternalNetworkAccess | EndpointAttributes.Json,
			  EndpointAttributes.Secure | EndpointAttributes.External | EndpointAttributes.Json)]
	public class DisasterActivationsServiceTepHydrology : ServiceStack.ServiceInterface.Service {

		ObjectCache cache = MemoryCache.Default;

		public string CharterContent {
			get {
				var chartercontent = cache["charterContent"] as string;
				if (chartercontent == null) {

					CacheItemPolicy policy = new CacheItemPolicy();
					policy.SlidingExpiration = new TimeSpan(1, 0, 0, 0);

					var httpRequest = WebRequest.CreateHttp("https://www.disasterscharter.org/charter-portlets/cpi-mvc/activations/floods/all/en_US/");

					using (StreamReader reader = new StreamReader(httpRequest.GetResponse().GetResponseStream())) {
						cache.Set("charterContent", reader.ReadToEnd(), policy);
						chartercontent = cache["charterContent"] as string;
					}
				}
				return chartercontent;
			}
		}

		/// <summary>
		/// Get the specified request.
		/// </summary>
		/// <param name="request">Request.</param>
		public object Get(DisasterActivationsRequestTepHydrology request) {
			ServicePointManager.ServerCertificateValidationCallback = delegate (
				Object obj, X509Certificate certificate, X509Chain chain,
				SslPolicyErrors errors) {
					return (true);
				};


			return new HttpResult(CharterContent, "application/json");

		}
	}
}
