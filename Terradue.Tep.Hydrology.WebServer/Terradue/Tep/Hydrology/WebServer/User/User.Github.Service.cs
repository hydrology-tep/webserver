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
    public class UserGithubServiceTepHydrology : UserGithubServiceTep {}
}
