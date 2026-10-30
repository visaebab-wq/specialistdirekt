import type { City } from "@/lib/cities-types";

/**
 * Lund – publiceras ENDAST för kardiologi (se `specialties` nedan).
 *
 * Varför bara en specialitet: en ny stad genererar annars en sida per
 * specialitet i CITY_SPECIALTY_SLUGS. Sju av dem hade blivit mallsidor utan
 * eget underlag, dvs. exakt de doorway-sidor som sajten medvetet undviker.
 *
 * KÄLLOR TILL DET SOM PUBLICERAS HÄR – inget annat får läggas till utan att
 * uppdragsgivaren bekräftat det:
 *   - Pris (2 500 kr), ort (Lund), område (Clemenstorget) och utbudet
 *     (ultraljud av hjärtat, långtids-EKG, 24-timmars blodtrycksmätning,
 *     arbets-EKG samt vissa intyg): bekräftat av uppdragsgivaren 2026-09-19.
 *   - Clemenstorgets läge (~100 m från Lund C, utgångspunkt för Lunds
 *     spårväg): offentlig geografi, verifierat mot Wikipedia 2026-09-19.
 *   - Akutraden och punktlistan under redFlag: ORDAGRANT ur den medicinskt
 *     granskade artikeln /artiklar/brostsmarta-kardiolog-eller-akut-vard.
 *     Skriv aldrig om dem här – ändras de ska de ändras i artikeln.
 *
 * ÄNNU INTE BEKRÄFTAT och därför medvetet utelämnat (se
 * docs/medical-review/2026-09-19-kardiolog-lund-innehallsbestallning.md):
 * remissregler, högkostnadsskydd, väntetid, exakt adress, läkarnamn,
 * priser per undersökning och vilka intyg som utfärdas.
 */
