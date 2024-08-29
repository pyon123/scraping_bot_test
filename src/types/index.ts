import { ObjectId } from 'mongodb';

export enum SiteType {
  youtube = 'youtube',
  website = 'website',
}

export enum CategoryType {
  none = 'none',
  education = 'education',
  entertainment = 'entertainment',
}

export enum YoutubeType {
  video = 'video',
  playlist = 'playlist',
  channel = 'channel',
}

export interface IData {
  category: CategoryType;
  eduCategories?: string[];
  minAge: number;
  nudity: boolean;
  sexuality: boolean;
  religion: boolean;
  violence: boolean;
  political: boolean;
  drug: boolean;
  alcohol: boolean;
  gambling: boolean;
  bidding: boolean;
  // controversialTopics: boolean;
  // previewThumbnail?: string;
}
export interface ISite {
  _id: ObjectId;
  url: string;
  title?: string;
  baseUrl?: string;
  type: SiteType;
  youtube?: {
    type: YoutubeType;
    id: string;
    url: string;
  };
  subSearched?: boolean;
  requireSubSearch?: boolean;
  contentChecked?: boolean;
  nudity?: boolean;
  dataText?: string;
  data?: IData;
  imgLinks?: string[];
  audioLinks?: string[];
  vidoeLinks?: string[];
  searchedAt?: number;
  note: string;
  wrong?: boolean
}

export interface IYoutubeSearch {
  _id: ObjectId;
  regionCode: 'US' | 'CA';
  videoCaption: 'closedCaption' | 'none';
  type: 'video' | 'channel' | 'playlist';
  pageToken?: string;
  timestamp: number;
  searchedCount: number;
}
