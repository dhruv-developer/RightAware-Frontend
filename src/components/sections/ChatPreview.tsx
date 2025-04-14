import { FC } from "react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const messages: Message[] = [
  {
    sender: "ai",
    text: "Hello! I'm your AI Rights Navigator. How can I help you with legal information today?",
  },
  {
    sender: "user",
    text: "Can the police search my phone without a warrant?",
  },
  {
    sender: "ai",
    text: "In India, the police generally need a warrant to search personal digital devices like your phone. However, if you're arrested or if they suspect immediate danger or illegal activity, they may conduct a search under certain exceptions.\n\nWould you like me to explain your rights during police questioning?",
  },
  {
    sender: "user",
    text: "Yes, please.",
  },
  {
    sender: "ai",
    text: "During police questioning, you have the right to:\n• Remain silent\n• Be informed of the charges\n• Have a lawyer present\n• Avoid self-incrimination (Article 20(3) of the Constitution)\n\nNeed help finding free legal aid in your area?",
  },
];

const ChatPreview: FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md w-full max-w-2xl mx-auto h-[400px] overflow-y-auto space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.sender === "ai" && (
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 font-bold mr-2 text-sm">
              AI
            </div>
          )}

          <div
            className={`max-w-[75%] px-4 py-3 text-sm whitespace-pre-line rounded-2xl ${
              msg.sender === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm"
            } shadow-sm`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatPreview;
