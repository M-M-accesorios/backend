src/
  core/
    domain/
      entities/              # Définition des entités métier (domain objects)
      repositories/          # Interfaces des repositories (abstractions)
      use-cases/             # Logique métier principale (cas d'utilisation)
  infrastructure/
    database/
      repositories/          # Implémentations des repositories
    config/                  # Configuration de l'application (env, base de données, etc.)
    controllers/
      user/
        user.module.ts       # Module NestJS pour l'entité User
        user.controller.ts   # Contrôleur des requêtes HTTP pour User
        user.service.ts      # Service pour l'application
  application/
    dtos/                    # Objets de transfert de données (Data Transfer Objects)
    mappers/                 # Mapping entre couches (par exemple, Entity <-> DTO)
    services/                # Services d'application (orchestrateurs de logique)
  shared/                    # Code commun (types, constantes, utils, etc.)
  main.ts