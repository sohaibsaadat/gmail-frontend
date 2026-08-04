import { useState } from "react";

const domains = ["gmail.com", "yahoo.com", "outlook.com"];

export default function EmailInput() {
  const [to, setTo] = useState([]);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);

  const [input, setInput] = useState("");

  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const [activeField, setActiveField] = useState("to");

  const getEmails = (field) => {
    if (field === "to") return to;
    if (field === "cc") return cc;
    if (field === "bcc") return bcc;
  };

  const setEmails = (field, value) => {
    if (field === "to") setTo(value);
    if (field === "cc") setCc(value);
    if (field === "bcc") setBcc(value);
  };

  
  const selectDomain = (domain) => {
    const username = input.split("@")[0];

    setInput(`${username}@${domain}`);
  };

  return (
    <div className="relative">

      {/* TO */}
      <div className="flex gap-2 border-b-2 min-h-10 items-center border-gray-400 text-xl">
        <h1 className="text-gray-400">To:</h1>

        <div className="flex flex-wrap gap-2 flex-1">

          {to.map((email, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-gray-200 rounded-full px-3 py-1 text-sm"
            >
              <span>{email}</span>

              <button
                onClick={() => {
                  setTo(to.filter((_, i) => i !== index));
                }}
                className="text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}

          <input
            type="text"
            value={activeField === "to" ? input : ""}
            onChange={(e) => {
              setActiveField("to");
              setInput(e.target.value);
            }}
            onFocus={() => setActiveField("to")}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[150px] focus:outline-0"
          />

        </div>

        <div className="flex gap-2">
          {!showCc && (
            <p
              className="hover:underline cursor-pointer"
              onClick={() => setShowCc(true)}
            >
              Cc
            </p>
          )}

          {!showBcc && (
            <p
              className="hover:underline cursor-pointer"
              onClick={() => setShowBcc(true)}
            >
              Bcc
            </p>
          )}
        </div>
      </div>

      {/* CC */}
      {showCc && (
        <div className="flex gap-2 border-b-2 min-h-10 items-center border-gray-400 text-xl">
          <h1 className="text-gray-400">Cc:</h1>

          <div className="flex flex-wrap gap-2 flex-1">

            {cc.map((email, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-gray-200 rounded-full px-3 py-1 text-sm"
              >
                <span>{email}</span>

                <button
                  onClick={() => {
                    setCc(cc.filter((_, i) => i !== index));
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}

            <input
              type="text"
              value={activeField === "cc" ? input : ""}
              onChange={(e) => {
                setActiveField("cc");
                setInput(e.target.value);
              }}
              onFocus={() => setActiveField("cc")}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-[150px] focus:outline-0"
            />

          </div>
        </div>
      )}

      {/* BCC */}
      {showBcc && (
        <div className="flex gap-2 border-b-2 min-h-10 items-center border-gray-400 text-xl">
          <h1 className="text-gray-400">Bcc:</h1>

          <div className="flex flex-wrap gap-2 flex-1">

            {bcc.map((email, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-gray-200 rounded-full px-3 py-1 text-sm"
              >
                <span>{email}</span>

                <button
                  onClick={() => {
                    setBcc(bcc.filter((_, i) => i !== index));
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}

            <input
              type="text"
              value={activeField === "bcc" ? input : ""}
              onChange={(e) => {
                setActiveField("bcc");
                setInput(e.target.value);
              }}
              onFocus={() => setActiveField("bcc")}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-[150px] focus:outline-0"
            />

          </div>
        </div>
      )}

      {/* SUGGESTIONS */}
      {input.includes("@") && (
        <div className="absolute top-full left-0 z-20 mt-1 w-fit rounded-lg border bg-blue-400 shadow-lg">

          {domains
            .filter((domain) => {
              const typedDomain = input.split("@")[1] || "";
              return domain.startsWith(typedDomain);
            })
            .map((domain) => (
              <div
                key={domain}
                onMouseDown={() => selectDomain(domain)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {input.split("@")[0]}@{domain}
              </div>
            ))}

        </div>
      )}
    </div>
  );
}