import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FacebookResponse } from '@/types/api';

interface FacebookResultProps {
  data: FacebookResponse;
}

const FacebookResult = ({ data }: FacebookResultProps) => {
  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <i className="fab fa-facebook text-blue-600 text-xl mr-2"></i>
          <h2 className="text-xl font-semibold">Facebook Video</h2>
          <span className="ml-auto bg-gray-100 text-dark-700 px-3 py-1 rounded-full text-sm font-medium">
            {data.data.quality || 'HD'}
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-80 rounded-lg overflow-hidden">
            <img 
              src={data.data.thumbnail} 
              className="w-full h-auto object-cover" 
              alt="Facebook video thumbnail" 
            />
          </div>
          
          <div className="flex-grow flex flex-col">
            <div className="flex-grow">
              <div className="flex items-center mb-3">
                <i className="fas fa-info-circle text-dark-700 mr-2"></i>
                <p className="text-dark-700">This Facebook video is available for download.</p>
              </div>
            </div>
            
            <a 
              href={data.data.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <i className="fas fa-download mr-2"></i> Download Video
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacebookResult;
