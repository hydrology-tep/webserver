using System;
using Terradue.Portal;
using System.Net;
using System.IO;

namespace Terradue.Tep.Hydrology.WebServer {
    public class Actions {
        public Actions() {
        }

        public static void LoadDisasterCharter(IfyContext context) {
            var httpRequest = WebRequest.CreateHttp("https://www.disasterscharter.org/charter-portlets/cpi-mvc/activations/floods/all/en_US/");

            var dir = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetEntryAssembly().Location);

            Console.WriteLine("Creating file " + dir + "/../geobrowser/disasterCharterFlood.json");

            using (Stream s = File.Create(dir + "/../geobrowser/disasterCharterFlood.json")){
                using (var response = httpRequest.GetResponse()){
                    using (var st = response.GetResponseStream()){
                        st.CopyTo(s);
                    }
                }
            }

            Console.WriteLine("Disaster charter loaded");
        }
    }
}

