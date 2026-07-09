# 🌳 Albero degli Obiettivi

App **standalone** per gestire i tuoi obiettivi con una struttura ad albero: ogni
obiettivo può ramificarsi in sotto-obiettivi annidabili all'infinito, che puoi
creare, spuntare, riordinare ed eliminare. Tutto in un **unico file HTML**, senza
build, senza dipendenze da installare, senza server.

I dati restano **solo nel tuo browser** (`localStorage`): niente account, niente cloud.

## Funzioni

- Obiettivi e sotto-obiettivi ad albero, con avanzamento che si somma verso l'alto.
- **Priorità**, **scadenze** (con avvisi per quelle vicine o scadute) ed **etichette**.
- **Note** con link cliccabili, **sotto-attività** rapide (checklist) e **documenti allegati**
  (con anteprime per le immagini), apribili direttamente dalla riga.
- **Colore** per evidenziare gli obiettivi.
- **Ricerca**, **filtri** (da fare / completati) e **ordinamento** (manuale, priorità, scadenza, alfabetico).
- **Riordino** con trascinamento (anche su smartphone) o con i pulsanti su/giù/rientra/esci.
- **Alberi multipli** con selettore, più **modelli** (Progetto a tappe, Viaggio, Trasloco, Vuoto)
  e possibilità di **salvare il proprio albero come modello**.
- **Condivisione** via WhatsApp, email o copia testo; **stampa** e **PDF** diretto; export **Markdown**.
- **Esporta / Importa** su file `.json` per backup e trasferimento.
- **Annulla / Ripeti**, **tema chiaro/scuro**, **scorciatoie da tastiera** e **promemoria** scadenze.
- **Statistiche** di completamento.

## Uso

Apri semplicemente `index.html` in un browser moderno. Nessun passaggio di installazione.

### Installare come app (il logo compare sull'icona)

L'app è una PWA: una volta pubblicata online (vedi sotto) puoi salvarla come
applicazione, con il logo verde come icona.

- **Android (Chrome):** menu ⋮ → *Installa app* / *Aggiungi a schermata Home*.
- **iPhone/iPad (Safari):** pulsante Condividi → *Aggiungi a Home*.
- **Desktop (Chrome/Edge):** icona di installazione nella barra degli indirizzi, oppure menu → *Installa*.

Nota: l'installazione richiede che la pagina sia servita via **HTTPS** (GitHub Pages
lo è). Aprendo il file `index.html` da disco (`file://`) l'icona resta visibile come
favicon, ma l'installazione come app non è disponibile.

### Pubblicare online con GitHub Pages

1. Crea un repository su GitHub e carica questi file (mantenendo `index.html` nella radice).
2. Vai in **Settings → Pages**.
3. Alla voce *Build and deployment → Source* scegli **Deploy from a branch**.
4. Seleziona il branch (`main`) e la cartella `/ (root)`, poi salva.
5. Dopo qualche istante l'app sarà online all'indirizzo indicato da GitHub
   (`https://<tuo-utente>.github.io/<nome-repo>/`).

## Scorciatoie

- `Ctrl/Cmd + Z` — annulla · `Ctrl/Cmd + Y` (o `Ctrl/Cmd + Shift + Z`) — ripeti
- `/` — vai alla ricerca · `Esc` — chiudi finestre / modifica

## Privacy e dati

Tutto è salvato localmente nel browser tramite `localStorage`. Cancellando i dati
del sito o cambiando browser/dispositivo i dati **non** si trasferiscono: usa
**Esporta** per creare un backup `.json` e **Importa** per ripristinarlo altrove.
Gli allegati sono salvati anch'essi nel browser; poiché `localStorage` ha un limite
di spazio (in genere qualche MB), tieni i documenti leggeri (max 4 MB l'uno) e usa
l'esportazione per gli archivi.

## Note tecniche

- Nessuna build: HTML + CSS + JavaScript in un solo file.
- I caratteri (Google Fonts) e le librerie per il PDF (`jsPDF`, `html2canvas`) vengono
  caricati da CDN al bisogno: online funzionano da soli; offline restano i fallback
  (caratteri di sistema e, per il PDF, la stampa del browser → *Salva come PDF*).
- Il logo è incorporato nell'app (anche come favicon). In `assets/` trovi il logo
  anche come file `logo.svg` e `logo.png` per riuso.

## Licenza

Rilasciato con licenza MIT — vedi il file [LICENSE](LICENSE).
