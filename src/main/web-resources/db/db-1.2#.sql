USE $MAIN$;

-- Update config...\
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('hep-contact-mailaddress', 'string', 'hep-contact-mailaddress', 'hep-contact-mailaddress', 'contact@hydrology-tep.eu', '0');
INSERT INTO config (`name`, `type`, `caption`, `hint`, `value`, `optional`) VALUES ('dashboard_page', 'string', 'dashboard_page', 'dashboard_page', 'https://hydrology-tep.eu/guest', '0');
-- RESULT
