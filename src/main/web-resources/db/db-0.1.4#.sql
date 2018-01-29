USE $MAIN$;

/*****************************************************************************/

-- update table config ... \
INSERT IGNORE INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('SmtpPort', '2', '12', '0', 'string', 'SMTP Server Hostname', 'Enter the smtp port that is used for sending e-mails', '587', '1');
INSERT IGNORE INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('SmtpSSL', '2', '13', '0', 'bool', 'SMTP Server Hostname', 'Enter the ssl enbales or not that is used for sending e-mails', 'true', '1');
INSERT IGNORE INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('t2portal-usr-endpoint', NULL, NULL, '0', 'string', 'T2portal user endpoint', 'Enter the t2portal user endpoint', 'https://www.terradue.com/t2api/sso/user', '1');
INSERT IGNORE INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('t2portal-sso-token', NULL, NULL, '0', 'string', 'T2portal sso token', 'Enter the t2portal sso token', 'TO_BE_UPDATED', '1');
INSERT IGNORE INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('t2portal-usrinfo-endpoint', NULL, NULL, '0', 'string', 'T2portal user endpoint', 'Enter the t2portal user endpoint', 'https://www.terradue.com/t2api/private/user/info', '1');
INSERT IGNORE INTO config (name, id_section, pos, internal, type, caption, hint, value, optional) VALUES ('t2portal-safe-token', NULL, NULL, '0', 'string', 'T2portal sso token', 'Enter the t2portal sso token', 'TO_BE_UPDATED', '1');
UPDATE config SET value='smtp-relay.gmail.com' WHERE name='SmtpHostname';
UPDATE config SET value='support@terradue.com' WHERE name='SmtpUsername';
UPDATE config SET value='TO_BE_UPDATED' WHERE name='SmtpPassword';
-- RESULT