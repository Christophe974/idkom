# iDkom - Infrastructure & Deploiement

> Document de reference de l'infrastructure du site www.idkom.fr
> Mis a jour apres la bascule vers Vercel du 20 fevrier 2026.

---

## 1. Architecture en production

```
                    +-------------------+
                    |    DNS OVH        |
                    +-------------------+
                            |
            +---------------+---------------+
            |               |               |
    www.idkom.fr      api.idkom.fr     ovh.idkom.fr
    (CNAME Vercel)    (A record OVH)   (A record OVH)
            |               |               |
    +-------v-------+ +----v----+   +------v------+
    |   VERCEL      | | OVH    |   | OVH         |
    |   Next.js 16  | | API PHP|   | Legacy      |
    |   Frontend    | | Admin  |   | /demo/       |
    |               | | CMS    |   | /gestionstock|
    +---------------+ +---------+   +-------------+
                          |
                    +-----v-----+
                    |  MySQL    |
                    |  OVH     |
                    +-----------+
```

| Composant              | Tech                  | Hebergement | URL                       |
|------------------------|-----------------------|-------------|---------------------------|
| Frontend public        | Next.js 16 + React 19 | Vercel      | https://www.idkom.fr      |
| API REST               | PHP + PDO             | OVH         | https://api.idkom.fr      |
| Admin CMS              | PHP                   | OVH         | https://api.idkom.fr/admin/ |
| Base de donnees CMS    | MySQL                 | OVH         | idkom86.mysql.db          |
| Base de donnees Stock  | MySQL                 | OVH         | idkomwps2.mysql.db        |
| Legacy (demo, stock)   | PHP/HTML              | OVH         | https://ovh.idkom.fr      |

---

## 2. Configuration DNS (zone OVH)

### Enregistrements DNS actifs

```
# Frontend -> Vercel
www     CNAME   cname.vercel-dns.com.

# Domaine nu -> Vercel (redirect 307 vers www)
@       A       76.76.21.21

# API backend -> OVH
api     A       213.186.33.87
api     AAAA    2001:41d0:1:1b00:213:186:33:87

# Legacy (demo, gestionstock) -> OVH
ovh     A       213.186.33.87
```

### IP serveur OVH
`213.186.33.87` (IPv4) / `2001:41d0:1:1b00:213:186:33:87` (IPv6)

### TTL
Actuellement a 0 (defaut OVH ~300s). **Remonter a 3600s apres J+7** (27 fevrier 2026).

---

## 3. Configuration Vercel

### 3.1 Domaines

| Domaine           | Type       | Statut |
|-------------------|------------|--------|
| www.idkom.fr      | Production | ✅ Actif |
| idkom.fr          | Redirect 307 vers www | ✅ Actif |
| idkom.vercel.app  | Production | ✅ Actif (ancien lien, toujours valide) |

### 3.2 Variables d'environnement

```
NEXT_PUBLIC_API_URL=https://api.idkom.fr   (Production, Preview, Development)
```

### 3.3 Rewrites legacy (dans next.config.ts)

Les rewrites sont configures dans `next.config.ts` (pas vercel.json) pour un proxy transparent :

```typescript
async rewrites() {
  return [
    {
      source: "/demo/:path*",
      destination: "https://ovh.idkom.fr/demo/:path*",
    },
    {
      source: "/gestionstock/:path*",
      destination: "https://ovh.idkom.fr/gestionstock/:path*",
    },
  ];
},
```

**Comportement** :
- Les fichiers directs (`.html`) sont proxifies de maniere transparente (URL reste sur `www.idkom.fr`)
- Les acces par dossier (`/demo/laposte/`) sont rediriges vers `ovh.idkom.fr` (limitation Apache OVH)
- Les QR codes clients pointent vers des fichiers `.html` donc fonctionnent correctement

---

## 4. Configuration OVH

### 4.1 Multisite

| Sous-domaine     | Dossier racine | SSL    |
|------------------|----------------|--------|
| idkom.fr         | ./www          | Actif  |
| www.idkom.fr     | ./www          | Actif  |
| api.idkom.fr     | ./api          | Actif  |
| ovh.idkom.fr     | ./www          | Actif  |
| erp.idkom.fr     | ./erp          | -      |
| pulse.idkom.fr   | ./pulse        | -      |
| laposte.idkom.fr | ./laposte      | -      |

### 4.2 CORS (api/config.php)

Domaines autorises :
- `https://idkom.fr`
- `https://www.idkom.fr`
- `https://app.idkom.fr`
- `https://api.idkom.fr`
- `https://idkom.vercel.app`
- `http://localhost:3000` / 3001 / 3002 / 8888

### 4.3 .htaccess importants

- **Racine FTP** (`/`) : Force HTTPS via redirect 301
- **`/www/`** : Protection WordPress legacy, blocage bots, securite headers
- **`/www/api/`** : Force HTTPS, redirect racine vers `/admin/login.php`

---

## 5. URLs des images du stock

Dans `idkom-cms/api/catalogue-bematrix.php` :
```php
define('IMAGES_BASE_URL', 'https://idkom.fr/gestionstock/assets/images/pieces/');
```

