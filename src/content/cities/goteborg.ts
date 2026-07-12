import type { City } from "@/lib/cities-types";

export const city: City = {
  slug: "goteborg",
  name: "Göteborg",
  region: "Västra Götalandsregionen",
  county: "Västra Götalands län",
  intro:
    "Som Sveriges näst största stad har Göteborg ett brett och varierat utbud av specialistvård, med både regionens stora offentliga sjukhus och en växande andel privata mottagningar. Här finns möjlighet att träffa specialistläkare inom de flesta medicinska områden, ofta med relativt korta resvägar inom stadens olika stadsdelar. Vårdvalet gör att du som patient kan välja mellan flera vårdgivare, även om väntetiderna kan variera beroende på specialitet och säsong. Specialistdirekt hjälper dig kostnadsfritt att hitta en mottagning som passar dina behov.",
  hospitals: [
    "Sahlgrenska Universitetssjukhuset",
    "Östra sjukhuset",
    "Mölndals sjukhus",
  ],
  specialtyIntros: {
    kardiolog:
      "Vid hjärtbesvär finns det i Göteborg flera vägar till en kardiolog, både genom regionens sjukhus och via privata hjärtmottagningar. Utbudet i en storstad gör att du ofta kan jämföra olika vårdgivare innan du bokar tid. Specialistdirekt kan vägleda dig till en mottagning där en kardiolog kan utreda dina symtom.",
    ortoped:
      "Den som har problem med leder, skelett eller idrottsskador kan i Göteborg vända sig till ortopeder på både offentliga och privata mottagningar. Tack vare stadens storlek finns det en rad alternativ spridda över olika stadsdelar. Vi på Specialistdirekt hjälper dig att hitta en ortoped utan att det kostar dig något.",
    hudlakare:
      "Hudbesvär, från återkommande utslag till födelsemärken du vill få kontrollerade, kan bedömas av en hudläkare på någon av Göteborgs många dermatologiska mottagningar. Här samsas offentlig vård med ett flertal privata aktörer, vilket ger valfrihet. Låt Specialistdirekt matcha dig med en hudläkare i området.",
    gynekolog:
      "I Göteborg är tillgången till gynekologer god, med mottagningar inom såväl den regiondrivna vården som hos privata vårdgivare. Det gör att du som söker en gynekolog ofta har flera mottagningar att välja mellan i närheten. Specialistdirekt förmedlar kontakt kostnadsfritt så att du snabbare kan komma vidare.",
    psykiater:
      "För psykisk ohälsa erbjuder Göteborg specialistvård hos psykiatriker både inom den offentliga vården och hos privata mottagningar runt om i staden. Att det finns flera alternativ kan göra det lättare att hitta en mottagning som känns rätt för just dig. Specialistdirekt hjälper dig att komma i kontakt med en psykiater utan kostnad.",
    neurolog:
      "Besvär som rör nervsystemet, exempelvis huvudvärk, yrsel eller domningar, kan utredas av en neurolog i Göteborg. Som storstad har Göteborg ett samlat neurologiskt kunnande, med vård tillgänglig genom både regionens sjukhus och privata specialister. Specialistdirekt vägleder dig kostnadsfritt till en neurolog som kan ta sig an dina frågor.",
  },
};
