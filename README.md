**EspritBook — University Library Website**

Simple, static FrontOffice and BackOffice pages for a university library project. Built with plain HTML, CSS and vanilla JavaScript so beginners can read and extend the code easily.

**Features**
- **FrontOffice:** Public landing page with hero, product/cards and responsive navigation. File: [FrontOffice/index.html](FrontOffice/index.html)
- **BackOffice:** Add-book form with beginner-friendly client-side validation. File: [BackOffice/addBook.html](BackOffice/addBook.html)
- **Local assets:** Icons and template snippets are kept locally (see `FrontOffice/icomoon/`).

**Quick Start**
- Open the site directly: double-click `FrontOffice/index.html` in your file manager and view in a browser.
- Or serve locally for full feature parity (recommended):

```bash
# from project root
python -m http.server 8000
# then open http://localhost:8000/FrontOffice/
```

**Project Structure**
- **FrontOffice:** `FrontOffice/` — public pages and styles
  - **CSS:** `FrontOffice/style.css`
  - **JS:** `FrontOffice/js/` (`main.js`, `hero.js`)
  - **Icons:** `FrontOffice/icomoon/` (copy font files here to enable icons)
- **BackOffice:** `BackOffice/` — admin pages
  - **Form:** `BackOffice/addBook.html`
  - **Validation JS:** `BackOffice/addBook.js`

**BackOffice: Add Book — Validation Rules (client-side)**
- **Title:** at least 3 characters
- **Author:** letters and spaces only, at least 3 characters
- **Publication date:** required
- **Language:** must be one of the provided options (AN or FR)
- **Status:** choose `Disponible` or `Indisponible`
- **Copies:** integer >= 1
- **Category:** must be selected

Errors are shown inline next to fields and the form also exposes an alert-style validator for quick testing.

**Fonts & Icons**
- To render icons locally, copy the font files from the template folder (e.g. `BackFrontOfficeTemplate/booksaw-1.0.0/icomoon/fonts/`) into `FrontOffice/icomoon/fonts/` so `FrontOffice/icomoon/icomoon.css` can load them.
- If you want webfonts (Prata, Raleway), add them to `FrontOffice/fonts/` and update `style.css` or use a local `@font-face` block.

**Development notes**
- Edit styles in `FrontOffice/style.css` and `BackOffice/style.css`.
- JavaScript lives in `FrontOffice/js/` and `BackOffice/addBook.js`.
- Keep template snippets small — large vendor files were intentionally not copied wholesale to keep the project beginner-friendly.

**Contributing**
- Fork, create a feature branch, commit changes, push and open a pull request. For quick local changes: commit and push to the repo remote.

**License**
- No license file included. Add a `LICENSE` (MIT, Apache-2.0, etc.) if you want to permit reuse.

**Next steps (suggested)**
- Copy the icomoon font files into `FrontOffice/icomoon/fonts/` so icons render correctly.
- Add a `LICENSE` file and a short `CONTRIBUTING.md` if you plan to accept external contributions.

---

If you want, I can commit the README for you and push it to the remote now.
# EspritBook Website

A simple static front/back office for EspritBook.
