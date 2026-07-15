/* ============================================================
   CONFIGURAZIONE SUPABASE (facoltativa)
   ------------------------------------------------------------
   Serve se vuoi che obiettivi, note e documenti si sincronizzino
   automaticamente tra i tuoi dispositivi, protetti dal tuo account.
   Se lasci i campi vuoti l'app funziona lo stesso, salvando solo in
   locale (con Esporta/Importa sempre disponibili).

   Come ottenerli (gratis):
     1. Crea un progetto su https://supabase.com (scegli una regione
        vicina, per esempio Francoforte).
     2. Nella dashboard apri "SQL Editor" ed esegui lo script che
        trovi nel README (crea le tabelle, le regole di sicurezza
        e lo spazio per i documenti).
     3. Vai in "Project Settings" -> "API" e copia:
          - Project URL       -> supabaseUrl
          - anon public key   -> supabaseAnonKey

   La chiave "anon" NON e' un segreto: puo' stare in un repository
   pubblico. Cio' che protegge i dati sono le regole di Row Level
   Security, che consentono a ogni utente di vedere solo le proprie
   righe. Non inserire MAI qui la chiave "service_role".
   ============================================================ */

window.ALBERO_SYNC = {
  supabaseUrl: "",       // es. "https://abcdefgh.supabase.co"
  supabaseAnonKey: ""    // es. "eyJhbGciOi..."
};
