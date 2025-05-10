import { useState } from "react";
import UrlInputForm from "@/components/UrlInputForm";
import YouTubeResult from "@/components/results/YouTubeResult";
import FacebookResult from "@/components/results/FacebookResult";
import TikTokResult from "@/components/results/TikTokResult";
import LoadingState from "@/components/LoadingState";
import ErrorDisplay from "@/components/ErrorDisplay";
import { fetchVideoData } from "@/lib/apiService";
import { YouTubeResponse, FacebookResponse, TikTokResponse } from "@/types/api";

type Platform = 'youtube' | 'facebook' | 'tiktok' | null;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [platform, setPlatform] = useState<Platform>(null);
  const [youtubeData, setYoutubeData] = useState<YouTubeResponse | null>(null);
  const [facebookData, setFacebookData] = useState<FacebookResponse | null>(null);
  const [tiktokData, setTiktokData] = useState<TikTokResponse | null>(null);

  const handleFormSubmit = async (url: string) => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    // Reset state
    setIsLoading(true);
    setError(null);
    setPlatform(null);
    setYoutubeData(null);
    setFacebookData(null);
    setTiktokData(null);

    try {
      const { data, platform: detectedPlatform } = await fetchVideoData(url);
      
      setPlatform(detectedPlatform as Platform);
      
      if (detectedPlatform === 'youtube') {
        setYoutubeData(data as YouTubeResponse);
      } else if (detectedPlatform === 'facebook') {
        setFacebookData(data as FacebookResponse);
      } else if (detectedPlatform === 'tiktok') {
        setTiktokData(data as TikTokResponse);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 text-dark-800 min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center mb-2">
            <i className="fas fa-download text-primary text-3xl mr-3"></i>
            <h1 className="text-3xl md:text-4xl font-bold">Social Media Video Downloader</h1>
          </div>
          <p className="text-muted-foreground text-center max-w-2xl">
            Download videos from YouTube, Facebook, and TikTok with just a URL paste.
          </p>
        </header>

        {/* Main Content */}
        <main>
          <UrlInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {error && <ErrorDisplay message={error} />}

          <div className="max-w-4xl mx-auto">
            {isLoading && <LoadingState />}
            
            {!isLoading && platform === 'youtube' && youtubeData && (
              <YouTubeResult data={youtubeData} />
            )}
            
            {!isLoading && platform === 'facebook' && facebookData && (
              <FacebookResult data={facebookData} />
            )}
            
            {!isLoading && platform === 'tiktok' && tiktokData && (
              <TikTokResult data={tiktokData} />
            )}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-12 text-center text-muted-foreground text-sm">
          <p>Download your favorite social media videos easily and for free.</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Social Media Video Downloader. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
