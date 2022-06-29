# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 - 2022-06-07

### Added

- Ingest new entities
  - `datastax_access_list`
  - `datastax_access_list_address`
  - `datastax_access_role`
  - `datastax_database`
  - `datastax_organization`
  - `datastax_user`
- Build new relationships
  - `datastax_access_list_has_address`
  - `datastax_database_assigned_access_list`
  - `datastax_organization_has_access_list`
  - `datastax_organization_has_database`
  - `datastax_organization_has_user`
  - `datastax_user_assigned_access_role`
