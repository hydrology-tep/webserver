USE $MAIN$;

/*****************************************************************************/

-- update table action ... \
INSERT INTO action (identifier, name, description, class, method, enabled, time_interval) VALUES ('disastercharter', 'Load Disaster Charter', 'This action loads the disaster charter feeds into a file', 'Terradue.Tep.Hydrology.WebServer.Actions, Terradue.Tep.Hydrology.WebServer', 'LoadDisasterCharter', '1', '1D');
-- RESULT