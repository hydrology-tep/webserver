USE $MAIN$;

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
SET @role_id = (SELECT id FROM role WHERE identifier='starter');

INSERT INTO domain (`name`, `description`) VALUES ('hydro-ALTAMIRA', 'Domain of Thematic Group ALTAMIRA');
SET @domain_id = (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,@domain_id FROM usr as u WHERE u.level = 2 OR u.level = 3 ;

INSERT INTO domain (`name`, `description`) VALUES ('hydro-SMHI', 'Domain of Thematic Group SMHI');
SET @domain_id = (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,@domain_id FROM usr as u WHERE u.level = 2 OR u.level = 3 ;

INSERT INTO domain (`name`, `description`) VALUES ('hydro-DEIMOS', 'Domain of Thematic Group DEIMOS');
SET @domain_id = (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO rolegrant (id_usr,id_role,id_domain) SELECT u.id,@role_id,@domain_id FROM usr as u WHERE u.level = 2 OR u.level = 3 ;
-- RESULT

-- Update domain of existing wpsjobs...\
UPDATE wpsjob SET id_domain = (SELECT id_domain FROM rolegrant WHERE rolegrant.id_usr = wpsjob.id_usr AND rolegrant.id_role=1);
-- RESULT

-- Update domain of existing data packages...\
UPDATE resourceset SET id_domain = (SELECT id_domain FROM rolegrant WHERE rolegrant.id_usr = resourceset.id_usr AND rolegrant.id_role=1);
-- RESULT

