export interface Resort {
  id: string;
  name: string;
  countryCode: string;
  region: string;
  map: string;
}

const RESORTS: Resort[] = [
  {
    id: "aprica",
    name: "Aprica",
    countryCode: "IT",
    region: "Lombardie",
    map: "!1m18!1m12!1m3!1d11055.677429721936!2d10.136837491119163!3d46.15235193054443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4783bc3ca559246f%3A0x5db2964cda7c8224!2s23031%20Aprica%2C%20Provincie%20Sondrio%2C%20It%C3%A1lie!5e0!3m2!1scs!2scz!4v1675094505617!5m2!1scs!2scz",
  },
  {
    id: "brixen",
    name: "Brixen im Thale",
    countryCode: "AT",
    region: "Tyrolsko",
    map: "!1m18!1m12!1m3!1d10792.236515625376!2d12.242554741697589!3d47.44978682729046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47764b1d83236ec7%3A0xff1fecdde421638a!2s6364%20Brixen%20im%20Thale%2C%20Rakousko!5e0!3m2!1scs!2scz!4v1675095678882!5m2!1scs!2scz",
  },
  {
    id: "grossglockner",
    name: "Grossglockner",
    countryCode: "AT",
    region: "Východní Tyrolsko",
    map: "!1m18!1m12!1m3!1d12709.205470431492!2d12.849702349013395!3d47.05036985467698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x565a4ef5eae5f868!2sSkigebiet%20Grossglockner%20Heiligenblut!5e0!3m2!1scs!2scz!4v1675095886283!5m2!1scs!2scz",
  },
  {
    id: "kitzsteinhorn",
    name: "Kaprun - Kitzsteinhorn",
    countryCode: "AT",
    region: "Salcbursko",
    map: "!1m18!1m12!1m3!1d3595.712226857864!2d12.724449498458165!3d47.229392804565784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477705499f11d593%3A0xb74dc13753f00118!2sKitzsteinhorn!5e0!3m2!1scs!2scz!4v1675095962143!5m2!1scs!2scz",
  },
  {
    id: "kitzbuhel",
    name: "Kitzbühel",
    countryCode: "AT",
    region: "Savojsko",
    map: "!1m18!1m12!1m3!1d43179.87708719565!2d12.390125530778617!3d47.436467725602796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47764d75e04e5d15%3A0xffb697fd4ba94b5a!2s6370%20Kitzb%C3%BChel%2C%20Rakousko!5e0!3m2!1scs!2scz!4v1675096049499!5m2!1scs!2scz",
  },
  {
    id: "kronplatz",
    name: "Kronplatz",
    countryCode: "IT",
    region: "Jižní Tyrolsko",
    map: "!1m18!1m12!1m3!1d13819.550499902269!2d11.950244032757364!3d46.738628712003056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477823cd0c0edf89%3A0x686d8e8299df16a5!2sKronplatz!5e0!3m2!1scs!2scz!4v1675096156892!5m2!1scs!2scz",
  },
  {
    id: "les-sybelles",
    name: "Les Sybellles",
    countryCode: "FR",
    region: "Savojsko",
    map: "!1m18!1m12!1m3!1d2810.3476902101484!2d6.217093215626597!3d45.22053395769001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478a394248038ff7%3A0xf4c30d868cdd8b84!2sR%C3%A9sidence%20Odalys%20Les%20Sybelles%20%C3%A0%20Saint%20Sorlin%20d&#39;Arves!5e0!3m2!1scs!2scz!4v1675096205792!5m2!1scs!2scz",
  },
  {
    id: "lienz",
    name: "Lienz",
    countryCode: "AT",
    region: "Východní Tyrolsko",
    map: "!1m18!1m12!1m3!1d21837.66487948264!2d12.733930508510037!3d46.82974871500238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47775df33af9ab35%3A0xabab5e14dd85353b!2sLienz%2C%20Rakousko!5e0!3m2!1scs!2scz!4v1675096425052!5m2!1scs!2scz",
  },
  {
    id: "molltaler",
    name: "Mölltaler Gletscher",
    countryCode: "AT",
    region: "Korutany",
    map: "!1m18!1m12!1m3!1d10876.327981928674!2d12.997422449574396!3d47.03862181641665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4777388c650c04df%3A0xa7a1533d5e5363a6!2sM%C3%B6lltaler%20Gletscher!5e0!3m2!1scs!2scz!4v1675096475644!5m2!1scs!2scz",
  },
  {
    id: "saalbach",
    name: "Saalbach Hinterglemm",
    countryCode: "AT",
    region: "Salcbursko",
    map: "!1m18!1m12!1m3!1d5401.91825831235!2d12.637081379868633!3d47.39323031668444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4776ffd0b1a301cf%3A0x95c12dfdf98c1cd7!2s5753%20Saalbach-Hinterglemm%2C%20Rakousko!5e0!3m2!1scs!2scz!4v1675096601020!5m2!1scs!2scz",
  },
  {
    id: "schladming",
    name: "Schladming Dachstein",
    countryCode: "AT",
    region: "Štýrsko",
    map: "!1m18!1m12!1m3!1d2700.923581873397!2d13.683970716188767!3d47.393923879171155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477125308753b317%3A0x52ca753431058199!2sSchladming!5e0!3m2!1scs!2scz!4v1675098221817!5m2!1scs!2scz",
  },
  {
    id: "schmitten",
    name: "Zell am See - Schmitten",
    countryCode: "AT",
    region: "Salcbursko",
    map: "!1m18!1m12!1m3!1d11516.374180421437!2d12.772788166804165!3d47.32855402694112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477702d7c9d73b21%3A0xe1ba61661761829f!2s5700%20Schmitten%2C%20Rakousko!5e0!3m2!1scs!2scz!4v1675096959343!5m2!1scs!2scz",
  },
  {
    id: "solden",
    name: "Sölden",
    countryCode: "AT",
    region: "Tyrolsko",
    map: "!1m18!1m12!1m3!1d10892.185953049124!2d11.001538199544777!3d46.960776616353265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479d325b54281ac7%3A0x4d28dbae2ec3df3f!2s6450%20S%C3%B6lden%2C%20Rakousko!5e0!3m2!1scs!2scz!4v1675098074529!5m2!1scs!2scz",
  },
  {
    id: "tauplitzalm",
    name: "Tauplitzalm",
    countryCode: "AT",
    region: "Štýrsko",
    map: "!1m18!1m12!1m3!1d10762.735803442896!2d13.977395249786568!3d47.59338911693966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47716a5c7703769f%3A0xf900f03203d383fc!2s8982%20Tauplitzalm%2C%20Rakousko!5e0!3m2!1scs!2scz!4v1675097012473!5m2!1scs!2scz",
  },
  {
    id: "tonale",
    name: "Tonale Ponte di Legno",
    countryCode: "IT",
    region: "Val di Sole",
    map: "!1m18!1m12!1m3!1d11034.75054198599!2d10.572068749278467!3d46.25643721589179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4782547547c11317%3A0xe8c1e27f423167ef!2sPasso%20del%20Tonale!5e0!3m2!1scs!2scz!4v1675098146607!5m2!1scs!2scz",
  },
];

export default RESORTS;
