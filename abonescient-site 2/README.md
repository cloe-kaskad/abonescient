# À bon escient · site

Site statique (HTML, CSS, JS, sans build). Hébergement prévu : Netlify, via GitHub.

## Mettre en ligne

1. **GitHub** : créer un dépôt `abonescient-site` (privé ou public), puis « uploading an existing file » et glisser tout le contenu de ce dossier (pas le dossier lui-même). Commit.
2. **Netlify** : Add new site › Import an existing project › GitHub › choisir `abonescient-site`. Laisser « Build command » vide, « Publish directory » = `.` (déjà réglé dans `netlify.toml`). Deploy.
3. Chaque modification poussée sur GitHub redéploie le site automatiquement.
4. **Domaine** : Netlify › Domain management › ajouter `abonescient.fr`, puis suivre les DNS indiqués.

## À compléter (crochets)

- Lien de prise de rendez-vous (`[URL de prise de rendez-vous, Google Calendar]`) dans toutes les pages.
- Identifiant Formspree dans `contact.html` (`https://formspree.io/f/[id]`).
- Tarifs dans `ateliers.html` (`[tarif]`, `Tarif [à définir]`).
- Mentions légales : adresse du siège, nom de la photographe. Vérifier l'adresse de Netlify.
- Google Analytics 4 : bloc commenté dans le `<head>` de chaque page.

## Structure

- `index.html`, `methode.html`, `ateliers.html`, `equipe.html`, `contact.html`, `mentions-legales.html`
- `styles.css` (charte, variables), `main.js` (apparitions au scroll, respecte `prefers-reduced-motion`)
- `photos/` (JPG optimisés), `fonts/` (Fraunces et DM Sans auto-hébergées, pas d'appel à Google)
- `og.jpg` (partage réseaux), `favicon.svg`, `sitemap.xml`, `robots.txt`, `llms.txt`, `netlify.toml`
