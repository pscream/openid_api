# OpenID with Keycloak & ASP.NET Web API

A PoC for Keycloak with OpenID authentication

Install Keycloak as a container

docker run -p 8088:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.1 start-dev

Port 8088 is specified as an alternative, which is usually not used by any application.

Mind the 'Web Origins' parameter when setting Keycloak server up. It must be 'http://localhost:3000' without a trailing slash, NOT 'http://localhost:3000/'

Create a new realm named 'openid_api'.

Create a client under the 'openid_api' realm named 'oid-spa'.

Create a user, create a new client role (not a realm role), and assign that role to the user.


https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter
yarn add keycloak-js 
yarn dev