using ServiceStack.ServiceHost;
using Terradue.Tep.WebServer.Services;

namespace Terradue.Tep.Hydro.WebServer.Services {
    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------

    [Api("Tep Hydro Terradue webserver")]
    [Restrict(EndpointAttributes.InSecure | EndpointAttributes.InternalNetworkAccess | EndpointAttributes.Json,
              EndpointAttributes.Secure | EndpointAttributes.External | EndpointAttributes.Json)]
    public class TransactionServiceTepHydro : TransactionServiceTep { }
}

