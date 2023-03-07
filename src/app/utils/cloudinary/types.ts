export type FolderProps = { name: string; path: string };

export interface FolderData {
  total_count: number;
  folders: FolderProps[];
}

export type ImageProps = {
  public_id: string;
  url: string;
  width: number;
  height: number;
  format: string;
  folder?: string;
  blurDataUrl?: string;
};

export interface ImageData {
  // total_count: number; // TODO: Find out how to get it back
  resources: ImageProps[];
}

export interface GalleryFolderProps {
  path: string;
  thumbnailImage?: ImageProps;
}
