export interface PhotoProps {
  src: string;
  width: number;
  height: number;
}

export type PhotosProps = Record<string, PhotoProps[]>;

const PHOTOS: PhotosProps = {
  "2023-passo-del-tonale": [
    {
      src: "0.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "1.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "2.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "3.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "4.jpg",
      width: 3024,
      height: 4032,
    },
    {
      src: "5.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "6.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "7.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "8.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "9.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "10.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "11.jpg",
      width: 3024,
      height: 4032,
    },
    {
      src: "12.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "13.jpg",
      width: 4032,
      height: 3024,
    },
    {
      src: "14.jpg",
      width: 3024,
      height: 4032,
    },
  ],
  "2022-kitzbuhel": [
    {
      src: "0.jpg",
      width: 1440,
      height: 1080,
    },
  ],
  "2020-zell-am-see": [],
  "2020-schladming": [
    {
      src: "0.jpg",
      width: 960,
      height: 720,
    },
  ],
  "2019-kronplatz": [
    {
      src: "0.jpg",
      width: 1920,
      height: 1080,
    },
    {
      src: "1.jpg",
      width: 3456,
      height: 4608,
    },
    {
      src: "2.jpg",
      width: 4608,
      height: 3456,
    },
    {
      src: "3.jpg",
      width: 3456,
      height: 4608,
    },
    {
      src: "4.jpg",
      width: 4608,
      height: 3456,
    },
    {
      src: "5.jpg",
      width: 4608,
      height: 2176,
    },
    {
      src: "6.jpg",
      width: 4608,
      height: 2176,
    },
    {
      src: "7.jpg",
      width: 4608,
      height: 3456,
    },
    {
      src: "8.jpg",
      width: 4608,
      height: 2176,
    },
    {
      src: "9.jpg",
      width: 3456,
      height: 4608,
    },
    {
      src: "10.jpg",
      width: 3456,
      height: 4608,
    },
    {
      src: "11.jpg",
      width: 4608,
      height: 2176,
    },
    {
      src: "12.jpg",
      width: 4608,
      height: 3456,
    },
  ],
};

export default PHOTOS;
