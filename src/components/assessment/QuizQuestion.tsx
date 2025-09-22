
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Option {
  id: string;
  text: string;
}

interface QuestionProps {
  question: {
    id: string;
    text: string;
    type: "multiple-choice" | "essay";
    options?: Option[];
  };
  answer: string | null;
  onAnswerChange: (questionId: string, answer: string) => void;
  disabled?: boolean;
}

const QuizQuestion = ({ question, answer, onAnswerChange, disabled = false }: QuestionProps) => {
  const { id, text, type, options } = question;

  const handleMultipleChoiceChange = (value: string) => {
    onAnswerChange(id, value);
  };

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerChange(id, e.target.value);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{text}</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "multiple-choice" && options && (
          <RadioGroup 
            value={answer || ""} 
            onValueChange={handleMultipleChoiceChange}
            disabled={disabled}
          >
            <div className="space-y-3">
              {options.map(option => (
                <div key={option.id} className="flex items-start space-x-2">
                  <RadioGroupItem 
                    value={option.id} 
                    id={`option-${option.id}`} 
                    disabled={disabled}
                  />
                  <Label 
                    htmlFor={`option-${option.id}`} 
                    className="font-normal cursor-pointer"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}
        
        {type === "essay" && (
          <Textarea
            placeholder="Escribe tu respuesta aquí..."
            value={answer || ""}
            onChange={handleEssayChange}
            rows={6}
            disabled={disabled}
            className="w-full resize-none"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
