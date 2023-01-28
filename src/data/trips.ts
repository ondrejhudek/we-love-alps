export interface Trip {
  id: number;
  title: string;
  resorts: string[];
  countryCode: string;
  year: number;
  month: number;
  members: number[];
  nonMembers?: number;
}

const TRIPS: Trip[] = [
  {
    id: 0,
    title: "Lienz",
    resorts: ["lienz", "grossglockner", "molltaler"],
    countryCode: "AT",
    year: 2008,
    month: 3,
    members: [0, 2, 4, 5],
    nonMembers: 2,
  },
  {
    id: 1,
    title: "Ponte di Legno",
    resorts: ["tonale"],
    countryCode: "IT",
    year: 2009,
    month: 2,
    members: [0, 2, 4],
    nonMembers: 3,
  },
  {
    id: 2,
    title: "Tauplitz",
    resorts: ["tauplitz"],
    countryCode: "AT",
    year: 2011,
    month: 3,
    members: [0, 2],
    nonMembers: 1,
  },
  {
    id: 3,
    title: "Aprica",
    resorts: ["aprica"],
    countryCode: "IT",
    year: 2013,
    month: 3,
    members: [0, 2, 4, 5, 7, 9, 10, 12, 13, 14],
    nonMembers: 4,
  },
  {
    id: 4,
    title: "Les Sybelles",
    resorts: ["les-sybelles"],
    countryCode: "FR",
    year: 2015,
    month: 1,
    members: [0, 1],
    nonMembers: 6,
  },
  {
    id: 5,
    title: "Zell am See",
    resorts: ["kitzsteinhorn", "schmitten", "saalbach"],
    countryCode: "AT",
    year: 2016,
    month: 2,
    members: [0, 1, 2, 4, 6, 7, 8, 13, 14],
  },
  {
    id: 6,
    title: "Ponte di Legno",
    resorts: ["tonale"],
    countryCode: "IT",
    year: 2017,
    month: 3,
    members: [4, 6, 7, 8, 10, 13, 15, 16, 18],
  },
  {
    id: 7,
    title: "Sölden",
    resorts: ["solden"],
    countryCode: "AT",
    year: 2018,
    month: 1,
    members: [0, 1, 4, 7, 8, 10, 11, 13, 15, 16, 17, 18, 19],
  },
  {
    id: 8,
    title: "Kronplatz",
    resorts: ["kronplatz"],
    countryCode: "IT",
    year: 2019,
    month: 3,
    members: [0, 1, 2, 3, 4, 10, 11, 13, 15, 16, 17],
  },
  {
    id: 9,
    title: "Schladming",
    resorts: ["schladming"],
    countryCode: "AT",
    year: 2020,
    month: 2,
    members: [0, 1, 2, 4, 10, 11, 20],
    nonMembers: 3,
  },
  {
    id: 10,
    title: "Kitzbühel",
    resorts: ["kitzbuhel", "brixen"],
    countryCode: "AT",
    year: 2022,
    month: 2,
    members: [0, 1, 2, 4, 10, 11],
  },
  {
    id: 11,
    title: "Passo del Tonale",
    resorts: ["tonale"],
    countryCode: "IT",
    year: 2023,
    month: 1,
    members: [0, 1, 2, 4, 20],
    nonMembers: 3,
  },
];

export default TRIPS;
