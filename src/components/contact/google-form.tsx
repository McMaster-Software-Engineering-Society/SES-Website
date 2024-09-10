import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";

export type Question = {
  id: string;
  label: string;
  type: "text" | "email" | "number";
  variant: "short" | "long";
  placeholder: string;
  isRequired?: boolean;
};

type GoogleFormProps = {
  title: string;
  questions: Question[];
  googleFormId: string;
  googleFormEntryIds: { [key: string]: string };
};

export default function GoogleForm({
  title,
  googleFormId,
  questions,
  googleFormEntryIds,
}: Readonly<GoogleFormProps>) {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (id: string, value: string) => {
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const getHref = () => {
    const queryParams = new URLSearchParams();
    for (const question of questions) {
      const entryId = googleFormEntryIds[question.id];
      if (entryId) {
        queryParams.append(`entry.${entryId}`, formState[question.id] || "");
      }
    }

    return `${getGoogleFormLink()}?${queryParams.toString()}`;
  };

  const getGoogleFormLink = () => {
    return `https://docs.google.com/forms/d/e/${googleFormId}/viewform`;
  };

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isQuestionInvalid = (question: Question): boolean => {
    const value = formState[question.id];

    if (question.isRequired && !value) return true;

    if (question.type === "email" && value) {
      return !validateEmail(value);
    }
    return false;
  };

  const isFormInvalid = () => {
    const invalid = questions.some((question) => isQuestionInvalid(question));
    return invalid;
  };

  return (
    <div className="flex flex-col max-w-screen-sm mx-auto mb-8">
      <h2 className="text-center font-semibold">{title}</h2>
      <div className="flex flex-col gap-y-6">
        {questions.map((question) => {
          if (question.variant === "short")
            return (
              <Input
                key={question.id}
                type={question.type}
                label={question.label}
                labelPlacement="outside"
                placeholder={question.placeholder}
                value={formState[question.id]}
                isInvalid={submitAttempted && isQuestionInvalid(question)}
                isRequired={question.isRequired}
                onValueChange={(value) => handleChange(question.id, value)}
              />
            );
          else if (question.variant === "long")
            return (
              <Textarea
                key={question.id}
                label={question.label}
                labelPlacement="outside"
                placeholder={question.placeholder}
                value={formState[question.id]}
                isInvalid={submitAttempted && isQuestionInvalid(question)}
                isRequired={question.isRequired}
                onValueChange={(value) => handleChange(question.id, value)}
              />
            );
        })}
        <div className="submit-button w-full text-center">
          <a
            href={isFormInvalid() ? undefined : getHref()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              onClick={() => {
                setSubmitAttempted(true);
              }}
              className="w-full"
            >
              Submit
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
