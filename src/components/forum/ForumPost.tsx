
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface ForumPostProps {
  post: {
    id: string;
    author: {
      name: string;
      avatar?: string;
      role: string;
    };
    title: string;
    content: string;
    date: string;
    likes: number;
    replies: number;
    liked?: boolean;
  };
}

const ForumPost = ({ post }: ForumPostProps) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2 flex flex-row items-start space-x-4">
        <Avatar>
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback className="bg-kampus-primary text-white">
            {post.author.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <h3 className="font-semibold">{post.author.name}</h3>
            <span className="text-xs text-muted-foreground">
              {post.author.role}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{post.date}</p>
        </div>
      </CardHeader>
      
      <CardContent>
        <h4 className="font-medium text-lg mb-2">{post.title}</h4>
        <p className="text-sm">{post.content}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <div className="flex space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center space-x-1 ${liked ? 'text-kampus-primary' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likeCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-1"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.replies}</span>
          </Button>
        </div>
        
        <Button 
          variant="ghost"
          size="sm"
          className="text-kampus-primary"
        >
          Ver discusión
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForumPost;
