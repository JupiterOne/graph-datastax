# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 - 2022-06-07

### Added

- Ingest new entities
  - `datastax_organization`
  - `datastax_database`
  - `datastax_ip_address`
  - `datastax_user`
  - `datastax_access_role`
- Build new relationships
  - `datastax_organization_has_database`
  - `datastax_database_allows_ip_address`
  - `datastax_organization_has_access_role`
  - `datastax_organization_has_user`
  - `datastax_user_has_access_role`
