interface SuggestionsProps {
  content: string;
}

export default function Suggestions({ content }: SuggestionsProps) {
  return (
    <div className="whitespace-pre-wrap p-4 mt-4 border bg-gray-100 text-black rounded">
      <h2 className="font-semibold mb-2">AI Suggestions</h2>
      {content}
    </div>
  );
}
