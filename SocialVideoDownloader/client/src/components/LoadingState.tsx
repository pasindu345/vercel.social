import { Card, CardContent } from "@/components/ui/card";

const LoadingState = () => {
  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="shimmer h-4 w-40 rounded mr-2"></div>
          <div className="shimmer h-4 w-16 rounded-full ml-auto"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="shimmer w-full md:w-80 h-48 rounded-lg"></div>
          <div className="flex-grow">
            <div className="shimmer h-6 w-3/4 rounded mb-4"></div>
            <div className="shimmer h-4 w-1/2 rounded mb-3"></div>
            <div className="shimmer h-4 w-1/4 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="shimmer h-10 rounded-lg"></div>
              <div className="shimmer h-10 rounded-lg"></div>
              <div className="shimmer h-10 rounded-lg"></div>
              <div className="shimmer h-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </CardContent>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }
        
        .shimmer {
          background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
          background-size: 800px 104px;
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </Card>
  );
};

export default LoadingState;
