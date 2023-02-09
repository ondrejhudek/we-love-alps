export interface Member {
  id: string;
  name: string;
  nickname?: string;
  facebook?: string;
  instagram?: string;
  currentPartner?: string;
  exPartners?: string[];
  siblings?: string[];
}

const MEMBERS: Member[] = [
  {
    id: "hudy",
    name: "Ondřej Hudek",
    facebook: "ondrej.hudek",
    instagram: "ondrejhudek",
    currentPartner: "terka",
  },
  {
    id: "terka",
    name: "Tereza Hudková",
    facebook: "tereza.stejskalova.16",
    instagram: "stejste",
    currentPartner: "hudy",
  },
  {
    id: "jarin",
    name: "Jaroslav Černý",
    facebook: "jardac1",
    instagram: "jardacerny_",
    currentPartner: "daja",
    siblings: ["era"],
  },
  {
    id: "daja",
    name: "Daniela Kováčová",
    nickname: "dája",
    facebook: "Danielka.Kovac",
    instagram: "danielka.kovacova",
    currentPartner: "jarin",
  },
  {
    id: "stuchla",
    name: "Jan Stuchlík",
    facebook: "honza.stuchlik.5",
    instagram: "johnyst",
    exPartners: ["janca"],
    siblings: ["majki"],
  },
  {
    id: "majki",
    name: "Markéta Stuchlíková",
    nickname: "majkí",
    facebook: "stuchlapuchlamuchla",
    instagram: "stuchlapuchlamuchla",
    siblings: ["stuchla"],
  },
  {
    id: "janca",
    name: "Jana Pekárková",
    nickname: "janča",
    facebook: "jana.pekarkova.7",
    instagram: "jani.sss",
    exPartners: ["stuchla"],
  },
  {
    id: "era",
    name: "Erika Černá",
    nickname: "éra",
    facebook: "erika.cerna.31",
    instagram: "erika_ce",
    currentPartner: "pavel",
    exPartners: ["kopy"],
    siblings: ["jarin"],
  },
  {
    id: "pavel",
    name: "Pavel Černý",
    facebook: "pcerny",
    currentPartner: "era",
  },
  {
    id: "kopy",
    name: "Jiří Koptík",
    facebook: "bia.kopy",
    exPartners: ["era"],
  },
  {
    id: "lena",
    name: "Lenka Černilová",
    nickname: "léňa",
    facebook: "lenka.dvorakova.79",
    instagram: "my_lenkaa",
    currentPartner: "milan",
    exPartners: ["tomas"],
  },
  {
    id: "milan",
    name: "Milan Černil",
    facebook: "milan.cernil",
    instagram: "milanec_",
    currentPartner: "lena",
  },
  {
    id: "tomas",
    name: "Tomáš Málek",
    nickname: "tomáš",
    facebook: "tomas.malek.5",
    instagram: "tomalis",
    exPartners: ["lena"],
  },
  {
    id: "lucka",
    name: "Lucie Dostálová",
    facebook: "profile.php?id=1145558111",
    instagram: "meritl",
    exPartners: ["mara", "jarda"],
    siblings: ["junior1", "junior2"],
  },
  {
    id: "mara",
    name: "Marek Hasse",
    nickname: "mára",
    facebook: "marek.haase.3",
    instagram: "mh.marekh",
    exPartners: ["lucka"],
  },
  {
    id: "jarda",
    name: "Jaroslav Syba",
    facebook: "jerry.cotton.5",
    instagram: "cotton.jerry",
    exPartners: ["lucka"],
  },
  {
    id: "junior1",
    name: "Martin Dostál",
    facebook: "martin.dostal.9237",
    instagram: "martindostalm",
    siblings: ["lucka", "junior2"],
  },
  {
    id: "junior2",
    name: "Tomáš Dostál",
    facebook: "tomas.dostal.5682",
    instagram: "dostal_tomas",
    siblings: ["lucka", "junior1"],
  },
  {
    id: "zahrada",
    name: "Štěpán Zahradník",
    facebook: "stepan.zahradnik.7",
    currentPartner: "sima",
  },
  {
    id: "sima",
    name: "Simona Zahradníková",
    nickname: "síma",
    facebook: "simi.penickova",
    instagram: "ssimipe",
    currentPartner: "zahrada",
  },
  {
    id: "sally",
    name: "Michal Salinger",
    facebook: "michal.salinger",
    instagram: "sally_from_kh",
  },
];

export default MEMBERS;
