using Terradue.Tep.WebServer.Services;
using ServiceStack.ServiceHost;
using Terradue.Tep.WebServer;
using System;
using Terradue.Portal;
using System.Web;
using System.Security.Cryptography;
using ServiceStack.Common.Web;

namespace Terradue.Tep.Hydrology.WebServer.Services {

    [Route("/t2sso", "GET", Summary = "GET a WPS job", Notes = "")]
    public class T2ssoLoginRequestTep : IReturn<string> {
        [ApiMember(Name = "payload", Description = "payload used to validate the request", ParameterType = "query", DataType = "string", IsRequired = true)]
        public string payload { get; set; }

        [ApiMember(Name = "sig", Description = "sig used to validate the payload", ParameterType = "query", DataType = "string", IsRequired = true)]
        public string sig { get; set; }
    }

    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------

    [Api("Tep Hydrology Terradue webserver")]
    [Restrict(EndpointAttributes.InSecure | EndpointAttributes.InternalNetworkAccess | EndpointAttributes.Json,
              EndpointAttributes.Secure | EndpointAttributes.External | EndpointAttributes.Json)]
    /// <summary>
    /// Login service. Used to log into the system (replacing UMSSO for testing)
    /// </summary>
    public class T2ssoServiceTepHydrology : ServiceStack.ServiceInterface.Service {

        static System.Collections.Specialized.NameValueCollection AppSettings = System.Configuration.ConfigurationManager.AppSettings;
        static string t2portalSecret = AppSettings["sso-eosso-secret"];

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger
            (System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public object Get(T2ssoLoginRequestTep request) {

            log.InfoFormat("/t2sso GET");

            string redirect = "https://www.terradue.com";
            System.Text.ASCIIEncoding encoding = new System.Text.ASCIIEncoding();

            try {

                var base64Payload = System.Convert.FromBase64String(request.payload);
                var payload = encoding.GetString(base64Payload);
                var querystring = HttpUtility.ParseQueryString(payload);
                var nonce = querystring["nonce"];
                var callback = querystring["redirect_uri"];

                log.DebugFormat("callback = {0}", callback);

                //validate the payload
                var sig = HashHMAC(t2portalSecret, request.payload);
                if (!sig.Equals(request.sig)) throw new Exception("Invalid payload");

                var username = HttpContext.Current.Request.Headers["Umsso-Person-commonName"];
                var email = HttpContext.Current.Request.Headers["Umsso-Person-Email"];

                //build new payload
                var newpayload = string.Format("nonce={0}&email={1}&username={2}&require_activation=true", nonce, email, username);

                byte[] payloadBytes = encoding.GetBytes(newpayload);
                var sso = System.Convert.ToBase64String(payloadBytes);
                var newsig = HashHMAC(t2portalSecret, sso);
                redirect = string.Format("{0}?payload={1}&sig={2}", callback, sso, newsig);
            } catch (Exception e) {
                redirect = "https://www.terradue.com/portal/error?msg=" + HttpUtility.UrlEncode("Unable to login") + "&longmsg=" + e.Message;
            }

            var redirectResponse = new HttpResult();
            redirectResponse.Headers[HttpHeaders.Location] = redirect;
            redirectResponse.StatusCode = System.Net.HttpStatusCode.Redirect;
            return redirectResponse;
        }

        private static string HashHMAC(string key, string msg) {
            var encoding = new System.Text.ASCIIEncoding();
            var bkey = encoding.GetBytes(key);
            var bmsg = encoding.GetBytes(msg);
            var hash = new HMACSHA256(bkey);
            var hashmac = hash.ComputeHash(bmsg);
            return BitConverter.ToString(hashmac).Replace("-", "").ToLower();
        }
    }
}
