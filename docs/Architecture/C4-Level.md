---
title: C4 Architecture Diagrams
---
# C4 Architecture Diagrams

## Level 1: System Context Diagram

This diagram shows the software system in the context of the people and other software systems it interacts with.

```mermaid
C4Context
    title System Context diagram for Pokedex Application
    Person(user, "User", "A user of the Pokedex Application.")
    System(pokedex, "Pokedex System", "Allows users to retrieve Pokemon information and translations.")
    System_Ext(pokeapi, "PokeAPI", "External Pokemon service.")
    System_Ext(translation_api, "Translation API", "External translation service (e.g., Shakespeare, Yoda).")
    Rel(user, pokedex, "Uses", "HTTPS")
    Rel(pokedex, pokeapi, "Gets pokemon data from", "HTTPS/JSON")
    Rel(pokedex, translation_api, "Gets translations from", "HTTPS/JSON")
```

## Level 2: Container Diagram

This diagram shows the high-level shape of the software architecture and how responsibilities are distributed across it.

```mermaid
C4Container
    title Container diagram for Pokedex Application
    Person(user, "User", "A user of the Pokedex Application.")
    Container_Boundary(pokedex_boundary, "Pokedex System") {
        Container(web_app, "Web API", "Node.js, Express, TypeScript", "The backend API that provides endpoints for Pokemon data.")
    }
    System_Ext(pokeapi, "PokeAPI", "External Pokemon service.")
    System_Ext(translation_api, "Translation API", "External translation service.")
    Rel(user, web_app, "Makes API calls to", "HTTPS/JSON")
    Rel(web_app, pokeapi, "Fetches data from", "HTTPS/JSON")
    Rel(web_app, translation_api, "Fetches translations from", "HTTPS/JSON")
```

## Level 3: Component Diagram

This diagram shows how the Web API container is made up of a number of "components". It follows the Clean Architecture layers.

```mermaid
C4Component
    title Component diagram for Pokedex Web API
    Container(client, "Client", "Mobile App / Web Browser", "Uses the API")
    Container_Boundary(api_boundary, "Web API Application") {
        Component(controller, "Pokemon Controller", "Infrastructure Layer", "Handles incoming HTTP requests and responses.")
        Component(get_pokemon, "GetPokemon Use Case", "Application Layer", "Orchestrates retrieving Pokemon data.")
        Component(get_translated_pokemon, "GetTranslatedPokemon Use Case", "Application Layer", "Orchestrates retrieving and translating Pokemon data.")
        Component(pokeapi_acl, "PokeAPI ACL", "Infrastructure Layer", "Implementation of Pokemon ACL using external API.")
        Component(translation_acl, "Translation ACL", "Infrastructure Layer", "Implementation of Translation ACL using external API.")
    }
    Rel(client, controller, "Makes requests to", "HTTPS")
    Rel(controller, get_pokemon, "Uses")
    Rel(controller, get_translated_pokemon, "Uses")
    Rel(get_pokemon, pokeapi_acl, "Uses")
    Rel(get_translated_pokemon, pokeapi_acl, "Uses")
    Rel(get_translated_pokemon, translation_acl, "Uses")
    System_Ext(pokeapi, "PokeAPI", "External Pokemon service.")
    System_Ext(translation_api, "Translation API", "External translation service.")
    Rel(pokeapi_acl, pokeapi, "Makes API calls to", "HTTPS")
    Rel(translation_acl, translation_api, "Makes API calls to", "HTTPS")
```
