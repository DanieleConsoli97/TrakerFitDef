# 🏋️‍♂️ TrakerFitDef - Frontend React

TrakerFitDef è il frontend React di una piattaforma completa per il tracciamento degli allenamenti, pensata per utenti che desiderano monitorare i propri progressi e per amministratori che gestiscono il catalogo esercizi.

---

## 🚀 Funzionalità Principali

- **Autenticazione sicura**: Registrazione, login, refresh e logout tramite JWT.
- **Gestione profilo**: Modifica dati personali e cambio password.
- **Sessioni di allenamento**: Crea, visualizza, modifica e cancella sessioni.
- **Aggiunta esercizi e set**: Associa esercizi alle sessioni e registra ogni set (ripetizioni/peso).
- **Storico e progressi**: Consulta tutte le sessioni passate e i massimali personali.
- **Gestione catalogo (admin)**: CRUD su esercizi, categorie e tipi.
- **Modalità scura**: Tema chiaro/scuro integrato.
- **UI moderna**: Basata su [HeroUI](https://heroui.com/) e Tailwind CSS v3.

---

## 🛠️ Stack Tecnologico

- **Frontend**: React + Vite
- **UI**: HeroUI, Tailwind CSS v3
- **Routing**: React Router
- **Gestione stato**: React Context/State
- **Backend**: [Allenamento App - API Backend](../BackendFitnessControl/readme.md)

---

## 📦 Installazione

1. **Clona il repository**
    ```bash
    git clone <url_del_tuo_repository>
    cd TrakerFitDef
    ```

2. **Installa le dipendenze**
    ```bash
    npm install
    ```

3. **Configura l'ambiente**
    - Crea un file `.env` nella root e imposta la variabile `VITE_API_URL` con l'URL del backend, ad esempio:
      ```
      VITE_API_URL=http://localhost:3000/api
      ```

4. **Avvia il progetto**
    ```bash
    npm run dev
    ```

---

## ⚙️ Configurazione UI & Tema

- **Tailwind CSS**: Assicurati di usare la versione 3.x per la compatibilità con HeroUI.
- **Modalità scura**: Gestita tramite `ThemeProvider` (`src/ThemeProvider.jsx`). Puoi cambiare tema con uno switch nell'interfaccia.
- **Personalizzazione**: Modifica i colori nel file `tailwind.config.js` se desideri personalizzare il tema.

---

## 📚 Struttura delle Cartelle Principali
