import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TikTokResponse } from '@/types/api';

interface TikTokResultProps {
  data: TikTokResponse;
}

const TikTokResult = ({ data }: TikTokResultProps) => {
  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <i className="fab fa-tiktok text-black text-xl mr-2"></i>
          <h2 className="text-xl font-semibold">TikTok Video</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-80 flex flex-col">
            <video 
              controls 
              className="w-full h-auto rounded-lg mb-4"
              src={data.data.video}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center mb-3">
              <i className="fas fa-info-circle text-dark-700 mr-2"></i>
              <p className="text-dark-700">Choose your download option:</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href={data.data.video} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <i className="fas fa-video mr-2"></i> Download Video
              </a>
              <a 
                href={data.data.audio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <i className="fas fa-music mr-2"></i> Download Audio
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TikTokResult;
