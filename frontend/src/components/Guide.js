import React from 'react'

const Guide = () => {
  return (
    <div>
      <h2>Ohjeita sovelluksen käyttöön</h2>
      <h3>Uuden viinin lisääminen</h3>
      <p>
        <b>Ennen uuden viinin lisäämistä:</b>
      </p>
      <p>
        Tarkasta, onko kyseinen viini jo lisätty sovellukseen.
        Jos on, älä lisää sitä uudestaan, vaan kirjoita arvostelusi olemassa olevalle sivulle.<br />
        <i>Vinkki: viinien etsimistä helpottaa etusivun suodattimien käyttö.</i>
      </p>
      <p>
        Jos viiniä ei löytynyt sovelluksesta, voit rekisteröitynä käyttäjänä lisätä sen sovellukseen lisää viini -sivulta.
        Kirjoita kenttään <b>nimi</b> viinin nimi mahdollisimman tarkasti. Nimen olisi hyvä pitää sisällään ainakin viinin valmistaja sekä tuotenimi.
        Mahdollisimman täsmällinen nimi helpottaa viinin löytämistä suodattimia käyttämällä. Esimerkki viinin nimestä: <i>Torres Sangre de Toro.</i>
      </p>
      <p>
        Kentästä <b>tyyppi</b> voit valita valikosta, minkä tyyppisestä viinistä on kyse.
        Mikääli valikosta ei löydy sopivaa vastinetta kuvaamaan lisäämäsi viinin tyyppiä, valitse vaihtoehto <i>muu.</i>
      </p>
      <p>
        Kentästä <b>maa</b> voit valita valikosta, minkä maalainen viini on kyseessä. Valikosta löytyy vain osa viiniä tuottavista maista, joten jos et löydä sieltä
        kyseisen viinin kotimaata, valitse <i>muu.</i>
      </p>
      <p>
        Kenttä <b>alue</b> on tekstikenttä, johon voit syöttää alueen, josta kyseinen viini on kotoisin.
        Voit itse valita millä tarkkuudella haluat alueen syöttää, mutta tarkoitus olisi pitää kohta mahdollisimman informatiivisena,
        jolloin alueet kannattaa pitää suhteellisen laajoina, esim. <i>Bordeaux</i> tai <i>Toscana</i>. Jos kyseessä on huippuviini,
        jonka alue on tarkemmin mainittu, pääsee sen todennäköisesti mainitsemaan seuraavassa kentässä.
        <b>Jos et tiedä viinin aluetta maata tarkemmin, jätä tämä kenttä tyhjäksi.</b>
      </p>
      <p>
        Kenttään <b>laatuluokitus</b> voit kirjoittaa kyseisen viinin laatuluokituksen (esim. AOC, DOCG, DO tai IGP sekä mahdolliset Cru-merkinnät).
        Laatuluokituksen yhteydessä tulee tyypillisesti myös ilmi viinin tarkempi alkuperä.
        Esimerkki hyvästä laatuluokitusmerkinnästä tähän kenttään on <i>DOCG Barolo</i> tai <i>Romanée-Conti Grand Cru.</i>
      </p>
      <p>
        Kenttään <b>rypäleet</b> voit kirjoittaa pilkulla erotettuna rypäleet, joista kyseinen viini on valmistettu.
        Jos rypäleet eivät ole tiedossa, voit jättää kentän tyhjäksi. Hyvä esimerkki syötteestä tähän kenttään on<i>cabernet sauvignon, merlot.</i>
      </p>
    </div>
  )
}

export default Guide