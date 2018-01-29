using Terradue.Tep.WebServer.Services;
using ServiceStack.ServiceHost;

namespace Terradue.Tep.Hydrology.WebServer.Services
{
	//-------------------------------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------------------------------
	
    [Api("Tep Hydrology Terradue webserver")]
	[Restrict(EndpointAttributes.InSecure | EndpointAttributes.InternalNetworkAccess | EndpointAttributes.Json,
	          EndpointAttributes.Secure   | EndpointAttributes.External | EndpointAttributes.Json)]
	/// <summary>
	/// Login service. Used to log into the system (replacing UMSSO for testing)
	/// </summary>
	public class LoginServiceTepHydrology : LoginServiceTep {}
}
