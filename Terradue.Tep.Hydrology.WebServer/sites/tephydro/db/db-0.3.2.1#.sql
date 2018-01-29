USE $MAIN$;

-- update table config ... \
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('reCaptcha-public', 'string', 'Google reCaptcha secret', 'Enter the name of the Google reCaptcha secret', 'TO_BE_UPDATED', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('reCaptcha-secret', 'string', 'Google reCaptcha secret', 'Enter the name of the Google reCaptcha secret', 'TO_BE_UPDATED', '0');
-- RESULT

-- Add config...\
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('sso-eosso-secret', 'string', 'Eosso secret password', 'Eosso secret password', 'TBD', '0');
UPDATE config SET value='https://www.terradue.com/t2api/eosso/user' WHERE name='t2portal-usr-endpoint';
-- RESULT

-- table wpsjob
ALTER TABLE wpsjob CHANGE COLUMN status_url status_url VARCHAR(400) NOT NULL COMMENT 'Wps job status url' ;
-- RESULT