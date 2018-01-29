USE $MAIN$;

/*****************************************************************************/

-- update table type ... \
update type set class='Terradue.Tep.Controller.DataSeries, Terradue.Tep' WHERE class='Terradue.TepHydro.Controller.DataSeries, Terradue.TepHydro.WebServer';
update type set class='Terradue.Tep.Controller.DataPackage, Terradue.Tep' WHERE class='Terradue.TepHydro.Controller.DataPackage, Terradue.TepHydro.WebServer';
update type set custom_class='Terradue.Tep.Controller.UserTep, Terradue.Tep' WHERE custom_class='Terradue.TepHydro.Controller.UserTep, Terradue.TepHydro.WebServer';
-- RESULT

-- alter tables ... \
ALTER TABLE wpsprovider CHANGE COLUMN `url` `url` VARCHAR(200) NULL DEFAULT NULL COMMENT 'Base WPS access point' ;
-- RESULT
