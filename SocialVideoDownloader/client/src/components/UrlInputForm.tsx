import { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInputForm = ({ onSubmit, isLoading }: UrlInputFormProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleClear = () => {
    setUrl('');
  };

  return (
    <Card className="max-w-3xl mx-auto mb-8">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-link text-gray-400"></i>
            </div>
            <Input 
              type="text"
              value={url}
              onChange={handleChange}
              placeholder="Paste YouTube, Facebook or TikTok URL here..."
              className="pl-10 pr-12 py-6"
              disabled={isLoading}
              required
            />
            {url && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button 
                  type="button" 
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Clear input"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
          </div>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white font-medium py-6 px-6 min-w-[140px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span>Processing</span>
                <i className="fas fa-spinner fa-spin ml-2"></i>
              </>
            ) : (
              <span>Download</span>
            )}
          </Button>
        </form>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
            <i className="fab fa-youtube text-red-600 mr-2"></i>
            <span className="text-sm font-medium">YouTube</span>
          </div>
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
            <i className="fab fa-facebook text-blue-600 mr-2"></i>
            <span className="text-sm font-medium">Facebook</span>
          </div>
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
            <i className="fab fa-tiktok text-black mr-2"></i>
            <span className="text-sm font-medium">TikTok</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlInputForm;
