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
- **Sincronizzazione con Supabase** (facoltativa): account personale, dati protetti da
  Row Level Security e aggiornamenti in tempo reale su tutti i dispositivi.

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

### B) Sincronizzazione automatica con Supabase

L'app può salvare obiettivi, note e documenti in un database Supabase, protetti dal tuo
account: ogni utente vede **solo i propri dati**. Gli aggiornamenti arrivano in **tempo
reale** sugli altri dispositivi.

**1. Crea il progetto.** Vai su <https://supabase.com>, crea un progetto e scegli una
regione vicina (es. Francoforte).

**2. Prepara il database.** Apri *SQL Editor* ed esegui questo script:

```sql
-- Tabella degli alberi: una riga per albero, legata all'utente
create table public.alberi (
  id          text primary key,
  user_id     uuid not null references auth.users on delete cascade,
  nome        text,
  dati        jsonb not null default '[]'::jsonb,
  updated_at  timestamptz not null default now()
);

-- Impostazioni per utente: elenco alberi e modelli personali
create table public.impostazioni (
  user_id     uuid primary key references auth.users on delete cascade,
  dati        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- Row Level Security: ciascuno accede solo alle proprie righe
alter table public.alberi       enable row level security;
alter table public.impostazioni enable row level security;

create policy "alberi_propri" on public.alberi
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "impostazioni_proprie" on public.impostazioni
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Aggiornamenti in tempo reale
alter publication supabase_realtime add table public.alberi;

-- Spazio per i documenti allegati (bucket privato)
insert into storage.buckets (id, name, public) values ('allegati', 'allegati', false)
  on conflict (id) do nothing;

-- Ogni utente accede solo alla propria cartella dentro il bucket
create policy "allegati_propri" on storage.objects
  for all to authenticated
  using (bucket_id = 'allegati' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'allegati' and (storage.foldername(name))[1] = auth.uid()::text);
```

**3. Copia le chiavi.** In *Project Settings → API* prendi **Project URL** e **anon public
key**, e incollali in `sync-config.js`.

**4. Autorizza il tuo indirizzo.** In *Authentication → URL Configuration* imposta il
*Site URL* con l'indirizzo dove pubblichi l'app (es. `https://TUO-UTENTE.github.io/albero-degli-obiettivi/`)
e aggiungilo anche fra i *Redirect URLs*.

**5. Accedi.** Apri l'app, premi **Sincronizza**, inserisci l'email e premi *Ricevi link
di accesso*: arriva un messaggio con un link, lo apri (nello stesso browser) e sei dentro.
Nessuna password. È l'unico metodo di accesso previsto per gli utenti.

Fai lo stesso sul telefono, entrando con lo stesso account: i dati si allineano da soli.

**Da sapere, con onestà:**

- La chiave `anon` **non è un segreto** e può stare in un repository pubblico: a proteggere
  i dati sono le regole di *Row Level Security*. Non inserire mai la chiave `service_role`.
- La sicurezza dipende dalle regole SQL qui sopra: se le salti, i dati restano esposti.
  Verifica che RLS risulti attivo su entrambe le tabelle.
- I documenti allegati vengono caricati nello **Storage** di Supabase, in una cartella per
  utente, e scaricati sugli altri dispositivi quando servono.
- Se modifichi lo stesso albero da due dispositivi nello stesso istante, **vince l'ultimo
  salvataggio**. La sincronizzazione avviene per singolo albero, quindi lavorare su alberi
  diversi non crea conflitti.
- Il piano gratuito di Supabase mette in pausa i progetti inattivi da tempo: se l'app non
  sincronizza dopo settimane di inutilizzo, riattiva il progetto dalla dashboard.
- Accesso e installazione come app richiedono **HTTPS**: da GitHub Pages funziona,
  aprendo il file da disco no.

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
