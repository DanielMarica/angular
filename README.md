# 🎴 Playing Cards - Application Angular

Application Angular standalone pour gérer une collection de cartes de monstres avec authentification.

> 📺 **Projet basé sur le tutoriel** : [SimpleTechProd - API REST avec HttpClient](https://simpletechprod.com/?lesson=13-api-rest-avec-httpclient)
> 
> 🔗 **Backend GitLab** : `git@gitlab.com:simpletechprod1/playing_cards_backend.git`

## 📋 Table des matières

- [Architecture du projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancer l'application](#lancer-lapplication)
- [Fonctionnement de l'application](#fonctionnement-de-lapplication)
- [Commandes Angular CLI](#commandes-angular-cli)
- [Structure des dossiers](#structure-des-dossiers)

---

## 🏗️ Architecture du projet

### Composants principaux

```
src/app/
├── components/          # Composants réutilisables
│   ├── playing-card/   # Carte de monstre
│   ├── search-bar/     # Barre de recherche
│   └── delete-monster-confirmation-dialog/
├── pages/              # Pages de l'application
│   ├── login/         # Page de connexion
│   ├── monster-list/  # Liste des monstres
│   ├── monster/       # Formulaire création/édition
│   └── not-found/     # Page 404
├── services/          # Services (API calls)
│   ├── monster/       # CRUD monstres
│   └── login/         # Authentification
├── guards/            # Guards de navigation
│   └── is-logged-in/  # Vérifie si l'utilisateur est connecté
├── interceptors/      # HTTP Interceptors
│   └── auth-token/    # Ajoute le token aux requêtes
├── model/            # Classes Model
├── interfaces/       # Interfaces TypeScript
└── utils/            # Utilitaires et constantes
```

---

## 🔧 Prérequis

- **Node.js** (v18 ou supérieur)
- **npm** (v9 ou supérieur)
- **Angular CLI** (v19 ou supérieur)

```bash
# Installer Angular CLI globalement
npm install -g @angular/cli
```

---

## 📦 Installation

### Cloner les projets

```bash
# Backend Django
git clone git@gitlab.com:simpletechprod1/playing_cards_backend.git
cd playing_cards_backend

# Suivre les instructions du README backend pour :
# - Créer l'environnement virtuel
# - Installer les dépendances
# - Créer un superuser
# - Lancer le serveur

# Frontend Angular (votre projet)
cd ..
git clone <url-de-votre-projet-frontend>
cd playing-cards-frontend
npm install
```

---

## 🚀 Lancer l'application

### Backend (Django)

```bash
# Dans le dossier backend
cd playing_cards_backend
source .venv/bin/activate

# Si première fois, créer un superuser
./manage.py createsuperuser
# Username: votre_nom
# Email: votre@email.com
# Password: votre_mot_de_passe

# Lancer le serveur
./manage.py runserver
```

Le backend sera accessible sur `http://localhost:8000`

**Endpoints disponibles :**
- `POST /sessions/login/` - Connexion
- `GET /sessions/logout/` - Déconnexion
- `GET /sessions/me/` - Informations utilisateur
- `GET /monsters/` - Liste des monstres
- `POST /monsters/` - Créer un monstre
- `GET /monsters/:id/` - Détails d'un monstre
- `PUT /monsters/:id/` - Modifier un monstre
- `DELETE /monsters/:id/` - Supprimer un monstre

**Admin Django :** `http://localhost:8000/admin`
**Swagger API :** `http://localhost:8000/api/swagger-ui/`

### Frontend (Angular)

```bash
# Dans le dossier frontend
ng serve

# Ou pour ouvrir automatiquement le navigateur
ng serve --open
```

L'application sera accessible sur `http://localhost:4200`

---

## 🎯 Fonctionnement de l'application

### 1. **Authentification**

```typescript
// LoginService (services/login/login.ts)
login(credentials: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(BASE_URL + 'login/', credentials).pipe(
    tap(response => {
      // Stocke le token dans localStorage
      localStorage.setItem('token', response.token);
      // Met à jour le signal user
      this.user.set(response.user);
    })
  );
}
```

**Flow d'authentification :**
1. L'utilisateur saisit ses identifiants sur `/login`
2. Le service envoie une requête POST à `/sessions/login/`
3. Le backend retourne un token et les infos utilisateur
4. Le token est stocké dans `localStorage`
5. L'intercepteur ajoute automatiquement ce token à toutes les requêtes HTTP

### 2. **HTTP Interceptor**

```typescript
// auth-token-interceptor.ts
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });
    return next(clonedRequest);
  }
  
  return next(req);
};
```

L'intercepteur ajoute automatiquement le header `Authorization: Token xxx` à chaque requête HTTP.

### 3. **Guards de navigation**

```typescript
// is-logged-in-guard.ts
export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  if (loginService.user()) {
    return true; // Utilisateur connecté
  }
  
  // Redirige vers /login si non connecté
  return router.createUrlTree(['/login']);
};
```

**Utilisé dans les routes :**
```typescript
{
  path: 'monster',
  component: MonsterComponent,
  canActivate: [isLoggedInGuard] // Protège cette route
}
```

### 4. **Signals Angular**

L'application utilise les **signals** d'Angular (nouvelle API) :

```typescript
// Dans LoginService
user = signal<User | null>(null);

// Dans MonsterListComponent
monsters = toSignal(this.monsterService.getAll());
search = model('');

filteredMonsters = computed(() => {
  return this.monsters()?.filter(
    monster => monster.name.includes(this.search())
  ) ?? [];
});
```

### 5. **CRUD Monstres**

```typescript
// MonsterService
getAll(): Observable<Monster[]>     // GET /monsters/
get(id: number): Observable<Monster> // GET /monsters/:id/
add(monster: Monster): Observable<Monster> // POST /monsters/
update(monster: Monster): Observable<Monster> // PUT /monsters/:id/
delete(id: number): Observable<void> // DELETE /monsters/:id/
```

---

## 🛠️ Commandes Angular CLI

### Créer des composants

```bash
# Composant standalone simple
ng generate component pages/my-page

# Composant standalone avec routing
ng generate component pages/my-page --standalone

# Composant dans un sous-dossier
ng generate component components/my-component

# Avec options (sans fichier de test, inline styles)
ng generate component my-component --skip-tests --inline-style
```

### Créer des services

```bash
# Service simple
ng generate service services/my-service/my-service

# Service avec providedIn root
ng generate service services/api/api --skip-tests
```

### Créer des guards

```bash
# Guard fonctionnel (recommandé)
ng generate guard guards/auth/auth

# Choisir le type : CanActivate, CanDeactivate, etc.
```

### Créer des interceptors

```bash
# Interceptor fonctionnel
ng generate interceptor interceptors/logging/logging
```

### Créer des interfaces/models

```bash
# Interface TypeScript
ng generate interface interfaces/user

# Class TypeScript
ng generate class model/monster
```

### Créer des pipes

```bash
# Pipe personnalisé
ng generate pipe pipes/custom-date
```

### Créer des directives

```bash
# Directive
ng generate directive directives/highlight
```

### Autres commandes utiles

```bash
# Build pour production
ng build --configuration production

# Lancer les tests
ng test

# Lancer les tests e2e
ng e2e

# Linter le code
ng lint

# Analyser le bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

---

## 📁 Structure des dossiers recommandée

```
src/
├── app/
│   ├── components/           # Composants réutilisables (dumb components)
│   │   ├── playing-card/
│   │   ├── search-bar/
│   │   └── modal/
│   ├── pages/               # Pages principales (smart components)
│   │   ├── login/
│   │   ├── home/
│   │   └── monster/
│   ├── services/            # Services Angular
│   │   ├── monster/
│   │   └── auth/
│   ├── guards/              # Route guards
│   ├── interceptors/        # HTTP interceptors
│   ├── directives/          # Directives personnalisées
│   ├── pipes/              # Pipes personnalisés
│   ├── model/              # Classes Model
│   ├── interfaces/         # Interfaces TypeScript
│   ├── utils/              # Fonctions utilitaires
│   ├── constants/          # Constantes
│   └── enums/             # Enumerations
├── assets/                 # Images, fonts, etc.
├── environments/           # Configuration par environnement
└── styles/                # Styles globaux
```

---

## 🎨 Conventions de nommage

### Fichiers
- **Composants** : `my-component.ts`, `my-component.html`, `my-component.css`
- **Services** : `my-service.service.ts`
- **Guards** : `auth.guard.ts`
- **Interceptors** : `logging.interceptor.ts`
- **Interfaces** : `user.interface.ts` ou `user.ts`
- **Models** : `monster.model.ts` ou `monster.ts`

### Classes
- **Composants** : `MyComponent` (PascalCase)
- **Services** : `MyService`
- **Interfaces** : `IUser` ou `User`
- **Enums** : `MonsterType`

### Variables et fonctions
- **camelCase** : `myVariable`, `getUserName()`
- **Constantes** : `SNAKE_CASE` ou `camelCase`

---

## 🔐 Sécurité

### Stockage du token
Le token est actuellement stocké dans `localStorage`. Pour plus de sécurité en production :
- Utiliser des **HTTP-only cookies**
- Implémenter un **refresh token**
- Ajouter une expiration au token

### CORS
Le backend Django doit autoriser les requêtes depuis `http://localhost:4200` :
```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
]
```

---

## 🐛 Debugging

### Erreur 401 Unauthorized
1. Vérifier que le token est stocké : `localStorage.getItem('token')`
2. Vérifier que l'interceptor ajoute le header
3. Vérifier le format du token attendu par le backend

### Composant non trouvé
1. Vérifier l'import dans `app.routes.ts`
2. S'assurer d'importer le **composant** et non la classe model
3. Vider le cache du navigateur (Ctrl + Shift + R)

### Styles non appliqués
1. Utiliser `::ng-deep` pour les composants Material
2. Désactiver l'encapsulation : `encapsulation: ViewEncapsulation.None`
3. Utiliser des styles globaux dans `styles.css`

---

## 📚 Ressources

- [Documentation Angular](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.io)
- [RxJS](https://rxjs.dev)
- [Tutoriel SimpleTechProd - API REST avec HttpClient](https://simpletechprod.com/?lesson=13-api-rest-avec-httpclient)
- [Backend Playing Cards - GitLab](https://gitlab.com/simpletechprod1/playing_cards_backend)

---

## 🎓 À propos du tutoriel

Ce projet suit la série de tutoriels **SimpleTechProd** sur Angular et l'intégration d'API REST.

### Concepts couverts :
- ✅ Composants Angular standalone
- ✅ Routing et navigation
- ✅ HttpClient et appels API
- ✅ Authentification JWT
- ✅ HTTP Interceptors
- ✅ Route Guards
- ✅ Signals Angular (nouvelle API)
- ✅ Reactive Forms
- ✅ Angular Material

### Série de tutoriels recommandée :
1. Introduction à Angular
2. Composants et templates
3. Services et injection de dépendances
4. Routing
5. **API REST avec HttpClient** ← Ce projet
6. Authentification
7. Guards et interceptors

---

## 📝 License

Ce projet est un exemple éducatif. Utilisez-le librement pour apprendre Angular !

---

## 👨‍💻 Contribution

Pour contribuer :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request