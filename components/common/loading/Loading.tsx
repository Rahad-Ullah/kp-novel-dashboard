import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[88vh]">
      <Loader className="animate-spin size-6 md:size-8 text-primary" />
    </div>
  );
};

export default Loading;