export const city: City = {
  slug: "lund",
  name: "Lund",
  region: "Region Skåne",
  county: "Skåne län",
  hospitals: ["Skånes universitetssjukhus (Sus) i Lund"],
  intro:
    "I Lund finns Skånes universitetssjukhus (Sus) vid sidan av privata specialistmottagningar i de centrala delarna av staden.",
  // Endast kardiologi publiceras för Lund.
  specialties: ["kardiolog"],
  specialtyIntros: {
    kardiolog:
      "Privat kardiologbesök i centrala Lund, vid Clemenstorget. Besöket kostar 2 500 kr, och i utbudet finns ultraljud av hjärtat, långtids-EKG, 24-timmars blodtrycksmätning och arbets-EKG. Skicka en kostnadsfri tidsförfrågan så återkommer vi med besked om möjliga bokningsalternativ.",
  },
  specialtyLocal: {
    kardiolog: {
      metaTitle: "Privat kardiolog Lund – ultraljud, EKG & arbets-EKG",
      metaDescription:
        "Privat kardiolog i Lund. Hjärtultraljud, långtids-EKG, 24-timmars blodtryck och arbets-EKG. Kardiologbesök 2 500 kr. Boka via Specialistdirekt.",
      h1: "Privat kardiolog i Lund",
      // Det generiska stadsblocket är avstängt: "Lund är en historisk
      // universitetsstad…" tillför varken kommersiellt värde eller entitetsvärde.
      hideCityIntro: true,
      hero: {
        price: { label: "Kardiologbesök", value: "2 500 kr" },
        highlights: [
          "Ultraljud av hjärtat",
          "Långtids-EKG",
          "24-timmars blodtrycksmätning",
          "Arbets-EKG",
        ],
        cta: {
          label: "Boka kardiolog i Lund",
          href: "#tidsforfragan",
          // Ordagrant samma löfte som serveråtgärden ger efter inskickad
          // förfrågan (src/app/actions.ts). Knappen säger "Boka", och då måste
          // det stå precis här vad som faktiskt händer när man trycker.
          note: "Kostnadsfri tidsförfrågan. Vi återkommer normalt inom en arbetsdag med besked om möjliga bokningsalternativ.",
        },
      },
      quickFactsHeading: "Kardiolog i Lund – snabb överblick",
      quickFactsCta: {
        label: "Boka kardiolog i Lund",
        href: "#tidsforfragan",
      },
      quickFacts: [
        { label: "Kardiologbesök", value: "2 500 kr" },
        { label: "Plats", value: "Lund, Clemenstorget" },
        { label: "Ultraljud av hjärtat", value: "Ja" },
        { label: "Långtids-EKG", value: "Ja" },
        { label: "24-timmars blodtryck", value: "Ja" },
        { label: "Arbets-EKG", value: "Ja" },
        { label: "Bokning", value: "Tidsförfrågan via Specialistdirekt" },
      ],
      redFlag: {
        heading: "När du ska söka akut vård i stället",
        body: "Ring **112** vid bröstsmärta som inte går över, eller med andfåddhet, kallsvettning, illamående, svimningskänsla eller smärta som strålar mot arm, käke, rygg eller hals.",
        bullets: [
          "stark eller tryckande smärta i bröstet",
          "bröstsmärta som inte går över eller varar längre än några minuter",
          "smärta som strålar mot arm, hals, käke, rygg eller mage",
          "bröstsmärta med andfåddhet, illamående eller kallsvettning",
          "svimning eller kraftig yrsel",
        ],
        footnote:
          "En planerad tid hos kardiolog är till för besvär som inte är akuta. Läs mer i [bröstsmärta – kardiolog eller akut vård?](/artiklar/brostsmarta-kardiolog-eller-akut-vard). Är du osäker når du 1177 dygnet runt.",
      },
      sections: [
        {
          id: "hjartundersokningar-lund",
          heading: "Hjärtundersökningar i Lund",
          body: [
            "Fyra hjärtundersökningar finns i utbudet hos kardiologen i Lund. Vilken av dem som blir aktuell avgör läkaren vid besöket.",
          ],
          table: {
            caption: "Hjärtundersökningar som finns i Lund",
            columns: ["Undersökning", "Finns i Lund"],
            rows: [
              ["Ultraljud av hjärtat (ekokardiografi)", "Ja"],
              ["Långtids-EKG", "Ja"],
              ["24-timmars blodtrycksmätning", "Ja"],
              ["Arbets-EKG", "Ja"],
            ],
          },
          subsections: [
            {
              id: "ultraljud-hjartat-lund",
              heading: "Ultraljud av hjärtat i Lund",
              body: [
                "Ultraljud av hjärtat kallas även ekokardiografi, hjärteko eller UCG. Undersökningen finns i Lund. Vad den visar beskrivs på vår översikt om [kardiologi](/specialiteter/kardiolog#vad-kardiologen-undersoker).",
              ],
            },
            {
              id: "langtids-ekg-lund",
              heading: "Långtids-EKG i Lund",
              body: [
                "Långtids-EKG kallas även Holter-EKG. Undersökningen finns i Lund och beskrivs närmare på vår översikt om [kardiologi](/specialiteter/kardiolog#vad-kardiologen-undersoker).",
              ],
            },
            {
              id: "24-timmars-blodtryck-lund",
              heading: "24-timmars blodtrycksmätning i Lund",
              body: [
                "24-timmars blodtrycksmätning kallas även ambulatorisk blodtrycksmätning. Mätningen finns i Lund. Om blodtryck och kardiolog kan du läsa i [högt blodtryck: när behövs en kardiolog?](/artiklar/hogt-blodtryck-nar-behovs-kardiolog).",
              ],
            },
            {
              id: "arbets-ekg-lund",
              heading: "Arbets-EKG i Lund",
              body: [
                "Arbets-EKG kallas även arbetsprov. Undersökningen finns i Lund och beskrivs närmare på vår översikt om [kardiologi](/specialiteter/kardiolog#vad-kardiologen-undersoker).",
              ],
            },
          ],
        },
        {
          id: "pris-kardiolog-lund",
          heading: "Pris för privat kardiolog i Lund",
          body: [
            "Ett kardiologbesök i Lund kostar **2 500 kr**.",
            "Priset avser besöket hos kardiologen. Vad som i övrigt kan bli aktuellt, och vad det i så fall kostar, får du besked om i samband med att du bokar.",
            "Vill du jämföra prisnivåer i landet finns en översikt i [privat kardiolog: kostnad](/artiklar/privat-kardiolog-kostnad).",
          ],
          table: {
            caption: "Priser i Lund",
            columns: ["Tjänst", "Pris"],
            rows: [
              ["Kardiologbesök", "2 500 kr"],
              ["Ultraljud av hjärtat (ekokardiografi)", "Uppgift lämnas vid bokning"],
              ["Långtids-EKG", "Uppgift lämnas vid bokning"],
              ["24-timmars blodtrycksmätning", "Uppgift lämnas vid bokning"],
              ["Arbets-EKG", "Uppgift lämnas vid bokning"],
            ],
            note: "Vi publicerar inga priser vi inte har fått bekräftade. Raderna ovan fylls i när mottagningens prisuppgifter är klara.",
          },
          cta: { label: "Boka kardiolog i Lund", href: "#tidsforfragan" },
        },
        {
          id: "kardiologiska-intyg-lund",
          heading: "Kardiologiska intyg",
          body: [
            "Vissa intyg kan utfärdas i samband med ett kardiologbesök i Lund. Vilket intyg som är aktuellt, och vad det kostar, bekräftas när du bokar – skriv gärna i din förfrågan vilket intyg du behöver, så får du besked direkt.",
          ],
        },
        {
          id: "kardiolog-nara-lund-c",
          heading: "Kardiolog nära Lund C",
          body: [
            "Mottagningen ligger i centrala Lund vid **Clemenstorget**, stadens största torg, omkring 100 meter från Lund C.",
            "Clemenstorget är utgångspunkt för Lunds spårväg och ligger intill stationsområdet, så besöket går att nå med både tåg, buss och spårvagn.",
          ],
        },
        {
          id: "infor-besoket-lund",
          heading: "Inför besöket",
          body: [
            "Hur ett första besök hos en kardiolog går till beskrivs på vår översikt om kardiologi: [så går ett första besök till](/specialiteter/kardiolog#forsta-besoket) och [hur du förbereder dig](/specialiteter/kardiolog#forbered-dig).",
            "Är du osäker på om kardiolog är rätt väg för dina besvär kan du läsa [hjärtklappning – vilken läkare?](/artiklar/hjartklappning-vilken-lakare) eller [bröstsmärta – kardiolog eller akut vård?](/artiklar/brostsmarta-kardiolog-eller-akut-vard).",
          ],
        },
      ],
      leadCta: {
        heading: "Boka privat kardiolog i Lund",
        body: "Skicka en kostnadsfri tidsförfrågan med dina möjliga datum. Specialitet och stad är redan ifyllda. Vi återkommer normalt inom en arbetsdag med besked om möjliga bokningsalternativ.",
        buttonLabel: "Boka kardiolog i Lund",
      },
      service: {
        name: "Privat kardiologbesök i Lund",
        description:
          "Privat kardiologbesök i centrala Lund vid Clemenstorget, med ultraljud av hjärtat, långtids-EKG, 24-timmars blodtrycksmätning och arbets-EKG i utbudet. Bokas via Specialistdirekt.",
        price: { name: "Kardiologbesök", amount: 2500, currency: "SEK" },
        examinations: [
          "Ultraljud av hjärtat (ekokardiografi)",
          "Långtids-EKG",
          "24-timmars blodtrycksmätning",
          "Arbets-EKG",
        ],
      },
      faqs: [
        {
          question: "Vad kostar en privat kardiolog i Lund?",
          answer:
            "Ett kardiologbesök i Lund kostar 2 500 kr. Priset avser besöket hos kardiologen. Priser för enskilda undersökningar publicerar vi inte förrän de är bekräftade – fråga efter aktuellt pris när du skickar din tidsförfrågan.",
        },
        {
          question: "Vilka hjärtundersökningar finns i Lund?",
          answer:
            "Ultraljud av hjärtat (ekokardiografi), långtids-EKG, 24-timmars blodtrycksmätning och arbets-EKG finns i utbudet. Vilken undersökning som blir aktuell avgör läkaren vid besöket.",
        },
        {
          question: "Var ligger kardiologmottagningen i Lund?",
          answer:
            "I centrala Lund, vid Clemenstorget – omkring 100 meter från Lund C. Clemenstorget är också utgångspunkt för Lunds spårväg.",
        },
        {
          question: "Hur bokar jag tid hos en kardiolog i Lund?",
          answer:
            "Skicka en kostnadsfri tidsförfrågan på den här sidan och ange minst två datum som kan passa. Vi återkommer normalt inom en arbetsdag med besked om möjliga bokningsalternativ.",
        },
      ],
    },
  },
};
