USE $MAIN$;

-- Update config...\
UPDATE config SET value='https://www.terradue.com/t2api/oauth?sp=hep' WHERE name='oauth-authEndpoint';
UPDATE config SET value='openid,profile,email' WHERE name='sso-scopes';
UPDATE config SET value='https://hydrology-tep.eu/t2api/cb' WHERE `name`='sso-callback';
-- RESULT

-- Update config...\
UPDATE auth SET enabled='0' WHERE identifier='umsso';
-- RESULT