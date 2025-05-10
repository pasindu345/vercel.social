import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDuration } from '@/lib/utils';
import { YouTubeResponse, YouTubeVideoOption, YouTubeAudioOption } from '@/types/api';

interface YouTubeResultProps {
  data: YouTubeResponse;
}

const YouTubeResult = ({ data }: YouTubeResultProps) => {
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');

  const handleTabChange = (tab: 'video' | 'audio') => {
    setActiveTab(tab);
  };

  const createDownloadButton = (option: YouTubeVideoOption | YouTubeAudioOption, type: 'video' | 'audio' | 'video-only') => {
    let colorClass = "";
    let icon = "";

    if (type === 'video') {
      colorClass = "bg-primary hover:bg-primary/90 text-white";
      icon = "fas fa-video";
    } else if (type === 'audio') {
      colorClass = "bg-secondary hover:bg-secondary/90 text-white";
      icon = "fas fa-music";
    } else {
      colorClass = "bg-gray-500 hover:bg-gray-600 text-white";
      icon = "fas fa-film";
    }

    return (
      <a 
        href={option.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        download 
        className={`${colorClass} font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center`}
      >
        <i className={`${icon} mr-2`}></i>
        <span>{option.label}</span>
      </a>
    );
  };

  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <i className="fab fa-youtube text-red-600 text-xl mr-2"></i>
          <h2 className="text-xl font-semibold">YouTube Video</h2>
          <span className="ml-auto bg-gray-100 text-dark-700 px-3 py-1 rounded-full text-sm font-medium">
            {formatDuration(parseInt(data.duration))}
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-80 rounded-lg overflow-hidden">
            <img src={data.thumbnail} className="w-full h-auto object-cover" alt={data.title} />
          </div>
          
          <div className="flex-grow">
            <h3 className="text-xl font-medium mb-4">{data.title}</h3>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <i className="fas fa-sliders-h text-dark-700 mr-2"></i>
                <h4 className="font-medium">Download Options</h4>
              </div>
              
              {/* Format Selection Tabs */}
              <div className="flex border-b border-gray-200 mb-4">
                <button 
                  onClick={() => handleTabChange('video')}
                  className={`py-2 px-4 font-medium ${
                    activeTab === 'video' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <i className="fas fa-video mr-1"></i> Video
                </button>
                <button 
                  onClick={() => handleTabChange('audio')}
                  className={`py-2 px-4 font-medium ${
                    activeTab === 'audio' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <i className="fas fa-music mr-1"></i> Audio Only
                </button>
              </div>
              
              {/* Video Quality Options */}
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${activeTab === 'video' ? '' : 'hidden'}`}
              >
                {data.video_with_audio.map((option, index) => (
                  <div key={`video-${index}`}>
                    {createDownloadButton(option, 'video')}
                  </div>
                ))}
                
                {data.video_only.map((option, index) => (
                  <div key={`video-only-${index}`}>
                    {createDownloadButton({...option, label: `${option.label} (No Audio)`}, 'video-only')}
                  </div>
                ))}
              </div>
              
              {/* Audio Quality Options */}
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${activeTab === 'audio' ? '' : 'hidden'}`}
              >
                {data.audio.map((option, index) => (
                  <div key={`audio-${index}`}>
                    {createDownloadButton(option, 'audio')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeResult;
