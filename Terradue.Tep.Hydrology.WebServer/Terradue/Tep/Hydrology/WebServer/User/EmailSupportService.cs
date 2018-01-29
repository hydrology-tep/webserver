using Terradue.Tep.WebServer.Services;
using ServiceStack.ServiceHost;
using Terradue.Tep.WebServer;
using Terradue.Portal;
using ServiceStack.Common.Web;
using System;
using Terradue.WebService.Model;
using System.Runtime.Serialization;
using System.Net;
using System.IO;
using ServiceStack.Text;
using System.Collections.Generic;

namespace Terradue.Tep.Hydrology.WebServer.Services {

    [Route("/support/email", "POST", Summary = "send email from user to support", Notes = "")]
    public class SendEmailFromUserRequestTep {
        [ApiMember(Name = "name", Description = "contact name", ParameterType = "query", DataType = "string", IsRequired = true)]
        public string name { get; set; }

		[ApiMember(Name = "email", Description = "contact email", ParameterType = "query", DataType = "string", IsRequired = true)]
		public string email { get; set; }

		[ApiMember(Name = "organisation", Description = "contact organisation", ParameterType = "query", DataType = "string", IsRequired = true)]
		public string organisation { get; set; }

		[ApiMember(Name = "comment", Description = "contact comment", ParameterType = "query", DataType = "string", IsRequired = true)]
		public string comment { get; set; }

		[ApiMember(Name = "captchaValue", Description = "captchaValue", ParameterType = "query", DataType = "string", IsRequired = true)]
		public string captchaValue { get; set; }

    }

    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------

    [Api("Tep Hydrology Terradue webserver")]
    [Restrict(EndpointAttributes.InSecure | EndpointAttributes.InternalNetworkAccess | EndpointAttributes.Json,
              EndpointAttributes.Secure | EndpointAttributes.External | EndpointAttributes.Json)]
    public class EmailSupportServiceTepHydrology : ServiceStack.ServiceInterface.Service {

        public object Post(SendEmailFromUserRequestTep request) {
            var context = TepWebContext.GetWebContext(PagePrivileges.EverybodyView);
            try {
                context.Open();
                context.LogInfo(this, "/support/email -- name='{0}', email='{1}', organisation='{2}', comment='{3}'", request.name, request.email, request.organisation, request.comment);
                ValidateCaptcha(context.GetConfigValue("reCaptcha-secret"), request.captchaValue);
                var subject = "Hydrology TEP - Contact request";
                var body = string.Format("User name: {0}\nEmail: {1}\nOrganisation: {2}\nComments: {3}", request.name, request.email, request.organisation, request.comment);
                context.SendMail(request.email, context.GetConfigValue("MailSenderAddress"), subject, body);
            } catch (Exception e) {
                context.LogError(this, e.Message + "-" + e.StackTrace);
                context.Close();
                throw e;
            }
            context.Close();
            return new WebResponseBool(true);
        }


        public void ValidateCaptcha(string secret, string response) {

            ServicePointManager.ServerCertificateValidationCallback = delegate (
                Object obj, System.Security.Cryptography.X509Certificates.X509Certificate certificate, System.Security.Cryptography.X509Certificates.X509Chain chain,
                System.Net.Security.SslPolicyErrors errors) {
                    return (true);
                };

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secret, response));
            request.Method = "POST";
            request.ContentType = "application/json";
            request.Accept = "application/json";
            request.Proxy = null;

            string json = "{" +
                "\"secret\":\"" + secret + "\"," +
                "\"response\":\"" + response + "\"," +
                "}";

            using (var streamWriter = new StreamWriter(request.GetRequestStream())) {
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();

                CaptchaResponse captchaResponse;

                using (var httpResponse = (HttpWebResponse)request.GetResponse()) {
                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream())) {
                        string result = streamReader.ReadToEnd();
                        try {
                            captchaResponse = JsonSerializer.DeserializeFromString<CaptchaResponse>(result);
                        } catch (Exception e) {
                            throw new Exception("Error occured. Please try again.");
                        }
                    }
                }
                if (!captchaResponse.Success) {
                    if (captchaResponse.ErrorCodes.Count <= 0) throw new Exception("Error occured. Please try again.");

                    var error = captchaResponse.ErrorCodes[0].ToLower();
                    switch (error) {
                        case ("missing-input-secret"):
                            throw new Exception("The secret parameter is missing.");
                            break;
                        case ("invalid-input-secret"):
                            throw new Exception("The secret parameter is invalid or malformed.");
                            break;

                        case ("missing-input-response"):
                            throw new Exception("The response parameter is missing.");
                            break;
                        case ("invalid-input-response"):
                            throw new Exception("The response parameter is invalid or malformed.");
                            break;

                        default:
                            throw new Exception("Error occured. Please try again");
                            break;
                    }
                }
            }
        }
    }

	[DataContract]
	public class CaptchaResponse {
		[DataMember(Name = "success")]
		public bool Success { get; set; }

		[DataMember(Name = "error-codes")]
		public List<string> ErrorCodes { get; set; }
	}
}


