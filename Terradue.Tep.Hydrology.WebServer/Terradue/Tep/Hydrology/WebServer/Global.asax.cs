using System;
using System.Web;
using ServiceStack.Common.Web;

/*!

\addtogroup TepCommunity
@{

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-035 This component provides with a user notification mechanism.

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-DES-014 TEP end user rights are enforced by this component with the support of the \ref Authorization component.
    
    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-DES-013 TEP data provider rights are enforced by this component with the support of the \ref Authorization component.
    
    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-DES-015 TEP Content Authority rights are enforced by this component with the support of the \ref Authorization component.
    
    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-DES-010 TEP Resource Administrator rights are enforced by this component with the support of the \ref Authorization component.
    
    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-DES-011 TEP expert user rights are enforced by this component with the support of the \ref Authorization component.
    
    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-DES-012 TEP ICT provider rights are enforced by this component with the support of the \ref Authorization component.

@}

\addtogroup TepApplication
@{

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-015 This component manages the thematic applications

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-DES-002 The Thematic Application design is described in this compoenent

    \xrefitem trace_req "Requirement" "Requirement traceability" TS-DES-110 Data flow along with services are built into the Thematic Application inside this component.

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-022 The application compoenent is described as the manager of the association of data and the services
@}

\addtogroup EOProfile
@{

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-031 This is the data model defining the Earth Observation profile used in \ref ElasticCas and \ref OpenSearch.
@}

\addtogroup TepData
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-031 This component reads collection and data packages metadata via Series component using OWS conceptual model.

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-018 This component can export data to a GeoServer API for further visualisation via WMS



@}

\addtogroup CloudWpsFactory
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-021 Service under integration in the developer cloud sandbox or in production in a cluster is discoverable using this component

@}

\addtogroup Geosquare
@{

//\xrefitem trace_req "Requirement" "Requirement traceability" TS-FUN-120 Geosquare provides with the Catalogue as a service function

@}

\addtogroup GeosquareAPI
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-031 Geosquare API provides with feed format supporting \ref OWSContext

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-032 Geosquare API provides with an \ref OpenSearch interface

@}

\addtogroup CoreWPS
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-023 This section describes with sequence diagrams the internal WPS service discovery

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-033 This section describes with sequence diagrams the WPS interactions

@}

\addtogroup Authorisation
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-SEC-010 User and Groups access control is described in this section

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-SEC-012 Collection / Series / Data Package Authorisation scheme paradigm is described in this section.

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-SEC-011 Service Authorisation scheme paradigm is described in this section.

@}

\addtogroup Auth_Umsso
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-SEC-020 EO-SSO integration described
@}

\addtogroup TepAccounting
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-060 The mechanism of debit and credit of user or group accounts is described in this section.

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-062 Business objects used to represent user or group account are referenced in this section.

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-063 Quota mechanism based on the account balance of the user or groups is described in this section.

@}

\addtogroup T2API
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-031 OGC \ref OWSContext is used as the most as possible for representing objects in the API

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-018 T2 API provides with an \ref OpenSearch interface with KML format.

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-032 T2 API provides with an \ref OpenSearch interface

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-033 T2 API  provides with a \ref WPS interface

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-SEC-030 This component is deployed in HTTPS with a certificate

@}

\addtogroup WebServices
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-031 This component exports all TEP objects in the OWS conceptual model.

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-030 This component is described as RESTful over HTTP




@}


\addtogroup ApelReporting
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-021 Apel reporting interface details are described in this section

@}


\addtogroup ApelAccounting
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-022 Apel accounting interface details are described in this section

@}

\addtogroup Series
@{

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-031 This component reads dataset series metadata using
OWS conceptual model.

\xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-032 \ref OpenSearch interface for dataset are supported by this component

@}

*/



namespace Terradue.Tep.Hydrology.WebServer {

    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------
    /// <summary>Global class</summary>
    public class Global : HttpApplication {
        public AppHost appHost;

        /// <summary>Application initialisation</summary>
        protected void Application_Start(object sender, EventArgs e) {
            appHost = new AppHost();
            appHost.Init();
        }

        protected void Application_Error(object sender, EventArgs e) {
            Context.IsErrorResponse();
        }

        protected void Application_BeginRequest(object sender, EventArgs e) {
            string urlPath = Request.Path.ToLower();
        }
    }
}
