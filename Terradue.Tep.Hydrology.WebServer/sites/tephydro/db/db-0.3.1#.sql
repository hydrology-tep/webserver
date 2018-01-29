USE $MAIN$;

-- Adding priv...\
SET @type_id = (SELECT id FROM type WHERE class='Terradue.Portal.ComputingResource, Terradue.Portal');
SET @priv_pos = (SELECT MAX(pos) FROM priv);
INSERT INTO priv (id_type, identifier, operation, pos, name, enable_log) VALUES
    (@type_id, 'cr-u', 'u', @priv_pos + 1, 'Computing resources: use', 1);

SET @type_id = (SELECT id FROM type WHERE class='Terradue.Portal.Catalogue, Terradue.Portal');
SET @priv_pos = (SELECT MAX(pos) FROM priv);
INSERT INTO priv (id_type, identifier, operation, pos, name, enable_log) VALUES
    (@type_id, 'catalogue-u', 'u', @priv_pos + 1, 'Catalogue: use', 1);

SET @type_id = (SELECT id FROM type WHERE class='Terradue.Portal.Series, Terradue.Portal');
SET @priv_pos = (SELECT MAX(pos) FROM priv);
INSERT INTO priv (id_type, identifier, operation, pos, name, enable_log) VALUES
    (@type_id, 'series-u', 'u', @priv_pos + 1, 'Series: use', 1);

SET @type_id = (SELECT id FROM type WHERE class='Terradue.Portal.PublishServer, Terradue.Portal');
SET @priv_pos = (SELECT MAX(pos) FROM priv);
INSERT INTO priv (id_type, identifier, operation, pos, name, enable_log) VALUES
    (@type_id, 'pubserver-u', 'u', @priv_pos + 1, 'Publish server: use', 1);

SET @type_id = (SELECT id FROM type WHERE class='Terradue.Portal.Service, Terradue.Portal');
SET @priv_pos = (SELECT MAX(pos) FROM priv);
INSERT INTO priv (id_type, identifier, operation, pos, name, enable_log) VALUES
    (@type_id, 'service-u', 'u', @priv_pos + 1, 'Service: use', 1);
SET @priv_id = (SELECT LAST_INSERT_ID());
-- RESULT

-- Adding priv for roles...\
SET @role_id = (SELECT id FROM role WHERE identifier='starter');
INSERT INTO role_priv (id_role, id_priv) VALUES (@role_id, @priv_id);

SET @role_id = (SELECT id FROM role WHERE identifier='explorer');
INSERT INTO role_priv (id_role, id_priv) VALUES (@role_id, @priv_id);
-- RESULT
