import { BsCameraVideo } from 'react-icons/bs';
import { BsFillImageFill } from 'react-icons/bs';

interface chatContentSchema {
  type: string;
  content: string;
}
export default function chatContent({ type, content }: chatContentSchema) {
  switch (type) {
    case "text":
      return content;
    case "image":
      return <BsFillImageFill color={"var(--primaryThemeColor)"} size={18} />;
    case "video":
      return <BsCameraVideo color={"var(--primaryThemeColor)"} size={18} />;
  }
}
