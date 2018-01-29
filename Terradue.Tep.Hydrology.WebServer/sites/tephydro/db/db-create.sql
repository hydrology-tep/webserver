
-- VERSION 1.0

USE $MAIN$;

-- Initializing tepHydro data model ... \ 

/*****************************************************************************/

SET @type_id = (SELECT id FROM type WHERE class = 'Terradue.Cloud.OneCloudProvider, Terradue.Cloud');
INSERT INTO cloudprov (id_type, caption, address, web_admin_url) VALUES (@type_id, 'Terradue ONE server', 'http://cloud.terradue.int:2633/RPC2', 'http://cloud.terradue.int:2633/RPC2');
INSERT INTO onecloudprov (id, admin_usr, admin_pwd) VALUES (@@IDENTITY, 'TO_BE_UPDATED', 'TO_BE_UPDATED');
SET @prov_id = (SELECT LAST_INSERT_ID());
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('One-default-provider', 'int', 'OpenNebula default provider', 'Enter the value of the identifier of the Opennebula default provider', @prov_id, '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('One-access', 'string', 'OpenNebula access url', 'Enter the value of the Opennebula access url', 'https://cloud-dev.terradue.int', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('One-GEP-grpID', 'int', 'Id of GEP group on ONE controller', 'Enter the Id of GEP group on ONE controller', '141', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('EmailCertificateResetSubject', 'string', 'Certificate Reset email body', 'Certificate Reset email body', '[$(SITENAME)] - Certificate removal', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('EmailCertificateResetBody', 'string', 'Certificate Reset email subject', 'Certificate Reset email subject', 'Dear user,\n\nthis is an automatic email to inform you that your request for certificate removal has been processed. \n\nYou can proceed now with a new certificate request from your profile page on\n$(URL).\n\nWith our best regards,\nthe Operations Support team at Terradue', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('EmailCertificateUploadSubject', 'string', 'Certificate Upload email subject', 'Certificate Upload email subject', '[$(SITENAME)] - Certificate upload', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('EmailCertificateUploadBody', 'string', 'Certificate Upload email body', 'Certificate Upload email body', 'Dear Support,\n\nThis is an automatic email to inform you that user\n$(USERNAME)\nhas just uploaded his certificate on the geohazard platform.', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('EmailCertificateRemovalSubject', 'string', 'Certificate Removal email subject', 'Certificate Removal email subject', '[$(SITENAME)] - Certificate removal for user $(USERNAME)', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('EmailCertificateRemovalBody', 'string', 'Certificate Removal email body', 'Certificate Removal email body', 'Dear support,\n\nThis is an automatic email to inform you that user\n$(USERNAME)\n has just asked to remove his certificate on the geohazard platform.\nPlease proceed with the following actions:\n- remove his certificate from the Terradue\'s CA to allow him requesting a new one\n- reset the user status from $(URL)', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('UrlCertificateReset', 'string', 'Certificate Reset url', 'Certificate Reset url', '$(BASEURL)/#!user/admin/$(USERNAME)', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('UrlCertificate', 'string', 'Certificate url', 'Certificate url', '$(BASEURL)/#!settings/profile', '0');
INSERT INTO config (`name`, `internal`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('GpodWpsUser', '0', 'string', 'Gpod WPS Username', 'Enter the name of the Gpod wps user', 'TO_BE_UPDATED', '1');
INSERT INTO config (`name`, `internal`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('GpodWpsUserId', '0', 'int', 'Gpod WPS User Id', 'Enter the Id of the Gpod Wps user', 'TO_BE_UPDATED', '1');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('report-ignored-ids', 'string', 'Report ignored ids', 'Enter the Report ignored ids', '1', '1');
INSERT INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('SmtpPort', '2', '12', '0', 'string', 'SMTP Server Hostname', 'Enter the smtp port that is used for sending e-mails', '587', '1');
INSERT INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('SmtpSSL', '2', '13', '0', 'bool', 'SMTP Server Hostname', 'Enter the ssl enbales or not that is used for sending e-mails', 'true', '1');
INSERT INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('t2portal-usr-endpoint', NULL, NULL, '0', 'string', 'T2portal user endpoint', 'Enter the t2portal user endpoint', 'https://www.terradue.com/t2api/sso/user', '1');
INSERT INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('t2portal-sso-token', NULL, NULL, '0', 'string', 'T2portal sso token', 'Enter the t2portal sso token', 'TO_BE_UPDATED', '1');
INSERT INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('t2portal-usrinfo-endpoint', NULL, NULL, '0', 'string', 'T2portal user endpoint', 'Enter the t2portal user endpoint', 'https://www.terradue.com/t2api/private/user/info', '1');
INSERT INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('t2portal-safe-token', NULL, NULL, '0', 'string', 'T2portal sso token', 'Enter the t2portal sso token', 'TO_BE_UPDATED', '1');
UPDATE config SET value='smtp-relay.gmail.com' WHERE name='SmtpHostname';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='SmtpUsername';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='SmtpPassword';
UPDATE config SET value='hydrology-tep.eo.esa.int' WHERE name='Github-client-name';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='Github-client-id';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='Github-client-secret';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='Tumblr-apiKey';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='Twitter-consumerKey';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='Twitter-consumerSecret';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='Twitter-token';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='Twitter-tokenSecret';
UPDATE config SET value='https://ca.terradue.com/gpodcs/cgi/certreq.cgi' WHERE name='CertificateRequestUrl';
UPDATE config SET value='https://ca.terradue.com/gpodcs/cgi/certdown.cgi' WHERE name='CertificateDownloadUrl';
UPDATE config SET value='Terradue Support' WHERE name='MailSender';
UPDATE config SET value='support@terradue.com' WHERE name='MailSenderAddress';
UPDATE config SET value='relay.terradue.int' WHERE name='SmtpHostname';
UPDATE config SET value='Dear user,\n\nYour account $(USERNAME) has been created on $(SITEURL).\n\nWe must verify the authenticity of your email address.\n\nTo do so, please click on the following link:\n$(ACTIVATIONURL)\n\nWith our best regards,\nthe Operations Support team at Terradue' WHERE name='RegistrationMailBody';
UPDATE config SET value='[$(PORTAL)] - Registration' WHERE `name`='RegistrationMailSubject';
UPDATE config SET value='$(BASEURL)/#!settings/profile&token=$(TOKEN)' WHERE `name`='EmailConfirmationUrl';
UPDATE config SET value='Hydrology Tep' WHERE `name`='SiteName';
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('reCaptcha-public', 'string', 'Google reCaptcha secret', 'Enter the name of the Google reCaptcha secret', 'TO_BE_UPDATED', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('reCaptcha-secret', 'string', 'Google reCaptcha secret', 'Enter the name of the Google reCaptcha secret', 'TO_BE_UPDATED', '0');

/*****************************************************************************/

UPDATE auth SET `activation_rule`='2' WHERE `identifier`='umsso';

/*****************************************************************************/

-- Add Thematic app...\
SET @admin_id = (SELECT id FROM usr where username='admin');
INSERT INTO resourceset (`id`, `identifier`, `id_usr`, `name`, `is_default`, `access_key`, `creation_time`) VALUES (NULL, '_apps', @admin_id, 'Thematic Apps', '1', '4cb74d87-e4a9-43fc-aabc-a0d6b46981b5', '2016-11-03 09:05:20');
SET @dp_id = (SELECT LAST_INSERT_ID());
INSERT INTO resource (`id_set`, `location`) VALUES (@dp_id,'https://catalog.terradue.com/hydro-smhi-apps/search?format=json');
INSERT INTO resourceset_priv (`id_resourceset`) VALUES (@dp_id);
-- RESULT

-- Create domain for existing users...\
INSERT IGNORE INTO domain (`name`, `description`) SELECT username, CONCAT('Domain of user ',username) FROM usr;
-- RESULT

-- Assign owner role to existing users...\
SET @role_id = (SELECT id FROM role WHERE identifier='owner');
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,d.id FROM usr as u LEFT JOIN domain AS d ON u.username=d.name;
-- RESULT

-- Add Hydro domains...\
SET @role_id = (SELECT id FROM role WHERE identifier='enduser');
INSERT INTO domain (identifier, name, description, kind, icon_url, discuss) VALUES ('wois','WOIS','The Water Observation and Information System (WOIS) is an open source software tool for monitoring developed by DEIMOS, assessing and inventorying water resources in a cost-effective manner using Earth Observation data. The output workflows and products available within the platform are the following: large lakes water quality monitoring, land degradation index, land cover and land use mapping, land cover change detection, small water body mapping, flood mapping system, hydrological characterization, water supply and sanitation planning support, seasonal variation of wetland areas and the erosion potential indicator.'4,'https://store.terradue.com/api/hydro-smhi-apps/images/wois.png', 'hydro/co-wois');
SET @domain_id = (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,@domain_id FROM usr as u WHERE u.level = 2 OR u.level = 3 ;

INSERT INTO domain (identifier, name, description, kind, icon_url, discuss) VALUES ('floodmonitoring','Flood Monitoring','The Flood Monitoring Service developed by TRE-Altamira enables the detection and extent analysis of large extent floods at high resolution using Sentinel-1 and historical Envisat SAR data as well as the possibility of results refinement using Sentinel-2 Optical Data. Additionally the service includes statistics to assess the evolution of water extent and floods over time from basic statistics (flood and water frequency maps, maximum floodable area and time series of floods) and advanced temporal statistics to analyze trends.',4,'https://store.terradue.com/api/hydro-smhi-apps/images/fm.png','hydro/co-floodmonitoring');
SET @domain_id = (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,@domain_id FROM usr as u WHERE u.level = 2 OR u.level = 3 ;

INSERT INTO domain (identifier, name, description, kind, icon_url, discuss) VALUES ('hydrologicalmodelling','Hydrological Modelling','The Hydrological Modelling Service developed by SMHI provides data on river discharge, lake Outflow, lakes and rivers water level, as well as land surface water balance components (precipitation, evapotranspiration, soil moisture) within an area covered by the model domain (e.g. NigerHYPE model application covering the Niger river basin). The service provides to users the possibility to upload their own hydrological model and/or their own input data to existing or new models, as well as the assimilation of Earth Observation output data from the other TEP Hydrology processing services.',4,'https://store.terradue.com/api/hydro-smhi-apps/images/hm.png','hydro/co-hydrological-modelling');
SET @domain_id = (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,@domain_id FROM usr as u WHERE u.level = 2 OR u.level = 3 ;

INSERT INTO domain (identifier, name, description, kind, icon_url, discuss) VALUES ('waterquality','Water Quality','The Water Quality Service carried out by EOMAP detects parameters such as chlorophyll-a, total suspended solids and colored dissolved organic matter based on organic absorption and surface water temperature. The service is generated by EOMAPs proprietary water quality processor Modular Inversion and Processing System (MIP). The processors include sensor independent state of the art algorithms including adjacency correction, coupled atmospheric in water retrieval considering all bidirectional aspects from extreme clean to extreme turbid case.'4,'http://www.eomap.com/wp-content/uploads/2016/01/20160120_mississippi_1.1-710x505.png', 'hydro/co-water-quality');
SET @domain_id = (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,@domain_id FROM usr as u WHERE u.level = 2 OR u.level = 3 ;

INSERT INTO domain (identifier, name, description, kind, icon_url, discuss) VALUES ('waterlevel','Water Level','The Water Level Service has been deployed by IsardSAT and provides water level time series referenced to geoid for lakes, rivers and reservoirs from Sentinel-3 and CrySAT-2 altimeters. Radar altimeters are active sensors that use the ranging capability of radar to measure the surface height profile along the satellite track.',4,'https://www.isa.org/uploadedImages/Content/Standards_and_Publications/ISA_Publications/InTech_Magazine/2010/August/2010_7-8_36-home.jpg','hydro/co-water-level');
SET @domain_id = (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,@domain_id FROM usr as u WHERE u.level = 2 OR u.level = 3 ;

INSERT INTO domain (identifier, name, description, kind, icon_url, discuss) VALUES ('smallwaterbody','Small Water Body Mapping','The Small Water Body Mapping Service developed by TRE-Altamira provides the extent and temporal evolution of permanent and non-permanent water bodies providing it into detailed mapping, Time Series and other statistical information. The service is based on Sentinel 1 SAR acquisitions and ASAR for historical analysis.',4,'','hydro/co-small-water-body');
SET @domain_id = (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,@domain_id FROM usr as u WHERE u.level = 2 OR u.level = 3 ;

INSERT INTO domain (identifier, name, description, kind, icon_url, discuss) VALUES ('nigerriver', 'Niger River', '', 3, '', 'hydro/co-niger-river');
INSERT INTO domain (identifier, name, description, kind, icon_url, discuss) VALUES ('redriver', 'Red River', '', 3, '', 'hydro/co-red-river');
INSERT INTO domain (identifier, name, description, kind, icon_url, discuss) VALUES ('tiger', 'Tiger', '', 3, '', 'hydro/co-tiger');
-- RESULT

-- Update domain of existing wpsjobs...\
UPDATE wpsjob SET id_domain = (SELECT id_domain FROM rolegrant WHERE rolegrant.id_usr = wpsjob.id_usr AND rolegrant.id_role=1);
-- RESULT

-- Update domain of existing data packages...\
UPDATE resourceset SET id_domain = (SELECT id_domain FROM rolegrant WHERE rolegrant.id_usr = wpsjob.id_usr AND rolegrant.id_role=1);
-- RESULT

