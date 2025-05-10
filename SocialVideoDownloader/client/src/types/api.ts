// YouTube API Types
export interface YouTubeVideoOption {
  label: string;
  type: string;
  width: number;
  height: number;
  extension: string;
  fps: number;
  url: string;
}

export interface YouTubeAudioOption {
  label: string;
  type: string;
  extension: string;
  bitrate: number;
  url: string;
}

export interface YouTubeResponse {
  error: boolean;
  title: string;
  duration: string;
  thumbnail: string;
  video_with_audio: YouTubeVideoOption[];
  video_only: YouTubeVideoOption[];
  audio: YouTubeAudioOption[];
  join: string;
  support: string;
}

// Facebook API Types
export interface FacebookData {
  thumbnail: string;
  quality: string;
  url: string;
  join: string;
  Dev: string;
}

export interface FacebookResponse {
  status: boolean;
  data: FacebookData;
}

// TikTok API Types
export interface TikTokData {
  video: string;
  audio: string;
}

export interface TikTokResponse {
  platform: string;
  status: boolean;
  data: TikTokData;
}
