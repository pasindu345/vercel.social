import { YouTubeResponse, FacebookResponse, TikTokResponse } from "@/types/api";

const YOUTUBE_API = 'https://yt-vid.hazex.workers.dev/?url=';
const FACEBOOK_API = 'https://facebook-downloader.apis-bj-devs.workers.dev/?url=';
const TIKTOK_API = 'https://tele-social.vercel.app/down?url=';

// Determine the platform based on URL
export function detectPlatform(url: string): 'youtube' | 'facebook' | 'tiktok' | 'unknown' {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  } else if (url.includes('facebook.com') || url.includes('fb.com') || url.includes('fb.watch')) {
    return 'facebook';
  } else if (url.includes('tiktok.com')) {
    return 'tiktok';
  }
  return 'unknown';
}

// Fetch data based on the platform
export async function fetchVideoData(url: string): Promise<{ 
  data: YouTubeResponse | FacebookResponse | TikTokResponse, 
  platform: string 
}> {
  const platform = detectPlatform(url);
  
  if (platform === 'unknown') {
    throw new Error('Invalid URL. Please enter a valid YouTube, Facebook, or TikTok video URL.');
  }
  
  try {
    let response;
    let data;
    
    switch (platform) {
      case 'youtube':
        response = await fetch(`${YOUTUBE_API}${encodeURIComponent(url)}`);
        data = await response.json();
        if (data.error !== false) {
          throw new Error(data.message || 'Failed to fetch YouTube data');
        }
        break;
        
      case 'facebook':
        response = await fetch(`${FACEBOOK_API}${encodeURIComponent(url)}`);
        data = await response.json();
        if (!data.status) {
          throw new Error('Failed to fetch Facebook video data');
        }
        break;
        
      case 'tiktok':
        response = await fetch(`${TIKTOK_API}${encodeURIComponent(url)}`);
        data = await response.json();
        if (!data.status) {
          throw new Error('Failed to fetch TikTok video data');
        }
        break;
    }
    
    return { data, platform };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}
