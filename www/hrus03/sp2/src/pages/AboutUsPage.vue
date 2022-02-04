<template>
  <div class="container">
    <div class="page-title">
      <h1 class="page-title__text">
        O nás
      </h1>
    </div>
  </div>
  <div class="page-content text-page">
    <div class="container-prose">
      <div class="paragraphs">
        <p>
          Jmenujeme se Anet a Natálie a jsme dvě studentky vysokých škol z Prahy. Známe se už několik let z gymnázia a
          už tam jsme obě projevily fascinaci true-crime tématikou a kriminalistkou. Nejspíše to byla jedna z věcí,
          která
          nás velmi sblížila, protože jsme se v naší podivnosti necítily sami.
        </p>
        <p>
          Jednoho dne jsme se shodly na tom, že je škoda, že se na české podcastové scéně tolik true-crime obsahu
          neobjevuje, při našem lamentování nás napadlo, že bychom si to podcastování vlastně mohly vyzkoušet a to se
          nakonec stalo.
        </p>
        <p>
          Začaly jsme nahrávat na jeden mikrofon v obýváku, naučily se s pomocí Youtube videí trochu té editace a už
          jsme s tím nepřestaly. Snažíme se stále posouvat s kvalitou nahrávání a celkové tvorby dál, začátky nebyly ani
          zdaleka jednoduché, ale neskutečně jsme se do podcastingu zamilovaly a zatím to nevypadá, že bychom ho chtěly
          v
          dohledné době opouštět.
        </p>
        <p>
          Na Algor Mortis už nejsme úplně sami, momentálně nám se sociálními sítěmi pomáhá Kris, dříve posluchačka,
          nyní
          nedocenitelná součást podcastu.
        </p>
      </div>
      <h3>O Natálii:</h3>
      <div class="paragraphs">
        <p>
          Je mi 21 a jsem studentkou Přírodovědecké fakulty Univerzity Karlovy. Mezi mé zájmy kromě vědy a true-crime
          patří čtení, psaní, toulání se po horách a hra na kytaru. Ve svém volném čase (kterého kvůli svému yes-manství
          nemám příliš mnoho) mě většinou najdete zachumlanou pod dekou s hororovou knihou nebo biografiií v ruce. Ráda
          taky navštěvuji únikové hry, hraju deskovky nebo (poněkud falešně) zpívám u táboráku.
        </p>
        <p>
          True-crime mě zajímá snad už od dětství. Začalo to láskou k detektivkám (především k Agathě Christie a její
          slečně Marplové) a tato fascinace zločinem už se mě nepustila. Později jsem přešla na knihy o zločinech
          skutečných a od těch mě už nejspíš nikdy nikdo neodtrhne.
        </p>
        <p>
          Ve skutečnosti mě zas tolik nezajímá zločin samotný, ale to, co mu předcházelo. Ráda hledám v případech místa,
          kterými se povedlo pachatelům v systému proklouznout a často hlavně propadnout. Snažím se najít vysvětlení pro
          jejich chování a především zda (a pokud ano, tak jak) se dalo jejich činům zabránit. Zajímám se také o příběhy
          obětí těchto činů. Kým byly, než se jejich životů chopila média a vytvořila si o jejich životech obrázek,
          který se hodil na titulní stranu novin.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHeadResolver } from "@/composables/head";

export default defineComponent({
  name: 'AboutUsPage',
  setup() {
    const { updateHead } = useHeadResolver()

    updateHead({
      titlePart: 'O nás',
      meta: { description: 'Přečtěte si něco o nás.' }
    })
  }
});
</script>
