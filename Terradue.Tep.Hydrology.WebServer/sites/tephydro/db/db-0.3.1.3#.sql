USE $MAIN$;

-- update table config ... \
UPDATE config SET value='$(BASEURL)/#!emailconfirmation&token=$(TOKEN)' WHERE name='EmailConfirmationUrl';
-- RESULT

