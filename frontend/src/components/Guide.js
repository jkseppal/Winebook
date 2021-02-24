import React from 'react'

const Guide = () => {
  return (
    <div className='guide'>
      <h2><i>Ohjeita sovelluksen käyttöön</i></h2>
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
        Mikäli valikosta ei löydy sopivaa vastinetta kuvaamaan lisäämäsi viinin tyyppiä, valitse vaihtoehto <i>muu.</i>
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
        Jos rypäleet eivät ole tiedossa, voit jättää kentän tyhjäksi. Hyvä esimerkki syötteestä tähän kenttään on <i>cabernet sauvignon, merlot.</i>
      </p>
      <h3>Arvostelun lisääminen</h3>
      <p>
        Rekisteröityneet käyttäjät voivat arvostella sovellukseen lisättyjä viinejä.
        Etusivulta voidaan siirtyä yksittäisen viinin sivulle painamalla kyseisen viinin nimeä.
        Viinin sivun alareunassa on rekisteröityneille käyttäjille näkyvissä lomake, jonka avulla arvostelun lisääminen tapahtuu.
      </p>
      <p>
        Lomakkeen ensimmäisessä kentässä <b>arvosteltu vuosikerta</b> valitaan valikosta se kyseisen viinin vuosikerta, joka on arvosteltu.
        Mikäli kyseessä on vuosikerraton viini (näitä on esimerkiksi suuri osa kuohuviineistä), jätetään kyseinen kenttä valitsematta (valinta --).
      </p>
      <p>
        Toiseen kenttään <b>kuvaus</b> kirjoitetaan varsinainen sanallinen arvostelu viinistä.
        Moni kokee viinin sanallisen arvioinnin aluksi jopa hieman pelottavana, mutta tämä on turhaa.
        Viinien arvostelussa ei ole keskeistä käyttää ns. oikeita termejä viinin kuvaamiseen, vaan tärkeintä on kuvata sitä niillä adjektiiveilla, jotka omasta mielestä kuvastavat viiniä parhaiten.
        Jos viinin tuoksusta tulee itselle vaikka ensimmäisenä mieleen vastaleikattu nurmikko tai kissanpissa, on ne täysin oikeita adjektiiveja arvosteluun kuvaamaan kyseistä viiniä.
        Arvostelussa hyviä asioita huomioida on esimerkiksi viinin väri, tuoksu, suutuntuma ja maku. Ja vielä tässä järjestyksessä, missä kyseiset asiat viinistä tyypillisesti havaitsee.
        On kuitenkin hyvä muistaa, että arvostelut ovat subjektiivisia, joten väärää arvostelua ei ole olemassa. Jos jostain viinistä haluaa kirjoittaa vaikka ainoastaan: pahaa, on se täysin hyväksyttävää.
      </p>
      <p>
        arvostelulomakkeen viimeisessä kentässä <b>pisteet</b> annetaan pisteet arvioidulle viinille 100 pisteen asteikolla.
        Arvioita luettaessa ja annettaessa on syytä pitää mielessä että niin pisteet kuin arvostelu ylipäätään on arvioijan subjektiivinen mielipide viinistä.
        Hyvänä ohjenuorana pisteiden antoon voi pitää seuraavaa:
      </p>
      <ul>
        <li>96-100: poikkeuksellisen hyvä viini, joka edustaa kaikkia tyylinsä toivottuja ominaisuuksia</li>
        <li>90-95: erinomainen monipuolinen ja luonteikas viini</li>
        <li>80-89: keskivertoa hieman paremmasta erittäin hyvään</li>
        <li>70-79: keskiverto</li>
        <li>60-69: keskivertoa heikompi</li>
        <li>50-59: kelvoton</li>
      </ul>
      <p>Toisin sanoen viini voi saada jo 50 pistettä ihan vain siitä hyvästä, että se on viiniä :)</p>

      <h3>Arvostelujen lukeminen</h3>
      <p>
        Yksittäisten viinien arvostelujen vierestä löytyy tykkää-nappi, jota painamalla voi antaa kyseiselle arvostelulle tykkäyksen.
        Huomiotavaa on, että tykkäys ei liity arvosteltuun viiniin, vaan sitä koskevaan arvosteluun.
        Näin ollen arvostelusta voi hyvin tykätä, vaikka kyseisestä viinistä ei pitäisikään.
      </p>
      <h3>Blogit</h3>
      <p>
        Rekisteröityneiden käyttäjien on mahdollista ylläpitää sovelluksessa omaa blogeja.
        Blogien määrää ei ole rajoitettu, joten sama käyttäjä voi pitää myös useampaa blogia, jos esimerkiksi haluaa niiden käsittelevän eri aiheita.
        Blogien aiheita ei myöskään ole mitenkään rajattu koskemaan viinejä, vaan ominaisuuden tarkoitus on toimia yleisesti helppona vaihtoehtona blogialustaksi käyttäjille.
      </p>
      <p>
        Käyttäjien blogimerkinnöistä voi myös tykätä sekä niitä voi kommentoida.
      </p>
      <h3>Oma profiili</h3>
      <p>
        Oma profiili -sivulla rekisteröitynyt käyttäjä voi määrittää, mitä tietoja itsestään hän haluaa näyttää muille käyttäjille.
        Sivulla pystyy mm. vaihtamaan sähköpostiosoitteen sekä sen näkyvyyden, asettamaan lyhyen kuvauksen itsestään, sekä asettamaan linkkejä omille some-profiilisivuille.
        Oma profiili -sivulla käyttäjän on myös mahdollista vaihtaa oma salasana.
      </p>
    </div>
  )
}

export default Guide