Fonctionne grace au rewrite `/gestionstock/` dans `next.config.ts`.

---

## 6. SEO

### En place
- [x] `metadataBase` pointe sur `https://www.idkom.fr` (layout.tsx)
- [x] OpenGraph et Twitter Cards configures
- [x] `robots: { index: true, follow: true }`
- [x] Metadata par page (12 pages)
- [x] `lang="fr"` sur le HTML
- [x] Cookie consent
- [x] `src/app/sitemap.ts` — sitemap dynamique (25 URLs : 12 statiques + dynamiques)
- [x] `src/app/robots.ts` — robots.txt (bloque /api/, /admin/, /audit/, /p/, /carte/)
- [x] Google Search Console configuree (propriete domaine `idkom.fr`)
- [x] Sitemap soumis dans Search Console
- [x] Favicon SVG iDkom (`src/app/icon.svg`)
- [x] Apple Touch Icon (`src/app/apple-icon.tsx`)

### A faire
- [ ] Ajouter les structured data JSON-LD (optionnel, ameliore les rich snippets)
- [ ] Verifier les balises canonical sur chaque page
- [ ] Remonter les TTL DNS a 3600s (a partir du 27 fevrier 2026)
- [ ] Surveiller l'indexation Google pendant 2-3 semaines

---

## 7. Securite - Points a traiter

> Ces points ne bloquent pas le fonctionnement mais sont importants.

- [ ] **Credentials en dur** : les mots de passe BDD sont hardcodes dans
  `api/config.php` et `api/catalogue-bematrix.php`. Migrer vers un fichier
  `.env` exclu du repo.
- [ ] **Admin fallback** : identifiants hardcodes dans `admin/config.php`.
  A supprimer une fois un vrai compte admin cree.
- [ ] **Variables Vercel** : ne jamais mettre de secrets dans les variables
  `NEXT_PUBLIC_*` (elles sont exposees cote client).

---

## 8. Stack technique

| Element             | Version / Detail                  |
|---------------------|-----------------------------------|
| Frontend            | Next.js 16.1.6                    |
| React               | 19.2.3                            |
| TypeScript          | 5                                 |
| Styling             | Tailwind CSS 4                    |
| Backend             | PHP (procedural, PDO)             |
| BDD CMS             | MySQL `idkom86`                   |
| BDD Stock           | MySQL `idkomwps2`                 |
| API Client          | `src/lib/api.ts`                  |
| API URL             | `https://api.idkom.fr`            |
| Variable env        | `NEXT_PUBLIC_API_URL`             |
| Deploiement front   | Vercel (auto-deploy via GitHub)   |
| Deploiement back    | OVH mutualize / FTP               |
| Repo GitHub         | github.com/Christophe974/idkom    |

---

## 9. Fichiers cles

```
idkom/
├── idkom-web/                         # Frontend Next.js (Vercel)
│   ├── src/app/layout.tsx             # Metadata SEO globale
│   ├── src/app/sitemap.ts             # Sitemap dynamique
│   ├── src/app/robots.ts              # Robots.txt
│   ├── src/app/icon.svg               # Favicon SVG
│   ├── src/app/apple-icon.tsx         # Apple Touch Icon (genere PNG)
│   ├── src/lib/api.ts                 # Client API + interfaces TypeScript
│   ├── next.config.ts                 # Rewrites legacy OVH
│   └── public/images/                 # Assets statiques (logos, etc.)
│
├── idkom-cms/                         # Backend PHP (OVH)
│   ├── api/config.php                 # Config DB + CORS (NE PAS MODIFIER LES CREDS)
│   ├── api/catalogue-bematrix.php     # API stock (BDD separee)
│   ├── api/bookings.php               # API reservations
│   ├── api/brevo-mailer.php           # Envoi emails via Brevo
│   ├── admin/config.php               # Config admin + auth
│   ├── admin/layout.php               # Sidebar admin
│   └── sql/                           # Migrations BDD
│
└── DEPLOY-VERCEL.md                   # CE FICHIER
```

---

## 10. Historique de la bascule (20 fevrier 2026)

1. ✅ Creation DNS `ovh.idkom.fr` → A `213.186.33.87`
2. ✅ Creation multisite OVH `ovh.idkom.fr` → dossier `./www`
3. ✅ Ajout domaines dans Vercel (`www.idkom.fr` + `idkom.fr`)
4. ✅ Modification DNS `www` → CNAME `cname.vercel-dns.com.`
5. ✅ Modification DNS `@` → A `76.76.21.21`
6. ✅ Configuration variable env `NEXT_PUBLIC_API_URL` sur Vercel
7. ✅ Rewrites legacy dans `next.config.ts`
8. ✅ SSL actif sur tous les domaines
9. ✅ Sitemap + robots.txt deployes
10. ✅ Google Search Console configuree + sitemap soumis
11. ✅ Favicon + Apple Touch Icon deployes
12. ✅ Ancien lien `idkom.vercel.app` toujours fonctionnel

---

*Document mis a jour le 2026-02-20 — Bascule effectuee avec succes.*
