export interface Member {
  id: number;
  firstname: string;
  lastname: string;
  nickname: string;
  facebook?: string;
  instagram?: string;
}

const MEMBERS: Member[] = [
  {
    id: 0,
    firstname: "Ondřej",
    lastname: "Hudek",
    nickname: "hudy",
    facebook: "ondrej.hudek",
    instagram: "ondrejhudek",
  },
  {
    id: 1,
    firstname: "Tereza",
    lastname: "Hudková",
    nickname: "terka",
  },
  {
    id: 2,
    firstname: "Jaroslav",
    lastname: "Černý",
    nickname: "jarin",
  },
  {
    id: 3,
    firstname: "Daniela",
    lastname: "Kováčová",
    nickname: "dája",
  },
  {
    id: 4,
    firstname: "Jan",
    lastname: "Stuchlík",
    nickname: "stuchla",
    facebook: "honza.stuchlik.5",
    instagram: "johnyst",
  },
  {
    id: 5,
    firstname: "Markéta",
    lastname: "Stuchlíková",
    nickname: "majkí",
  },
  {
    id: 6,
    firstname: "Jana",
    lastname: "Pekárková",
    nickname: "janča",
  },
  {
    id: 7,
    firstname: "Erika",
    lastname: "Černá",
    nickname: "éra",
  },
  {
    id: 8,
    firstname: "Pavel",
    lastname: "Černý",
    nickname: "pavel",
  },
  {
    id: 9,
    firstname: "Jiří",
    lastname: "Koptík",
    nickname: "kopy",
  },
  {
    id: 10,
    firstname: "Lenka",
    lastname: "Černilová",
    nickname: "léňa",
  },
  {
    id: 11,
    firstname: "Milan",
    lastname: "Černil",
    nickname: "milan",
  },
  {
    id: 12,
    firstname: "Tomáš",
    lastname: "Málek",
    nickname: "tomáš",
  },
  {
    id: 13,
    firstname: "Lucie",
    lastname: "Dostálová",
    nickname: "lucka",
  },
  {
    id: 14,
    firstname: "Marek",
    lastname: "Hasse",
    nickname: "mára",
  },
  {
    id: 15,
    firstname: "Jaroslav",
    lastname: "Syba",
    nickname: "jarda",
  },
  {
    id: 16,
    firstname: "Martin",
    lastname: "Dostál",
    nickname: "junior1",
  },
  {
    id: 17,
    firstname: "Tomáš",
    lastname: "Dostál",
    nickname: "junior2",
  },
  {
    id: 18,
    firstname: "Štěpán",
    lastname: "Zahradník",
    nickname: "zahrada",
  },
  {
    id: 19,
    firstname: "Simona",
    lastname: "Zahradníková",
    nickname: "síma",
  },
  {
    id: 20,
    firstname: "Michal",
    lastname: "Salinger",
    nickname: "sally",
  },
];

export default MEMBERS;
