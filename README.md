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
- **Sincronizzazione con Dropbox** (facoltativa): obiettivi, note e documenti allineati
  su tutti i tuoi dispositivi.

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

## Sincronizzazione tra dispositivi (facoltativa)

Di base i dati restano **solo nel browser** in cui li inserisci: il cellulare non vede
l'albero del computer. Hai due strade.

### A) Senza configurare nulla — Esporta / Importa

Sul primo dispositivo premi **Esporta** (ottieni un file `.json`), portalo sul secondo
(email, chat, cloud) e premi **Importa**. È anche il tuo backup, e include gli allegati.

### B) Sincronizzazione automatica con il tuo Dropbox

L'app può salvare tutto — obiettivi, note, scadenze **e i documenti allegati** — in un
singolo file dentro il tuo Dropbox, e allinearlo su ogni dispositivo collegato.

**Configurazione (una volta sola, ~3 minuti):**

1. Vai su <https://www.dropbox.com/developers/apps> e premi *Create app*.
2. Scegli **Scoped access** e poi **App folder**: l'app vedrà soltanto la propria
   cartella (`Applicazioni/…`), mai il resto del tuo Dropbox.
3. Nella scheda **Permissions** attiva queste **tre** voci e premi *Submit*:
   `files.metadata.read`, `files.content.read`, `files.content.write`.
   Se `account_info.write` è spuntato, toglilo. `account_info.read` non è
   disattivabile (Dropbox lo impone a tutte le app), ma **l'app non lo richiede**
   durante l'autorizzazione, quindi non riceve accesso ai dati del tuo account.
4. Nella scheda **Settings**, in *Redirect URIs*, aggiungi l'indirizzo esatto dove
   pubblichi l'app, ad esempio `https://TUO-UTENTE.github.io/albero-degli-obiettivi/`
   (barra finale inclusa).
5. Copia la **App key** e incollala nel file `sync-config.js`.
6. Apri l'app, premi **Sincronizza → Collega il mio Dropbox** e autorizza.
   Ripeti il collegamento su ogni dispositivo: i dati si allineano da soli.

**Come funziona:** l'app invia le modifiche poco dopo ogni salvataggio e ricontrolla
Dropbox ogni 20 secondi (e a ogni ritorno sulla pagina). Il file salvato è
`albero-obiettivi.json`, nella cartella dell'app.

**Da sapere, con onestà:**

- L'autorizzazione avviene sulla schermata ufficiale di Dropbox: l'app non vede mai la
  tua password. Usa il flusso **PKCE**, quindi la *App key* non è un segreto e può stare
  in un repository pubblico.
- L'app richiede esplicitamente **solo i tre permessi sui file**: nella pagina delle app
  collegate di Dropbox deve comparire soltanto l'accesso alla cartella dell'app.
- Il collegamento resta salvato in quel browser: **evita computer condivisi** e usa
  *Scollega* quando hai finito. Puoi revocare l'accesso anche dalle impostazioni di Dropbox.
- Se modifichi da due dispositivi nello stesso momento, l'app **rileva il conflitto** e
  scarica la versione remota invece di sovrascriverla. Il pulsante *Forza invio* permette,
  consapevolmente, di far vincere la copia locale.
- Gli allegati sono inclusi nella sincronizzazione: tienili comunque ragionevoli
  (max 4 MB l'uno), perché il file cresce con loro.
- Installazione come app e collegamento Dropbox richiedono **HTTPS**: da GitHub Pages
  funziona, aprendo il file da disco no.
- I permessi sono legati all'autorizzazione: se li modifichi dopo esserti collegato,
  premi **Scollega** e ricollega, altrimenti il token continua a usare quelli vecchi.

**Se resta "in attesa" e non sincronizza:** quasi sempre manca il permesso
`files.metadata.read`, oppure i permessi sono stati aggiunti dopo il collegamento.
Aggiungili nella scheda *Permissions*, poi *Scollega* e ricollega. L'app ora mostra il
motivo preciso dell'errore sotto al pulsante *Sincronizza* e in fondo alla pagina.

## Scorciatoie

- `Ctrl/Cmd + Z` — annulla · `Ctrl/Cmd + Y` (o `Ctrl/Cmd + Shift + Z`) — ripeti
- `/` — vai alla ricerca · `Esc` — chiudi finestre / modifica

## Privacy e dati

Tutto è salvato localmente nel browser tramite `localStorage` (se non attivi la sincronizzazione). Cancellando i dati
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
