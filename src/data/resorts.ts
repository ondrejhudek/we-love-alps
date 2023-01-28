export interface Resort {
  id: string;
  name: string;
  countryCode: string;
  region: string;
}

const RESORTS: Resort[] = [
  {
    id: "aprica",
    name: "Aprica",
    countryCode: "IT",
    region: "Lombardie",
  },
  {
    id: "brixen",
    name: "Brixen im Thale",
    countryCode: "AT",
    region: "Tyrolsko",
  },
  {
    id: "grossglockner",
    name: "Grossglockner",
    countryCode: "AT",
    region: "Východní Tyrolsko",
  },
  {
    id: "kitzsteinhorn",
    name: "Kaprun - Kitzsteinhorn",
    countryCode: "AT",
    region: "Salcbursko",
  },
  {
    id: "kitzbuhel",
    name: "Kitzbühel",
    countryCode: "AT",
    region: "Savojsko",
  },
  {
    id: "kronplatz",
    name: "Kronplatz",
    countryCode: "IT",
    region: "Jižní Tyrolsko",
  },
  {
    id: "les-sybelles",
    name: "Les Sybellles",
    countryCode: "FR",
    region: "Savojsko",
  },
  {
    id: "lienz",
    name: "Lienz",
    countryCode: "AT",
    region: "Východní Tyrolsko",
  },
  {
    id: "molltaler",
    name: "Mölltaler Gletscher",
    countryCode: "AT",
    region: "Korutany",
  },
  {
    id: "saalbach",
    name: "Saalbach Hinterglemm",
    countryCode: "AT",
    region: "Salcbursko",
  },
  {
    id: "schladming",
    name: "Schladming Dachstein",
    countryCode: "AT",
    region: "Štýrsko",
  },
  {
    id: "schmitten",
    name: "Zell am See - Schmitten",
    countryCode: "AT",
    region: "Salcbursko",
  },
  {
    id: "solden",
    name: "Sölden",
    countryCode: "AT",
    region: "Tyrolsko",
  },
  {
    id: "tauplitz",
    name: "Tauplitz",
    countryCode: "AT",
    region: "Štýrsko",
  },
  {
    id: "tonale",
    name: "Tonale Ponte di Legno",
    countryCode: "IT",
    region: "Val di Sole",
  },
];

export default RESORTS;
