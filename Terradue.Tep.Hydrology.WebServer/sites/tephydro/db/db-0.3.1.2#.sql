USE $MAIN$;

-- Changing table and foreign key names of *_priv tables to *_perm for new terminology (roles, privilege/permission) ... \
ALTER TABLE cr_priv RENAME TO cr_perm;
-- CHECKPOINT C-06a1
ALTER TABLE cr_perm
    DROP FOREIGN KEY fk_cr_priv_cr,
    DROP FOREIGN KEY fk_cr_priv_usr,
    DROP FOREIGN KEY fk_cr_priv_grp,
    ADD CONSTRAINT fk_cr_perm_cr FOREIGN KEY (id_cr) REFERENCES cr(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_cr_perm_usr FOREIGN KEY (id_usr) REFERENCES usr(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_cr_perm_grp FOREIGN KEY (id_grp) REFERENCES grp(id) ON DELETE CASCADE
;
-- CHECKPOINT C-06a2

ALTER TABLE series_priv RENAME TO series_perm;
-- CHECKPOINT C-06b1
ALTER TABLE series_perm
    DROP FOREIGN KEY fk_series_priv_series,
    DROP FOREIGN KEY fk_series_priv_usr,
    DROP FOREIGN KEY fk_series_priv_grp,
    ADD CONSTRAINT fk_series_perm_series FOREIGN KEY (id_series) REFERENCES series(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_series_perm_usr FOREIGN KEY (id_usr) REFERENCES usr(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_series_perm_grp FOREIGN KEY (id_grp) REFERENCES grp(id) ON DELETE CASCADE
;
-- CHECKPOINT C-06b2

ALTER TABLE producttype_priv RENAME TO producttype_perm;
-- CHECKPOINT C-06c1
ALTER TABLE producttype_perm
    DROP FOREIGN KEY fk_producttype_priv_producttype,
    DROP FOREIGN KEY fk_producttype_priv_usr,
    DROP FOREIGN KEY fk_producttype_priv_grp,
    ADD CONSTRAINT fk_producttype_perm_producttype FOREIGN KEY (id_producttype) REFERENCES producttype(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_producttype_perm_usr FOREIGN KEY (id_usr) REFERENCES usr(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_producttype_perm_grp FOREIGN KEY (id_grp) REFERENCES grp(id) ON DELETE CASCADE
;
-- CHECKPOINT C-06c2

ALTER TABLE resourceset_priv RENAME TO resourceset_perm;
-- CHECKPOINT C-06d1
ALTER TABLE resourceset_perm
    DROP FOREIGN KEY fk_resourceset_priv_resourceset,
    DROP FOREIGN KEY fk_resourceset_priv_usr,
    DROP FOREIGN KEY fk_resourceset_priv_grp,
    ADD CONSTRAINT fk_resourceset_perm_resourceset FOREIGN KEY (id_resourceset) REFERENCES resourceset(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_resourceset_perm_usr FOREIGN KEY (id_usr) REFERENCES usr(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_resourceset_perm_grp FOREIGN KEY (id_grp) REFERENCES grp(id) ON DELETE CASCADE
;
-- CHECKPOINT C-06d2

ALTER TABLE pubserver_priv RENAME TO pubserver_perm;
-- CHECKPOINT C-06e1
ALTER TABLE pubserver_perm
    DROP FOREIGN KEY fk_pubserver_priv_pubserver,
    DROP FOREIGN KEY fk_pubserver_priv_usr,
    DROP FOREIGN KEY fk_pubserver_priv_grp,
    ADD CONSTRAINT fk_pubserver_perm_pubserver FOREIGN KEY (id_pubserver) REFERENCES pubserver(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_pubserver_perm_usr FOREIGN KEY (id_usr) REFERENCES usr(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_pubserver_perm_grp FOREIGN KEY (id_grp) REFERENCES grp(id) ON DELETE CASCADE
;
-- CHECKPOINT C-06e2

ALTER TABLE service_priv RENAME TO service_perm;
-- CHECKPOINT C-06f1
ALTER TABLE service_perm
    DROP FOREIGN KEY fk_service_priv_service,
    DROP FOREIGN KEY fk_service_priv_usr,
    DROP FOREIGN KEY fk_service_priv_grp,
    ADD CONSTRAINT fk_service_perm_service FOREIGN KEY (id_service) REFERENCES service(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_service_perm_usr FOREIGN KEY (id_usr) REFERENCES usr(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_service_perm_grp FOREIGN KEY (id_grp) REFERENCES grp(id) ON DELETE CASCADE
;
-- CHECKPOINT C-06f2

ALTER TABLE safe_priv RENAME TO safe_perm;
-- CHECKPOINT C-06g1
ALTER TABLE safe_perm
    DROP FOREIGN KEY fk_safe_priv_safe,
    DROP FOREIGN KEY fk_safe_priv_usr,
    DROP FOREIGN KEY fk_safe_priv_grp,
    ADD CONSTRAINT fk_safe_perm_safe FOREIGN KEY (id_safe) REFERENCES safe(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_safe_perm_usr FOREIGN KEY (id_usr) REFERENCES usr(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_safe_perm_grp FOREIGN KEY (id_grp) REFERENCES grp(id) ON DELETE CASCADE
;
-- CHECKPOINT C-06g2
-- NORESULT
-- OK

/*****************************************************************************/

-- Changing table comments for new terminology (roles, privilege/permission) ... \
ALTER TABLE priv COMMENT = 'Privileges';
ALTER TABLE role COMMENT = 'Roles for users or groups';
ALTER TABLE role_priv COMMENT = 'Associations of privileges to roles';
ALTER TABLE cr_perm COMMENT = 'User/group permissions on computing resources';
ALTER TABLE series_perm COMMENT = 'User/group permissions on series';
ALTER TABLE producttype_perm COMMENT = 'User/group permissions on product types';
ALTER TABLE resourceset_perm COMMENT = 'User/group permissions on resource sets';
ALTER TABLE pubserver_perm COMMENT = 'User/group permissions on publish servers';
ALTER TABLE service_perm COMMENT = 'User/group permissions on services';
ALTER TABLE safe_perm COMMENT = 'User/group permissions on safes';
-- NORESULT
-- OK
-- CHECKPOINT C-08

/*****************************************************************************/

ALTER TABLE wpsjob_priv RENAME TO wpsjob_perm;
ALTER TABLE wpsjob_perm
    DROP FOREIGN KEY fk_wpsjob_priv_wpsjob,
    DROP FOREIGN KEY fk_wpsjob_priv_usr,
    DROP FOREIGN KEY fk_wpsjob_priv_grp,
    ADD CONSTRAINT fk_wpsjob_perm_wpsjob FOREIGN KEY (id_wpsjob) REFERENCES wpsjob(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_wpsjob_perm_usr FOREIGN KEY (id_usr) REFERENCES usr(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_wpsjob_perm_grp FOREIGN KEY (id_grp) REFERENCES grp(id) ON DELETE CASCADE
;
-- CHECKPOINT C-06f2
