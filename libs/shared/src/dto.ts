export type AssetDto = {
  id: number;
  name: string;
  files?: FileDto[];
};

export type ReducedAssetDto = Omit<AssetDto, 'files'>;

export type FileDto = {
  id: number;
  assetId: string;
  size: number;
};

export type ExpandedFileDto = FileDto & { asset: AssetDto };

export type AssetFilesDto = {
  files: FileDto[];
};
