/* eslint-disable no-undef */
import {useState,useEffect} from 'react'
import './App.css';

function App() {
  // declaration d'un hook
const [titleUrl,setTitleUrl] = useState('')

  // s'execute à l'ouverture de l'extension
  useEffect(()=>{
    init() 
    // ajoute un ecouter de message et renvoi la valeur dans un hook
  chrome.runtime.onMessage.addListener((request)=>{
  setTitleUrl(request.title)
})})

  // envoi le contentScript.js dans la page ciblé par tabId 
   async function init() {
    const tab = await getCurrentTab();
    chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['js/contentScript.js'] });
  }
    // Recupere les infos de l'onglet actif
    async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  return (
    <div className="App">
      <header className="App-header">
        Hello World, vous êtes sur le site {titleUrl}
      </header>
    </div>
  );
}
  
export default App;
