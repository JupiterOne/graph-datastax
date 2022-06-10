# Development

This integration focuses on [Datastax Astra](https://astra.datastax.com/) and is
using
[Astra DevOps API](https://docs.datastax.com/en/astra/docs/_attachments/devopsv2.html)
for interacting with the Datastax resources.

## Provider account setup

1. Sign-up for a Datastax account
2. In the dashboard, click on Current Organization > Organization Settings
3. Go to Role Management > Add Custom Role and create a role
4. Set the name of the custom role
5. Check the following roles:

   - View DB
   - Read IP Access List
   - Read User
   - Read Organization
   - Read Custom Role

6. Enable "Apply permissions to all databases in this organization"
7. Click Create Role
8. Go to Token Management
9. Under Select Role, click the role you created
10. Save the details.

## Authentication

Provide the `ORANIZATION_NAME` and the `TOKEN` to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.

The API Key will be used to authorize requests using token authentication.
