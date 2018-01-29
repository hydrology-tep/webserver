using System;

/*!

\defgroup HydroSite Hydrology Site
@{

    This is the container for all the web pages and widgets component.

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-DES-001 This section describes all the web compoenents that composes the web application.

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-SEC-030 This component is deployed in HTTPS with a certificate

@}

\defgroup WebPages Web Pages
@{

    This is the module that manages all the content pages of the portal as well as the user profile.

    \xrefitem int "Interfaces" "Interfaces" connects \ref T2API interface to manage the portal objects in the web pages and widgets.

    \ingroup HydroSite

@}

\defgroup GeoBrowser GeoBrowser
@{

    This is the main portal application with all the widgets and features to power the Thematic Applications. 
    Refer to the SUM for more extensively description of the Geobrowser capabilities with screenshots and user guidance.


    \xrefitem int "Interfaces" "Interfaces" connects \ref T2API interface to manage the thematic application in the web pages and widgets.

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-015 This component enables the user interface for Thematic Application

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-032 This component reads the \OWSContext document to get the AOI of the services proposed and may apply it as a AOI for the search

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-033 This component offers many geometric tools to define AOI

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-034 This component reads the \OWSContext document to get the AOI of the features layers (e.g. hydrological) and may apply it as a AOI for the search

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-FUN-035 This component allows the upload of geojson or shapefile to get a custom AOI and may apply it as a AOI for the search

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-010 This component provides with web pages to retrieve portal activities

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-012 This component provides with a web widget with the list of available processing services described in the thematic application. 

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-013 This component provides with a web widget to search for datasets from a series and get the results in a table

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-014 This component provides with a data package web widget where user shall be able to store temporarily selected dataset from the search result table

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-015 This component provides with a web widget to share items such as dataset, services...

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-016 This component provides with the web framework to build Thematic Application

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-017 This component provides with a set of visualization capabilities according to the offerings presented in the OWS Context document


E-CEO integration
-----------------

E-CEO platform is used for the benchmarking functionnalities. A benchmarking is represented as a contest in the E-CEO platform. With EO-SSO, a user can go transparently from TEP to E-CEO
to create a contest that could be used to define benchmarking metrics.
On the TEP interface, a dedicated web widget that communicates directly with the E-CEO web services allows for the initialtor of the contest to input scores in the evaluation tree and for
the other user to view the benchmark results when the contest is closed on E-CEO.

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-ICD-011 This component provides with a web widget with the list of available benchmarking trials related to the thematic application. 

    \xrefitem trace_req "Requirement" "Requirement traceability" HEP-TS-REU-010 This component integrate with E-CEO to create contest for benchmarking functionnalities on the TEP portal.

    \xrefitem int "Interfaces" "Interfaces" connects \ref T2API interface to connects to E-CEO platform for benchmarking functionalities.

    \ingroup HydroSite

@}

\defgroup CatalogueEditor Catalogue Editor
@{

    This is the container for all the web pages and widgets component.

    \xrefitem int "Interfaces" "Interfaces" connects \ref T2API interface to manage TEP collections and data packages.

    \ingroup HydroSite

@}

*/

namespace Terradue.TepHydro.WebPages
{
    public class WebPages{}
}

