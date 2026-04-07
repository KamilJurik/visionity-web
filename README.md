# HR Visionity Day — web

Statický web pro konferenci Visionity hostovaný na GitHub Pages.

## Struktura

```
visionity-web/
├── index.html            ← celá stránka
├── style.css
├── script.js
├── CNAME                 ← custom doména pro GitHub Pages
├── data/
│   ├── speakers.json     ← přednášející (mění se každý ročník)
│   └── program.json      ← program (mění se každý ročník)
└── images/
    ├── hero-bg.jpg       ← foto pozadí hero sekce
    ├── pillar-prednasky.jpg
    ├── pillar-konzultace.jpg
    ├── pillar-networking.jpg
    ├── speakers/         ← fotky přednášejících
    └── partners/         ← loga partnerů
```

## Jak aktualizovat před každým ročníkem

### Přednášející (`data/speakers.json`)

```json
{
  "speakers": [
    {
      "name": "Jméno Příjmení",
      "title": "Pozice, Firma",
      "bio": "Krátký popis...",
      "photo": "images/speakers/jmeno.jpg",
      "linkedin": "https://linkedin.com/in/..."
    }
  ],
  "networking_note": "Volitelná poznámka k networkingu."
}
```

- Fotky ulož do `images/speakers/`
- Prázdný řetězec `"photo": ""` → zobrazí se iniciály

### Program (`data/program.json`)

```json
[
  { "time": "9:00",  "type": "break", "title": "Registrace", "speaker": "", "description": "" },
  { "time": "10:00", "type": "talk",  "title": "Název přednášky", "speaker": "Jméno", "description": "..." }
]
```

- `type`: `"talk"` (přednáška) nebo `"break"` (pauza, networking, oběd)

### Statické texty

Texty sekcí O akci, Pilíře, Předchozí ročník a Footer se editují přímo v `index.html` — hledej komentáře `⚠️ DOPLNIT`.

### Partneři

Loga ulož do `images/partners/` a přidej do `index.html` do sekcí `#mainPartners` a `#mediaPartners`:

```html
<a href="https://partner.cz" target="_blank">
  <img src="images/partners/logo.png" alt="Název partnera">
</a>
```

## GitHub Pages — nasazení

1. Vytvoř nové repo na GitHubu (např. `visionity-web`)
2. Pushni obsah tohoto adresáře
3. Nastav: Settings → Pages → Source: `main` branch, `/ (root)`
4. Pro vlastní doménu: u registrátora nastav DNS `CNAME visionity.cz → tvuj-github.github.io`

## Registrační iframe

URL formuláře je v `index.html` v sekci `#vstupenky`. Při změně formuláře stačí změnit `src` atribut `<iframe>`.
