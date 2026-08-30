import type { City } from "@/lib/cities-types";

export const city: City = {
  slug: "uppsala",
  name: "Uppsala",
  region: "Region Uppsala",
  county: "Uppsala län",
  hospitals: ["Akademiska sjukhuset (universitetssjukhus)"],
  intro:
    "Uppsala är en av Sveriges främsta universitetsstäder och ett betydande nav för specialistvård. " +
    "Akademiska sjukhuset utgör ryggraden i den offentliga vården och samlar bred spetskompetens inom de flesta specialiteter. " +
    "Vid sidan av den offentliga vården finns ett växande utbud av privata specialistmottagningar i staden. " +
    "Det geografiska läget nära Stockholm gör dessutom att invånarna ofta kan välja mellan vårdgivare i båda regionerna.",
  specialtyIntros: {
    gastroenterolog:
      "I Uppsala finns mag- och tarmkompetens kopplad till Akademiska sjukhuset och hos privata mottagningar. Specialistdirekt hjälper dig kostnadsfritt att komma i kontakt med en gastroenterolog.",
    allmanmedicin:
      "Uppsala har både universitetsvård och privata mottagningar där du kan få en bred medicinsk bedömning. En allmänläkare kan väga samman symtom, prover och sjukhistoria när bilden är oklar. Specialistdirekt hjälper dig kostnadsfritt att hitta rätt mottagning.",
    kardiolog:
      "Söker du en kardiolog i Uppsala finns både hjärtsjukvård vid Akademiska sjukhuset och privata mottagningar i staden. " +
      "Vi hjälper dig kostnadsfritt att hitta en hjärtspecialist som passar dina behov och din situation. " +
      "Du får hjälp att jämföra alternativ utan att själv behöva ringa runt.",
    ortoped:
      "Behöver du träffa en ortoped i Uppsala kan vi förmedla kontakt med specialister på leder, skelett och idrottsskador. " +
      "Staden har både offentlig ortopedi vid Akademiska sjukhuset och privata mottagningar att välja mellan. " +
      "Du skickar en kostnadsfri förfrågan och får besked om hur du kan gå vidare.",
    hudlakare:
      "Vill du komma till en hudläkare i Uppsala hjälper vi dig att hitta en dermatolog som tar emot för dina besvär. " +
      "Här finns specialister inom allt från hudförändringar och eksem till estetiska bedömningar. " +
      "Du skickar en förfrågan och får besked om hur du kan gå vidare.",
    gynekolog:
      "Letar du efter en gynekolog i Uppsala finns ett brett utbud av specialister inom kvinnosjukvård i staden. " +
      "Vi förmedlar kontakt med mottagningar som passar just det du behöver hjälp med. " +
      "Förmedlingen är alltid kostnadsfri och anpassad efter dig.",
    psykiater:
      "Söker du en psykiater i Uppsala kan vi hjälpa dig att hitta rätt inom psykiatrisk specialistvård. " +
      "Staden har resurser både inom den offentliga vården och hos privata vårdgivare. " +
      "Vi guidar dig till en mottagning utan att det kostar dig något.",
    neurolog:
      "Behöver du träffa en neurolog i Uppsala förmedlar vi kontakt med specialister på nervsystemet och dess sjukdomar. " +
      "Akademiska sjukhuset har omfattande neurologisk kompetens och kompletteras av privata alternativ i regionen. " +
      "Du skickar en kostnadsfri förfrågan och får besked om hur du kan gå vidare.",
  },
};
