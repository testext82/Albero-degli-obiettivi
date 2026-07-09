/* ============================================================
   CONFIGURAZIONE SINCRONIZZAZIONE DROPBOX (facoltativa)
   ------------------------------------------------------------
   Serve solo se vuoi che obiettivi, note e documenti si
   sincronizzino automaticamente tra computer e cellulare.
   Se lasci il campo vuoto l'app funziona lo stesso, salvando
   soltanto in locale su ciascun dispositivo (con Esporta/Importa
   sempre disponibili).

   Come ottenere la chiave (gratis, ~3 minuti):
     1. Vai su https://www.dropbox.com/developers/apps → "Create app".
     2. Scegli "Scoped access", poi "App folder" (l'app vedrà solo
        la propria cartella, non tutto il tuo Dropbox).
     3. Dai un nome, ad esempio "Albero degli Obiettivi".
     4. Nella scheda "Permissions" attiva queste TRE voci e premi Submit:
          files.metadata.read
          files.content.read
          files.content.write
        (se aggiungi permessi dopo esserti collegato, devi scollegare
         e ricollegare l'app: i permessi sono legati all'autorizzazione)
     5. Nella scheda "Settings", alla voce "Redirect URIs", aggiungi
        l'indirizzo esatto dove pubblichi l'app, ad esempio:
          https://TUO-UTENTE.github.io/albero-degli-obiettivi/
        (deve combaciare, barra finale inclusa).
     6. Sempre in "Settings", copia "App key" e incollala qui sotto.

   Nota: la chiave app NON è un segreto (l'app usa il flusso PKCE)
   e può stare tranquillamente in un repository pubblico.
   ============================================================ */

window.ALBERO_SYNC = {
  dropboxAppKey: "wvk86c938ixor37"   // es. "a1b2c3d4e5f6g7h"
};
